"use client";

import { useRouter } from "next/navigation";
import Container from "./Container";
import {
  PhoneCall,
  CalendarCheck,
  ClipboardList,
  ArrowRight,
  ShieldCheck,
  Activity,
  ChevronRight,
  AlertTriangle
} from "lucide-react";

export const Hero = () => {
  const router = useRouter();

  const handleEmergencyCall = () => {
    if (/iPhone|Android/i.test(navigator.userAgent)) {
      window.location.href = "tel:800";
    } else {
      alert("Ligue para 800 - Linha Verde de Emergência");
    }
  };

  return (
    <section className="relative min-h-screen w-full flex items-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-50 via-white to-white py-12 lg:py-20">
      {/* Elemento Decorativo de Fundo */}
      {/* <div className="absolute top-0 right-0 -z-10 h-full w-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div> */}

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start overflow-hidden">
          
          {/* Lado Esquerdo: Conteúdo e Ações Principais */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
                <ShieldCheck size={16} />
                <span>Plataforma Digital</span>
              </div>
              
              <h1 className="text-3xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                ViaVerde <br />
                <span className="text-green-600">Pré-triagem e Encaminhamento.</span>
              </h1>
              
              <p className="mt-6 text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                O seu portal inteligente para cuidados médicos imediatos. 
                Triagem em tempo real e conexão directa com unidades de saúde.
              </p>
            </div>

            {/* Ações em Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => router.push("/ocorrencia")}
                className="group flex flex-col items-start p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-green-500 transition-all text-left"
              >
                <div className="p-3 bg-green-50 text-green-600 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-colors mb-4">
                  <Activity size={24} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Registar Ocorrência</h3>
                <p className="text-sm text-slate-500 mt-1">Triagem imediata e encaminhamento assistido.</p>
                <div className="mt-4 flex items-center text-green-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  Iniciar agora <ChevronRight size={16} />
                </div>
              </button>

              <button
                onClick={() => router.push("/consultas")}
                className="group flex flex-col items-start p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-500 transition-all text-left"
              >
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors mb-4">
                  <CalendarCheck size={24} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Marcar Consulta</h3>
                <p className="text-sm text-slate-500 mt-1">Agendamento rápido em unidades próximas.</p>
                <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  Agendar <ChevronRight size={16} />
                </div>
              </button>
            </div>

            <button
              onClick={() => router.push("/history")}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <ClipboardList className="text-slate-500" size={20} />
                <span className="font-medium text-slate-700">Aceder ao meu histórico clínico</span>
              </div>
              <ArrowRight size={18} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Lado Direito: Card de Emergência (Prioridade Alta) */}
          <div className="lg:col-span-5">
            <div className="relative p-1 rounded-[2.5rem] bg-gradient-to-b from-red-100 to-transparent">
              <div className="bg-white rounded-[2.2rem] p-8 shadow-2xl shadow-red-100 border border-red-50">
                <div className="flex items-center gap-2 text-red-600 mb-6">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                  </div>
                  <span className="font-bold uppercase tracking-widest text-xs">Urgência Crítica</span>
                </div>

                <h2 className="text-3xl font-black text-slate-900 mb-2">Linha Verde 800</h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Para casos de risco de vida, ligue imediatamente. Assistência médica 24/7 disponível em todo o país.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-red-50 rounded-2xl border border-red-100">
                    <div className="h-12 w-12 flex items-center justify-center bg-red-600 text-white rounded-full shadow-lg shadow-red-200">
                      <PhoneCall size={24} />
                    </div>
                    <div>
                      <span className="block text-2xl font-bold text-red-700">800</span>
                      <span className="text-xs font-medium text-red-500 uppercase">Chamada Gratuita</span>
                    </div>
                  </div>

                  <button
                    onClick={handleEmergencyCall}
                    className="w-full py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-red-200 transition-all active:scale-95 flex items-center justify-center gap-3"
                  >
                    Ligar Agora
                    <ArrowRight size={20} />
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-3 text-slate-500 italic text-sm">
                  <AlertTriangle size={16} className="text-amber-500" />
                  Poupe vidas. Use esta linha apenas para emergências.
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