"use client"
import React, {useState, useEffect} from "react";
import { getAllTrips, Trip as AvailableTrip } from "../utils/trips";
import { useRouter } from "next/navigation";
import axios from "axios";
import { internal_base_url } from "../utils/users";
type Trip = {
  title: string;
  origin: string;
  destination: string;
  imageUrl: string;
  originalPrice: number;
  discountedPrice: number;
  slotsLeft: number;
};

const trips: Trip[] = [
  {
    title: "Trip to Puri",
    origin: "Bhubaneswar",
    destination: "Puri",
    imageUrl: "puri.png",
    originalPrice: 8999,
    discountedPrice: 4499,
    slotsLeft: 5,
  },
  {
    title: "Trip to Darjeeling",
    origin: "Siliguri",
    destination: "Darjeeling",
    imageUrl: "darjeeling.jpg",
    originalPrice: 10999,
    discountedPrice: 5499,
    slotsLeft: 3,
  },
  {
    title: "Trip to Sundarbans",
    origin: "Kolkata",
    destination: "Sundarbans",
    imageUrl: "https://media.istockphoto.com/id/1137892510/photo/narrow-creeks-with-river-stream-flowing-into-deep-mangrove-jungle-consisting-of-mainly.jpg?s=612x612&w=0&k=20&c=U9ZLD01pt1ErYGUym1X9bQpG6Zsh1N2bKa5J17fufok=",
    originalPrice: 7999,
    discountedPrice: 3999,
    slotsLeft: 8,
  },
];

export const AvailableTripsGrid: React.FC = () => {
  const router = useRouter()
  const [availableTrips, setAvailableTrips] = useState<Trip[]>([]);
  const [token, setToken] = useState<string>("")
  const [signedIn, setSignedIn] = useState(false);
  const handleRouteToBooking = async (e: any, title: string, destination: string) => { 
    const res = await axios.post(`${internal_base_url}/api/auth/set-title-cookie`, { 
      title
    })
    router.push(`/trips/booking/${destination}`)
  }
  useEffect(() => {
    const {token } = JSON.parse(localStorage.getItem("token")!) ?? {}
    setToken(token)
    setSignedIn(true)
  }, [])
  useEffect(() => {   
    getAllTrips().then(response => { 
      console.log(response?.data)
      const availabletrips = response?.data.trips.map((trip: AvailableTrip) => {
        console.log(trip)
        return {
        title: trip.title, 
        origin: trip.origin,
        destination: trip.destination,
        imageUrl: trip.image_url,
        originalPrice: trip.original_price,
        discountedPrice: trip.discounted_price,
        slotsLeft : trip.slots_left
      }})
      setAvailableTrips(availabletrips)
    }).catch(err=> console.log(err))
  }, [signedIn])
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {availableTrips && availableTrips.map((trip, index) => {
        const discountPercent = Math.round(
          ((trip.originalPrice - trip.discountedPrice) / trip.originalPrice) * 100
        );

        return (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition h-100"
          >
            <img
              src={trip.imageUrl}
              alt={trip.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{trip.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {trip.origin} → {trip.destination}
              </p>

              <div className="flex items-center space-x-2 mt-2">
                <span className="text-gray-500 line-through">
                  ₹{trip.originalPrice}
                </span>
                <span className="text-green-600 font-bold">
                  ₹{trip.discountedPrice}
                </span>
                <span className="bg-yellow-300 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
                  {discountPercent}% OFF
                </span>
              </div>

              <p className="text-sm text-red-600 mt-1">
                🎟 {trip.slotsLeft} slots left – hurry!
              </p>

              <button
              onClick={e=> handleRouteToBooking(e, trip.title, trip.destination)} 
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition">
                Book Now
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
