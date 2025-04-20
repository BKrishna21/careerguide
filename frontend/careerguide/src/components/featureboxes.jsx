import { useState,useRef } from "react";
import { ClipboardList, FolderKanban, Target } from "lucide-react";
import QuestionBox from './questionbox.jsx'


const features = [
  {
    title: "Quiz",
    description: "Ready to test your skills? Take a quick quiz to evaluate your career readiness.",
    content: "Please answer a few questions to help the AI assess your strengths and recommend the right career paths.",
    icon: <ClipboardList className="w-10 h-10 text-black mt-3 mx-auto" />
  },
  {
    title: "Portfolio",
    description: "Do you have projects or work you've done? Let's evaluate your portfolio.",
    content: "Share your past projects or experiences so the AI can analyze your technical exposure and suggest improvements.",
    icon: <FolderKanban className="w-10 h-10 text-black  mt-3 mx-auto" />
  },
  {
    title: "Career Goals",
    description: "Unsure about your future plans? Let’s define and evaluate your career goals.",
    content: "Answer a few guiding questions to help the AI understand your aspirations and tailor advice accordingly.",
    icon: <Target className="w-10 h-10 text-black  mt-3 mx-auto" />
  },
];



export default function FeatureBoxes() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const contentRef=useRef(null);

  const handleClick = (index) => {
    setActiveIndex(index);
    setShowQuestions(false); 
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100); 
  };

  return (
    <div className="py-16 px-6 bg-white text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Dive into in-depth Analysis!!!</h2>

      {/* Boxes */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-10">
        {features.map((feature, index) => (
          <div
            key={index}
            
            onClick={() => { setActiveIndex(index);
              handleClick(index);
            }}
            className={`cursor-pointer bg-white text-gray-800 p-6 rounded-2xl border border-gray-300 shadow-lg h-65 w-62 transition transform hover:scale-105 hover:shadow-xl ${
            activeIndex === index ? "ring-2 ring-gray-200" : ""
            }`}
          >
             {feature.icon}
            <h3 className="text-3xl font-semibold mt-5 mb-6">{feature.title}</h3>
            <p className="text-sm opacity-90">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Dynamic Section */}
      {activeIndex !== null && (
        <div ref={contentRef} className="mt-10 max-w-2xl mx-auto bg-gray-100 p-6 rounded-xl shadow-md border border-gray-200">
          <h4 className="text-xl font-semibold text-gray-800 mb-2">
            {features[activeIndex].title}
          </h4>
          <p className="text-gray-700">{features[activeIndex].content}</p>

          <button
            onClick={() => setShowQuestions(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-10 py-1 hover:scale-105 hover:shadow-xl cursor-pointer rounded-md mt-5 hover:bg-indigo-700 transition"
          >
            Start
          </button>

          {showQuestions && (
              <QuestionBox topic={features[activeIndex].title} />
            )}

        </div>
      )}
    </div>
  );
}
