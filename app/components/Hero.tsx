"use client"
import React from "react";
import Countdown from "react-countdown";

export const DealOfTheWeek: React.FC = () => {
  const originalPrice = 9999;
  const discountedPrice = 4999;
  const discountPercent = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);

  return (
    <div
    style={{ backgroundImage: "url('/kashmir.png')" }} 
    className="min-h-[600px] bg-cover bg-centerbg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center">
      <h2 className="text-2xl font-bold mt-30">🔥 Deal of the Week</h2>
      <p className="text-lg mt-2">Exclusive Trip to Kashmir</p>
      {/* <img
        src="kashmir.png"
        alt="Trip to Kashmir"
        className="w-full h-56 object-cover rounded-lg mt-4 shadow-md"
      /> */}
      <div className="mt-4 text-lg">
        <span className="line-through opacity-75">₹{originalPrice}</span>
        <span className="font-bold text-yellow-300 ml-2">₹{discountedPrice}</span>
        <span className="bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-1 rounded-full ml-2">
          {discountPercent}% OFF
        </span>
      </div>
      <p className="text-sm mt-2">Limited-time offer ends in:</p>
      <Countdown date={Date.now() + 1000 * 60 * 60 * 24} className="text-xl font-bold mt-1" />
      <button className="mt-4 bg-white text-purple-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
        Book Now
      </button>
    </div>
  );
};

