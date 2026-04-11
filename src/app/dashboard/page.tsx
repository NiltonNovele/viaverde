"use client";

import { useState } from "react";
import {
  Activity,
  LogOut,
  ArrowRightLeft,
  Trash2,
  Lock,
  LockOpen,
  User,
} from "lucide-react";

type Status = "Pendente" | "Em Progresso" | "Resolvido";

type Case = {
  id: string;
  name: string;
  surname: string;
  phone: string;

  type: string;
  consciousness: string;
  breathing: string;
  bleeding: string;

  symptoms: string;
  description: string;
  notes: string;

  priority: "Alta" | "Média" | "Baixa";
  hospital: string;
  status: Status;
  chronic?: boolean;
};

const hospitals = [
  "Hospital Central de Maputo",
  "Hospital Geral de Mavalane",
  "Hospital José Macamo",
  "Hospital Provincial da Matola",
];

const MOCK_EMAIL = "nilton.novele@misau.gov.mz";
const MOCK_PASS = "2026";

// ---------------- MOCK CASOS (13+) ----------------
const initialCases: Case[] = [
  {
    id: "VV-10001",
    name: "Maria",
    surname: "João",
    phone: "+258840000001",
    type: "Acidente",
    consciousness: "consciente",
    breathing: "normal",
    bleeding: "leve",
    symptoms: "dor intensa no peito",
    description: "Acidente de viação",
    notes: "Paciente está estável",
    priority: "Alta",
    hospital: hospitals[0],
    status: "Pendente",
  },
  {
    id: "VV-10002",
    name: "Carlos",
    surname: "Sitoe",
    phone: "+258820000002",
    type: "Febre",
    consciousness: "normal",
    breathing: "normal",
    bleeding: "nenhuma",
    symptoms: "febre alta",
    description: "Suspeita de malária",
    notes: "",
    priority: "Média",
    hospital: hospitals[1],
    status: "Em Progresso",
  },
  {
    id: "VV-10003",
    name: "Ana",
    surname: "Mucavele",
    phone: "+258850000003",
    type: "Respiratório",
    consciousness: "confuso",
    breathing: "dificuldade",
    bleeding: "nenhuma",
    symptoms: "falta de ar severa",
    description: "Crise asmática",
    notes: "Caso crítico",
    priority: "Alta",
    hospital: hospitals[0],
    status: "Pendente",
    chronic: true,
  },
  {
    id: "VV-10004",
    name: "João",
    surname: "Muchanga",
    phone: "+258860000004",
    type: "Diabetes",
    consciousness: "normal",
    breathing: "normal",
    bleeding: "nenhuma",
    symptoms: "hiperglicemia",
    description: "Paciente crónico",
    notes: "Diabetes tipo 2",
    priority: "Média",
    hospital: hospitals[2],
    status: "Em Progresso",
    chronic: true,
  },
  {
    id: "VV-10005",
    name: "Helena",
    surname: "Chissano",
    phone: "+258870000005",
    type: "Febre",
    consciousness: "normal",
    breathing: "normal",
    bleeding: "nenhuma",
    symptoms: "febre leve",
    description: "Gripe",
    notes: "",
    priority: "Baixa",
    hospital: hospitals[1],
    status: "Resolvido",
  },
  {
    id: "VV-10006",
    name: "Miguel",
    surname: "Bila",
    phone: "+258880000006",
    type: "Acidente",
    consciousness: "inconsciente",
    breathing: "dificuldade",
    bleeding: "grave",
    symptoms: "trauma craniano",
    description: "Acidente laboral",
    notes: "Emergência máxima",
    priority: "Alta",
    hospital: hospitals[0],
    status: "Pendente",
  },
  {
    id: "VV-10007",
    name: "Paula",
    surname: "Nhampossa",
    phone: "+258890000007",
    type: "Hipertensão",
    consciousness: "normal",
    breathing: "normal",
    bleeding: "nenhuma",
    symptoms: "dor de cabeça",
    description: "Pressão alta",
    notes: "",
    priority: "Média",
    hospital: hospitals[3],
    status: "Em Progresso",
    chronic: true,
  },
  {
    id: "VV-10008",
    name: "David",
    surname: "Tembe",
    phone: "+258890000008",
    type: "Dor súbita",
    consciousness: "normal",
    breathing: "normal",
    bleeding: "leve",
    symptoms: "dor abdominal",
    description: "Apêndice suspeito",
    notes: "",
    priority: "Alta",
    hospital: hospitals[2],
    status: "Pendente",
  },
  {
    id: "VV-10009",
    name: "Rosa",
    surname: "Mabunda",
    phone: "+258890000009",
    type: "Febre",
    consciousness: "normal",
    breathing: "normal",
    bleeding: "nenhuma",
    symptoms: "febre alta persistente",
    description: "Possível malária",
    notes: "",
    priority: "Média",
    hospital: hospitals[1],
    status: "Pendente",
  },
  {
    id: "VV-10010",
    name: "Isaac",
    surname: "Massingue",
    phone: "+258890000010",
    type: "Acidente",
    consciousness: "confuso",
    breathing: "normal",
    bleeding: "leve",
    symptoms: "queda",
    description: "Trauma leve",
    notes: "",
    priority: "Baixa",
    hospital: hospitals[3],
    status: "Resolvido",
  },
  {
    id: "VV-10011",
    name: "Lina",
    surname: "Macuacua",
    phone: "+258890000011",
    type: "Respiratório",
    consciousness: "normal",
    breathing: "dificuldade",
    bleeding: "nenhuma",
    symptoms: "asma crónica",
    description: "Crónico",
    notes: "",
    priority: "Alta",
    hospital: hospitals[0],
    status: "Em Progresso",
    chronic: true,
  },
  {
    id: "VV-10012",
    name: "Edson",
    surname: "Munguambe",
    phone: "+258890000012",
    type: "Dor súbita",
    consciousness: "normal",
    breathing: "normal",
    bleeding: "nenhuma",
    symptoms: "dor no peito leve",
    description: "Avaliação necessária",
    notes: "",
    priority: "Média",
    hospital: hospitals[2],
    status: "Pendente",
  },
  {
    id: "VV-10013",
    name: "Sara",
    surname: "Nconde",
    phone: "+258890000013",
    type: "Crónico",
    consciousness: "normal",
    breathing: "normal",
    bleeding: "nenhuma",
    symptoms: "controlo diabetes",
    description: "Consulta de rotina",
    notes: "",
    priority: "Baixa",
    hospital: hospitals[1],
    status: "Resolvido",
    chronic: true,
  },
];

