
import { useState } from "react";
import Chatbox from "./chatbot.jsx"; 

export default function HeroSection() {
  const [showChat, setShowChat] = useState(false);

  const handleSearch = () => {
    setShowChat(true);
  };

  return (
    <div className=" flex flex-col items-center justify-center h-150 bg-gradient-to-r from-indigo-500 to-purple-500 text-center px-4 relative">
      
      
      {showChat && (
        <div className="absolute right-30 top-1/2 transform -translate-y-1/2 transition-opacity duration-1000 z-10">
          <Chatbox />
        </div>
      )}

      {/* Main Header Content */}
      <div
        className={`flex flex-col items-center text-center transition-all duration-500 ${
          showChat ? "-translate-x-72" : ""
        }`}
      >
        <h1 className="text-1xl md:text-6xl mt-20 w-200 font-bold text-black mb-4">
          Engineer Your Future with AI-Powered Career Guidance!
        </h1>
        <p className="text-xl md:text-3xl  text-gray-900">
          AI Career Assistant for the Next-Gen Engineers.
        </p>

        {/* Start Button */}
        <div className="mt-25">
          <button
           onClick={handleSearch}
           className=" bg-gradient-to-r from-blue-700 to-cyan-700 text-white hover:scale-105 hover:shadow-xl px-20 py-2 rounded-2xl text-xl shadow-2xs hover:from-indigo-700 hover:to-purple-700 transition duration-200 ease-in-out"
          >
            Start with your queries!
          </button>
        </div>
      </div>
    </div>
  );
}
