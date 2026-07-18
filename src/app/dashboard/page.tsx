'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Trip } from '@/types/trip';
import TripCard from '@/components/trip/TripCard';
import TripGenerator from '@/components/ai/TripGenerator';
import { useAuth } from '@/context/AuthContext';

function DashboardContent() {
  const { user, loading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [showGenerator, setShowGenerator] = useState(false);
  const [filter, setFilter] = useState<'all' | 'planning' | 'upcoming' | 'completed'>('all');

  // Parse destination from homepage query
  const queryDestination = searchParams.get('destination') || '';

  // Set up dummy trips on load if none exist in localStorage
  useEffect(() => {
    const storedTrips = localStorage.getItem('trips');
    if (storedTrips) {
      try {
        setTrips(JSON.parse(storedTrips));
      } catch (e) {
        console.error('Error loading stored trips:', e);
      }
    } else {
      const defaultTrips: Trip[] = [
        {
          id: 'trip_1',
          title: 'Summer Getaway in Bali',
          destination: 'Bali, Indonesia',
          startDate: '2026-08-10',
          endDate: '2026-08-17',
          budget: 'moderate',
          travelStyle: 'relaxation',
          itinerary: [
            {
              dayNumber: 1,
              activities: [
                { time: '09:00 AM', title: 'Airport Pick-up & Check-in', description: 'Arrive at Ngurah Rai Airport and drive to Ubud resort.' },
                { time: '04:00 PM', title: 'Ubud Monkey Forest Stroll', description: 'Walk through the forest sanctuary and explore sacred temples.' }
              ]
            }
          ],
          status: 'upcoming',
          createdBy: user?.id || 'guest',
          createdAt: new Date().toISOString()
        },
        {
          id: 'trip_2',
          title: 'Alpine Tour in Zermatt',
          destination: 'Zermatt, Switzerland',
          startDate: '2026-02-15',
          endDate: '2026-02-21',
          budget: 'luxury',
          travelStyle: 'adventure',
          itinerary: [],
          status: 'planning',
          createdBy: user?.id || 'guest',
          createdAt: new Date().toISOString()
        }
      ];
      setTrips(defaultTrips);
      localStorage.setItem('trips', JSON.stringify(defaultTrips));
    }
  }, [user]);

  // Open generator automatically if destination search query is present
  useEffect(() => {
    if (queryDestination) {
      setShowGenerator(true);
    }
  }, [queryDestination]);

  const handleTripGenerated = (newTrip: Trip) => {
    const updatedTrips = [newTrip, ...trips];
    setTrips(updatedTrips);
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
    setShowGenerator(false);
  };

  const filteredTrips = trips.filter(trip => {
    if (filter === 'all') return true;
    return trip.status === filter;
  });

  if (authLoading) {
    return (
      <div className="flex-grow flex items-center justify-center py-32">
        <div className="w-12 h-12 rounded-full border-4 border-teal-500/10 border-t-teal-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow space-y-12">
      {/* Header and Call to Action */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Welcome, {user ? user.name : 'Explorer'}!
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            Manage your personal travel itineraries and consult your AI guide.
          </p>
        </div>
        <button
          onClick={() => setShowGenerator(!showGenerator)}
          className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold rounded-xl shadow-md transition-all duration-200"
        >
          {showGenerator ? 'Cancel Planning' : 'Plan a New Journey 🪄'}
        </button>
      </div>

      {/* Dynamic Trip Generator */}
      {showGenerator && (
        <div className="space-y-6">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <h2 className="text-xl font-extrabold text-teal-600 dark:text-teal-400 flex items-center gap-2">
              <span>🪄</span> Generate AI Itinerary
            </h2>
            <button 
              onClick={() => setShowGenerator(false)}
              className="text-xs font-semibold text-zinc-500 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400"
            >
              Close Form
            </button>
          </div>
          <TripGenerator onTripGenerated={handleTripGenerated} />
        </div>
      )}

      {/* Filters and List */}
      {!showGenerator && (
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            {(['all', 'planning', 'upcoming', 'completed'] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                className={`px-4 py-2 text-sm font-bold capitalize rounded-xl transition-colors border ${
                  filter === opt
                    ? 'bg-teal-500/10 text-teal-600 border-teal-500/20 dark:text-teal-400 dark:bg-teal-950/20'
                    : 'bg-white dark:bg-zinc-900 border-zinc-200/50 dark:border-zinc-800 text-zinc-500 hover:text-zinc-850 dark:text-zinc-400 dark:hover:text-zinc-250'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {filteredTrips.length === 0 ? (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-16 text-center space-y-4 max-w-lg mx-auto">
              <span className="text-4xl block">🏝️</span>
              <h3 className="font-extrabold text-lg text-zinc-800 dark:text-zinc-250">No trips found</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-450 leading-relaxed">
                You do not have any trips under the <span className="font-semibold text-teal-600">&quot;{filter}&quot;</span> category yet. Generate one now using the AI travel assistant!
              </p>
              <button
                onClick={() => setShowGenerator(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-teal-500/30 bg-teal-500/5 hover:bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold text-sm rounded-xl transition-all"
              >
                Create your first trip 🪄
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="flex-grow flex items-center justify-center py-32">
        <div className="w-12 h-12 rounded-full border-4 border-teal-500/10 border-t-teal-600 animate-spin" />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
