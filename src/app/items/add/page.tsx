'use client';

import TripForm, { TripFormData } from "@/components/trip/TripForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AddTripPage(){

  const { token } = useAuth();
  const router = useRouter();


  const handleAddTrip = async (data: TripFormData)=>{

    try{

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/trips`,
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
          },
          body: JSON.stringify(data)
        }
      );


      const result = await res.json();


      if(res.ok){

        router.push("/items/manage");

      }else{

        console.log(result.message);

      }


    }catch(error){

      console.log(error);

    }

  };


  return (

    <div className="max-w-3xl mx-auto py-12">

      <h1 className="text-3xl font-bold mb-8">
        Add New Trip
      </h1>


      <TripForm
        onSubmit={handleAddTrip}
      />

    </div>

  );
}