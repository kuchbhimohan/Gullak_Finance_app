import React, { useContext, useState, useEffect } from 'react';
import { ChatContext } from '../../context/ChatContext';
import '../../styles/ChatPage.css';

const ChatWithAI = () => {
  const { messages, sendMessage, clearChat, isLimitReached } = useContext(ChatContext);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (isLimitReached) {
      alert("Chat limit reached. The chat will be cleared.");
      clearChat();
    }
  }, [isLimitReached, clearChat]);

  const handleSend = async () => {
    if (input.trim() && !isLimitReached) {
      await sendMessage(input);
      setInput('');
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
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          disabled={isLimitReached}
        />
        <button onClick={handleSend} disabled={isLimitReached}>Send</button>
      </div>
    </div>
  );
};

export default ChatWithAI;
