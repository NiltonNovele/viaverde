"use client";

import { useState } from "react";
import { FaWhatsapp, FaPhoneAlt, FaCommentDots } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";

const WhatsAppBanner = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSend = () => {
    if (!phone.trim() || !name.trim()) return;
    const formatted = phone.replace(/\D/g, "");
    const message = encodeURIComponent(
      `Hi BookAI! I'm ${name}, and I'd like to make a booking.`
    );
    window.open(`https://wa.me/${formatted}?text=${message}`, "_blank");
  };

  return (
    <section className="relative bg-green-600 text-white rounded-2xl px-4 py-10 my-12 max-w-3xl mx-auto shadow-md overflow-hidden">
      {/* Decorative floating icons */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-6 left-8 text-white/10 blur-sm text-3xl">
          <FaWhatsapp />
        </div>
        <div className="absolute top-1/4 right-10 text-white/10 blur-sm text-2xl">
          <FaPhoneAlt />
        </div>
        <div className="absolute bottom-8 left-12 text-white/10 blur-sm text-4xl rotate-12">
          <BsChatDotsFill />
        </div>
        <div className="absolute bottom-1/4 right-1/4 text-white/10 blur-sm text-3xl -rotate-12">
          <FaCommentDots />
        </div>
        <div className="absolute top-1/2 left-1/2 text-white/10 blur-sm text-3xl -translate-x-1/2 -translate-y-1/2">
          <IoLogoWhatsapp />
        </div>
      </div>

      <div className="relative z-10 text-center space-y-6">
        <div>
          <FaWhatsapp size={40} className="mx-auto mb-1" />
          <h2 className="text-2xl font-bold">Book via WhatsApp with BookAI</h2>
          <p className="text-base text-white/90">
            Simply enter your name and phone number — we’ll open WhatsApp with a
            message ready to send. It’s fast, easy, and personalized.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-3">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full sm:w-1/3 px-4 py-2.5 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="tel"
            placeholder="e.g. +27761915804"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full sm:w-1/3 px-4 py-2.5 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            onClick={handleSend}
            className="flex items-center gap-2 bg-white text-green-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-green-50 transition"
          >
            <FaWhatsapp size={18} />
            Start Chat
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppBanner;
