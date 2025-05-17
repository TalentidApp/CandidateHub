import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuthStore from "../constants/store";
import { api } from "../lib/api";

const TestPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTest = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log(`🚀 Fetching test with testId: ${testId}`);
      const response = await api.get(`/api/offer/test/${testId}`);
      console.log("✅ API response:", response.data);
      if (!response.data.test) {
        throw new Error("Test data not found in response");
      }
      const testData = response.data.test;
      setTest(testData);
      setAnswers(new Array(testData.questions?.length || 0).fill(null));
    } catch (error) {
      console.error("❌ Error fetching test:", error);
      if (error.response?.status === 401) {
        setError("Session expired. Please log in again.");
        useAuthStore.getState().clearAuthState();
        localStorage.setItem("redirectAfterLogin", `/test/${testId}`);
        navigate("/login", { replace: true });
      } else {
        setError(error.response?.data?.error || "Failed to load test. Please try again.");
        toast.error(error.response?.data?.error || "Failed to load test.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const checkFormulaStatus = async () => {
    try {
      const response = await api.get(`/api/formula/formula/status/${user?.data?.name}`);
      return response.data.hasSubmitted;
    } catch (error) {
      console.error("Error checking formula status:", error);
      return false;
    }
  };

  const handleAnswerSelect = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = option;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < (test?.questions?.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const formattedAnswers = answers.map((answer, index) => ({
        questionIndex: index,
        selectedOption: answer,
      }));
      console.log("📤 Submitting test with answers:", formattedAnswers);
      await api.post("/api/offer/submit-test", {
        testId,
        answers: formattedAnswers,
      });
      console.log("✅ Test submitted");
      toast.success("Test submitted successfully!");

      const hasSubmittedFormula = await checkFormulaStatus();
      if (!hasSubmittedFormula) {
        navigate("/formula");
      } else {
        navigate("/test/completed");
      }
    } catch (error) {
      console.error("❌ Error submitting test:", error);
      if (error.response?.status === 401) {
        setError("Session expired. Please log in again.");
        useAuthStore.getState().clearAuthState();
        localStorage.setItem("redirectAfterLogin", `/test/${testId}`);
        navigate("/login", { replace: true });
      } else {
        toast.error("Failed to submit test. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTest();
  }, [testId]);

  if (isLoading && !test) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-200 to-purple-300 text-gray-800">
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

  if (error || !test) {
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

  const { questions, jobTitle } = test;
  const currentQ = questions?.[currentQuestion] || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-200 to-purple-300 text-gray-800 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto px-6 py-8 bg-white rounded-2xl shadow-xl border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-600">Assessment: {jobTitle || "N/A"}</h2>
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
                    disabled={!currentQ.question}
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
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          {currentQuestion < (questions?.length || 0) - 1 ? (
            <button
              type="button"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 w-full sm:w-auto disabled:bg-indigo-400 disabled:cursor-not-allowed"
              onClick={handleNextQuestion}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 w-full sm:w-auto disabled:bg-green-400 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={isLoading || !questions?.length}
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