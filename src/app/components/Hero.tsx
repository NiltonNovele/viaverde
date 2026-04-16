"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Container from "./Container";
import {
  PhoneCall,
  Activity,
  Hospital,
  MessageCircle,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  ClipboardList,
  ArrowRight,
  ShieldCheck,
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
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((p) => (p + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1));

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleEmergencyCall = () => {
    if (
      navigator.userAgent.indexOf("iPhone") > -1 ||
      navigator.userAgent.indexOf("Android") > -1
    ) {
      window.location.href = "tel:800";
    } else {
      alert("Ligue para 800 - Linha Verde de Emergência");
    }
  };

  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50 py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-green-200 opacity-30 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-blue-200 opacity-20 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col-reverse items-center justify-between gap-16 md:flex-row">
          <div className="flex-1 text-center md:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/80 px-4 py-2 text-sm font-semibold text-green-700 shadow-sm backdrop-blur-sm">
              <ShieldCheck size={16} />
              Plataforma de Triagem e Encaminhamento
            </div>

            <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-6xl">
              <span className="text-green-600">Via</span>{" "}
              <span className="text-blue-600">Verde</span>
              <br />
              <span className="text-gray-800">Saúde inteligente, mais rápida e humana</span>
            </h1>

            <p className="mb-8 max-w-2xl text-lg text-gray-600 md:text-xl">
              Registe ocorrências, receba orientação imediata, marque consultas e
              acompanhe o histórico clínico num único ponto de acesso.
            </p>

            <div className="mb-8 max-w-2xl rounded-3xl border border-white/60 bg-white/75 p-6 shadow-xl backdrop-blur-md">
              <div className="mb-3 flex items-center gap-3 text-green-600">
                <div className="rounded-xl bg-green-50 p-2">{slides[current].icon}</div>
                <div>
                  <p className="font-semibold">{slides[current].title}</p>
                  <p className="text-sm text-gray-600">{slides[current].description}</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div className="flex gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrent(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        current === index ? "w-8 bg-green-600" : "w-2.5 bg-gray-300"
                      }`}
                      aria-label={`Ir para slide ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={prevSlide}
                    className="rounded-full border border-gray-200 bg-white p-2 text-gray-700 transition hover:bg-gray-50"
                    aria-label="Slide anterior"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="rounded-full border border-gray-200 bg-white p-2 text-gray-700 transition hover:bg-gray-50"
                    aria-label="Próximo slide"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid max-w-2xl gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <button
                onClick={() => router.push("#")}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-6 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-xl"
              >
                <PhoneCall size={20} />
                Registar Ocorrência
              </button>

              <button
                onClick={() => router.push("/consultas")}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-blue-600 px-6 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
              >
                <CalendarCheck size={20} />
                Marcar Consulta
              </button>

              <button
                onClick={() => router.push("/history")}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-base font-semibold text-slate-800 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-xl sm:col-span-2 xl:col-span-1"
              >
                <ClipboardList size={20} />
                Ver Histórico
              </button>
            </div>

            <div className="mt-8 max-w-2xl rounded-3xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-red-100 p-5 shadow-lg">
              <div className="mb-3 flex items-start gap-3">
                <div className="rounded-2xl bg-red-600 p-2 text-white">
                  <AlertCircle size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-700">Emergência Médica</h3>
                  <p className="text-sm text-red-700">
                    Em situação crítica, contacte imediatamente a Linha Verde.
                  </p>
                </div>
              </div>

              <div className="mb-4 flex items-end justify-between rounded-2xl bg-white/80 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">Linha Verde</p>
                  <p className="text-3xl font-black tracking-wide text-red-600">800</p>
                </div>
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-700">
                  24h
                </span>
              </div>

              <button
                onClick={handleEmergencyCall}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 py-4 font-bold text-white transition-colors duration-200 hover:bg-red-700"
              >
                <PhoneCall size={20} />
                Ligar para 800
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="flex w-full max-w-xl flex-1 justify-center md:max-w-2xl md:justify-end">
            <div className="relative w-full aspect-[3/2] overflow-hidden rounded-[2rem] border border-white/60 bg-white/50 shadow-2xl backdrop-blur-sm">
              <Image
                src="/logo.png"
                alt="Via Verde"
                fill
                className="object-cover"
                priority
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-md">
                  <p className="text-sm font-medium text-white/90">
                    Atendimento mais rápido, melhor encaminhamento e acesso facilitado
                    ao cuidado de saúde.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;