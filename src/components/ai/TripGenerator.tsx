'use client';

import React, { useState, useEffect } from 'react';
import TripForm, { TripFormData } from '@/components/trip/TripForm';

interface TripGeneratorProps {
  onTripGenerated: (tripData: any) => void;
}

export default function TripGenerator({ onTripGenerated }: TripGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    'Consulting local databases...',
    'Curating cultural landmarks and activities...',
    'Optimizing transit routes and driving times...',
    'Sorting budget allocations & entry fees...',
    'Refining details with our AI travel guides...',
    'Finalizing your premium itinerary...'
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
      }, 2500);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading, loadingMessages.length]);

  const handleFormSubmit = async (formData: TripFormData) => {
    setLoading(true);

    try {
      // For now, mock a backend API request that would call Gemini
      await new Promise((resolve) => setTimeout(resolve, 8000));
      
      const mockGeneratedItinerary = Array.from({ length: 3 }).map((_, idx) => ({
        dayNumber: idx + 1,
        activities: [
          {
            time: '09:00 AM',
            title: `Morning Exploration in ${formData.destination}`,
            description: `Visit the central historic landmarks of ${formData.destination} to learn about the heritage.`,
            cost: 'Free'
          },
          {
            time: '01:00 PM',
            title: 'Local Delicacies Lunch',
            description: `Try traditional dishes at a top-rated local market or family-run cafe recommended by food experts.`,
            cost: '$15 - $30'
          },
          {
            time: '04:00 PM',
            title: 'Afternoon Scenic Walk',
            description: 'Stroll through picturesque parks or scenic paths. Perfect for photography and relaxing.',
            cost: 'Free'
          }
        ]
      }));

      const newTrip = {
        id: Math.random().toString(36).substring(2, 9),
        title: `Adventure in ${formData.destination}`,
        destination: formData.destination,
        startDate: formData.startDate,
        endDate: formData.endDate,
        budget: formData.budget,
        travelStyle: formData.travelStyle,
        itinerary: mockGeneratedItinerary,
        status: 'upcoming' as const,
        createdBy: 'user_1',
        createdAt: new Date().toISOString()
      };

      onTripGenerated(newTrip);
    } catch (err) {
      console.error('Error generating trip:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {loading ? (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-12 text-center shadow-xl space-y-8 flex flex-col items-center justify-center">
          {/* Animated Spinner with secondary rings */}
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-4 border-teal-500/10" />
            <div className="absolute inset-0 rounded-full border-4 border-t-teal-600 border-r-emerald-500 animate-spin" />
            <span className="absolute inset-0 flex items-center justify-center text-3xl">
              ✈️
            </span>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 animate-pulse">
              Generating Your Custom Itinerary
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium text-sm transition-opacity duration-500">
              {loadingMessages[loadingStep]}
            </p>
          </div>

          {/* Progress bar simulation */}
          <div className="w-full max-w-xs bg-zinc-150 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}
            />
          </div>
        </div>
      ) : (
        <TripForm onSubmit={handleFormSubmit} isLoading={loading} />
      )}
    </div>
  );
}
