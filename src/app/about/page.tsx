"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionItem,
} from "@radix-ui/react-accordion";
import {
  Activity,
  Users,
  PhoneCall,
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

      {/* NAVEGAÇÃO */}
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

      {/* SOBRE */}
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
            para reduzir tempos de espera, melhorar a resposta em emergências e
            ligar pacientes aos cuidados de forma mais rápida e eficiente.  
            Desde hospitais lotados a chamadas urgentes — simplificamos o acesso
            à saúde quando mais importa.
          </p>

          {/* IMAGEM 1: Sala de espera cheia */}
          <div className="relative w-full h-[420px] rounded-xl overflow-hidden shadow-lg mt-8">
            <Image
              src="/pac.jpg"
              alt="Doentes numa sala de espera hospitalar cheia"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </motion.div>
      </section>

      {/* MISSÃO */}
      <section id="mission" className="bg-green-50 py-20 px-6">
        <motion.div
          className="max-w-5xl mx-auto text-center space-y-6"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <ShieldPlus className="w-12 h-12 text-green-600 mx-auto" />

          <h2 className="text-4xl font-bold text-green-700">
            A Nossa Missão
          </h2>

          <p className="text-gray-700 text-lg">
            Acreditamos que nenhum paciente deve sofrer devido a atrasos,
            sobrelotação ou falta de coordenação. A ViaVerde foi criada para
            priorizar urgências, orientar pacientes e ligar profissionais de
            saúde em tempo real.
          </p>
        </motion.div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="how" className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-4xl font-bold text-green-700 text-center mb-12">
            Como Funciona
          </h2>

          <div className="grid md:grid-cols-2 gap-12">

            {/* PACIENTES */}
            <div>
              <h3 className="flex items-center gap-2 text-2xl text-green-600 font-semibold">
                <Smartphone /> Pacientes
              </h3>

              <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700">
                <li>Reportar sintomas ou emergências de imediato</li>
                <li>Receber triagem automática por nível de urgência</li>
                <li>Encontrar o centro de saúde mais próximo disponível</li>
                <li>Receber atualizações por SMS ou WhatsApp</li>
              </ul>
            </div>

            {/* PROFISSIONAIS DE SAÚDE */}
            <div>
              <h3 className="flex items-center gap-2 text-2xl text-green-600 font-semibold">
                <Users /> Profissionais de Saúde
              </h3>

              <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700">
                <li>Gestão em tempo real do fluxo de pacientes</li>
                <li>Prioridade automática de casos urgentes</li>
                <li>Controlo de camas e recursos hospitalares</li>
                <li>Comunicação direta com pacientes</li>
              </ul>
            </div>

          </div>
        </motion.div>
      </section>

      {/* SISTEMA DE EMERGÊNCIA */}
      <section id="emergency" className="bg-green-50 py-20 px-6">
        <motion.div
          className="max-w-6xl mx-auto text-center space-y-8"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />

          <h2 className="text-4xl font-bold text-green-700">
            Sistema de Resposta de Emergência
          </h2>

          <p className="text-gray-700 max-w-3xl mx-auto">
            A ViaVerde integra triagem inteligente assistida por tecnologia.
            Quando um paciente faz uma chamada ou submete uma emergência,
            o sistema avalia instantaneamente a gravidade e encaminha para a
            unidade de saúde mais próxima e disponível.
          </p>

          {/* IMAGEM 2: Chamada de emergência */}
          <div className="relative w-full h-[380px] rounded-xl overflow-hidden shadow-lg mt-8">
            <Image
              src="/iwww.jpg"
              alt="Operador de linha de emergência a atender chamada"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </motion.div>
      </section>

      {/* DOCUMENTAÇÃO */}
      <section id="docs" className="max-w-4xl mx-auto px-6 py-20">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          <FileText className="text-green-600 w-10 h-10 mx-auto" />

          <h2 className="text-4xl font-bold text-green-700 text-center">
            Documentação Legal
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                title: "Política de Privacidade",
                desc: "Como os dados dos pacientes são recolhidos, armazenados e protegidos.",
                file: "/docs/privacy-policy.pdf",
              },
              {
                title: "Termos de Serviço",
                desc: "Regras de utilização da plataforma ViaVerde e do sistema de emergência.",
                file: "/docs/terms-of-service.pdf",
              },
              {
                title: "Declaração Médica",
                desc: "Limitações da triagem digital e encaminhamento de emergências.",
                file: "/docs/medical-disclaimer.pdf",
              },
            ].map(({ title, desc, file }, i) => (
              <AccordionItem key={i} value={title}>
                <button
                  onClick={() => toggleAccordion(title)}
                  className="w-full flex justify-between items-center py-4 px-5 bg-green-100 rounded-lg shadow"
                >
                  <span className="font-semibold text-green-800">{title}</span>
                  <ChevronDown
                    className={`transition-transform ${
                      openItem === title ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openItem === title && (
                  <div className="bg-white px-5 py-4 border border-green-200 rounded-b-xl shadow-sm">
                    <p className="text-sm text-gray-700 mb-2">{desc}</p>
                    <a
                      href={file}
                      target="_blank"
                      className="text-green-600 underline text-sm font-medium"
                    >
                      Descarregar PDF
                    </a>
                  </div>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </section>
    </main>
  );
};

export default ViaVerdeAboutPage;