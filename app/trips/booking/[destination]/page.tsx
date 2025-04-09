"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getTripDetailsByTitle, Trip } from "@/app/utils/trips";
import { useOrder } from "@/app/contexts/OrderContext";

export default function BookingPage() {
  const router = useRouter();
  const [title, setTitle] = useState<string | null>(null);
  const [tripDetails, setTripDetails] = useState<Trip | null>(null);
  const {state, dispatch } = useOrder()

  useEffect(() => {
    const getCookie = (name: string) => {
      const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
      return match ? decodeURIComponent(match[2]) : null;
    };

    const tripTitle = getCookie("title");
    setTitle(tripTitle);
  }, []);

  useEffect(() => {
    if (title) {
      getTripDetailsByTitle(title)
        .then((res) => setTripDetails(res?.data.trip))
        .catch((err) => console.error(err));
    }
  }, [title]);
  const handleRouteToCheckout = () => { 
    dispatch({type: 'ADD', payload: { tripTitle: tripDetails?.title ?? "", pricePerPerson: tripDetails?.discounted_price ?? 0}})
    router.push('/checkout')
  }

  return (
    <div className="bg-sky-50 min-h-screen text-gray-800">
      {/* Hero Banner */}
      <div
        className="w-full h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('${tripDetails?.image_url ?? "/puri.png"}')` }}
      >
        <div className="bg-black/50 w-full h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl text-white font-bold drop-shadow-lg text-center px-4">
            {tripDetails
              ? `${tripDetails.origin} to ${tripDetails.destination} – A Memorable Escape ✨`
              : "Loading Trip..."}
          </h1>
        </div>
      </div>

      {/* Selling Points */}
      {tripDetails && (
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">✨ Why Book This Trip?</h2>
          <ul className="grid md:grid-cols-3 gap-6 text-center text-gray-700">
            {tripDetails.offerings.map((point, index) => (
              <li
                key={index}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Trip Details & CTA */}
      {tripDetails && (
        <div className="bg-white/90 max-w-4xl mx-auto rounded-xl shadow-md p-8 mb-12">
          <h3 className="text-2xl font-bold text-blue-800 mb-4">🧭 Trip Details</h3>
          <p><strong>📍 Route:</strong> {tripDetails.origin} → {tripDetails.destination}</p>
          <p><strong>📅 Departure:</strong> {formatDate(tripDetails.start_time)}</p>
          <p>
            <strong>🎟 Price:</strong>{" "}
            <span className="line-through text-gray-500">₹{tripDetails.original_price}</span>{" "}
            <span className="text-green-600 font-bold">₹{tripDetails.discounted_price}</span>{" "}
            ({Math.floor(
              100 - (tripDetails.discounted_price / tripDetails.original_price) * 100
            )}% OFF)
          </p>
          <p><strong>🧍 Slots Left:</strong> {tripDetails.slots_left}</p>

          <button
            className="mt-6 bg-blue-600 text-white text-lg px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            onClick={() => handleRouteToCheckout()}
          >
            Book Now & Reserve Seat
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Bhromon Tori. All rights reserved.
      </footer>
    </div>
  );
}

// Helper: Format date to "21st April 2025"
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11 ? "st" :
    day % 10 === 2 && day !== 12 ? "nd" :
    day % 10 === 3 && day !== 13 ? "rd" : "th";
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day}${suffix} ${month} ${year}`;
}
