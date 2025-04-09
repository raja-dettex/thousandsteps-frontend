"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllTrips, Trip as AvailableTrip } from "../utils/trips";

const dateString = "2025-09-09T18:30:00+00:00";
const getReadableDateString = (dateString: string) => { 
  const date = new Date(dateString);

  // Helper to get ordinal suffix (st, nd, rd, th)
  function getOrdinal(n: number): string {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  }

  const day = date.getUTCDate();
  const month = date.toLocaleString('default', { month: 'long', timeZone: 'UTC' });
  const year = date.getUTCFullYear();

  const formatted = `${day}${getOrdinal(day)} ${month} ${year}`;
  console.log(formatted); // 👉 "9th September 2025"
  return formatted
}
type OnTrainTrip = {
  title: string;
  destination: string;
  imageUrl: string;
  route: string;
  date: string;
  price: number;
  slotsLeft: number;
};

// const onTrainTrips: OnTrainTrip[] = [
//   {
//     title: "Kolkata to Darjeeling",
//     imageUrl: "darjeeling.jpg",
//     route: "Kolkata → Siliguri → Darjeeling",
//     date: "12th April 2025",
//     price: 5499,
//     slotsLeft: 4,
//   },
//   {
//     title: "Kolkata to Sundarbans",
//     imageUrl: "sundarban.jpg",
//     route: "Kolkata → Gosaba → Sundarbans",
//     date: "18th April 2025",
//     price: 3999,
//     slotsLeft: 7,
//   },
//   {
//     title: "Howrah to Puri",
//     imageUrl: "puri.png",
//     route: "Howrah → Bhubaneswar → Puri",
//     date: "21st April 2025",
//     price: 4499,
//     slotsLeft: 3,
//   },
// ];


import axios from 'axios'
import { internal_base_url } from "../utils/users";

export default function OnTrainTripsPage()  {
    const router = useRouter();
    const [ontrainTrips, setOntrainTrips] = useState<OnTrainTrip[]>([])
    const handleRouteToBooking = async (e: any, title: string, destination: string) => { 
      const res = await axios.post(`${internal_base_url}/api/auth/set-title-cookie`, { 
        title
      })
      router.push(`/trips/booking/${destination}`)
    }
    useEffect(() => {   
        getAllTrips().then(response => { 
          console.log(response?.data)
          const availabletrips = response?.data.trips.map((trip: AvailableTrip) => {
            console.log(trip)
            return {
            title: trip.title, 
            destination: trip.destination,
            imageUrl: trip.image_url,
            route : `${trip.origin} -> ${trip.destination}`,
            date: getReadableDateString(trip.start_time),
            price: trip.discounted_price,
            slotsLeft : trip.slots_left
          }})
          setOntrainTrips(availabletrips)
        }).catch(err=> console.log(err))
    }, [] )
  return (
    <div className="bg-sky-50 min-h-screen py-12 px-6">
      <h2 className="text-4xl font-bold text-blue-900 text-center mb-10">
        🚂 OnTrain Deals – Departing Soon!
      </h2>

      <div className="space-y-10 max-w-6xl mx-auto">
        {ontrainTrips.map((trip, idx) => (
          <div
            key={idx}
            className="bg-white/90 shadow-md backdrop-blur-sm rounded-xl flex flex-col md:flex-row overflow-hidden hover:shadow-xl hover:ring-2 hover:ring-blue-400 transition"
          >
            <img
              src={trip.imageUrl}
              alt={trip.title}
              className="w-full md:w-1/2 h-64 object-cover"
            />
            <div className="p-6 flex flex-col justify-between w-full">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{trip.title}</h3>
                <p className="text-sm text-gray-600 mt-1">🛤 {trip.route}</p>
                <p className="text-sm text-gray-600">📅 Departure: {trip.date}</p>
                <p className="mt-2 text-lg text-green-700 font-semibold">₹{trip.price}</p>
                <span className="mt-1 inline-block bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {trip.slotsLeft} slots left
                </span>
              </div>
              <button onClick={e=> handleRouteToBooking(e, trip.title, trip.destination)}className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition w-full md:w-auto self-start">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
