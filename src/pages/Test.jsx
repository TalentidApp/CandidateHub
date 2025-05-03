import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const TestPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [testStatus, setTestStatus] = useState("loading");
  const [countdown, setCountdown] = useState(null);
  const API_BASE_URL = 'https://talentid-backend-v2.vercel.app';

  useEffect(() => {
    const fetchTest = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log(`🚀 Fetching test with testId: ${testId}`);
        const response = await axios.get(`${API_BASE_URL}/api/offer/test/${testId}`);
        console.log("✅ API response:", response.data);
        if (!response.data.test) {
          throw new Error("Test data not found in response");
        }
        const testData = response.data.test;
        setTest(testData);
        setAnswers(new Array(testData.questions?.length || 0).fill(null));

        // Determine test status
        const now = new Date();
        const scheduled = new Date(testData.scheduledDate);
        const endTime = new Date(scheduled.getTime() + testData.duration * 60 * 1000);

        if (now < scheduled) {
          setTestStatus("before");
          setCountdown(Math.ceil((scheduled - now) / 1000));
        } else if (now <= endTime) {
          setTestStatus("during");
        } else {
          setTestStatus("after");
        }
      } catch (error) {
        console.error("❌ Error fetching test:", error);
        setError(error.response?.data?.message || "Failed to load test. Please try again.");
        setTestStatus(error.response?.data?.error === "Test has expired." ? "after" : "error");
        toast.error(error.response?.data?.message || "Failed to load test.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTest();
  }, [testId]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      if (testStatus === "before" && test) {
        const scheduled = new Date(test.scheduledDate);
        const secondsUntilStart = Math.ceil((scheduled - now) / 1000);
        setCountdown(secondsUntilStart);
        if (secondsUntilStart <= 0) {
          window.location.reload();
        }
      } else if (testStatus === "during" && test) {
        const endTime = new Date(new Date(test.scheduledDate).getTime() + test.duration * 60 * 1000);
        if (now > endTime) {
          setTestStatus("after");
          handleAutoSubmit();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [testStatus, test]);

  const formatCountdown = (seconds) => {
    if (seconds <= 0) return "Starting soon...";
    const days = Math.floor(seconds / (24 * 3600));
    seconds %= 24 * 3600;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;
    return `${days > 0 ? `${days}d ` : ""}${hours > 0 ? `${hours}h ` : ""}${minutes}m ${seconds}s`;
  };

  const formatTestTime = () => {
    if (!test || testStatus !== "during") return "";
    const now = new Date();
    const endTime = new Date(new Date(test.scheduledDate).getTime() + test.duration * 60 * 1000);
    const secondsRemaining = Math.max(0, Math.floor((endTime - now) / 1000));
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;
    return `${minutes}m ${seconds}s`;
  };

  const handleAnswerSelect = (option) => {
    if (testStatus !== "during") return;
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = option;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (testStatus !== "during") return;
    if (currentQuestion < (test?.questions?.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (testStatus !== "during") return;
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitTest = async () => {
    if (testStatus !== "during") return;
    setIsLoading(true);
    try {
      const formattedAnswers = answers.map((answer, index) => ({
        questionIndex: index,
        selectedOption: answer,
      }));
      console.log("📤 Submitting test with answers:", formattedAnswers);
      const response = await axios.post(`${API_BASE_URL}/api/offer/submit-test`, {
        testId,
        answers: formattedAnswers,
      });
      console.log("✅ Test submission response:", response.data);
      toast.success("Test submitted successfully!");
      navigate("/test/completed");
    } catch (error) {
      console.error("❌ Error submitting test:", error);
      toast.error(error.response?.data?.message || "Failed to submit test. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAutoSubmit = async () => {
    if (testStatus !== "during") return;
    setIsLoading(true);
    try {
      const formattedAnswers = answers.map((answer, index) => ({
        questionIndex: index,
        selectedOption: answer,
      }));
      console.log("📤 Auto-submitting test with answers:", formattedAnswers);
      await axios.post(`${API_BASE_URL}/api/offer/submit-test`, {
        testId,
        answers: formattedAnswers,
      });
      console.log("✅ Test auto-submitted");
      toast.info("Test time expired. Your answers have been submitted.");
      setTestStatus("after");
    } catch (error) {
      console.error("❌ Error auto-submitting test:", error);
      toast.error("Failed to auto-submit test. Please contact support.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-12 w-12 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="mt-4 text-lg text-gray-600">Loading test...</p>
        </div>
      </div>
    );
  }

  if (testStatus === "error" || !test) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100">
        <div className="max-w-lg w-full mx-auto px-6 py-8 bg-white rounded-2xl shadow-xl border border-gray-200 text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Oops, Something Went Wrong</h2>
          <p className="text-gray-600 mb-6">{error || "Test not found. Please check the link or contact support."}</p>
          <button
            type="button"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300"
            onClick={() => navigate("/")}
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (testStatus === "before") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100">
        <div className="max-w-lg w-full mx-auto px-6 py-8 bg-white rounded-2xl shadow-xl border border-gray-200 text-center">
          <h2 className="text-3xl font-bold text-indigo-600 mb-4">Test Not Yet Started</h2>
          <p className="text-gray-600 mb-4">
            The <span className="font-semibold">{test.jobTitle}</span> assessment is scheduled to begin on:
          </p>
          <p className="text-xl font-semibold text-indigo-600 mb-4">
            {new Date(test.scheduledDate).toLocaleString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </p>
          <div className="relative flex justify-center mb-6">
            <svg className="w-32 h-32">
              <circle
                className="text-gray-200"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="56"
                cx="64"
                cy="64"
              />
              <circle
                className="text-indigo-600"
                strokeWidth="8"
                strokeDasharray={352}
                strokeDashoffset={countdown > 0 ? (352 * countdown) / (test.duration * 60) : 0}
                stroke="currentColor"
                fill="transparent"
                r="56"
                cx="64"
                cy="64"
                transform="rotate(-90 64 64)"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold text-indigo-600">
              {formatCountdown(countdown)}
            </div>
          </div>
          <p className="text-gray-600 mb-6">Please return at the scheduled time to begin the test.</p>
          <button
            type="button"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300"
            onClick={() => navigate("/")}
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (testStatus === "after") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100">
        <div className="max-w-lg w-full mx-auto px-6 py-8 bg-white rounded-2xl shadow-xl border border-gray-200 text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Test Completed</h2>
          <p className="text-gray-600 mb-4">
            The <span className="font-semibold">{test.jobTitle}</span> assessment ended on:
          </p>
          <p className="text-xl font-semibold text-gray-600 mb-4">
            {new Date(new Date(test.scheduledDate).getTime() + test.duration * 60 * 1000).toLocaleString(
              "en-US",
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }
            )}
          </p>
          <p className="text-gray-600 mb-6">
            The test is no longer available. Contact support at{" "}
            <a href="mailto:support@talentid.app" className="text-indigo-600 hover:underline">
              support@talentid.app
            </a>{" "}
            for assistance.
          </p>
          <button
            type="button"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300"
            onClick={() => navigate("/")}
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const { questions, jobTitle } = test;
  const currentQ = questions?.[currentQuestion] || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-12">
      <div className="max-w-4xl w-full mx-auto px-6 py-8 bg-white rounded-2xl shadow-xl border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-600">Assessment: {jobTitle || "N/A"}</h2>
          <div className="text-lg font-semibold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg">
            Time Remaining: {formatTestTime()}
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {questions?.length || 0}
          </p>
          <div className="flex gap-2">
            {Array.from({ length: questions?.length || 0 }).map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentQuestion
                    ? "bg-indigo-600"
                    : answers[index]
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{currentQ.question || "No question available"}</h3>
          <div className="space-y-3">
            {currentQ.options ? (
              Object.entries(currentQ.options).map(([key, value]) => (
                <label
                  key={key}
                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                    answers[currentQuestion] === key
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={key}
                    checked={answers[currentQuestion] === key}
                    onChange={() => handleAnswerSelect(key)}
                    className="form-radio h-5 w-5 text-indigo-600"
                    disabled={testStatus !== "during" || !currentQ.question}
                  />
                  <span className="text-gray-700">{value}</span>
                </label>
              ))
            ) : (
              <p className="text-gray-500">No options available</p>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <button
            type="button"
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-300 w-full sm:w-auto disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0 || testStatus !== "during"}
          >
            Previous
          </button>
          {currentQuestion < (questions?.length || 0) - 1 ? (
            <button
              type="button"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 w-full sm:w-auto disabled:bg-indigo-400 disabled:cursor-not-allowed"
              onClick={handleNextQuestion}
              disabled={testStatus !== "during"}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 w-full sm:w-auto disabled:bg-green-400 disabled:cursor-not-allowed"
              onClick={handleSubmitTest}
              disabled={isLoading || testStatus !== "during" || !questions?.length}
            >
              {isLoading ? "Submitting..." : "Submit Test"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPage;