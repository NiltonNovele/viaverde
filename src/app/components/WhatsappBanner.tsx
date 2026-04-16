"use client";

import { useState } from "react";
import {
  Smartphone,
  Hospital,
  Hash,
  MessageSquareText,
  Signal,
  ShieldCheck,
  Clock3,
  ArrowRight,
  Phone,
} from "lucide-react";
import USSDSimulator from "./USSDSimulator";

const USSDBanner = () => {
  const [isUSSDOpen, setIsUSSDOpen] = useState(false);

  return (
    <section className="relative mx-auto my-12 max-w-6xl overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-white via-green-50/40 to-blue-50/50 px-5 py-10 shadow-[0_20px_60px_rgba(16,24,40,0.08)] sm:px-8 md:px-10 md:py-14">
      {/* Background accents */}
      <div className="pointer-events-none absolute -left-16 top-0 h-40 w-40 rounded-full bg-green-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-blue-200/30 blur-3xl" />

      {/* Header */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-2xl bg-green-100 p-4 text-green-600 shadow-sm ring-1 ring-green-200">
            <Smartphone size={28} />
          </div>
        </div>

        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-green-700">
          <Signal size={14} />
          Sem internet
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Marcação de Consultas via USSD
        </h2>

        <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
          Com o código <strong>*808#</strong>, os utilizadores podem marcar
          consultas, acompanhar a fila e aceder ao histórico de forma rápida,
          simples e acessível em qualquer telemóvel.
        </p>
      </div>

      {/* Key highlights */}
      <div className="relative z-10 mt-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-green-700">
            <ShieldCheck size={18} />
            <span className="text-sm font-semibold">Acessível</span>
          </div>
          <p className="text-sm text-slate-600">
            Funciona em telemóveis simples, sem app e sem dados móveis.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-blue-700">
            <Clock3 size={18} />
            <span className="text-sm font-semibold">Rápido</span>
          </div>
          <p className="text-sm text-slate-600">
            O fluxo de atendimento é curto, guiado e fácil de concluir.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-purple-700">
            <MessageSquareText size={18} />
            <span className="text-sm font-semibold">Acompanhamento</span>
          </div>
          <p className="text-sm text-slate-600">
            Atualizações importantes podem ser enviadas por SMS ao utilizador.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="relative z-10 mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 md:text-xl">
            Como funciona
          </h3>
          <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 md:inline-block">
            Fluxo simples em 3 passos
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <Smartphone size={20} />
              </div>
              <span className="text-sm font-bold text-slate-300">01</span>
            </div>

            <h4 className="font-semibold text-slate-800">Aceda ao USSD</h4>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Marque <strong>*808#</strong> no telemóvel e escolha a opção que
              pretende, como marcação de consulta ou histórico.
            </p>
          </div>

          <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <Hospital size={20} />
              </div>
              <span className="text-sm font-bold text-slate-300">02</span>
            </div>

            <h4 className="font-semibold text-slate-800">Escolha a unidade</h4>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              O sistema ajuda a selecionar a unidade ou hospital mais adequado
              com base no tipo de consulta ou necessidade.
            </p>
          </div>

          <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                <Hash size={20} />
              </div>
              <span className="text-sm font-bold text-slate-300">03</span>
            </div>

            <h4 className="font-semibold text-slate-800">Receba o ticket</h4>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Após a confirmação, o utilizador recebe um número de referência
              para acompanhar a consulta ou a fila.
            </p>
          </div>
        </div>
      </div>

      {/* SMS info */}
      <div className="relative z-10 mt-8 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <MessageSquareText size={22} />
          </div>

          <div className="flex-1">
            <h4 className="font-semibold text-slate-900">
              Atualizações por SMS
            </h4>
            <p className="mt-2 text-sm leading-6 text-slate-600 md:text-base">
              O número de fila e outras atualizações relevantes podem ser
              enviados automaticamente por SMS, permitindo que o utilizador
              acompanhe o atendimento sem permanecer continuamente na unidade.
            </p>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="relative z-10 mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
        <button
          onClick={() => setIsUSSDOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-8 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-green-700"
        >
          Simular USSD
          <ArrowRight size={16} />
        </button>

        <a
          href="tel:*808#"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
        >
          Discar *808#
          <Phone size={16} />
        </a>
      </div>

      <USSDSimulator isOpen={isUSSDOpen} onClose={() => setIsUSSDOpen(false)} />
    </section>
  );
};

export default USSDBanner;