export default function DashboardPage() {
  const [logged, setLogged] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [cases, setCases] = useState<Case[]>(initialCases);
  const [selectedHospital, setSelectedHospital] = useState(hospitals[0]);
  const [lock, setLock] = useState(true);

  const handleLogin = () => {
    if (email === MOCK_EMAIL && password === MOCK_PASS) {
      setLogged(true);
    } else {
      alert("Credenciais inválidas");
    }
  };

  const visibleCases = lock
    ? cases.filter((c) => c.hospital === selectedHospital)
    : cases;

  const updateStatus = (id: string, status: Status) => {
    setCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  const transferCase = (id: string) => {
    const newHospital = prompt("Transferir para hospital:");
    if (!newHospital) return;

    setCases((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, hospital: newHospital } : c
      )
    );
  };

  const deleteCase = (id: string) => {
    setCases((prev) => prev.filter((c) => c.id !== id));
  };

  // ---------------- LOGIN ----------------
  if (!logged) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4">
          <h1 className="text-2xl font-bold text-center text-green-700">
            ViaVerde MISAU
          </h1>

          <input
            className="w-full p-3 border rounded-lg"
            placeholder="Email institucional"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full p-3 border rounded-lg"
            placeholder="Palavra-passe"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:opacity-90"
          >
            Entrar no Sistema
          </button>
        </div>
      </div>
    );
  }

  // ---------------- DASHBOARD ----------------
  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 bg-white p-5 rounded-xl shadow">
        <div>
          <h1 className="text-2xl font-bold text-green-700">
            Bem-vindo, Nilton Novele
          </h1>
          <p className="text-sm text-gray-500">
            MISAU • Hospital Central de Maputo • Nº Profissional: HC-77821
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLock(!lock)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-100"
          >
            {lock ? <Lock size={16} /> : <LockOpen size={16} />}
            {lock ? "Modo Hospital" : "Todos os Hospitais"}
          </button>

          <button
            onClick={() => setLogged(false)}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            <LogOut size={16} /> Sair
          </button>
        </div>
      </div>

      {/* HOSPITAL SELECT */}
      {lock && (
        <div className="mb-6">
          <select
            className="p-3 border rounded-lg"
            value={selectedHospital}
            onChange={(e) => setSelectedHospital(e.target.value)}
          >
            {hospitals.map((h) => (
              <option key={h}>{h}</option>
            ))}
          </select>
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p>Total de Casos</p>
          <p className="text-xl font-bold">{visibleCases.length}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p>Casos de Alta Prioridade</p>
          <p className="text-red-500 font-bold">
            {visibleCases.filter((c) => c.priority === "Alta").length}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p>Casos Crónicos</p>
          <p className="text-blue-500 font-bold">
            {visibleCases.filter((c) => c.chronic).length}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p>Em Atendimento</p>
          <p className="text-green-600 font-bold">
            {visibleCases.filter((c) => c.status !== "Resolvido").length}
          </p>
        </div>
      </div>

      {/* CASES */}
      <div className="space-y-4">
        {visibleCases.map((c) => (
          <div
            key={c.id}
            className={`bg-white p-4 rounded-xl shadow border-l-4 ${
              c.chronic ? "border-blue-500" : "border-green-400"
            }`}
          >
            <div className="flex justify-between">
              <h2 className="font-bold text-green-700 flex items-center gap-2">
                <User size={16} />
                {c.name} {c.surname}
                {c.chronic && (
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    Crónico
                  </span>
                )}
              </h2>

              <span className="text-xs text-gray-500">{c.id}</span>
            </div>

            <p className="text-sm">📞 {c.phone}</p>
            <p className="text-sm">⚠ {c.symptoms}</p>
            <p className="text-sm">🏥 {c.hospital}</p>

            <p className="text-sm font-semibold">
              Prioridade: {c.priority}
            </p>

            <p className="text-sm text-gray-600">
              Estado: {c.status}
            </p>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-2 pt-3">
              <button
                onClick={() => updateStatus(c.id, "Em Progresso")}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Em Progresso
              </button>

              <button
                onClick={() => updateStatus(c.id, "Resolvido")}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Resolvido
              </button>

              <button
                onClick={() => transferCase(c.id)}
                className="px-3 py-1 bg-yellow-500 text-white rounded flex items-center gap-1"
              >
                <ArrowRightLeft size={14} /> Transferir
              </button>

              <button
                onClick={() => deleteCase(c.id)}
                className="px-3 py-1 bg-red-500 text-white rounded flex items-center gap-1"
              >
                <Trash2 size={14} /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}