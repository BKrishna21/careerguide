// import React,{ useState } from "react";
// import axios from "axios";

// const questionsMap = {
//   Quiz: [
//     "What subjects do you enjoy the most?",
//     "Which technical skills are you confident in?",
//     "Do you prefer working solo or in a team?",
//     "Have you participated in coding contests or hackathons?",
//     "What domain excites you the most (AI, Web Dev, etc.)?",
//   ],
//   Portfolio: [
//     "List your top 3 projects and what they solve.",
//     "Which technologies have you used most often?",
//     "How do you organize your codebase and documentation?",
//     "Have you hosted your projects on GitHub or live?",
//     "What challenges did you face while building your projects?",
//   ],
//   "Career Goals": [
//     "What are your short-term career goals?",
//     "Where do you see yourself in the next 5 years?",
//     "Are you planning for higher studies or job placements?",
//     "Which companies or job roles attract you the most?",
//     "What steps are you currently taking toward your goals?",
//   ],
// };

//     const QuestionBox = ({ topic, onSubmitPrompt }) => {
//     const questions = questionsMap[topic] || [];
//     const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  
//     const handleChange = (index, value) => {
//       const updated = [...answers];
//       updated[index] = value;
//       setAnswers(updated);
//     };

//     const handleSubmit = () => {
//         const formattedPrompt = questions
//           .map((q, i) => `${q}\nAnswer: ${answers[i] || "Not answered."}`)
//           .join("\n\n");
    
//         console.log("Formatted Prompt for AI:", formattedPrompt);
    
//         // Optionally send it to a parent component or API
//         // if (onSubmitPrompt) {
//         //   onSubmitPrompt(formattedPrompt);
//         // }
    
//     };

//   return (
//     <div className="mt-6 bg-white border border-gray-300 shadow p-6 rounded-lg text-left space-y-5">
//       <h5 className="text-xl font-semibold text-indigo-700 mb-3">
//         {topic} Questions
//       </h5>
//       {questions.map((question, index) => (
//         <div key={index}>
//           <label className="block text-gray-800 text-sm font-medium mb-1">
//             {question}
//           </label>
//           <input
//             type="text"
//             className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-300"
//           />
//         </div>
//       ))}

//         <div className="pt-4 text-right">
//             <button
//             onClick={handleSubmit}
//             className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:scale-105 hover:shadow-xl px-10 py-1 rounded-md hover:bg-indigo-700 transition"
//             >
//             Submit
//             </button>
//         </div>

//     </div>
//   );
// };

// export default QuestionBox;



import React, { useState } from "react";
import axios from "axios";

const questionsMap = {
  Quiz: [
    "What subjects do you enjoy the most?",
    "Which technical skills are you confident in?",
    "Do you prefer working solo or in a team?",
    "Have you participated in coding contests or hackathons?",
    "What domain excites you the most (AI, Web Dev, etc.)?",
  ],
  Portfolio: [
    "List your top 3 projects and what they solve.",
    "Which technologies have you used most often?",
    "How do you organize your codebase and documentation?",
    "Have you hosted your projects on GitHub or live?",
    "What challenges did you face while building your projects?",
  ],
  "Career Goals": [
    "What are your short-term career goals?",
    "Where do you see yourself in the next 5 years?",
    "Are you planning for higher studies or job placements?",
    "Which companies or job roles attract you the most?",
    "What steps are you currently taking toward your goals?",
  ],
};

const QuestionBox = ({ topic }) => {
  const questions = questionsMap[topic] || [];
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ 1. Handle user input
  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  // ✅ 2. Handle Submit: format + send to backend
  const handleSubmit = async () => {
    const formattedPrompt = questions
      .map((q, i) => `${q}\nAnswer: ${answers[i] || "Not answered."}`)
      .join("\n\n");

    setLoading(true);
    setSuggestion(""); // reset previous suggestion

    try {
      const res = await axios.post("http://localhost:5000/api/analysis", {
        prompt: formattedPrompt,
      });
      setSuggestion(res.data.response || "No suggestion received.");
    } catch (err) {
      console.error("Error:", err);
      setSuggestion("Something went wrong while getting a suggestion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 bg-white border border-gray-300 shadow p-6 rounded-lg text-left space-y-5">
      <h5 className="text-xl font-semibold text-indigo-700 mb-3">
        {topic} Questions
      </h5>

      {/* ✅ Input fields with value + onChange */}
      {questions.map((question, index) => (
        <div key={index}>
          <label className="block text-gray-800 text-sm font-medium mb-1">
            {question}
          </label>
          <input
            type="text"
            value={answers[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-300"
          />
        </div>
      ))}

      {/* ✅ Submit button */}
      <div className="pt-4 text-right">
        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:scale-105 hover:shadow-xl px-10 py-1 rounded-md hover:bg-indigo-700 transition"
        >
          Submit
        </button>
      </div>

      {/* ✅ Suggestion Box */}
      {loading ? (
        <p className="text-indigo-500 mt-4 italic">Generating suggestion...</p>
      ) : (
        suggestion && (
          <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-400 rounded-md">
            <h4 className="font-semibold text-green-700">AI Suggestion:</h4>
            <p className="text-gray-700 mt-2 whitespace-pre-line">{suggestion}</p>
          </div>
        )
      )}
    </div>
  );
};

export default QuestionBox;
