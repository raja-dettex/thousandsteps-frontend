"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { addTrip, getAllTrips } from "@/app/utils/trips";

type Trip = {
  id: number;
  title: string;
  origin: string;
  destination: string;
  distance_km: number;
  start_time: string;
  end_time: string | null;
  original_price: number;
  discounted_price: number;
  slots_left: number;
  status: string;
  image_url: string;
  offerings: string[]; // new field
};

type Payment = {
  id: number;
  user_id: number;
  amount: number;
  transaction_id: string;
  timestamp: string;
};

type Order = {
  id: number;
  user_id: number;
  trip_id: number;
  status: string;
  created_at: string;
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"trips" | "payments" | "orders">("trips");

  const [trips, setTrips] = useState<Trip[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    origin: "",
    destination: "",
    distance_km: "",
    start_time: "",
    end_time: "",
    original_price: "",
    discounted_price: "",
    slots_left: "",
    image_url: "",
    offering1: "",
    offering2: "",
    offering3: "",
    offering4: "",
    offering5: "",
    offering6: ""
  });

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('token')!) ?? {};
    setAccessToken(token);
  }, []);

  useEffect(() => {
    if (!accessToken) return;
    if (activeTab === "trips") fetchTrips();
    if (activeTab === "payments") fetchPayments();
    if (activeTab === "orders") fetchOrders();
  }, [activeTab, accessToken]);

  const fetchTrips = async () => {
    const res = await getAllTrips();
      if (res?.status === 200) {
        setTrips(res.data.trips);
      }
  };

  const fetchPayments = async () => {
    const res = await axios.get("/api/payments/");
    setPayments(res.data.payments);
  };

  const fetchOrders = async () => {
    const res = await axios.get("/api/orders/");
    setOrders(res.data.orders);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = JSON.parse(localStorage.getItem('token')!) ?? {};
      const offerings = [
        form.offering1,
        form.offering2,
        form.offering3,
        form.offering4,
        form.offering5,
        form.offering6
      ].filter(o => o.trim() !== ""); // remove empty offerings

      const res = await addTrip({
        ...form,
        distance_km: Number(form.distance_km),
        original_price: Number(form.original_price),
        discounted_price: Number(form.discounted_price),
        slots_left: Number(form.slots_left),
        start_time: new Date(form.start_time).toISOString(),
        end_time: form.end_time ? new Date(form.end_time).toISOString() : null,
        offerings,
      }, token);

      if (res?.status === 200) {
        setTrips([...trips, res?.data.trip]);
      }

      setForm({
        title: "",
        origin: "",
        destination: "",
        distance_km: "",
        start_time: "",
        end_time: "",
        original_price: "",
        discounted_price: "",
        slots_left: "",
        image_url: "",
        offering1: "",
        offering2: "",
        offering3: "",
        offering4: "",
        offering5: "",
        offering6: ""
      });
      fetchTrips();
    } catch (error) {
      console.error(error);
      alert("Error adding trip");
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="flex space-x-4 mb-4">
        {["trips", "payments", "orders"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab(tab as any)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Trips */}
      {activeTab === "trips" && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Add New Trip</h2>
          <form className="space-y-4" onSubmit={handleAddTrip}>
            <input type="text" name="title" placeholder="Trip Title" value={form.title} onChange={handleChange} className="border p-2 w-full" required />
            <input type="text" name="origin" placeholder="Origin" value={form.origin} onChange={handleChange} className="border p-2 w-full" required />
            <input type="text" name="destination" placeholder="Destination" value={form.destination} onChange={handleChange} className="border p-2 w-full" required />
            <input type="number" name="distance_km" placeholder="Distance (km)" value={form.distance_km} onChange={handleChange} className="border p-2 w-full" required />
            <input type="datetime-local" name="start_time" value={form.start_time} onChange={handleChange} className="border p-2 w-full" required />
            <input type="datetime-local" name="end_time" value={form.end_time} onChange={handleChange} className="border p-2 w-full" />
            <input type="number" name="original_price" placeholder="Original Price" value={form.original_price} onChange={handleChange} className="border p-2 w-full" required />
            <input type="number" name="discounted_price" placeholder="Discounted Price" value={form.discounted_price} onChange={handleChange} className="border p-2 w-full" required />
            <input type="number" name="slots_left" placeholder="Slots Left" value={form.slots_left} onChange={handleChange} className="border p-2 w-full" required />
            <input type="text" name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleChange} className="border p-2 w-full" required />

            <h3 className="font-semibold text-lg">Offerings</h3>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <input
                key={n}
                type="text"
                name={`offering${n}`}
                placeholder={`Offering ${n}`}
                value={form[`offering${n}` as keyof typeof form]}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            ))}

            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add Trip</button>
          </form>

          <h2 className="text-xl font-semibold mt-8">Existing Trips</h2>
          <ul className="divide-y">
            {trips.map((trip) => (
              <li key={trip.id} className="py-4">
                <div className="font-bold text-lg">{trip.title}</div>
                <div className="text-sm">{trip.origin} → {trip.destination} | {trip.distance_km} km</div>
                <div className="text-sm">₹{trip.discounted_price} (was ₹{trip.original_price}) | {trip.slots_left} slots left</div>
                <div className="text-xs text-gray-500">Start: {new Date(trip.start_time).toLocaleString()}</div>
                {trip.offerings && trip.offerings.length > 0 && (
                  <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                    {trip.offerings.map((offer, i) => (
                      <li key={i}>{offer}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Payments */}
      {activeTab === "payments" && (
        <ul className="divide-y">
          {payments.map((p) => (
            <li key={p.id} className="py-4">
              <div className="font-bold">Payment ID: {p.id}</div>
              <div>₹{p.amount} | TXN: {p.transaction_id}</div>
              <div className="text-xs text-gray-500">User ID: {p.user_id}</div>
            </li>
          ))}
        </ul>
      )}

      {/* Orders */}
      {activeTab === "orders" && (
        <ul className="divide-y">
          {orders.map((o) => (
            <li key={o.id} className="py-4">
              <div className="font-bold">Order ID: {o.id}</div>
              <div>Trip ID: {o.trip_id} | Status: {o.status}</div>
              <div className="text-xs text-gray-500">User ID: {o.user_id}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
