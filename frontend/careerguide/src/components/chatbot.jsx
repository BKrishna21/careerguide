// import { useState } from "react";

// export default function Chatbox() {
//   const [messages, setMessages] = useState([
//     { from: "bot", text: "Hi! How can I help you with your career today?" }
//   ]);
//   const [input, setInput] = useState("");

//   const handleSend = () => {
//     if (input.trim() === "") return;

//     // Add user message
//     setMessages((prev) => [...prev, { from: "user", text: input }]);

//     // Dummy bot reply (replace this with API call later)
//     setTimeout(() => {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "That's interesting! Let me help you with that." }
//       ]);
//     }, 800);

//     setInput(""); // clear input
//   };

//   return (
//     <div className="bg-white w-96 h-[30rem] rounded-xl mt-20 shadow-lg flex flex-col justify-between p-4">
//       {/* Header */}
//       <div className="text-xl font-bold text-gray-800 mb-2 pb-2">
//         AI Career Chat
//       </div>

//       {/* Messages */}
//       <div className="flex-2 overflow-y-auto space-y-2 px-1 border rounded-xl ">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`flex ${
//               msg.from === "user" ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`max-w-xs px-4 py-1 rounded-lg mt-2  text-black ${
//                 msg.from === "user"
//                   ? "bg-gray-300 rounded-br-none"
//                   : "bg-gray-100 rounded-bl-none"
//               }`}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Input section */}
//       <div className="flex items-center mt-4  pt-2">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message..."
//           className="flex-1 px-2 py-1.5 border mr-2 rounded-l-lg border-gray-300 focus:outline-none"
//         />
//         <button
//           onClick={handleSend}
//           className="bg-indigo-500 text-white px-4 py-1.5 gap-2 rounded-r-lg hover:bg-indigo-700"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }




import { useState } from "react";
import axios from "axios";

export default function Chatbox() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you with your career today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { from: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        prompt: input
      });

      const botReply = { from: "bot", text: res.data.response };

      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Sorry, something went wrong!" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-96 h-[30rem] rounded-xl mt-20 shadow-lg flex flex-col justify-between p-4">
      {/* Header */}
      <div className="text-xl font-bold text-gray-800 mb-2 pb-2">
        AI Career Chat
      </div>

      {/* Messages */}
      <div className="flex-2 overflow-y-auto space-y-2 px-1 border rounded-xl bg-gradient-to-t from-purple-400 to-indigo-400 p-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-1 rounded-lg text-black ${
                msg.from === "user"
                  ? "bg-indigo-200 rounded-br-none"
                  : "bg-gray-200 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-sm text-gray-500 italic">Bot is typing...</div>
        )}
      </div>

      {/* Input section */}
      <div className="flex items-center mt-4 pt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-2 py-1.5 border mr-2 rounded-l-lg border-gray-300 focus:outline-none"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-indigo-500 text-white px-4 py-1.5 gap-2 rounded-r-lg hover:bg-indigo-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
