import React, { useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Header } from "./Header";
import { Footer } from "./Footer";
import "./ChatBot.css";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import ReactMarkdown from "react-markdown";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

function ChatBot() {
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      text: "Hello! How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);

  const chatContainerRef = useRef(null);

  const handleSend = async () => {
    if (!userInput) return;

    // Add user message to chat history
    setChatHistory((prevMessages) => [
      ...prevMessages,
      {
        text: userInput,
        sender: "user",
        timestamp: new Date(),
      },
    ]);

    const chatContainer = document.getElementsByClassName("chat-history");
    console.log(chatContainer);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    console.log(chatContainer.scrollTop);
    try {
      setLoading(true);

      const result = await model.generateContent(userInput);
      const aiResponse = result.response.text();

      setChatHistory((prevMessages) => [
        ...prevMessages,
        {
          text: aiResponse,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
      setUserInput("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Scroll to bottom of chat history when chat history updates

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="chat-history" ref={chatContainerRef}>
        {chatHistory.map((message, index) => (
          <div key={index} className={`chat-box ${message.sender}`}>
            {message.sender === "user" ? (
              <AccountCircleOutlinedIcon
                className="avatar user-avatar"
                fontSize="large"
              />
            ) : (
              <SmartToyOutlinedIcon
                className="avatar ai-avatar"
                fontSize="large"
              />
            )}
            <ReactMarkdown>{message.text}</ReactMarkdown>
            <span className="time-stamp">{message.timestamp.toString()}</span>
          </div>
        ))}
      </div>
      {loading && <div className="loader"></div>}

      <div className="input-container">
        <input
          className="input-text"
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          onSubmit={handleSend}
          onKeyDown={handleKeyDown}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
        <span class="icon">
          <SearchIcon />
        </span>
      </div>
      <Footer />
    </div>
  );
}

export default ChatBot;
