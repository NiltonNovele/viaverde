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
} from "lucide-react";

type Step = "login" | "otp" | "history";

const MOCK_OTP = "2026";

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

  const occurrences = [
  {
    id: "VV-10021",
    owner: "self",
    title: "Dor torácica aguda",
    status: "Resolvido",
    hospital: "Hospital Central de Maputo",
    date: "2026-03-18",
    doctor: "Dr. Paulo Nhantumbo",
    comments:
      "Paciente apresentou dor torácica intensa. ECG e exames normais. Sem sinais de enfarte.",
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
    comments:
      "Quadro febril associado a infeção bacteriana leve.",
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
    comments:
      "Paciente com trauma moderado. Estabilizado e sem risco de vida.",
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
    comments:
      "Crise asmática leve controlada com broncodilatador.",
    prescription: "Salbutamol inalador",
    followUp: "Evitar poeira e alergénios",
  },

  /* ---------------- NEW EXAMPLES ---------------- */

  {
    id: "VV-10025",
    owner: "self",
    title: "Infecção urinária",
    status: "Resolvido",
    hospital: "Clínica Sommerschield",
    date: "2026-03-02",
    doctor: "Dra. Ana Bila",
    comments:
      "Sintomas clássicos de ITU confirmados por exame laboratorial.",
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
    comments:
      "Episódio de enxaqueca associado a stress e privação de sono.",
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
    comments:
      "Fratura simples do rádio. Imobilização realizada com sucesso.",
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
    comments:
      "Reação alérgica leve após ingestão de marisco.",
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
    comments:
      "Pressão arterial elevada persistente. Ajuste terapêutico necessário.",
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
    comments:
      "Avaliação geral sem alterações significativas.",
    prescription: "",
    followUp: "Check-up anual recomendado",
  },
];

  const getStatusStyle = (status: string) => {
    const base = "px-3 py-1 text-xs rounded-full font-semibold";
    switch (status) {
      case "Resolvido":
        return `${base} bg-green-100 text-green-700`;
      case "Concluído":
        return `${base} bg-blue-100 text-blue-700`;
      case "Crítico (atendido)":
        return `${base} bg-red-100 text-red-700`;
      default:
        return `${base} bg-gray-100 text-gray-700`;
    }
  };

  const Card = ({ item }: any) => (
    <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition border border-gray-100 space-y-3">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{item.title}</h3>
          <p className="text-sm text-gray-500">{item.hospital}</p>
        </div>
        <span className={getStatusStyle(item.status)}>
          {item.status}
        </span>
      </div>

      <p className="text-xs text-gray-400">{item.date}</p>

      {/* Doctor */}
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <Stethoscope size={16} /> {item.doctor}
      </div>

      {/* Comments */}
      <div className="bg-gray-50 p-3 rounded-lg text-sm">
        <div className="flex items-center gap-2 font-medium text-gray-700 mb-1">
          <FileText size={16} /> Comentários do Médico
        </div>
        <p className="text-gray-600">{item.comments}</p>
      </div>

      {/* Prescription */}
      {item.prescription && (
        <div className="bg-green-50 p-3 rounded-lg text-sm">
          <div className="flex items-center gap-2 font-medium text-green-700 mb-1">
            <Pill size={16} /> Prescrição
          </div>
          <p className="text-green-800">{item.prescription}</p>
        </div>
      )}

      {/* Follow-up */}
      <div className="bg-blue-50 p-3 rounded-lg text-sm">
        <div className="flex items-center gap-2 font-medium text-blue-700 mb-1">
          <ClipboardList size={16} /> Instruções de Seguimento
        </div>
        <p className="text-blue-800">{item.followUp}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white p-6 flex items-center justify-center">
      {/* LOGIN */}
      {step === "login" && (
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200 w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-green-700 text-center">
            Histórico ViaVerde
          </h2>

          <input
            placeholder="Nome"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <input
            placeholder="Apelido"
            className="w-full p-3 border rounded-xl"
            onChange={(e) => handleChange("surname", e.target.value)}
          />

          <input
            placeholder="Telefone"
            className="w-full p-3 border rounded-xl"
            onChange={(e) => handleChange("phone", e.target.value)}
          />

          <button
            onClick={() => setStep("otp")}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"
          >
            Continuar
          </button>
        </div>
      )}

      {/* OTP */}
      {step === "otp" && (
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md text-center space-y-4">
          <Lock className="mx-auto text-green-600" size={40} />

          <h2 className="text-xl font-bold text-green-700">
            Verificação OTP
          </h2>

          <input
            placeholder="Código OTP"
            className="w-full p-3 border rounded-xl text-center tracking-widest"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            onClick={verifyOTP}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
          >
            Verificar
          </button>
        </div>
      )}

      {/* HISTORY */}
      {step === "history" && (
        <div className="w-full max-w-6xl space-y-8">
          <h1 className="text-3xl font-bold text-green-700 text-center">
            Histórico Clínico
          </h1>

          {/* SELF */}
          <div>
            <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2">
              <User /> Minhas Ocorrências
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mt-4">
              {occurrences
                .filter((o) => o.owner === "self")
                .map((item) => (
                  <Card key={item.id} item={item} />
                ))}
            </div>
          </div>

          {/* OTHERS */}
          <div>
            <h2 className="text-xl font-semibold text-blue-700 flex items-center gap-2">
              <Users /> Ocorrências Associadas
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mt-4">
              {occurrences
                .filter((o) => o.owner === "other")
                .map((item) => (
                  <Card key={item.id} item={item} />
                ))}
            </div>
          </div>

          {/* LOGOUT */}
          <div className="text-center pt-6">
            <button
              onClick={() => {
                setStep("login");
                setOtp("");
              }}
              className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-xl"
            >
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}