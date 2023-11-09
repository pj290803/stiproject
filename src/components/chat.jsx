  import React, { useState, useEffect } from 'react';
  import './chat.css';

  const Chat = () => {
    const [inputText, setInputText] = useState('');
    const [resultText, setResultText] = useState('');
    const [generateBtnDisabled, setGenerateBtnDisabled] = useState(false);
    const [stopBtnDisabled, setStopBtnDisabled] = useState(true);
    const [controller, setController] = useState(null);
    const [messages, setMessages] = useState([]);
    const [systemMessage] = useState("You are a college admission counselor of Thadomal Shahani Engineering College located in Mumbai");

    const API_URL = "https://api.openai.com/v1/engines/davinci/completions";
    const API_KEY = "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"; // Your API key goes here

    useEffect(() => {
      if (controller) {
        return () => controller.abort();
      }
    }, [controller]);

    const handleInputChange = (event) => {
      setInputText(event.target.value);
    };

    const handleKeyUp = (event) => {
      if (event.key === "Enter") {
        generate();
      }
    };

    const addMessage = (role, content) => {
      setMessages((prevMessages) => [...prevMessages, { role, content }]);
    };

    const generate = async () => {
      if (!inputText) {
        alert("Please enter a prompt.");
        return;
      }

      setGenerateBtnDisabled(true);
      setStopBtnDisabled(false);
      setResultText("Generating...");

      const newController = new AbortController();
      setController(newController);

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [...messages, { role: "user", content: inputText }],
          }),
          signal: newController.signal,
        });

        if (response.ok) {
          const data = await response.json();
          const assistantReply = data.choices[0].message.content;
          addMessage('assistant', assistantReply);
          setResultText(assistantReply);
        } else {
          setResultText('Error occurred while processing your request.');
        }
      } catch (error) {
        setResultText('Error occurred while processing your request.');
        console.error('Error:', error);
      } finally {
        setGenerateBtnDisabled(false);
        setStopBtnDisabled(true);
        setController(null);
        setInputText('');
      }
    };

    const stop = () => {
      if (controller) {
        controller.abort();
        setController(null);
      }
    };

    return (
      <div className="chat-container">
        <div className="chat-box">
          <h1 className="chat-title">
          StockSense Chat Advisor
          </h1>
          <div className="chat-output">
            
            <p id="resultText" className="whitespace-pre-line">
              {resultText}
            </p>
          </div>
          <input
            type="text"
            id="promptInput"
            className="chat-input"
            placeholder="Enter prompt..."
            value={inputText}
            onChange={handleInputChange}
            onKeyUp={handleKeyUp}
          />
          <div className="flex justify-center mt-4">
            <button
              id="generateBtn"
              className={`chat-btn ${
                generateBtnDisabled ? 'disabled:opacity-75 disabled:cursor-not-allowed' : ''
              }`}
              onClick={generate}
              disabled={generateBtnDisabled}
            >
              Generate
            </button>
            <button
              id="stopBtn"
              className={`chat-btn chat-btn-light ${
                stopBtnDisabled ? 'disabled:opacity-75 disabled:cursor-not-allowed' : ''
              }`}
              onClick={stop}
              disabled={stopBtnDisabled}
            >
              Stop
            </button>
          </div>
        </div>
        {/* <div className="chat-output">
          {messages.map((message, index) => (
            <p key={index} className={`message ${message.role}`}>
              {message.content}
            </p>
          ))}
        </div> */}
      </div>
    );
  };

  export default Chat;
