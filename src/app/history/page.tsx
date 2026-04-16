"use client";

import React, { useState } from "react";
import {
  User,
  Users,
  Lock,
  FileText,
  ClipboardList,
  Pill,
  Stethoscope,
  LogOut,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

type Step = "login" | "otp" | "history";

const MOCK_OTP = "2026";

// Mova a variável para fora do componente para manter o código limpo
const occurrences = [
  {
    id: "VV-10021",
    owner: "self",
    title: "Dor torácica aguda",
    status: "Resolvido",
    hospital: "Hospital Central de Maputo",
    date: "2026-03-18",
    doctor: "Dr. Paulo Nhantumbo",
    comments: "Paciente apresentou dor torácica intensa. ECG e exames normais. Sem sinais de enfarte.",
    prescription: "Paracetamol 500mg (SOS)",
    followUp: "Evitar esforço físico intenso por 7 dias",
  },
  {
    id: "VV-10022",
    owner: "self",
    title: "Febre alta persistente",
    status: "Concluído",
    hospital: "Hospital Geral de Mavalane",
    date: "2026-02-11",
    doctor: "Dra. Elisa Mucavele",
    comments: "Quadro febril associado a infeção bacteriana leve.",
    prescription: "Amoxicilina 500mg por 7 dias",
    followUp: "Retorno em caso de persistência dos sintomas",
  },
  {
    id: "VV-10023",
    owner: "other",
    title: "Acidente rodoviário",
    status: "Crítico (atendido)",
    hospital: "Hospital José Macamo",
    date: "2026-01-05",
    doctor: "Dr. Carlos Manjate",
    comments: "Paciente com trauma moderado. Estabilizado e sem risco de vida.",
    prescription: "Ibuprofeno + repouso absoluto",
    followUp: "Fisioterapia após 2 semanas",
  },
  {
    id: "VV-10024",
    owner: "other",
    title: "Dificuldade respiratória",
    status: "Resolvido",
    hospital: "Hospital Central de Maputo",
    date: "2025-12-20",
    doctor: "Dra. Teresa Zimba",
    comments: "Crise asmática leve controlada com broncodilatador.",
    prescription: "Salbutamol inalador",
    followUp: "Evitar poeira e alergénios",
  },
  {
    id: "VV-10025",
    owner: "self",
    title: "Infecção urinária",
    status: "Resolvido",
    hospital: "Clínica Sommerschield",
    date: "2026-03-02",
    doctor: "Dra. Ana Bila",
    comments: "Sintomas clássicos de ITU confirmados por exame laboratorial.",
    prescription: "Nitrofurantoína 100mg por 5 dias",
    followUp: "Beber muita água e repetir exames se sintomas voltarem",
  },
  {
    id: "VV-10026",
    owner: "self",
    title: "Crise de enxaqueca",
    status: "Concluído",
    hospital: "Hospital Privado de Maputo",
    date: "2026-02-20",
    doctor: "Dr. Luís Mabote",
    comments: "Episódio de enxaqueca associado a stress e privação de sono.",
    prescription: "Sumatriptano 50mg (SOS)",
    followUp: "Manter rotina de sono regular e evitar triggers",
  },
  {
    id: "VV-10027",
    owner: "other",
    title: "Queda com fratura no braço",
    status: "Concluído",
    hospital: "Hospital Geral de Mavalane",
    date: "2026-01-28",
    doctor: "Dr. Ernesto Chongo",
    comments: "Fratura simples do rádio. Imobilização realizada com sucesso.",
    prescription: "Analgésicos + imobilização com gesso",
    followUp: "Remover gesso após 4 semanas + raio-X de controlo",
  },
  {
    id: "VV-10028",
    owner: "self",
    title: "Reação alérgica alimentar",
    status: "Resolvido",
    hospital: "Clínica Cruz Azul",
    date: "2026-01-15",
    doctor: "Dra. Carla Sitoe",
    comments: "Reação alérgica leve após ingestão de marisco.",
    prescription: "Anti-histamínico (Loratadina)",
    followUp: "Evitar alimentos desencadeantes",
  },
  {
    id: "VV-10029",
    owner: "other",
    title: "Hipertensão descontrolada",
    status: "Em análise",
    hospital: "Hospital Central de Maputo",
    date: "2026-03-10",
    doctor: "Dr. Joaquim Nhaca",
    comments: "Pressão arterial elevada persistente. Ajuste terapêutico necessário.",
    prescription: "Amlodipina 5mg diária",
    followUp: "Monitorização diária da pressão + retorno em 1 semana",
  },
  {
    id: "VV-10030",
    owner: "self",
    title: "Consulta de rotina",
    status: "Concluído",
    hospital: "Centro de Saúde da Matola",
    date: "2026-02-01",
    doctor: "Dra. Isabel Nhantumbo",
    comments: "Avaliação geral sem alterações significativas.",
    prescription: "",
    followUp: "Check-up anual recomendado",
  },
];

export default function ViaVerdeHistory() {
  const [step, setStep] = useState<Step>("login");
  const [form, setForm] = useState<any>({});
  const [otp, setOtp] = useState("");

  const handleChange = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const verifyOTP = () => {
    if (otp === MOCK_OTP) {
      setStep("history");
    } else {
      alert("Código OTP inválido. Use 2026 (mock)");
    }
  };

  const getStatusStyle = (status: string) => {
    const base = "px-3 py-1 text-[10px] uppercase tracking-wider rounded-full font-bold border";
    switch (status) {
      case "Resolvido": return `${base} bg-green-50 text-green-700 border-green-100`;
      case "Concluído": return `${base} bg-blue-50 text-blue-700 border-blue-100`;
      case "Crítico (atendido)": return `${base} bg-red-50 text-red-700 border-red-100`;
      default: return `${base} bg-slate-50 text-slate-600 border-slate-200`;
    }
  };

  const Card = ({ item }: any) => (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.id}</span>
          <h3 className="font-bold text-xl text-slate-900 group-hover:text-green-600 transition-colors">{item.title}</h3>
          <p className="text-sm font-medium text-slate-500">{item.hospital}</p>
        </div>
        <span className={getStatusStyle(item.status)}>{item.status}</span>
      </div>

      <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-6 pb-4 border-b border-slate-50">
        <span className="bg-slate-50 px-2 py-1 rounded-md">{item.date}</span>
        <div className="flex items-center gap-1.5">
          <Stethoscope size={14} className="text-green-600" /> 
          {item.doctor}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex gap-3">
          <div className="mt-1 text-slate-400"><FileText size={18} /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">Comentários</p>
            <p className="text-sm text-slate-600 leading-relaxed">{item.comments}</p>
          </div>
        </div>

        {item.prescription && (
          <div className="flex gap-3 bg-green-50/50 p-3 rounded-2xl border border-green-100/50">
            <div className="text-green-600"><Pill size={18} /></div>
            <div>
              <p className="text-xs font-bold text-green-700 uppercase tracking-tight">Prescrição</p>
              <p className="text-sm text-green-800 font-medium">{item.prescription}</p>
            </div>
          </div>
        )}

        <div className="flex gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
          <div className="text-slate-400"><ClipboardList size={18} /></div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">Seguimento</p>
            <p className="text-sm text-slate-700 font-medium">{item.followUp}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {(step === "login" || step === "otp") && (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50/50">
          <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50">
            {step === "login" ? (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="inline-flex p-3 rounded-2xl bg-green-50 text-green-600 mb-2">
                    <ShieldCheck size={32} />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">Histórico ViaVerde</h2>
                  <p className="text-slate-500 text-sm">Aceda aos seus registos clínicos de forma segura.</p>
                </div>
                <div className="space-y-4">
                  <input placeholder="Nome" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none" onChange={(e) => handleChange("name", e.target.value)} />
                  <input placeholder="Apelido" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none" onChange={(e) => handleChange("surname", e.target.value)} />
                  <input placeholder="Telefone" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none" onChange={(e) => handleChange("phone", e.target.value)} />
                </div>
                <button onClick={() => setStep("otp")} className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group">
                  Continuar <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ) : (
              <div className="space-y-6 text-center">
                <div className="inline-flex p-3 rounded-2xl bg-slate-900 text-white mb-2">
                  <Lock size={32} />
                </div>
                <h2 className="text-2xl font-black text-slate-900">Verificação OTP</h2>
                <input placeholder="0000" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center text-2xl font-black tracking-[1em] outline-none" value={otp} onChange={(e) => setOtp(e.target.value)} />
                <button onClick={verifyOTP} className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold transition-all">
                  Verificar Identidade
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {step === "history" && (
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 animate-fadeIn">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-slate-100">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-green-600 font-bold text-xs uppercase tracking-widest">
                <span className="w-8 h-[2px] bg-green-600"></span> Portal do Paciente
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-slate-900">Histórico Clínico</h1>
            </div>
            <button onClick={() => { setStep("login"); setOtp(""); }} className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 rounded-xl font-bold transition-all">
              <LogOut size={18} /> Sair da Conta
            </button>
          </header>

          <div className="space-y-20">
            <section>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-3 mb-8">
                <div className="p-2 bg-green-600 text-white rounded-lg"><User size={20} /></div>
                Minhas Ocorrências
              </h2>
              <div className="grid lg:grid-cols-2 gap-8">
                {occurrences.filter((o) => o.owner === "self").map((item) => (
                  <Card key={item.id} item={item} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-600 text-white rounded-lg"><Users size={20} /></div>
                Ocorrências Associadas
              </h2>
              <div className="grid lg:grid-cols-2 gap-8">
                {occurrences.filter((o) => o.owner === "other").map((item) => (
                  <Card key={item.id} item={item} />
                ))}
              </div>
            </section>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}