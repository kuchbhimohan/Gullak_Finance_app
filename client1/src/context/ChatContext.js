import React, { createContext, useState, useCallback, useEffect } from 'react';

export const ChatContext = createContext();

const MAX_MESSAGES = 20; // 10 user messages + 10 AI responses
const API_URL = 'http://localhost:5000/api/chat'; // Update this with your actual backend URL

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isLimitReached, setIsLimitReached] = useState(false);

  useEffect(() => {
    // Load messages from localStorage on initial render
    const storedMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    setMessages(storedMessages);
  }, []);

  useEffect(() => {
    // Save messages to localStorage whenever they change
    localStorage.setItem('chatMessages', JSON.stringify(messages));

    // Check if limit is reached
    if (messages.length >= MAX_MESSAGES) {
      setIsLimitReached(true);
    }
  }, [messages]);

  const sendMessage = useCallback(async (text) => {
    if (messages.length < MAX_MESSAGES) {
      setMessages(prevMessages => [
        ...prevMessages,
        { text, sender: 'user' }
      ]);
      
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add any authentication headers here if needed
          },
          body: JSON.stringify({ message: text }),
        });
        const data = await response.json();
        
        setMessages(prevMessages => [
          ...prevMessages,
          { text: data.aiResponse, sender: 'ai' }
        ]);
      } catch (error) {
        console.error('Error fetching AI response:', error);
        // Handle error (e.g., show an error message to the user)
      }
    }
  }, [messages]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setIsLimitReached(false);
    localStorage.removeItem('chatMessages');
  }, []);

  return (
    <ChatContext.Provider value={{ messages, sendMessage, clearChat, isLimitReached }}>
      {children}
    </ChatContext.Provider>
);
};