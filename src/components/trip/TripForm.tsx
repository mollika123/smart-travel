'use client';

import React, { useState } from 'react';

export interface TripFormData {
  destination: string;
  startDate: string;
  endDate: string;
  budget: 'budget' | 'moderate' | 'luxury';
  travelStyle: 'adventure' | 'relaxation' | 'culture' | 'family' | 'romantic' | 'nature';
}

interface TripFormProps {
  initialDestination?: string;
  onSubmit: (data: TripFormData) => void;
  isLoading?: boolean;
}

export default function TripForm({ initialDestination = '', onSubmit, isLoading = false }: TripFormProps) {
  const [destination, setDestination] = useState(initialDestination);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState<'budget' | 'moderate' | 'luxury'>('moderate');
  const [travelStyle, setTravelStyle] = useState<'adventure' | 'relaxation' | 'culture' | 'family' | 'romantic' | 'nature'>('relaxation');

  const budgetOptions: { value: 'budget' | 'moderate' | 'luxury'; label: string; desc: string; icon: string }[] = [
    { value: 'budget', label: 'Budget', desc: 'Backpacker style, cost-saving focus', icon: '💵' },
    { value: 'moderate', label: 'Moderate', desc: 'Balanced comfort & experience', icon: '💵💵' },
    { value: 'luxury', label: 'Luxury', desc: 'Premium lodgings & VIP guides', icon: '💵💵💵' },
  ];

  const styleOptions: { value: TripFormData['travelStyle']; label: string; icon: string }[] = [
    { value: 'relaxation', label: 'Relaxation', icon: '🌴' },
    { value: 'adventure', label: 'Adventure', icon: '🧗‍♂️' },
    { value: 'culture', label: 'Culture', icon: '🏛️' },
    { value: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
    { value: 'romantic', label: 'Romantic', icon: '💖' },
    { value: 'nature', label: 'Nature', icon: '🌲' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim() || !startDate || !endDate) return;
    
    onSubmit({
      destination: destination.trim(),
      startDate,
      endDate,
      budget,
      travelStyle,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl">
      {/* Destination Input */}
      <div className="space-y-2">
        <label htmlFor="destination" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
          Where do you want to go?
        </label>
        <div className="relative rounded-xl border border-zinc-200 dark:border-zinc-800 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 transition-all">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-xl">
            📍
          </span>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
            placeholder="e.g. Kyoto, Japan; Rome, Italy..."
            className="block w-full pl-11 pr-4 py-3.5 bg-transparent border-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none text-base"
          />
        </div>
      </div>

      {/* Date Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="startDate" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="block w-full px-4 py-3.5 bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all text-base"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="endDate" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            min={startDate}
            className="block w-full px-4 py-3.5 bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all text-base"
          />
        </div>
      </div>

      {/* Budget Choices */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
          Select your Budget Level
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {budgetOptions.map((opt) => {
            const isSelected = budget === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setBudget(opt.value)}
                className={`flex flex-col items-start p-4 border rounded-2xl text-left transition-all ${
                  isSelected
                    ? 'border-teal-500 bg-teal-500/5 ring-2 ring-teal-500/20 dark:bg-teal-950/20'
                    : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                }`}
              >
                <span className="text-2xl mb-2">{opt.icon}</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{opt.label}</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-normal">{opt.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Travel Style Choices */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
          Travel Style
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {styleOptions.map((opt) => {
            const isSelected = travelStyle === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setTravelStyle(opt.value)}
                className={`flex flex-col items-center justify-center p-4 border rounded-2xl transition-all gap-2 ${
                  isSelected
                    ? 'border-teal-500 bg-teal-500/5 ring-2 ring-teal-500/20 dark:bg-teal-950/20'
                    : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                }`}
              >
                <span className="text-3xl">{opt.icon}</span>
                <span className="text-xs font-bold text-zinc-850 dark:text-zinc-200">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 disabled:from-teal-700 disabled:to-emerald-700 disabled:opacity-60 text-white font-bold text-base rounded-2xl shadow-md active:scale-[0.99] transition-all"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Generating AI Itinerary...
          </>
        ) : (
          <>
            🪄 Generate Custom Trip Itinerary
          </>
        )}
      </button>
    </form>
  );
}
