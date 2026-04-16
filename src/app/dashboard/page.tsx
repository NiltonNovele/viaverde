"use client";

import { useState } from "react";
import Container from "../components/Container";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  LogOut,
  Lock,
  LockOpen,
  Filter,
  Plus,
  X,
  QrCode,
} from "lucide-react";

type Status = "Pendente" | "Em Progresso" | "Resolvido";
type Priority = "Alta" | "Média" | "Baixa";
type ManchesterLevel = "Vermelho" | "Laranja" | "Amarelo" | "Verde" | "Azul";

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
  priority: Priority;
  hospital: string;
  status: Status;
  chronic?: boolean;
  manchester?: ManchesterLevel;
  medicalJustification?: string;
  aiConfidence?: number;
};

const hospitals = [
  "Hospital Central de Maputo",
  "Hospital Geral de Mavalane",
  "Hospital José Macamo",
  "Hospital Provincial da Matola",
];

const emptyForm: Case = {
  id: "",
  name: "",
  surname: "",
  phone: "",
  type: "",
  consciousness: "",
  breathing: "",
  bleeding: "",
  symptoms: "",
  description: "",
  notes: "",
  priority: "Média",
  hospital: hospitals[0],
  status: "Pendente",
};

const MOCK_EMAIL = "nilton.novele@misau.gov.mz";
const MOCK_PASS = "2026";

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
    notes: "Utente está estável",
    priority: "Alta",
    hospital: hospitals[0],
    status: "Pendente",
    manchester: "Amarelo",
    medicalJustification: "Dor no peito com estabilidade cardiovascular inicial",
    aiConfidence: 8,
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
    manchester: "Verde",
    medicalJustification: "Febre alta mas siniais vitais estáveis, suspeita de malária",
    aiConfidence: 7,
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
    manchester: "Vermelho",
    medicalJustification: "Crise asmática severa com dificuldade respiratória grave",
    aiConfidence: 9,
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
    description: "Utente crónico",
    notes: "Diabetes tipo 2",
    priority: "Média",
    hospital: hospitals[2],
    status: "Em Progresso",
    chronic: true,
    manchester: "Verde",
    medicalJustification: "Paciente crónico bem controlado, hiperglicemia moderada",
    aiConfidence: 6,
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
    manchester: "Azul",
    medicalJustification: "Sintomas leves, não requer internamento",
    aiConfidence: 8,
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
    manchester: "Vermelho",
    medicalJustification: "Trauma craniano grave com perda de consciência - EMERGÊNCIA",
    aiConfidence: 10,
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
    manchester: "Amarelo",
    medicalJustification: "Hipertensão com dor de cabeça, requer monitorização",
    aiConfidence: 7,
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
    manchester: "Laranja",
    medicalJustification: "Dor abdominal aguda - requer cirurgia urgente",
    aiConfidence: 8,
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
    manchester: "Amarelo",
    medicalJustification: "Febre alta com risco de malária em zona endémica",
    aiConfidence: 7,
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
    manchester: "Azul",
    medicalJustification: "Trauma leve sem complicações observadas",
    aiConfidence: 6,
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
    manchester: "Laranja",
    medicalJustification: "Crise asmática em paciente crónico, requer hospitalização",
    aiConfidence: 9,
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
    manchester: "Amarelo",
    medicalJustification: "Dor no peito - requer EKG para descartar infarto",
    aiConfidence: 7,
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
    manchester: "Azul",
    medicalJustification: "Consulta de rotina para controlo de diabetes",
    aiConfidence: 5,
  },
];

