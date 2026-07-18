'use client';

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Trip, DayPlan } from '@/types/trip';

interface TripPageProps {
  params: Promise<{ id: string }>;
}

export default function TripDetailsPage({ params }: TripPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedTrips = localStorage.getItem('trips');
    if (storedTrips) {
      try {
        const tripsList: Trip[] = JSON.parse(storedTrips);
        const currentTrip = tripsList.find((t) => t.id === id);
        if (currentTrip) {
          setTrip(currentTrip);
        }
      } catch (e) {
        console.error('Error loading trip details:', e);
      }
    }
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex-grow flex items-center justify-center py-32">
        <div className="w-12 h-12 rounded-full border-4 border-teal-500/10 border-t-teal-600 animate-spin" />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center space-y-6">
        <span className="text-4xl block">🔍</span>
        <h2 className="text-2xl font-extrabold">Trip Not Found</h2>
        <p className="text-zinc-500 dark:text-zinc-400">
          The requested trip details could not be found. It may have been deleted or the link is invalid.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-200 dark:bg-zinc-800 text-sm font-bold rounded-xl hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const activeDayPlan: DayPlan | undefined = trip.itinerary?.[activeDayIdx];

  const travelStyleLabels = {
    adventure: '🧗‍♂️ Adventure',
    relaxation: '🌴 Relaxation',
    culture: '🏛️ Culture',
    family: '👨‍👩‍👧‍👦 Family',
    romantic: '💖 Romantic',
    nature: '🌲 Nature'
  };

  const budgetLabels = {
    budget: '💵 Budget',
    moderate: '💵💵 Moderate',
    luxury: '💵💵💵 Luxury'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow space-y-10 relative">
      <div className="absolute top-10 right-10 w-72 h-72 bg-teal-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Back button and title header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-zinc-200/60 dark:border-zinc-800/60 pb-8">
        <div className="space-y-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {trip.title || `Adventure in ${trip.destination}`}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">📍 {trip.destination}</span>
              <span className="text-zinc-355 dark:text-zinc-600">•</span>
              <span className="text-zinc-500 dark:text-zinc-400">📅 {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
              <span className="text-zinc-355 dark:text-zinc-600">•</span>
              <span className="font-semibold text-teal-600 dark:text-teal-400">{travelStyleLabels[trip.travelStyle]}</span>
              <span className="text-zinc-355 dark:text-zinc-600">•</span>
              <span className="font-semibold text-zinc-600 dark:text-zinc-400">{budgetLabels[trip.budget]}</span>
            </div>
          </div>
        </div>

        {/* Action button: Chat with AI */}
        <Link
          href={`/chat?tripId=${trip.id}`}
          className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold rounded-xl shadow-md transition-all active:scale-95"
        >
          💬 Ask AI Travel Assistant
        </Link>
      </div>

      {/* Main Grid: Days Selector and Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Day selection left sidebar */}
        <div className="lg:col-span-3 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
            Day Schedule
          </h3>
          {trip.itinerary?.length === 0 ? (
            <div className="p-4 border border-zinc-200/50 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 text-sm text-zinc-500">
              No itinerary generated yet.
            </div>
          ) : (
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-2 lg:pb-0">
              {trip.itinerary.map((day, idx) => {
                const isActive = activeDayIdx === idx;
                return (
                  <button
                    key={day.dayNumber}
                    onClick={() => setActiveDayIdx(idx)}
                    className={`flex-shrink-0 flex items-center justify-between px-4 py-3.5 rounded-xl font-bold text-sm text-left transition-colors w-32 lg:w-full border ${
                      isActive
                        ? 'bg-teal-500/10 text-teal-600 border-teal-500/20 dark:text-teal-400 dark:bg-teal-950/20'
                        : 'bg-white dark:bg-zinc-900 border-zinc-200/60 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    <span>Day {day.dayNumber}</span>
                    <span className="hidden lg:inline text-xs text-zinc-400 font-medium">
                      {day.activities.length} {day.activities.length === 1 ? 'Activity' : 'Activities'}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Timeline Activities Column */}
        <div className="lg:col-span-9 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="mb-8 pb-4 border-b border-zinc-150 dark:border-zinc-800">
            <h2 className="text-xl font-extrabold">
              Day {activeDayPlan?.dayNumber || 1} Schedule
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Follow this timeline or ask the AI assistant to swap and re-schedule activities.
            </p>
          </div>

          {!activeDayPlan || activeDayPlan.activities.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <span className="text-3xl">☕</span>
              <h4 className="font-bold text-zinc-700 dark:text-zinc-300">Nothing planned yet</h4>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto leading-relaxed">
                Click on the &quot;Ask AI Travel Assistant&quot; button to generate custom recommendations for this day.
              </p>
            </div>
          ) : (
            <div className="relative pl-3.5 border-l-2 border-teal-600/30 ml-3.5 space-y-8 py-2">
              {activeDayPlan.activities.map((act, index) => (
                <div key={index} className="relative pl-6 group">
                  {/* Timeline Dot */}
                  <div className="absolute left-[-23px] top-1.5 w-3 h-3 rounded-full bg-teal-600 group-hover:scale-125 ring-4 ring-teal-500/20 dark:ring-zinc-900 transition-all duration-200" />
                  
                  {/* Timeline Box */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="space-y-1">
                      <span className="inline-flex items-center text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full">
                        ⏱️ {act.time}
                      </span>
                      <h4 className="text-lg font-bold pt-1">{act.title}</h4>
                      <p className="text-sm text-zinc-500 dark:text-zinc-450 leading-relaxed max-w-2xl">
                        {act.description}
                      </p>
                      {act.location && (
                        <p className="text-xs text-zinc-400 flex items-center gap-1 font-medium mt-2">
                          <span>📍 {act.location}</span>
                        </p>
                      )}
                    </div>

                    {/* Cost Badge */}
                    {act.cost && (
                      <span className="flex-shrink-0 text-xs font-bold px-3 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 self-start">
                        {act.cost}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
