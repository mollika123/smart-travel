'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Trip } from '@/types/trip';

export default function ManageTripsPage() {

  const { token, loading } = useAuth();

  const [trips, setTrips] = useState<Trip[]>([]);
  const [loadingTrips, setLoadingTrips] = useState(true);


  // Fetch trips
  useEffect(() => {

    const fetchTrips = async () => {

      try {

        if (!token) return;


        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/trips`,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );


        const data = await res.json();


        if(res.ok){
          setTrips(data);
        }


      } catch(error){

        console.log(error);

      } finally{

        setLoadingTrips(false);

      }

    };


    fetchTrips();


  },[token]);





  // Delete trip
  const handleDelete = async(id:string)=>{


    try{

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/trips/${id}`,
        {
          method:"DELETE",
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      if(res.ok){

        setTrips(prev =>
          prev.filter(
            trip => (trip._id || trip.id) !== id
          )
        );

      }


    }catch(error){

      console.log(error);

    }


  };



  if(loading || loadingTrips){

    return (
      <div className="flex justify-center py-20">
        Loading trips...
      </div>
    )

  }




  return (

    <div className="max-w-7xl mx-auto px-4 py-12">


      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-extrabold">
            Manage Trips
          </h1>

          <p className="text-zinc-500 mt-2">
            View and manage your travel plans
          </p>
        </div>


        <Link
          href="/items/add"
          className="px-5 py-3 rounded-xl bg-teal-600 text-white font-bold"
        >
          + Add Trip
        </Link>

      </div>





      {trips.length === 0 ? (

        <div className="text-center py-20">
          <h2 className="text-xl font-bold">
            No trips found
          </h2>
        </div>

      ) : (


        <div className="overflow-x-auto bg-white dark:bg-zinc-900 rounded-3xl border">


          <table className="w-full">


            <thead className="border-b">

              <tr className="text-left">

                <th className="p-5">
                  Destination
                </th>

                <th>
                  Budget
                </th>

                <th>
                  Status
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>



            <tbody>


            {trips.map((trip)=>(


              <tr
              key={trip._id || trip.id}
              className="border-b"
              >


                <td className="p-5 font-bold">

                  {trip.destination}

                </td>


                <td>

                  {trip.budget}

                </td>


                <td>

                  {trip.status}

                </td>



                <td className="flex gap-3 py-4">


                  <Link
                  href={`/trip/${trip._id || trip.id}`}
                  className="px-4 py-2 rounded-lg bg-teal-600 text-white text-sm"
                  >
                    View
                  </Link>



                  <button
                  onClick={() =>
                    handleDelete(trip._id || trip.id || '')
                  }
                  className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 text-sm"
                  >
                    Delete
                  </button>


                </td>


              </tr>


            ))}


            </tbody>


          </table>


        </div>


      )}



    </div>

  );

}