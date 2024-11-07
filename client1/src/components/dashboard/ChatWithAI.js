import React, { useContext, useState, useEffect, useRef } from 'react';
import { ChatContext } from '../../context/ChatContext';
import '../../styles/ChatPage.css';

const ChatWithAI = () => {
  const { messages, sendMessage, clearChat, isLimitReached } = useContext(ChatContext);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isLimitReached) {
      alert("Chat limit reached. The chat will be cleared.");
      clearChat();
    }
  }, [isLimitReached, clearChat]);

  const handleSend = async () => {
    if (input.trim() && !isLimitReached && !isLoading) {
      setIsLoading(true);
      await sendMessage(input);
      setInput('');
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat with AI and get all your queries answered</h2>
        <button onClick={clearChat} className="clear-chat-btn">Clear Chat</button>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="message-content">{msg.text}</div>
          </div>
        ))}
        {isLoading && (
          <div className="message ai">
            <div className="message-content typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          disabled={isLimitReached || isLoading}
        />
        <button 
          onClick={handleSend} 
          disabled={isLimitReached || isLoading || !input.trim()}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatWithAI;