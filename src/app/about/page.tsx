"use client";

import { useState } from "react";
import {
  Activity,
  Users,
  FileText,
  ChevronDown,
  Smartphone,
  ShieldPlus,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";

const sections = [
  { id: "about", label: "Sobre" },
  { id: "mission", label: "Missão" },
  { id: "how", label: "Como Funciona" },
  { id: "emergency", label: "Sistema de Emergência" },
  { id: "docs", label: "Documentação" },
];

const ViaVerdeAboutPage = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleAccordion = (item: string) => {
    setOpenItem(openItem === item ? null : item);
  };

  return (
    <main className="w-full bg-white text-slate-800 scroll-smooth">
      {/* NAVIGATION - Mais clean e fixo abaixo do header principal se necessário */}
      {/* <nav className="sticky top-16 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 py-3">
        <ul className="flex justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-medium text-slate-500">
          {sections.map((section) => (
            <li key={section.id}>
              <a 
                href={`#${section.id}`} 
                className="hover:text-green-600 transition-colors px-2 py-1 rounded-md hover:bg-green-50"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav> */}

      {/* ABOUT - Hero Section da Página */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-4 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-left">
            <div className="inline-flex p-3 rounded-2xl bg-green-50 text-green-600">
              <Activity size={32} />
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-slate-900 leading-tight">
              ViaVerde: Acesso Mais Rápido aos Cuidados de Saúde
            </h1>
            <p className="text-slate-600 text-lg lg:text-xl leading-relaxed">
              A ViaVerde é uma plataforma digital de coordenação de saúde criada
              para reduzir tempos de espera, melhorar a resposta em emergências e
              ligar pacientes aos cuidados de forma mais rápida e eficiente.
            </p>
            <p className="text-slate-500">
              Desde hospitais lotados a chamadas urgentes — simplificamos o acesso
              à saúde quando mais importa.
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200">
            <Image
              src="/pac.jpg"
              alt="Sala de espera"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* MISSION - Destaque Visual */}
      <section id="mission" className="bg-slate-900 py-24 px-6 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <ShieldPlus className="w-16 h-16 text-green-400 mx-auto" />
          <h2 className="text-3xl lg:text-5xl font-bold">A Nossa Missão</h2>
          <p className="text-slate-300 text-xl lg:text-2xl leading-relaxed font-light">
            "Acreditamos que nenhum paciente deve sofrer devido a atrasos,
            sobrelotação ou falta de coordenação. A ViaVerde foi criada para
            priorizar urgências, orientar pacientes e ligar profissionais de
            saúde em tempo real."
          </p>
        </div>
      </section>

      {/* HOW - Grid de Funcionalidades */}
      <section id="how" className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 text-center mb-16">
          Como Funciona
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Card Pacientes */}
          <div className="p-8 lg:p-12 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-green-200 transition-all group">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-green-600 mb-8 group-hover:scale-110 transition-transform">
              <Smartphone size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Pacientes</h3>
            <ul className="space-y-4">
              {[
                "Reportar sintomas ou emergências de imediato",
                "Receber triagem automática por nível de urgência",
                "Encontrar o centro de saúde mais próximo disponível",
                "Receber atualizações por SMS ou WhatsApp"
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-600">
                  <CheckCircle2 size={20} className="text-green-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card Profissionais */}
          <div className="p-8 lg:p-12 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all group">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600 mb-8 group-hover:scale-110 transition-transform">
              <Users size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Profissionais de Saúde</h3>
            <ul className="space-y-4">
              {[
                "Gestão em tempo real do fluxo de pacientes",
                "Prioridade automática de casos urgentes",
                "Controlo de camas e recursos hospitalares",
                "Comunicação direta com pacientes"
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-600">
                  <CheckCircle2 size={20} className="text-blue-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* EMERGENCY - Layout Alternado */}
      <section id="emergency" className="bg-red-50/50 py-24 px-6 border-y border-red-100">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative aspect-video rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/iwww.jpg"
              alt="Operador"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <AlertTriangle className="w-12 h-12 text-red-500" />
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Sistema de Resposta de Emergência
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              A ViaVerde integra triagem inteligente assistida por tecnologia.
              Quando um paciente faz uma chamada ou submete uma emergência,
              o sistema avalia instantaneamente a gravidade e encaminha para a
              unidade de saúde mais próxima e disponível.
            </p>
          </div>
        </div>
      </section>

      {/* DOCS - Acordéon Minimalista */}
      <section id="docs" className="max-w-3xl mx-auto px-6 py-24">
        <div className="text-center mb-12 space-y-4">
          <FileText className="text-slate-400 w-12 h-12 mx-auto" />
          <h2 className="text-3xl font-bold text-slate-900">Documentação Legal</h2>
        </div>

        <div className="space-y-3">
          {[
            {
              title: "Política de Privacidade",
              desc: "Como os dados dos pacientes são recolhidos, armazenados e protegidos.",
            },
            {
              title: "Termos de Serviço",
              desc: "Regras de utilização da plataforma ViaVerde e do sistema de emergência.",
            },
            {
              title: "Declaração Médica",
              desc: "Limitações da triagem digital e encaminhamento de emergências.",
            },
          ].map((item) => (
            <div key={item.title} className="border border-slate-200 rounded-2xl overflow-hidden transition-all">
              <button
                onClick={() => toggleAccordion(item.title)}
                className={`w-full flex justify-between items-center py-5 px-6 transition-colors ${
                  openItem === item.title ? "bg-slate-50" : "bg-white hover:bg-slate-50"
                }`}
              >
                <span className="font-bold text-slate-700">{item.title}</span>
                <ChevronDown
                  className={`text-slate-400 transition-transform duration-300 ${
                    openItem === item.title ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div 
                className={`grid transition-all duration-300 ease-in-out ${
                  openItem === item.title ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-slate-500 leading-relaxed italic border-t border-slate-100 pt-4">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ViaVerdeAboutPage;