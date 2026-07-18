'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Message } from '@/types/trip';

interface ChatBoxProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isAiTyping?: boolean;
  placeholderText?: string;
}

export default function ChatBox({
  messages,
  onSendMessage,
  isAiTyping = false,
  placeholderText = "Ask me anything about your trip, restaurants, packing lists, or local customs..."
}: ChatBoxProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput('');
  };

  return (
    <div className="flex flex-col h-[500px] sm:h-[600px] bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-900/60 flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-teal-500/10 dark:bg-teal-400/10 flex items-center justify-center text-xl">
          🤖
        </div>
        <div>
          <h4 className="font-bold text-zinc-900 dark:text-zinc-100">AI Travel Assistant</h4>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Online & Ready to Guide
          </p>
        </div>
      </div>

      {/* Messages Window */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-zinc-50/30 dark:bg-zinc-950/10">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-3">
            <span className="text-4xl">✈️</span>
            <h5 className="font-bold text-zinc-800 dark:text-zinc-200">Start the conversation!</h5>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed">
              Ask about packing recommendations, restaurant reservations, route distances, or custom changes to your itinerary.
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold shadow-sm flex-shrink-0 ${
                  isUser 
                    ? 'bg-gradient-to-tr from-teal-500 to-emerald-500 text-white' 
                    : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                }`}>
                  {isUser ? 'U' : 'AI'}
                </div>
                
                {/* Bubble */}
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  isUser
                    ? 'bg-teal-600 text-white rounded-tr-none'
                    : 'bg-white dark:bg-zinc-800/80 text-zinc-850 dark:text-zinc-100 border border-zinc-200/50 dark:border-zinc-850 rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className={`block text-[10px] mt-2 text-right ${isUser ? 'text-teal-200' : 'text-zinc-400'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            );
          })
        )}

        {/* AI Typing Indicator */}
        {isAiTyping && (
          <div className="flex gap-3 mr-auto max-w-[80%]">
            <div className="w-8 h-8 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 flex items-center justify-center text-sm font-bold shadow-sm">
              AI
            </div>
            <div className="bg-white dark:bg-zinc-800/85 border border-zinc-200/50 dark:border-zinc-850 p-4 rounded-2xl rounded-tl-none flex items-center gap-1 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-4 border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isAiTyping}
          placeholder={placeholderText}
          className="flex-grow px-4 py-3.5 bg-zinc-55/40 dark:bg-zinc-950/30 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-sm text-zinc-850 dark:text-zinc-150 placeholder-zinc-450 dark:placeholder-zinc-500 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 disabled:opacity-60 transition-all"
        />
        <button
          type="submit"
          disabled={isAiTyping || !input.trim()}
          className="px-5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 disabled:from-teal-700 disabled:to-emerald-700 text-white font-bold rounded-2xl active:scale-95 shadow-md disabled:opacity-50 transition-all flex items-center justify-center"
        >
          <svg className="w-5 h-5 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  );
}
