"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Activity,
  QrCode,
  Hospital,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";

const slides = [
  {
    title: "SaúdeFila+",
    description:
      "Marque consultas, faça triagem de sintomas e reduza filas nos hospitais — tudo online ou via WhatsApp.",
    icon: <CalendarCheck size={22} />,
  },
  {
    title: "Marcação Inteligente",
    description:
      "Agende consultas rapidamente e receba horários estimados sem precisar enfrentar filas físicas.",
    icon: <CalendarCheck size={22} />,
  },
  {
    title: "Triagem Digital",
    description:
      "Responda a perguntas simples e o sistema classifica automaticamente a prioridade do atendimento.",
    icon: <Activity size={22} />,
  },
  {
    title: "Check-in com QR Code",
    description:
      "Evite filas no hospital com check-in rápido usando QR Code no momento da chegada.",
    icon: <QrCode size={22} />,
  },
  {
    title: "Encaminhamento Inteligente",
    description:
      "O sistema sugere automaticamente a unidade sanitária mais adequada para o seu caso.",
    icon: <Hospital size={22} />,
  },
];

export const Hero = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center py-20 overflow-hidden">
      
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-green-200 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 w-full flex flex-col-reverse md:flex-row items-center justify-between gap-16">
        
        {/* LEFT CONTENT */}
        <motion.div
          className="flex-1 text-center md:text-left px-4 md:px-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            <span className="text-blue-600">Saúde</span>
            <span className="text-green-500">Fila+</span>
            <br />
            <span className="text-gray-800">
              Menos Filas, Mais Saúde
            </span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-xl mx-auto md:mx-0">
            Plataforma inteligente que permite marcar consultas, fazer triagem
            de sintomas e reduzir o tempo de espera nos hospitais.
          </p>

          {/* Carousel */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg mb-8 max-w-xl mx-auto md:mx-0 relative">
            
            <div className="flex items-center gap-3 mb-2 text-blue-600 font-semibold">
              {slides[current].icon}
              {slides[current].title}
            </div>

            <p className="text-gray-600 text-sm">
              {slides[current].description}
            </p>

            {/* Controls */}
            <div className="flex justify-between mt-4">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center md:justify-start">
            <Link
              href="#"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-3 rounded-full text-base font-medium shadow-lg hover:opacity-90 transition"
            >
              <CalendarCheck size={20} />
              Marcar Consulta
            </Link>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className="flex-1 flex justify-center md:justify-end w-full max-w-xl lg:max-w-2xl px-4 md:px-8"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="relative w-full aspect-[3/2] min-h-[220px] md:min-h-0">
            <Image
              src="/logo.png" // 👈 Replace with your image
              alt="SaúdeFila+ Plataforma"
              fill
              className="rounded-3xl shadow-xl object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;