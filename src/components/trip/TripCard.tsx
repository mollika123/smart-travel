'use client';

import React from 'react';
import Link from 'next/link';
import { Trip } from '@/types/trip';

interface TripCardProps {
  trip: Trip;
  onDelete?: (id: string) => void;
}

export default function TripCard({ trip, onDelete }: TripCardProps) {

  const startDateObj = new Date(trip.startDate);
  const endDateObj = new Date(trip.endDate);

  const diffDays =
    Math.ceil(
      Math.abs(endDateObj.getTime() - startDateObj.getTime()) /
      (1000 * 60 * 60 * 24)
    ) + 1;


  const statusColors = {
    planning:
      'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',

    upcoming:
      'bg-teal-500/10 text-teal-600 border-teal-500/20',

    completed:
      'bg-zinc-500/10 text-zinc-600 border-zinc-500/20',
  };


  const styleIcons:any = {
    adventure:'🧗',
    relaxation:'🌴',
    culture:'🏛️',
    family:'👨‍👩‍👧',
    romantic:'💖',
    nature:'🌲'
  };


  return (
    <div
      className="
      group relative overflow-hidden
      bg-white dark:bg-zinc-900
      border border-zinc-200 dark:border-zinc-800
      rounded-3xl p-6
      shadow-sm
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all duration-300
      "
    >

      {/* Gradient top */}
      <div className="
      absolute top-0 left-0 right-0 h-1
      bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500
      " />


      {/* Header */}

      <div className="flex justify-between">

        <div>

          <span
          className={`
          text-xs px-3 py-1 rounded-full border font-bold
          ${statusColors[trip.status]}
          `}
          >
            {trip.status}
          </span>


          <h3 className="
          text-xl font-extrabold mt-4
          group-hover:text-teal-600
          transition
          ">
            {trip.title}
          </h3>


          <p className="text-sm text-zinc-500 mt-2">
            📍 {trip.destination}
          </p>

        </div>


        <div className="
        w-14 h-14 rounded-2xl
        bg-teal-500/10
        flex items-center justify-center
        text-3xl
        ">
          {styleIcons[trip.travelStyle] || '✈️'}
        </div>

      </div>



      {/* Details */}

      <div className="
      mt-6 space-y-3
      bg-zinc-50 dark:bg-zinc-800/50
      rounded-2xl p-4
      ">


        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">
            Duration
          </span>

          <b>
            {diffDays} Days
          </b>

        </div>


        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">
            Budget
          </span>

          <b>
            {trip.budget}
          </b>

        </div>


        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">
            Activities
          </span>

          <b>
            {trip.itinerary?.length || 0}
          </b>

        </div>


      </div>




      {/* Actions */}

      <div className="
      mt-6 flex gap-3
      ">


        <Link
        href={`/trip/${trip._id || trip.id}`}
        className="
        flex-1 text-center
        py-2.5 rounded-xl
        bg-teal-600 text-white
        font-bold text-sm
        hover:bg-teal-500
        "
        >
          View
        </Link>



     



        <button
        onClick={() =>
          onDelete?.(trip._id || trip.id || '')
        }
        className="
        px-4 py-2.5
        rounded-xl
        bg-red-500/10
        text-red-500
        font-bold
        text-sm
        "
        >
          Delete
        </button>


      </div>


    </div>
  );
}