import React from 'react';
import { ChatProvider } from '../context/ChatContext';
import ChatWithAI from '../components/dashboard/ChatWithAI';
import '../styles/ChatPage.css';

const ChatPage = () => {
  return (
    <ChatProvider>
      <div className="chat-page">
        <h1>Chat with AI</h1>
        <ChatWithAI />
      </div>
    </ChatProvider>
  );
};

export default ChatPage;