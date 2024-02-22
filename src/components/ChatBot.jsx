import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Header } from "./Header";
import "./ChatBot.css";

function ChatBot() {
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
    if (!userInput) return;

    try {
      const result = await model.generateContent(userInput);
      console.log(result);
      const aiResponse = result.response.text();

      setChatHistory((prevMessages) => [
        ...prevMessages,
        {
          text: userInput,
          sender: "user",
          timestamp: new Date(),
        },
        {
          text: aiResponse,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
      setUserInput("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="chat-history">
        {chatHistory.map((message) => (
          <div key={message.user || message.ai} className="chat-box">
            <span className="sender-heading">
              {message.sender === "user" ? "User:" : "AI:"}
            </span>
            <p className="message-text">{message.text}</p>
            <span className="time-stamp">{message.timestamp.toString()}</span>
          </div>
        ))}
      </div>
      <input
        className="input-text"
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button className="send-message-button" onClick={handleSend}>
        Send
      </button>
    </div>
  );
}

export default ChatBot;
