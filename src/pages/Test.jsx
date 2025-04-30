import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../utils/api";

const TestPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTest = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/api/test/${testId}`);
        setTest(response.data.data);
        setAnswers(new Array(response.data.data.questions.length).fill(null));
      } catch (error) {
        console.error("Error fetching test:", error);
        toast.error("Failed to load test. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTest();
  }, [testId]);

  const handleAnswerSelect = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = option;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitTest = async () => {
    setIsLoading(true);
    try {
      const formattedAnswers = answers.map((answer, index) => ({
        questionIndex: index,
        selectedOption: answer,
      }));
      const response = await api.post("/api/offer/submit-test", {
        testId,
        answers: formattedAnswers,
      });
      toast.success("Test submitted successfully!");
      console.log("Test Results:", response.data.results);
      navigate("/test/completed");
    } catch (error) {
      console.error("Error submitting test:", error);
      toast.error("Failed to submit test. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !test) {
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

  if (!test) {
    return <div className="text-center text-red-500 font-medium py-8">Test not found.</div>;
  }

  const { questions, jobTitle } = test;
  const currentQ = questions[currentQuestion];

  return (
    <div className="max-w-4xl w-full mx-auto px-4 sm:px-8 bg-white p-6 sm:p-8 shadow-xl rounded-xl mt-10 border border-gray-200">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6">Technical Assessment: {jobTitle}</h2>
      <div className="bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-200">
        <p className="text-sm text-gray-500 mb-4">
          Question {currentQuestion + 1} of {questions.length}
        </p>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{currentQ.question}</h3>
        <div className="space-y-4">
          {Object.entries(currentQ.options).map(([key, value]) => (
            <label key={key} className="flex items-center space-x-3">
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                value={key}
                checked={answers[currentQuestion] === key}
                onChange={() => handleAnswerSelect(key)}
                className="form-radio h-5 w-5 text-indigo-600"
              />
              <span className="text-gray-700">{value}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
        <button
          type="button"
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all w-full sm:w-auto disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>
        {currentQuestion < questions.length - 1 ? (
          <button
            type="button"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all w-full sm:w-auto"
            onClick={handleNextQuestion}
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all w-full sm:w-auto disabled:bg-green-400 disabled:cursor-not-allowed"
            onClick={handleSubmitTest}
            disabled={isLoading}
          >
            Submit Test
          </button>
        )}
      </div>
    </div>
  );
};

export default TestPage;