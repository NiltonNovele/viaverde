"use client";

import { useState } from "react";

export default function ComingSoon() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thanks! We'll notify you at ${email}`);
    setEmail("");
  };

  return (
    <div className="w-full min-h-screen bg-white text-orange-600 flex flex-col items-center justify-center py-12 gap-12 px-4 sm:px-6 lg:px-8">
      {/* Coming soon signup */}
      <div className="max-w-xl w-full text-center animate-fadeIn px-2 sm:px-0">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-5 leading-tight">
          BookAI is Coming Soon
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed">
          Your smart assistant for booking anything — faster, easier, and
          smarter.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-full"
        >
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full sm:w-auto flex-grow px-5 py-3 rounded-lg border border-orange-300 focus:outline-none focus:ring-3 focus:ring-orange-400 text-base sm:text-lg"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition text-base sm:text-lg w-full sm:w-auto"
          >
            Notify Me
          </button>
        </form>
      </div>
      {/* Chat teaser box */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl border border-orange-300 mx-auto overflow-hidden">
        {/* Header */}
        <div className="flex items-center border-b border-orange-200 px-6 py-3 rounded-t-2xl bg-orange-50">
          <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg select-none">
            AI
          </div>
          <h2 className="ml-4 text-2xl font-semibold text-orange-700 select-none">
            Chat with BookAI
          </h2>
        </div>

        {/* Messages container */}
        <div className="p-6 flex flex-col gap-4 bg-orange-50">
          {/* AI message */}
          <div className="flex items-start gap-4 max-w-full">
            {/* AI avatar */}
            <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold select-none text-base flex-shrink-0">
              AI
            </div>
            {/* Message bubble */}
            <div className="bg-orange-200 px-4 py-3 rounded-2xl rounded-br-none shadow max-w-full sm:max-w-3xl text-base leading-normal text-orange-900 break-words">
              Hi! How can I help you today?
              <div className="text-xs text-orange-700 mt-1 text-right">
                9:43 AM
              </div>
            </div>
          </div>

          {/* User message */}
          <div className="flex items-start gap-4 justify-end max-w-full">
            {/* Message bubble */}
            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow max-w-full sm:max-w-3xl text-base leading-normal text-gray-900 break-words">
              Can you book me a dentist appointment for tomorrow in Cape Town?
              <div className="text-xs text-gray-400 mt-1 text-left">
                9:45 AM
              </div>
            </div>
            {/* User avatar */}
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-gray-600 select-none text-base flex-shrink-0">
              U
            </div>
          </div>

          {/* AI message */}
          <div className="flex items-start gap-4 max-w-full">
            {/* AI avatar */}
            <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold select-none text-base flex-shrink-0">
              AI
            </div>
            {/* Message bubble */}
            <div className="bg-orange-200 px-4 py-3 rounded-2xl rounded-br-none shadow max-w-full sm:max-w-3xl text-base leading-normal text-orange-900 break-words">
              Sure! I found an available slot tomorrow at 10 AM with Bright
              Smile Dentist in Cape Town.
              <div className="mt-3 bg-white rounded-lg border border-orange-400 p-4 text-orange-900 shadow-sm max-w-full sm:max-w-md break-words">
                <h3 className="font-semibold text-base mb-2">
                  Appointment Details
                </h3>
                <p>
                  <strong>Date:</strong> Tomorrow, May 20, 2025
                </p>
                <p>
                  <strong>Time:</strong> 10:00 AM
                </p>
                <p>
                  <strong>Location:</strong> Bright Smile Clinic, Cape Town
                </p>
                <p>
                  <strong>Dentist:</strong> Dr. Amanda Clarke
                </p>
                <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition">
                  Confirm Appointment
                </button>
              </div>
              <div className="text-xs text-orange-700 mt-1 text-right">
                9:46 AM
              </div>
            </div>
          </div>

          {/* User message */}
          <div className="flex items-start gap-4 justify-end max-w-full">
            {/* Message bubble */}
            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow max-w-full sm:max-w-3xl text-base leading-normal text-gray-900 break-words">
              That works for me. Please confirm!
              <div className="text-xs text-gray-400 mt-1 text-left">
                9:47 AM
              </div>
            </div>
            {/* User avatar */}
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-gray-600 select-none text-base flex-shrink-0">
              U
            </div>
          </div>

          {/* AI confirmation message */}
          <div className="flex items-start gap-4 max-w-full">
            {/* AI avatar */}
            <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold select-none text-base flex-shrink-0">
              AI
            </div>
            {/* Message bubble */}
            <div className="bg-orange-200 px-4 py-3 rounded-2xl rounded-br-none shadow max-w-full sm:max-w-3xl text-base leading-normal text-orange-900 break-words">
              Your appointment is confirmed! I have sent a reminder to your
              email and you will get a notification 1 hour before.
              <div className="mt-3 text-sm italic">
                Looking forward to helping you again!
              </div>
              <div className="text-xs text-orange-700 mt-2 text-right">
                9:48 AM
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-400 mt-8">
        © {new Date().getFullYear()} BookAI. All rights reserved.
      </p>
    </div>
  );
}
