"use client";
import React from "react";
import { CheckCircle } from "lucide-react";

const features = [
  {
    title: "Expertly Curated Trips",
    description: "Every journey is handpicked with local insight and unforgettable experiences.",
  },
  {
    title: "Unmatched Discounts",
    description: "You’ll find real deals here — no gimmicks, just fair pricing with exclusive offers.",
  },
  {
    title: "24/7 Personalized Support",
    description: "Talk to real humans who genuinely care — anytime, anywhere.",
  },
];

export const WhyChooseBhromonTori: React.FC = () => {
  return (
    <section className="mt-16 bg-blue-50 px-6 py-12 rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
        Why Choose <span className="text-blue-600">Bhromon Tori</span>?
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-start bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <CheckCircle className="text-green-500 mb-3" size={28} />
            <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