/* ---------------- HELPERS (unchanged) ---------------- */
const getPriorityColor = (priority: Priority) => {
  switch (priority) {
    case "Alta":
      return "bg-red-100 text-red-700 border-red-300";
    case "Média":
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    case "Baixa":
      return "bg-green-100 text-green-700 border-green-300";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getManchesterColor = (level?: ManchesterLevel) => {
  switch (level) {
    case "Vermelho":
      return "bg-red-600 text-white";
    case "Laranja":
      return "bg-orange-500 text-white";
    case "Amarelo":
      return "bg-yellow-400 text-gray-900";
    case "Verde":
      return "bg-green-500 text-white";
    case "Azul":
      return "bg-blue-500 text-white";
    default:
      return "bg-gray-300 text-gray-700";
  }
};

const getManchesterBgColor = (level?: ManchesterLevel) => {
  switch (level) {
    case "Vermelho":
      return "bg-red-100 text-red-700 border-red-300";
    case "Laranja":
      return "bg-orange-100 text-orange-700 border-orange-300";
    case "Amarelo":
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    case "Verde":
      return "bg-green-100 text-green-700 border-green-300";
    case "Azul":
      return "bg-blue-100 text-blue-700 border-blue-300";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getStatusIcon = (status: Status) => {
  switch (status) {
    case "Pendente":
      return <AlertCircle className="text-orange-500" size={18} />;
    case "Em Progresso":
      return <Clock className="text-blue-500" size={18} />;
    case "Resolvido":
      return <CheckCircle2 className="text-green-500" size={18} />;
    default:
      return null;
  }
};

export default function DashboardPage() {
  const [logged, setLogged] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [cases, setCases] = useState<Case[]>(initialCases);
  const [selectedHospital, setSelectedHospital] = useState(hospitals[0]);
  const [filterByPriority, setFilterByPriority] =
    useState<Priority | "Todos">("Todos");
  const [lock, setLock] = useState(true);

  // ✅ NEW STATE
  const [form, setForm] = useState<Case>(emptyForm);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [editingManchester, setEditingManchester] = useState<ManchesterLevel | undefined>();
  const [editingJustification, setEditingJustification] = useState("");
  const [editingAiConfidence, setEditingAiConfidence] = useState(0);
  
  // Transfer Modal State
  const [transferCase, setTransferCase] = useState<Case | null>(null);
  const [transferTarget, setTransferTarget] = useState(hospitals[0]);
  const [transferReason, setTransferReason] = useState("");

  // ✅ NEW FUNCTION
  const handleRegisterCall = () => {
    if (!form.name || !form.phone) {
      alert("Preencha pelo menos nome e telefone.");
      return;
    }

    const newCase: Case = {
      ...form,
      id: "VV-" + Math.floor(Math.random() * 90000),
      status: "Pendente",
      manchester: "Verde",
      medicalJustification: "",
      aiConfidence: 5,
    };

    setCases((prev) => [newCase, ...prev]);
    setForm(emptyForm);
  };

  const openCaseDetail = (c: Case) => {
    setSelectedCase(c);
    setEditingManchester(c.manchester);
    setEditingJustification(c.medicalJustification || "");
    setEditingAiConfidence(c.aiConfidence || 5);
  };

  const saveCaseChanges = () => {
    if (!selectedCase) return;

    setCases((prev) =>
      prev.map((c) =>
        c.id === selectedCase.id
          ? {
            ...c,
            manchester: editingManchester,
            medicalJustification: editingJustification,
            aiConfidence: editingAiConfidence,
          }
          : c
      )
    );

    // Mostrar feedback e fechar modal
    alert("✓ Alterações guardadas com sucesso!");
    setSelectedCase(null);
  };

  const openTransferModal = (c: Case) => {
    setTransferCase(c);
    setTransferTarget(c.hospital !== hospitals[0] ? hospitals[0] : hospitals[1]);
    setTransferReason("");
  };

  const executeTransfer = () => {
    if (!transferCase) return;
    if (!transferReason.trim()) {
      alert("Por favor, indique a justificativa da transferência.");
      return;
    }

    setCases((prev) =>
      prev.map((c) =>
        c.id === transferCase.id
          ? { ...c, hospital: transferTarget, status: "Em Progresso" }
          : c
      )
    );

    alert(
      `✓ Paciente ${transferCase.name} transferido para ${transferTarget}\nMotivo: ${transferReason}`
    );
    setTransferCase(null);
  };

  const handleLogin = () => {
    if (email === MOCK_EMAIL && password === MOCK_PASS) {
      setLogged(true);
    } else {
      alert("Credenciais inválidas. Tente novamente.");
    }
  };

  const visibleCases = lock
    ? cases.filter((c) => c.hospital === selectedHospital)
    : cases;

  const filteredCases =
    filterByPriority === "Todos"
      ? visibleCases
      : visibleCases.filter((c) => c.priority === filterByPriority);

  const updateStatus = (id: string, status: Status) => {
    setCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  const deleteCase = (id: string) => {
    if (confirm("Deseja eliminar este caso?")) {
      setCases((prev) => prev.filter((c) => c.id !== id));
    }
  };

  // ============ LOGIN ============
  if (!logged) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <Container>
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                ViaVerde
              </h1>
              <p className="text-gray-600 text-sm">Painel de Gestão Clínica</p>
              <p className="text-gray-500 text-xs mt-1">MISAU - Ministério da Saúde</p>
            </div>

            <div className="space-y-4">
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                placeholder="E-mail institucional"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                placeholder="Palavra-chave"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                onClick={handleLogin}
                className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Aceder ao Painel
              </button>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs text-gray-500 text-center">
                <strong>Demo:</strong> nilton.novele@misau.gov.mz / 2026
              </p>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // ============ DASHBOARD ============
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        {/* HEADER */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border-t-4 border-green-600">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Bem-vindo, Nilton Novele
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Hospital Central de Maputo • Nº de Profissional: HC-77821
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setLock(!lock)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 hover:bg-blue-100 transition font-medium"
              >
                {lock ? <Lock size={18} /> : <LockOpen size={18} />}
                {lock ? "Este Hospital" : "Todos"}
              </button>

              <button
                onClick={() => setLogged(false)}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg border border-red-200 hover:bg-red-100 transition font-medium"
              >
                <LogOut size={18} /> Sair
              </button>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {lock && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Unidade Sanitária
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
              >
                {hospitals.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Filter size={16} className="inline mr-2" /> Prioridade
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition"
              value={filterByPriority}
              onChange={(e) => setFilterByPriority(e.target.value as Priority | "Todos")}
            >
              <option value="Todos">Todas as Prioridades</option>
              <option value="Alta">🔴 Alta</option>
              <option value="Média">🟡 Média</option>
              <option value="Baixa">🟢 Baixa</option>
            </select>
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm font-medium">Total de Casos</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{filteredCases.length}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
            <p className="text-gray-600 text-sm font-medium">Prioridade Alta</p>
            <p className="text-3xl font-bold text-red-600 mt-2">
              {filteredCases.filter((c) => c.priority === "Alta").length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm font-medium">Em Progresso</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {filteredCases.filter((c) => c.status === "Em Progresso").length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
            <p className="text-gray-600 text-sm font-medium">Resolvidos</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {filteredCases.filter((c) => c.status === "Resolvido").length}
            </p>
          </div>
        </div>

        {/* CASES TABLE */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Utente</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tipo</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Sintomas</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Prioridade</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Estado</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCases.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs font-semibold text-green-600">{c.id}</span>
                      {c.chronic && <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Crónico</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{c.name} {c.surname}</p>
                        <p className="text-xs text-gray-500">{c.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{c.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{c.symptoms}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(c.priority)}`}>
                        {c.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(c.status)}
                        <span className="text-sm font-medium text-gray-700">{c.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openCaseDetail(c)}
                          className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded text-xs hover:bg-purple-100 transition font-medium"
                        >
                          Detalhes
                        </button>
                        {c.status !== "Resolvido" && (
                          <button
                            onClick={() => updateStatus(c.id, "Resolvido")}
                            className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-xs hover:bg-green-100 transition font-medium"
                          >
                            Resolver
                          </button>
                        )}
                        <button
                          onClick={() => openTransferModal(c)}
                          className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded text-xs hover:bg-blue-100 transition font-medium"
                        >
                          Transferir
                        </button>
                        <button
                          onClick={() => deleteCase(c.id)}
                          className="px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded text-xs hover:bg-red-100 transition font-medium"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
         

        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>



        {/* ================= NEW SECTION ================= */}
        <div className="bg-white p-6 rounded-lg shadow mb-8 border-l-4 border-green-600">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Plus size={18} /> Registo de Chamadas
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <input placeholder="Nome" className="border p-2 rounded"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input placeholder="Apelido" className="border p-2 rounded"
              value={form.surname}
              onChange={(e) => setForm({ ...form, surname: e.target.value })}
            />
            <input placeholder="Telefone" className="border p-2 rounded"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <input placeholder="Tipo" className="border p-2 rounded"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            />
            <input placeholder="Consciência" className="border p-2 rounded"
              value={form.consciousness}
              onChange={(e) => setForm({ ...form, consciousness: e.target.value })}
            />
            <input placeholder="Respiração" className="border p-2 rounded"
              value={form.breathing}
              onChange={(e) => setForm({ ...form, breathing: e.target.value })}
            />

            <input placeholder="Hemorragia" className="border p-2 rounded"
              value={form.bleeding}
              onChange={(e) => setForm({ ...form, bleeding: e.target.value })}
            />
            <input placeholder="Sintomas" className="border p-2 rounded"
              value={form.symptoms}
              onChange={(e) => setForm({ ...form, symptoms: e.target.value })}
            />
            <input placeholder="Descrição" className="border p-2 rounded"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <input placeholder="Notas" className="border p-2 rounded"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />

            <select className="border p-2 rounded"
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value as Priority })}
            >
              <option>Alta</option>
              <option>Média</option>
              <option>Baixa</option>
            </select>

            <select className="border p-2 rounded"
              value={form.hospital}
              onChange={(e) => setForm({ ...form, hospital: e.target.value })}
            >
              {hospitals.map((h) => (
                <option key={h}>{h}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleRegisterCall}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Registar Ocorrência
          </button>
        </div>

        {/* ================= MODAL DE DETALHES ================= */}
        {selectedCase && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto my-8">
              {/* HEADER */}
              <div className="bg-linear-to-r from-green-600 to-green-700 p-6 flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {selectedCase.name} {selectedCase.surname}
                  </h2>
                  <p className="text-green-100 text-sm">ID: {selectedCase.id}</p>
                </div>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="text-white hover:bg-green-600 p-2 rounded transition"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* PATIENT INFO */}
                <div className="grid md:grid-cols-2 gap-4 border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Telefone</p>
                    <p className="text-gray-900">{selectedCase.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Tipo</p>
                    <p className="text-gray-900">{selectedCase.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Hospital</p>
                    <p className="text-gray-900">{selectedCase.hospital}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Estado</p>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusIcon(selectedCase.status)}
                      <span className="text-gray-900">{selectedCase.status}</span>
                    </div>
                  </div>
                </div>

                {/* QR CODE */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <QrCode size={18} /> Identificador Único
                  </h3>
                  <div className="bg-white p-4 rounded border border-blue-300">
                    <div className="flex gap-4 items-start">
                      {/* QR Code Visual */}
                      <div className="shrink-0">
                        <div className="w-32 h-32 bg-gray-100 p-2 rounded border-2 border-gray-300 flex items-center justify-center">
                          <div className="text-center text-xs font-mono space-y-0.5">
                            <div>█ █   ██   █ █</div>
                            <div>█   █ █  █   </div>
                            <div>█ █ █████ █ █</div>
                            <div>  █   █  █   </div>
                            <div>█ █   ██   █ █</div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 text-center mt-1">QR Code</p>
                      </div>
                      
                      {/* ID Info */}
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-2">Código da Ocorrência</p>
                        <p className="text-4xl font-mono font-bold text-blue-600 mb-4">{selectedCase.id}</p>
                        
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <p className="text-xs text-blue-700 font-medium">Data de Registo</p>
                          <p className="text-blue-900 font-semibold">{new Date().toLocaleDateString('pt-PT')}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* MANCHESTER SCALE */}
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h3 className="font-semibold text-purple-900 mb-3">Escala de Manchester</h3>
                    <div className="flex flex-wrap gap-2">
                      {(["Vermelho", "Laranja", "Amarelo", "Verde", "Azul"] as ManchesterLevel[]).map((level) => (
                        <button
                          key={level}
                          onClick={() => setEditingManchester(level)}
                          className={`px-4 py-2 rounded-full font-semibold transition ${editingManchester === level
                              ? getManchesterColor(level) + " ring-4 ring-offset-2"
                              : getManchesterBgColor(level)
                            }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                    {editingManchester && (
                      <p className="mt-3 text-sm text-gray-700">
                        ✓ Selecionado: <span className="font-semibold">{editingManchester}</span>
                      </p>
                    )}
                  </div>

                  {/* AI CONFIDENCE */}
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <h3 className="font-semibold text-orange-900 mb-3">Confiabilidade AI (0-10)</h3>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={editingAiConfidence}
                        onChange={(e) => setEditingAiConfidence(parseInt(e.target.value))}
                        className="flex-1 h-2 bg-orange-300 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="text-3xl font-bold text-orange-600 min-w-15 text-right">
                        {editingAiConfidence}/10
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      Ajuste o nível de confiança da análise de IA
                    </p>
                  </div>

                  {/* MEDICAL JUSTIFICATION */}
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-900 mb-3">Justificativa do Médico</h3>
                    <textarea
                      value={editingJustification}
                      onChange={(e) => setEditingJustification(e.target.value)}
                      placeholder="Descreva a razão de qualquer mudança de prioridade ou observações clínicas relevantes..."
                      className="w-full px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition resize-none"
                      rows={4}
                    />
                    <p className="text-xs text-gray-600 mt-2">
                      {editingJustification.length} caracteres
                    </p>
                  </div>

                  {/* CLINICAL INFO */}
                  <div className="border-t pt-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Informações Clínicas</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Consciência</p>
                        <p className="text-gray-900 font-semibold">{selectedCase.consciousness}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Respiração</p>
                        <p className="text-gray-900 font-semibold">{selectedCase.breathing}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Hemorragia</p>
                        <p className="text-gray-900 font-semibold">{selectedCase.bleeding}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Sintomas</p>
                        <p className="text-gray-900 font-semibold">{selectedCase.symptoms}</p>
                      </div>
                    </div>
                  </div>

                  {/* BUTTONS */}
                  <div className="flex gap-3 pt-4 border-t">
                    <button
                      onClick={saveCaseChanges}
                      className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                    >
                      Guardar Alterações
                    </button>
                    <button
                      onClick={() => setSelectedCase(null)}
                      className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

            {/* ================= MODAL DE TRANSFERÊNCIA ================= */}
            {transferCase && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full">
                  {/* HEADER */}
                  <div className="bg-linear-to-r from-blue-600 to-blue-700 p-6 flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        Transferir Paciente
                      </h2>
                      <p className="text-blue-100 text-sm">
                        {transferCase.name} {transferCase.surname} • ID: {transferCase.id}
                      </p>
                    </div>
                    <button
                      onClick={() => setTransferCase(null)}
                      className="text-white hover:bg-blue-600 p-2 rounded transition"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* CURRENT INFO */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h3 className="font-semibold text-blue-900 mb-3">Informação Atual</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-blue-700">Hospital Atual</p>
                          <p className="font-semibold text-gray-900">{transferCase.hospital}</p>
                        </div>
                        <div>
                          <p className="text-blue-700">Estado</p>
                          <div className="flex items-center gap-2 mt-1">
                            {getStatusIcon(transferCase.status)}
                            <span className="font-semibold text-gray-900">{transferCase.status}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-blue-700">Prioridade</p>
                          <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(transferCase.priority)}`}>
                            {transferCase.priority}
                          </span>
                        </div>
                        {transferCase.manchester && (
                          <div>
                            <p className="text-blue-700">Manchester</p>
                            <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold text-white ${getManchesterColor(transferCase.manchester)}`}>
                              {transferCase.manchester}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* SELECT TARGET HOSPITAL */}
                    <div className="space-y-3">
                      <label className="block font-semibold text-gray-900">
                        Selecionar Hospital Destino
                      </label>
                      <div className="grid grid-cols-1 gap-2">
                        {hospitals.map((h) => (
                          <button
                            key={h}
                            onClick={() => setTransferTarget(h)}
                            className={`p-4 text-left rounded-lg border-2 transition ${transferTarget === h
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-200 bg-white hover:border-gray-300"
                              }`}
                          >
                            <p className={`font-semibold ${transferTarget === h ? "text-blue-700" : "text-gray-900"}`}>
                              {h}
                            </p>
                            {transferTarget === h && (
                              <p className="text-xs text-blue-600 mt-1">✓ Selecionado</p>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* TRANSFER REASON */}
                    <div className="space-y-3">
                      <label className="block font-semibold text-gray-900">
                        Justificativa da Transferência
                      </label>
                      <textarea
                        value={transferReason}
                        onChange={(e) => setTransferReason(e.target.value)}
                        placeholder="Descreva o motivo da transferência (ex: melhor especialidade, capacidade, localização)..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition resize-none"
                        rows={4}
                      />
                      <p className="text-xs text-gray-600">
                        {transferReason.length} caracteres
                      </p>
                    </div>

                    {/* BUTTONS */}
                    <div className="flex gap-3 pt-4 border-t">
                      <button
                        onClick={executeTransfer}
                        className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                      >
                        Confirmar Transferência
                      </button>
                      <button
                        onClick={() => setTransferCase(null)}
                        className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
      </Container>
      
    </div>
);
}