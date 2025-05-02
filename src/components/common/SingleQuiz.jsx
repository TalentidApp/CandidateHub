import  { useState } from "react";
import Header from "./Header";

const quizData = [
  {
    question:
      "Which of the following is a NoSQL database used in the MERN stack?",
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
    <div className="overflow-y-auto">
      <Header />
      <h1 className="text-2xl text-start p-2 border-b-2">
        Engagement 1 - Talentid.app
      </h1>
      <div className="min-h-screen h-[500px] overflow-y-auto bg-white text-gray-900 flex flex-col items-center p-10">
        <div className="w-full max-w-3xl p-8 bg-white text-center">
          <div className="mt-6">
            <p className="text-2xl text-start font-semibold">
              {quizData[currentQuestion].question}
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <div className="space-y-2 text-xl">
                {quizData[currentQuestion].options.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-3 p-3   cursor-pointer "
                  >
                    <input
                      type="radio"
                      name="quiz"
                      value={option}
                      className="w-5 h-5 accent-purple-500"
                      onChange={() => setSelectedOption(option)}
                      checked={selectedOption === option}
                    />
                    <span className="text-gray-800">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
          <div className="mt-6 w-full px-10 gap-4 flex items-end justify-end">
            <button
              className="px-10 py-3 bg-gray-500 text-white rounded-full shadow-md hover:bg-gray-600 transition-all"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Back
            </button>
            <button
              className="px-10 py-3 bg-purple-700 text-white rounded-full shadow-md hover:bg-purple-800 transition-all"
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
