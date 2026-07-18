import React from 'react';
import Link from 'next/link';
import { Trip } from '@/types/trip';

interface TripCardProps {
  trip: Trip;
}

export default function TripCard({ trip }: TripCardProps) {
  const startDateObj = new Date(trip.startDate);
  const endDateObj = new Date(trip.endDate);
  
  // Calculate total days
  const diffTime = Math.abs(endDateObj.getTime() - startDateObj.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  // Format dates
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const statusColors = {
    planning: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
    upcoming: 'bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/20',
    completed: 'bg-zinc-500/10 text-zinc-700 dark:text-zinc-400 border-zinc-500/20'
  };

  const budgetLabels = {
    budget: '💵 Budget',
    moderate: '💵💵 Moderate',
    luxury: '💵💵💵 Luxury'
  };

  const styleIcons = {
    adventure: '🧗‍♂️',
    relaxation: '🌴',
    culture: '🏛️',
    family: '👨‍👩‍👧‍👦',
    romantic: '💖',
    nature: '🌲'
  };

  return (
    <div className="group bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex justify-between items-start gap-4">
          <div>
            <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${statusColors[trip.status]}`}>
              {trip.status}
            </span>
            <h3 className="text-xl font-bold mt-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              {trip.title || `Trip to ${trip.destination}`}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1.5">
              <span>📍 {trip.destination}</span>
            </p>
          </div>
          <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
            {styleIcons[trip.travelStyle] || '✈️'}
          </div>
        </div>

        {/* Date and details */}
        <div className="mt-6 space-y-2 border-t border-b border-zinc-100 dark:border-zinc-800 py-4">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Duration:</span>
            <span className="font-semibold">{diffDays} {diffDays === 1 ? 'Day' : 'Days'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Dates:</span>
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Budget:</span>
            <span className="font-semibold">{budgetLabels[trip.budget]}</span>
          </div>
        </div>
      </div>

      {/* Footer view link */}
      <div className="mt-6 flex items-center justify-between">
        <span className="text-xs text-zinc-400 font-medium">
          {trip.itinerary?.length || 0} Scheduled Days
        </span>
        <Link 
          href={`/trip/${trip.id}`} 
          className="inline-flex items-center gap-1 text-sm font-bold text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-350 transition-colors"
        >
          View Details
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
