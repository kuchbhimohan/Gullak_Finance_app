// ChatContext.js
import React, { createContext, useState, useCallback, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const ChatContext = createContext();

const MAX_MESSAGES = 20; // 10 user messages + 10 AI responses
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY; // Access environment variable

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [genAI, setGenAI] = useState(null);
  const [chat, setChat] = useState(null);

  useEffect(() => {
    // Initialize Gemini AI
    const initializeAI = () => {
      if (!API_KEY) {
        console.error('Gemini API key not found in environment variables');
        return;
      }
      
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const chat = model.startChat();
      setGenAI(genAI);
      setChat(chat);
    };

    initializeAI();
  }, []);

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
    if (messages.length < MAX_MESSAGES && chat) {
      try {
        // Add user message
        const userMessage = { text, sender: 'user' };
        setMessages(prevMessages => [...prevMessages, userMessage]);

        // Get AI response
        const result = await chat.sendMessage(text);
        const response = await result.response;
        const aiResponse = response.text();

        // Add AI message
        setMessages(prevMessages => [
          ...prevMessages,
          { text: aiResponse, sender: 'ai' }
        ]);
      } catch (error) {
        console.error('Error fetching AI response:', error);
        setMessages(prevMessages => [
          ...prevMessages,
          { text: 'Sorry, I encountered an error. Please try again later.', sender: 'ai' }
        ]);
      }
    }
  }, [messages, chat]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setIsLimitReached(false);
    localStorage.removeItem('chatMessages');
    // Restart chat
    if (genAI) {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      setChat(model.startChat());
    }
  }, [genAI]);

  return (
    <ChatContext.Provider value={{ messages, sendMessage, clearChat, isLimitReached }}>
      {children}
    </ChatContext.Provider>
  );
};