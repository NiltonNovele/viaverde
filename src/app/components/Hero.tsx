"use client";

import Link from "next/link";
import Image from "next/image";
import {
  PhoneCall,
  Activity,
  Hospital,
  MessageCircle,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";

const slides = [
  {
    title: "Linha Verde Emergencial",
    description:
      "Em situações críticas, ligue e receba orientação imediata antes de chegar ao hospital.",
    icon: <PhoneCall size={22} />,
  },
  {
    title: "Triagem Inteligente",
    description:
      "O sistema avalia os sintomas em tempo real e determina o nível de urgência do caso.",
    icon: <Activity size={22} />,
  },
  {
    title: "Pré-notificação do Hospital",
    description:
      "A unidade sanitária é alertada antes da sua chegada para garantir atendimento prioritário.",
    icon: <Hospital size={22} />,
  },
  {
    title: "Orientação Imediata",
    description:
      "Receba instruções seguras para reduzir riscos enquanto se desloca para atendimento.",
    icon: <MessageCircle size={22} />,
  },
  {
    title: "Marcação Simplificada",
    description:
      "Para casos não urgentes, marque consultas via Web, WhatsApp ou USSD.",
    icon: <CalendarCheck size={22} />,
  },
];

export const Hero = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((p) => (p + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1));

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center py-20 overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-green-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-200 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 w-full flex flex-col-reverse md:flex-row items-center justify-between gap-16">

        {/* LEFT */}
        <div className="flex-1 text-center md:text-left px-4 md:px-8">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            <span className="text-green-600">Via</span>
            <span className="text-blue-600"> Verde</span>
            <br />
            <span className="text-gray-800">Atendimento Antes da Chegada</span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-xl mx-auto md:mx-0">
            Em emergências, cada segundo conta. A Via Verde conecta o utente à
            orientação imediata.
          </p>

          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg mb-8 max-w-xl mx-auto md:mx-0">
            <div className="flex items-center gap-3 mb-2 text-green-600 font-semibold">
              {slides[current].icon}
              {slides[current].title}
            </div>
            <p className="text-gray-600 text-sm">
              {slides[current].description}
            </p>

            <div className="flex justify-between mt-4">
              <button onClick={prevSlide} className="p-2 rounded-full">
                <ChevronLeft size={18} />
              </button>
              <button onClick={nextSlide} className="p-2 rounded-full">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <Link
            href="#"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg"
          >
            <PhoneCall size={20} />
            Registar Ocorrência
          </Link>
        </div>

        {/* RIGHT */}
        <div className="flex-1 flex justify-center md:justify-end w-full max-w-xl lg:max-w-2xl px-4 md:px-8">
          <div className="relative w-full aspect-[3/2]">
            <Image
              src="/logo.png"
              alt="Via Verde"
              fill
              className="rounded-3xl shadow-xl object-cover"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;