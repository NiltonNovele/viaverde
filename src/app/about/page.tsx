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
} from "lucide-react";
import { motion } from "framer-motion";
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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const toggleAccordion = (item: string) => {
    setOpenItem(openItem === item ? null : item);
  };

  return (
    <main className="w-full bg-white text-gray-800">

      {/* NAVIGATION */}
      <nav className="w-full bg-white/90 backdrop-blur border-b border-green-100 shadow-sm py-4">
        <ul className="flex justify-center gap-6 text-sm sm:text-base font-semibold text-green-700">
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="hover:underline">
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ABOUT */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-20 text-center space-y-8">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <Activity className="w-12 h-12 text-green-600 mx-auto" />

          <h1 className="text-5xl font-bold text-green-700">
            ViaVerde: Acesso Mais Rápido aos Cuidados de Saúde
          </h1>

          <p className="text-gray-700 max-w-3xl mx-auto text-lg">
            A ViaVerde é uma plataforma digital de coordenação de saúde criada
            para reduzir tempos de espera e melhorar a resposta em emergências.
          </p>

          <div className="relative w-full h-[420px] rounded-xl overflow-hidden shadow-lg mt-8">
            <Image
              src="/pac.jpg"
              alt="Sala de espera hospitalar"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </motion.div>
      </section>

      {/* MISSION */}
      <section id="mission" className="bg-green-50 py-20 px-6">
        <motion.div
          className="max-w-5xl mx-auto text-center space-y-6"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <ShieldPlus className="w-12 h-12 text-green-600 mx-auto" />

          <h2 className="text-4xl font-bold text-green-700">
            A Nossa Missão
          </h2>

          <p className="text-gray-700 text-lg">
            Nenhum paciente deve sofrer devido a atrasos ou sobrelotação.
            A ViaVerde prioriza urgências e liga pacientes a cuidados reais.
          </p>
        </motion.div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-green-700 text-center mb-12">
            Como Funciona
          </h2>

          <div className="grid md:grid-cols-2 gap-12">

            <div>
              <h3 className="flex items-center gap-2 text-2xl text-green-600 font-semibold">
                <Smartphone /> Pacientes
              </h3>
              <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700">
                <li>Reportar sintomas</li>
                <li>Triagem automática</li>
                <li>Encaminhamento rápido</li>
              </ul>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-2xl text-green-600 font-semibold">
                <Users /> Profissionais
              </h3>
              <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700">
                <li>Gestão de pacientes</li>
                <li>Prioridade automática</li>
                <li>Coordenação em tempo real</li>
              </ul>
            </div>

          </div>
        </motion.div>
      </section>

      {/* EMERGENCY */}
      <section id="emergency" className="bg-green-50 py-20 px-6">
        <motion.div
          className="max-w-6xl mx-auto text-center space-y-8"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />

          <h2 className="text-4xl font-bold text-green-700">
            Sistema de Emergência
          </h2>

          <p className="text-gray-700 max-w-3xl mx-auto">
            Triagem inteligente e encaminhamento automático para hospitais.
          </p>

          <div className="relative w-full h-[380px] rounded-xl overflow-hidden shadow-lg mt-8">
            <Image
              src="/iwww.jpg"
              alt="Emergência"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </motion.div>
      </section>

      {/* DOCUMENTS */}
      <section id="docs" className="max-w-4xl mx-auto px-6 py-20">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          className="space-y-10"
        >
          <FileText className="text-green-600 w-10 h-10 mx-auto" />

          <h2 className="text-4xl font-bold text-green-700 text-center">
            Documentação
          </h2>

          <div className="space-y-4">

            {[
              {
                title: "Política de Privacidade",
                desc: "Como os dados são protegidos.",
              },
              {
                title: "Termos de Serviço",
                desc: "Regras de utilização.",
              },
              {
                title: "Declaração Médica",
                desc: "Limitações do sistema.",
              },
            ].map((item) => (
              <div key={item.title} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleAccordion(item.title)}
                  className="w-full flex justify-between items-center p-4 bg-green-100"
                >
                  <span className="font-semibold">{item.title}</span>
                  <ChevronDown
                    className={`transition-transform ${
                      openItem === item.title ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openItem === item.title && (
                  <div className="p-4 bg-white">
                    <p className="text-sm text-gray-700">{item.desc}</p>
                  </div>
                )}
              </div>
            ))}

          </div>
        </motion.div>
      </section>

    </main>
  );
};

export default ViaVerdeAboutPage;