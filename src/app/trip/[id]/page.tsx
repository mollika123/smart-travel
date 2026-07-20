'use client';

import { use, useEffect, useState } from "react";
import { Trip } from "@/types/trip";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default function TripDetailsPage({ params }: Props) {

  const { id } = use(params);

  const [trip, setTrip] = useState<Trip | null>(null);


  useEffect(() => {

    const getTrip = async () => {

      try {

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/trips/${id}`
        );

        const data = await res.json();

        console.log("Trip:", data);

        if(res.ok){
          setTrip(data);
        }

      } catch(error){

        console.log(error);

      }

    };


    if(id){
      getTrip();
    }

  },[id]);



  if(!trip){
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    )
  }



  return (

    <div className="
    max-w-6xl mx-auto 
    px-5 py-10 space-y-8
    ">


      {/* Header */}

      <div className="
      bg-white border rounded-3xl p-8 shadow
      ">

        <Link 
        href="/dashboard"
        className="text-teal-600 font-bold"
        >
          ← Back
        </Link>


        <h1 className="
        text-4xl font-extrabold mt-5
        ">
          {trip.title}
        </h1>


        <p className="text-zinc-500 mt-2">
          📍 {trip.destination}
        </p>


      </div>




      {/* Info Cards */}

      <div className="
      grid md:grid-cols-3 gap-5
      ">


        <div className="p-6 border rounded-3xl bg-white">

          <p className="text-zinc-400">
            Budget
          </p>

          <h3 className="font-bold text-xl">
            💰 {trip.budget}
          </h3>

        </div>



        <div className="p-6 border rounded-3xl bg-white">

          <p className="text-zinc-400">
            Travel Style
          </p>

          <h3 className="font-bold text-xl">
            ✈️ {trip.travelStyle}
          </h3>

        </div>




        <div className="p-6 border rounded-3xl bg-white">

          <p className="text-zinc-400">
            Status
          </p>

          <h3 className="font-bold text-xl">
            {trip.status}
          </h3>

        </div>


      </div>





      {/* Itinerary */}


      <div className="
      bg-white border rounded-3xl p-8
      ">

        <h2 className="
        text-2xl font-bold mb-6
        ">
          🗓️ Trip Itinerary
        </h2>



        {
        trip.itinerary?.length ? (

          trip.itinerary.map((day)=> (

            <div 
            key={day.dayNumber}
            className="
            mb-8
            "
            >

              <h3 className="
              text-xl font-bold mb-4
              ">
                Day {day.dayNumber}
              </h3>



              {
              day.activities.map((activity,index)=>(

                <div
                key={index}
                className="
                p-5 mb-3
                bg-zinc-50
                rounded-2xl
                border
                "
                >

                  <p>
                    ⏰ {activity.time}
                  </p>


                  <h4 className="
                  font-bold text-lg
                  ">
                    {activity.title}
                  </h4>


                  <p className="text-zinc-500">
                    {activity.description}
                  </p>


                  <p className="mt-2">
                    💵 {activity.cost}
                  </p>


                </div>

              ))
              }


            </div>

          ))

        ) : (

          <p className="text-zinc-500">
            No itinerary available
          </p>

        )
        }


      </div>


    </div>

  );

}