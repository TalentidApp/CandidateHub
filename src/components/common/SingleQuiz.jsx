import React, { useState } from "react";

const quizData = [
  {
    question: "Which of the following is a NoSQL database used in the MERN stack?",
    options: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
    answer: "MongoDB",
  },
  {
    question: "What does React use to manage component state?",
    options: ["Redux", "Context API", "useState", "All of the above"],
    answer: "All of the above",
  },
  {
    question: "Which company maintains React?",
    options: ["Google", "Facebook (Meta)", "Microsoft", "Amazon"],
    answer: "Facebook (Meta)",
  },
];




const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center p-10">
      <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-2xl border-4 border-purple-700 text-center">
        <h2 className="text-2xl font-bold text-purple-800">Quiz</h2>
        <div className="mt-6">
          <p className="text-lg font-semibold">{quizData[currentQuestion].question}</p>
          <div className="mt-4 flex flex-col gap-3">
            {quizData[currentQuestion].options.map((option, index) => (
              <label
                key={index}
                className={`p-3 border rounded-lg cursor-pointer transition-all hover:bg-purple-100 ${
                  selectedOption === option ? "bg-purple-300" : "bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="quiz"
                  value={option}
                  className="hidden"
                  onChange={() => setSelectedOption(option)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <button
            className="px-6 py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition-all"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Back
          </button>
          <button
            className="px-6 py-3 bg-purple-700 text-white rounded-lg shadow-md hover:bg-purple-800 transition-all"
            onClick={handleNext}
            disabled={currentQuestion === quizData.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
