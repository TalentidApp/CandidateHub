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
  const [, setCurrentTime] = useState(new Date());
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
        console.log("✅ API response:", JSON.stringify(response.data, null, 2));
        if (!response.data.test) {
          throw new Error("Test data not found in response");
        }
        setTest(response.data.test);
        setAnswers(new Array(response.data.test.questions?.length || 0).fill(null));

        // Determine test status
        const now = new Date();
        const scheduled = new Date(response.data.test.scheduledDate);
        const endTime = new Date(scheduled.getTime() + response.data.test.duration * 60 * 1000);
        
        if (now < scheduled) {
          setTestStatus("before");
          setCountdown(Math.ceil((scheduled - now) / 1000)); 
        } else if (now <= endTime) {
          setTestStatus("during");
        } else {
          setTestStatus("after");
        }
      } catch (error) {
        console.error("❌ Error fetching test:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        setError(error.response?.data?.message || error.response?.data?.error || "Failed to load test. Please try again.");
        setTestStatus(error.response?.data?.error === "Test has expired." ? "after" : "error");
        toast.error(error.response?.data?.message || "Failed to load test. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTest();
  }, [testId]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

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

  // Format countdown for display
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
      console.error("❌ Error submitting test:", {
        message: error.message,
        response: error.response?.data,
      });
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
      console.error("❌ Error auto-submitting test:", {
        message: error.message,
        response: error.response?.data,
      });
      toast.error("Failed to auto-submit test. Please contact support.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <svg
          className="animate-spin h-8 w-8 text-indigo-600"
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
      </div>
    );
  }

  if (testStatus === "error" || !test) {
    return (
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-8 bg-white p-6 sm:p-8 shadow-xl rounded-xl mt-10 border border-gray-200 text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-6">Error</h2>
        <p className="text-gray-600 mb-6">{error || "Test not found. Please check the link or contact support."}</p>
        <button
          type="button"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all"
          onClick={() => navigate("/")}
        >
          Return to Home
        </button>
      </div>
    );
  }

  if (testStatus === "before") {
    return (
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-8 bg-white p-6 sm:p-8 shadow-xl rounded-xl mt-10 border border-gray-200 text-center">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6">Test Not Yet Available</h2>
        <p className="text-gray-600 mb-4">
          The test is scheduled to start at{" "}
          {new Date(test.scheduledDate).toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}.
        </p>
        <p className="text-2xl font-semibold text-indigo-600 mb-6">
          Time until start: {formatCountdown(countdown)}
        </p>
        <p className="text-gray-600 mb-6">Please return at the scheduled time to begin the test.</p>
        <button
          type="button"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all"
          onClick={() => navigate("/")}
        >
          Return to Home
        </button>
      </div>
    );
  }

  if (testStatus === "after") {
    return (
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-8 bg-white p-6 sm:p-8 shadow-xl rounded-xl mt-10 border border-gray-200 text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-6">Test Over</h2>
        <p className="text-gray-600 mb-4">
          The test ended at{" "}
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
          )}.
        </p>
        <p className="text-gray-600 mb-6">The test is no longer available. Please contact support for assistance.</p>
        <button
          type="button"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all"
          onClick={() => navigate("/")}
        >
          Return to Home
        </button>
      </div>
    );
  }

  const { questions, jobTitle } = test;
  const currentQ = questions?.[currentQuestion] || {};

  return (
    <div className="max-w-4xl w-full mx-auto px-4 sm:px-8 bg-white p-6 sm:p-8 shadow-xl rounded-xl mt-10 border border-gray-200">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6">Technical Assessment: {jobTitle || "N/A"}</h2>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">
          Question {currentQuestion + 1} of {questions?.length || 0}
        </p>
        <p className="text-sm font-semibold text-indigo-600">
          Time Remaining: {formatTestTime()}
        </p>
      </div>
      <div className="bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{currentQ.question || "No question available"}</h3>
        <div className="space-y-4">
          {currentQ.options ? (
            Object.entries(currentQ.options).map(([key, value]) => (
              <label key={key} className="flex items-center space-x-3">
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
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all w-full sm:w-auto disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0 || testStatus !== "during"}
        >
          Previous
        </button>
        {currentQuestion < (questions?.length || 0) - 1 ? (
          <button
            type="button"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all w-full sm:w-auto disabled:bg-indigo-400 disabled:cursor-not-allowed"
            onClick={handleNextQuestion}
            disabled={testStatus !== "during"}
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all w-full sm:w-auto disabled:bg-green-400 disabled:cursor-not-allowed"
            onClick={handleSubmitTest}
            disabled={isLoading || testStatus !== "during" || !questions?.length}
          >
            Submit Test
          </button>
        )}
      </div>
    </div>
  );
};

export default TestPage;