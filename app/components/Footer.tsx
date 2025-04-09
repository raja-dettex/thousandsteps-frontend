"use client";
import React from "react";
import { Facebook, Instagram, Mail, Phone, Twitter } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-950 text-white py-10 mt-20 rounded-t-3xl px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-blue-200">Bhromon Tori</h2>
          <p className="text-sm text-blue-100 mt-3">
            Explore breathtaking destinations with comfort, care, and unbeatable offers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-blue-100 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-blue-200">
            <li><a href="#" className="hover:text-blue-400">Upcoming Trips</a></li>
            <li><a href="#" className="hover:text-blue-400">On Train</a></li>
            <li><a href="#" className="hover:text-blue-400">Login / Signup</a></li>
            <li><a href="#" className="hover:text-blue-400">About</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-blue-100 mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm text-blue-200">
            <li className="flex items-center gap-2"><Phone size={16} /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><Mail size={16} /> hello@bhromontori.com</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-blue-100 mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-400"><Facebook size={20} /></a>
            <a href="#" className="hover:text-blue-400"><Instagram size={20} /></a>
            <a href="#" className="hover:text-blue-400"><Twitter size={20} /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-blue-300 mt-10 border-t border-blue-800 pt-6">
        &copy; {new Date().getFullYear()} Bhromon Tori. All rights reserved.
      </div>
    </footer>
  );
};
