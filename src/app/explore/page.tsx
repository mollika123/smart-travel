'use client';

import React, { useEffect, useState } from 'react';
import { Trip } from '@/types/trip';
import Link from 'next/link';
import Image from 'next/image';

export default function ExplorePage() {

  const [trips, setTrips] = useState<Trip[]>([]);
  const [search, setSearch] = useState('');
  const [style, setStyle] = useState('all');
  const [sort, setSort] = useState('');


  // Load trips
  useEffect(() => {

    const fetchTrips = async () => {

      try {

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/trips`
        );

        const data = await res.json();

        console.log(data);

        setTrips(Array.isArray(data) ? data : data.trips || []);

      } catch(error) {

        console.log(error);

      }

    };


    fetchTrips();

  }, []);



  const filteredTrips = trips
    .filter((trip)=>{

      const matchSearch =
        trip.destination
        .toLowerCase()
        .includes(search.toLowerCase());


      const matchStyle =
        style === "all"
        ? true
        : trip.travelStyle === style;


      return matchSearch && matchStyle;

    })


    .sort((a,b)=>{

      if(sort === "newest"){

        return new Date(b.createdAt).getTime()
        -
        new Date(a.createdAt).getTime();

      }


      if(sort === "oldest"){

        return new Date(a.createdAt).getTime()
        -
        new Date(b.createdAt).getTime();

      }


      return 0;

    });



  return (

    <div className="
    max-w-7xl mx-auto px-4 py-12 space-y-10
    ">


      <div className="text-center">

        <h1 className="text-4xl font-extrabold">
          Explore Trips
        </h1>

        <p className="text-zinc-500 mt-2">
          Discover AI generated travel plans
        </p>

      </div>




      {/* Filter Section */}

      <div className="
      grid grid-cols-1 md:grid-cols-3 gap-4
      ">


        <input
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        placeholder="Search destination..."
        className="
        border rounded-xl p-3
        "
        />



        <select
        value={style}
        onChange={(e)=>setStyle(e.target.value)}
        className="
        border rounded-xl p-3
        "
        >

          <option value="all">
            All Style
          </option>

          <option value="adventure">
            Adventure
          </option>

          <option value="relaxation">
            Relaxation
          </option>

          <option value="culture">
            Culture
          </option>

          <option value="family">
            Family
          </option>

          <option value="romantic">
            Romantic
          </option>

          <option value="nature">
            Nature
          </option>


        </select>




        <select
        value={sort}
        onChange={(e)=>setSort(e.target.value)}
        className="
        border rounded-xl p-3
        "
        >

          <option value="">
            Sort
          </option>

          <option value="newest">
            Newest
          </option>

          <option value="oldest">
            Oldest
          </option>


        </select>


      </div>





      {/* Cards */}

      {
        filteredTrips.length === 0 ?

        (

          <div className="text-center py-20">

            <h2 className="text-xl font-bold">
              No trips found
            </h2>

          </div>

        )

        :

        (

        <div className="
        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6
        ">


        {
          filteredTrips.map((trip)=>(


            <div
            key={trip._id || trip.id}
            className="
            bg-white dark:bg-zinc-900
            border rounded-3xl p-5
            shadow-sm
            "
            >


            <div className="h-40 rounded-2xl overflow-hidden bg-teal-100">

  {trip.imageUrl ? (
    <Image
      src={trip.imageUrl}
      alt={trip.destination}
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="h-full flex items-center justify-center text-5xl">
      ✈️
    </div>
  )}

</div>



              <h3 className="
              text-xl font-bold mt-4
              ">
                {trip.title}
              </h3>


              <p className="
              text-zinc-500 mt-2
              ">
                📍 {trip.destination}
              </p>


              <p className="
              text-sm mt-2
              ">
                Budget: {trip.budget}
              </p>


              <Link
              href={`/trip/${trip._id}`}
              className="
              block text-center mt-5
              bg-teal-600 text-white
              py-2 rounded-xl
              font-bold
              "
              >

                View Details

              </Link>


            </div>


          ))
        }


        </div>

        )

      }



    </div>

  );

}