/// <reference types="vite/client" />
import { useState, useRef } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isTyping?: boolean;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const sessionIdRef = useRef<string>(`session_${Date.now()}_${Math.random().toString(36).substring(7)}`);

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim() || isLoading) return;

    // Add user message
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          session_id: sessionIdRef.current,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to get response');
      }

      const data = await response.json();

      // Add assistant message with typing effect
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        isTyping: true,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Remove typing indicator after animation
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg === assistantMessage ? { ...msg, isTyping: false } : msg
          )
        );
      }, data.response.length * 20); // Typing animation duration

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    sendMessage,
    isLoading,
  };
}
