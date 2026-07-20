'use client';

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import TripForm, { TripFormData } from "@/components/trip/TripForm";


export default function EditTripPage() {

  const { id } = useParams();
  const router = useRouter();

  const { token } = useAuth();

  const [trip, setTrip] = useState<TripFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);



  // Get single trip
  useEffect(() => {

    const fetchTrip = async () => {

      try {

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/trips/${id}`,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );


        const data = await res.json();

        setTrip({
          destination: data.destination,
          startDate: data.startDate,
          endDate: data.endDate,
          budget: data.budget,
          travelStyle: data.travelStyle
        });


      } catch(error){

        console.log("Fetch trip error:", error);

      } finally {

        setLoading(false);

      }

    };


    if(id && token){
      fetchTrip();
    }


  },[id, token]);





  // Update trip
  const handleUpdate = async(data: TripFormData)=>{

    try{

      setUpdating(true);


      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/trips/${id}`,
        {
          method:"PUT",
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
          },
          body:JSON.stringify(data)
        }
      );


      if(res.ok){

        router.push("/dashboard");

      }


    }catch(error){

      console.log("Update error:",error);

    }finally{

      setUpdating(false);

    }

  };





  if(loading){

    return (
      <div className="py-20 text-center">
        Loading trip...
      </div>
    );

  }



  if(!trip){

    return (
      <div className="py-20 text-center">
        Trip not found
      </div>
    );

  }



  return (

    <div className="max-w-4xl mx-auto px-4 py-12">

      <h1 className="text-3xl font-bold mb-8">
        Edit Your Trip ✈️
      </h1>


      <TripForm

        initialData={trip}

        onSubmit={handleUpdate}

        isLoading={updating}

        buttonText="Update Trip"

      />


    </div>

  );

}