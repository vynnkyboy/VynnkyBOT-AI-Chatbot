import React, { useState } from "react";
import { FaRobot, FaVolumeUp, FaUndo, FaCopy, FaUpload, FaPaperPlane } from "react-icons/fa";
import AskAi from "./Ai/AskAi";

const App = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      setResponse("Masukkan Pertanyaan");
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const aiResponse = await AskAi(input);
      setResponse(aiResponse);
    } catch (error) {
      console.error(error);
      setResponse("Error fetching response. Please try again.");
    }

    setLoading(false);
    setInput("");
  };

  const handleSpeak = () => {
    if ("speechSynthesis" in window && response) {
      const utterance = new SpeechSynthesisUtterance(response);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleReset = () => {
    setInput("");
    setResponse("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    alert("Response copied!");
  };

  const handleUpload = () => {
    alert("Upload feature coming soon!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
      <h1 className="text-5xl font-bold mb-4">
        VYNNKYBOT <FaRobot className="inline ml-2" />
      </h1>
      <p className="mb-8 text-lg text-gray-300">Pembantu Pribadi Alvin</p>

      <form onSubmit={handleSubmit} className="flex items-center mb-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Tanya Apa Saja..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow px-6 py-3 rounded-full bg-white text-gray-900 focus:outline-none border-b-2 border-purple-500"
        />
        <button
          type="submit"
          className="ml-4 px-6 py-3 bg-pink-500 rounded-full shadow-lg hover:bg-pink-600 transition flex items-center"
        >
          <FaPaperPlane className="mr-2" /> Ask
        </button>
      </form>

      <div className="bg-white text-gray-900 rounded-xl p-6 shadow-xl w-[90%] max-w-2xl">
        <h2 className="text-xl font-bold text-purple-600 mb-2">Jawaban VynnkyBot</h2>
        <hr className="mb-4" />
        <p className="whitespace-pre-wrap min-h-[80px]">
          {loading ? "Berpikir..." : response || "Welcome to VYNNKYBOT 🤖"}
        </p>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleSpeak}
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg"
          aria-label="Speak"
        >
          <FaVolumeUp className="text-xl" />
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg"
          aria-label="Reset"
        >
          <FaUndo className="text-xl" />
        </button>
        <button
          onClick={handleCopy}
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg"
          aria-label="Copy"
        >
          <FaCopy className="text-xl" />
        </button>
        <button
          onClick={handleUpload}
          className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-full shadow-lg"
          aria-label="Upload"
        >
          <FaUpload className="text-xl" />
        </button>
      </div>

      <p className="mt-6 text-sm text-white opacity-80">
        Dev By VynnkyBoy
      </p>
    </div>
  );
};

export default App;
