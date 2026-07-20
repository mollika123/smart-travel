'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Trip } from '@/types/trip';
import TripCard from '@/components/trip/TripCard';
import TripGenerator from '@/components/ai/TripGenerator';
import { useAuth } from '@/context/AuthContext';

function DashboardContent() {
  const { user, token, loading: authLoading } = useAuth();

  const searchParams = useSearchParams();

  const [trips, setTrips] = useState<Trip[]>([]);
  const [showGenerator, setShowGenerator] = useState(false);
  const [filter, setFilter] = useState<
    'all' | 'planning' | 'upcoming' | 'completed'
  >('all');

  const queryDestination = searchParams.get('destination') || '';


  // Load user trips from backend
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        if (!token) return;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/trips`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setTrips(data);
        } else {
          console.log(data.message);
        }

      } catch (error) {
        console.log('Fetch trips error:', error);
      }
    };


    fetchTrips();

  }, [token]);



  // Open generator if destination comes from homepage
  useEffect(() => {
    if (queryDestination) {
       setShowGenerator(true);
    }
  }, [queryDestination]);



  // After AI generates trip
  const handleTripGenerated = (newTrip: Trip) => {
    setTrips((prev) => [newTrip, ...prev]);
    setShowGenerator(false);
  };

const handleDelete = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/trips/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.log(data.message);
      return;
    }

    setTrips((prev) =>
      prev.filter((trip) => (trip._id || trip.id) !== id)
    );

  } catch (error) {
    console.log("Delete error:", error);
  }
};

  const filteredTrips = trips.filter((trip) => {

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


      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b">

        <div>

          <h1 className="text-3xl font-extrabold">
            Welcome, {user?.name || 'Explorer'}!
          </h1>


          <p className="text-zinc-500 mt-1">
            Manage your personal travel itineraries.
          </p>

        </div>



        <button
          onClick={() => setShowGenerator(!showGenerator)}
          className="px-5 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-xl"
        >

          {showGenerator
            ? 'Cancel Planning'
            : 'Plan a New Journey 🪄'}

        </button>


      </div>




      {/* AI Generator */}

      {showGenerator && (

        <div>

          <TripGenerator
            onTripGenerated={handleTripGenerated}
          />

        </div>

      )}






      {!showGenerator && (

        <div className="space-y-8">



          {/* Filter */}

          <div className="flex gap-3 flex-wrap">


            {(
              [
                'all',
                'planning',
                'upcoming',
                'completed',
              ] as const

            ).map((item) => (


              <button

                key={item}

                onClick={() => setFilter(item)}

                className={`px-4 py-2 rounded-xl border capitalize ${
                  filter === item
                    ? 'bg-teal-500/10 text-teal-600'
                    : ''
                }`}

              >

                {item}

              </button>


            ))}


          </div>





          {/* Trips */}


          {filteredTrips.length === 0 ? (


            <div className="text-center p-10">

              <h3 className="font-bold text-xl">
                No trips found
              </h3>


              <p className="text-zinc-500">
                Create your first AI trip
              </p>


            </div>



          ) : (


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">


              {filteredTrips.map((trip) => (


                <TripCard
                  key={trip._id || trip.id}
                  trip={trip}
                  onDelete={handleDelete}
                />


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

    <Suspense
      fallback={
        <div className="flex justify-center py-20">
          Loading...
        </div>
      }
    >

      <DashboardContent />

    </Suspense>

  );

}