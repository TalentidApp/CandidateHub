import { useNavigate } from "react-router-dom";

const TestCompleted = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl w-full mx-auto px-4 sm:px-8 bg-white p-6 sm:p-8 shadow-xl rounded-xl mt-10 border border-gray-200 text-center">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6">Test Submitted</h2>
      <p className="text-gray-600 mb-6">
        Thank you for completing the technical assessment. Your results have been recorded, and we will get back to you soon.
      </p>
      <button
        type="button"
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all"
        onClick={() => navigate("/")}
      >
        Return to Home
      </button>
    </div>
  );
};

export default TestCompleted;