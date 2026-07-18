'use client';

import React, { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    // Simulate contact form submission
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-16 flex-grow space-y-8 relative">
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-teal-500/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">Contact Us</h1>
        <p className="text-zinc-550 dark:text-zinc-400">
          Have feedback or need help? Send us a message and we will respond shortly.
        </p>
      </div>

      {submitted ? (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-8 text-center space-y-4 shadow-xl">
          <span className="text-4xl">✉️</span>
          <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400">Message Sent!</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Thank you for reaching out. A support coordinator will check your message and follow up via email within 24 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-4 py-2 border border-zinc-250 dark:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm font-semibold rounded-xl transition-colors"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-8 shadow-xl space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="appearance-none block w-full px-4 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-base"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="appearance-none block w-full px-4 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-base"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you?"
                className="appearance-none block w-full px-4 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-base resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center py-3.5 px-4 border border-transparent text-base font-bold rounded-xl text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 focus:outline-none active:scale-[0.99] transition-all shadow-md"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
