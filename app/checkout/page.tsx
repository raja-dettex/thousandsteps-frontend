"use client";
import React, { useEffect, useState } from "react";
import { useOrder } from "../contexts/OrderContext";

export default function CheckoutPage() {
  const { state, dispatch } = useOrder()
  console.log(state)
  const [totalPrice, setTotalPrice] = useState(state.pricePerPerson);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    passengers: 1,
  });
  useEffect(()=> { 
    setTotalPrice(form.passengers * state.pricePerPerson)
  }, [form])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Booking Confirmed! You’ll receive confirmation shortly.");
  };

  return (
    <div className="bg-blue-50 min-h-screen py-12 px-4 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">🧾 Checkout</h1>

        {/* Trip Summary */}
        <div className="mb-6 border-b pb-4">
          <h2 className="text-xl font-semibold text-gray-800">Trip to Puri</h2>
          <p className="text-sm text-gray-600">From Howrah | Departure: 21st April 2025</p>
          <p className="text-lg font-bold text-green-600 mt-2">₹4499 <span className="line-through text-sm text-gray-400 ml-2">₹8999</span></p>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold">Full Name</label>
            <input
              type="text"
              name="fullName"
              required
              value={form.fullName}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block font-semibold">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block font-semibold">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block font-semibold">No. of Passengers</label>
            <input
              type="number"
              name="passengers"
              min={1}
              value={form.passengers}
              onChange={handleChange}
              className="w-32 mt-1 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* CTA */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
          >
            Confirm & Pay ₹{form.passengers * state.pricePerPerson}
          </button>
        </form>

        {/* Info */}
        <p className="text-xs text-gray-500 mt-6">
          🔒 Your details are safe & secure. You will receive a confirmation mail and SMS after booking.
        </p>
      </div>
    </div>
  );
};
