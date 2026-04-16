"use client";

import { useState } from "react";
import Container from "../components/Container";
import {
  Clock,
  LogOut,
  X,
  Phone,
  PhoneCall,
  ChevronDown,
  ChevronUp,
  Users,
  Activity,
  CheckCircle,
  AlertCircle,
  Hospital,
  Stethoscope,
  User,
  FileText,
  ArrowRight,
} from "lucide-react";

type Status = "Pendente" | "Em Progresso" | "Resolvido";
type ManchesterLevel = "Vermelho" | "Laranja" | "Amarelo" | "Verde" | "Azul";

type HospitalSpecialty = {
  name: string;
  available: boolean;
};

type Call = {
  id: string;
  time: string; // HH:MM
  date: string; // DD/MM/YYYY
  attended: boolean;
  agent: string; // Nome do agente que atendeu
  clientName: string;
  clientSurname: string;
  clientPhone: string;
  description: string; // Descrição da ocorrência
  symptoms?: string;
  recommendedHospital: string;
  manchester: ManchesterLevel;
  notes?: string;
};

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
  manchester: ManchesterLevel;
  hospital: string;
  status: Status;
  chronic?: boolean;
  medicalJustification?: string;
  aiConfidence?: number;
  portfolioHospital?: HospitalSpecialty[];
};

const hospitalPortfolio: Record<string, HospitalSpecialty[]> = {
  "Hospital Central de Maputo": [
    { name: "Cardiologia", available: true },
    { name: "Neurologia", available: true },
    { name: "Urgência/Emergência", available: true },
    { name: "Cirurgia Geral", available: true },
    { name: "Pediatria", available: true },
    { name: "Traumatologia", available: true },
  ],
  "Hospital Geral de Mavalane": [
    { name: "Clínica Geral", available: true },
    { name: "Pediatria", available: true },
    { name: "Maternidade", available: true },
    { name: "Urgência", available: true },
  ],
  "Hospital José Macamo": [
    { name: "Cirurgia Geral", available: true },
    { name: "Ortopedia", available: true },
    { name: "Urgência/Emergência", available: true },
    { name: "Clínica Geral", available: true },
  ],
  "Hospital Provincial da Matola": [
    { name: "Clínica Geral", available: true },
    { name: "Urgência", available: true },
    { name: "Pediatria", available: true },
    { name: "Saúde Mental", available: true },
  ],
};

const hospitals = [
  "Hospital Central de Maputo",
  "Hospital Geral de Mavalane",
  "Hospital José Macamo",
  "Hospital Provincial da Matola",
];

const MOCK_EMAIL = "nilton.novele@misau.gov.mz";

const initialCalls: Call[] = [
  {
    id: "LV-001",
    time: "08:15",
    date: "16/04/2026",
    attended: true,
    agent: "Nilton Novele",
    clientName: "João",
    clientSurname: "Silva",
    clientPhone: "+258 84 123 4567",
    description: "Dor no peito, dificuldade em respirar. Paciente relata ser cardíaco há 5 anos.",
    symptoms: "Dor torácica, dispneia",
    recommendedHospital: "Hospital Central de Maputo",
    manchester: "Vermelho",
    notes: "Paciente em estado de ansiedade. Encaminhar para Cardiologia urgente.",
  },
  {
    id: "LV-002",
    time: "09:45",
    date: "16/04/2026",
    attended: true,
    agent: "Maria Santos",
    clientName: "Ana",
    clientSurname: "Pereira",
    clientPhone: "+258 84 234 5678",
    description: "Criança com febre alta (39.5°C) há 2 dias. Vômitos constantes.",
    symptoms: "Febre, vômitos, desidratação",
    recommendedHospital: "Hospital Geral de Mavalane",
    manchester: "Laranja",
  },
  {
    id: "LV-003",
    time: "10:30",
    date: "16/04/2026",
    attended: true,
    agent: "Nilton Novele",
    clientName: "Carlos",
    clientSurname: "Mandlate",
    clientPhone: "+258 84 345 6789",
    description: "Traumatismo craniano após queda. Paciente com pequeno sangramento no couro cabeludo.",
    symptoms: "Dor de cabeça, sangramento, tonturas",
    recommendedHospital: "Hospital José Macamo",
    manchester: "Amarelo",
  },
  {
    id: "LV-004",
    time: "11:20",
    date: "16/04/2026",
    attended: false,
    agent: "-",
    clientName: "unknown",
    clientSurname: "unknown",
    clientPhone: "+258 84 456 7890",
    description: "Chamada não respondida. Possível número incorreto.",
    recommendedHospital: "Indeterminado",
    manchester: "Verde",
  },
  {
    id: "LV-005",
    time: "13:15",
    date: "16/04/2026",
    attended: true,
    agent: "Maria Santos",
    clientName: "Fatima",
    clientSurname: "Ahmed",
    clientPhone: "+258 84 567 8901",
    description: "Grávida com 8 meses de gestação. Dor abdominal moderada e sangramento vaginal leve.",
    symptoms: "Dor abdominal, sangramento vaginal",
    recommendedHospital: "Hospital Geral de Mavalane",
    manchester: "Laranja",
    notes: "Encaminhar para avaliação obstétrica urgente. Possível complicação de gravidez.",
  },
  {
    id: "LV-006",
    time: "14:45",
    date: "16/04/2026",
    attended: true,
    agent: "Nilton Novele",
    clientName: "Miguel",
    clientSurname: "Novele",
    clientPhone: "+258 84 678 9012",
    description: "Tosse persistente há 1 semana com expectoração. Ligeira febre (37.5°C).",
    symptoms: "Tosse, expectoração, febre ligeira",
    recommendedHospital: "Hospital Provincial da Matola",
    manchester: "Amarelo",
  },
  {
    id: "LV-007",
    time: "15:30",
    date: "16/04/2026",
    attended: true,
    agent: "Maria Santos",
    clientName: "Leonor",
    clientSurname: "Costa",
    clientPhone: "+258 84 789 0123",
    description: "Reacção alérgica após ingestão de amendoim. Inchaço localizado nos lábios.",
    symptoms: "Prurido, inchaço labial, dificuldade em engolir",
    recommendedHospital: "Hospital Central de Maputo",
    manchester: "Laranja",
    notes: "Paciente tem histórico de anafilaxia. Considerar adrenalina.",
  },
];
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
    hospital: hospitals[0],
    status: "Pendente",
    manchester: "Amarelo",
    medicalJustification: "Dor no peito com estabilidade cardiovascular inicial",
    aiConfidence: 8,
    portfolioHospital: hospitalPortfolio[hospitals[0]],
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
    hospital: hospitals[1],
    status: "Em Progresso",
    manchester: "Verde",
    medicalJustification: "Febre alta mas siniais vitais estáveis, suspeita de malária",
    aiConfidence: 7,
    portfolioHospital: hospitalPortfolio[hospitals[1]],
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
    hospital: hospitals[0],
    status: "Pendente",
    chronic: true,
    manchester: "Vermelho",
    medicalJustification: "Crise asmática severa com dificuldade respiratória grave",
    aiConfidence: 9,
    portfolioHospital: hospitalPortfolio[hospitals[0]],
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
    hospital: hospitals[2],
    status: "Em Progresso",
    chronic: true,
    manchester: "Verde",
    medicalJustification: "Paciente crónico bem controlado, hiperglicemia moderada",
    aiConfidence: 6,
    portfolioHospital: hospitalPortfolio[hospitals[2]],
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
    hospital: hospitals[1],
    status: "Resolvido",
    manchester: "Azul",
    medicalJustification: "Sintomas leves, não requer internamento",
    aiConfidence: 8,
    portfolioHospital: hospitalPortfolio[hospitals[1]],
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
    hospital: hospitals[0],
    status: "Pendente",
    manchester: "Vermelho",
    medicalJustification: "Trauma craniano grave com perda de consciência - EMERGÊNCIA",
    aiConfidence: 10,
    portfolioHospital: hospitalPortfolio[hospitals[0]],
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
    hospital: hospitals[3],
    status: "Em Progresso",
    chronic: true,
    manchester: "Amarelo",
    medicalJustification: "Hipertensão com dor de cabeça, requer monitorização",
    aiConfidence: 7,
    portfolioHospital: hospitalPortfolio[hospitals[3]],
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
    hospital: hospitals[2],
    status: "Pendente",
    manchester: "Laranja",
    medicalJustification: "Dor abdominal aguda - requer cirurgia urgente",
    aiConfidence: 8,
    portfolioHospital: hospitalPortfolio[hospitals[2]],
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
    hospital: hospitals[1],
    status: "Pendente",
    manchester: "Amarelo",
    medicalJustification: "Febre alta com risco de malária em zona endémica",
    aiConfidence: 7,
    portfolioHospital: hospitalPortfolio[hospitals[1]],
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
    hospital: hospitals[3],
    status: "Resolvido",
    manchester: "Azul",
    medicalJustification: "Trauma leve sem complicações observadas",
    aiConfidence: 6,
    portfolioHospital: hospitalPortfolio[hospitals[3]],
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
    hospital: hospitals[0],
    status: "Em Progresso",
    chronic: true,
    manchester: "Laranja",
    medicalJustification: "Crise asmática em paciente crónico, requer hospitalização",
    aiConfidence: 9,
    portfolioHospital: hospitalPortfolio[hospitals[0]],
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
    hospital: hospitals[2],
    status: "Pendente",
    manchester: "Amarelo",
    medicalJustification: "Dor no peito - requer EKG para descartar infarto",
    aiConfidence: 7,
    portfolioHospital: hospitalPortfolio[hospitals[2]],
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
    hospital: hospitals[1],
    status: "Resolvido",
    chronic: true,
    manchester: "Azul",
    medicalJustification: "Consulta de rotina para controlo de diabetes",
    aiConfidence: 5,
    portfolioHospital: hospitalPortfolio[hospitals[1]],
  },
];

/* ============ HELPERS ============ */
const getManchesterWaitTime = (level: ManchesterLevel): number => {
  switch (level) {
    case "Vermelho":
      return 0; // Imediato
    case "Laranja":
      return 10;
    case "Amarelo":
      return 60;
    case "Verde":
      return 120;
    case "Azul":
      return 240;
    default:
      return 120;
  }
};

const formatWaitTime = (minutes: number): string => {
  if (minutes === 0) return "Imediato";
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.ceil(minutes / 60);
  return `${hours}H`;
};

const getManchesterPriority = (level: ManchesterLevel): string => {
  switch (level) {
    case "Vermelho":
      return "Emergência";
    case "Laranja":
      return "Muito Urgente";
    case "Amarelo":
      return "Urgente";
    case "Verde":
      return "Pouco Urgente";
    case "Azul":
      return "Não Urgente";
    default:
      return "Urgente";
  }
};

const getPriorityColor = (manchester: ManchesterLevel) => {
  switch (manchester) {
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

export default function DashboardPage() {
  const [logged, setLogged] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [cases, setCases] = useState<Case[]>(initialCases);
  const [calls] = useState<Call[]>(initialCalls);
  const [selectedHospital, setSelectedHospital] = useState(hospitals[0]);
  const [filterByManchester, setFilterByManchester] =
    useState<ManchesterLevel | "Todos">("Todos");
  const [lock, setLock] = useState(true);

  // ✅ NEW STATE
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [editingManchester, setEditingManchester] = useState<ManchesterLevel | undefined>();
  const [editingJustification, setEditingJustification] = useState("");
  const [editingAiConfidence, setEditingAiConfidence] = useState(0);
  
  // Transfer Modal State
  const [transferCase, setTransferCase] = useState<Case | null>(null);
  const [transferTarget, setTransferTarget] = useState(hospitals[0]);
  const [transferReason, setTransferReason] = useState("");

  // ✅ NOVO STATE PARA CONTROLAR EXIBIÇÃO DAS CHAMADAS
  const [showCalls, setShowCalls] = useState(true);

  const openCaseDetail = (c: Case) => {
    setSelectedCase(c);
    setEditingManchester(c.manchester);
    setEditingJustification(c.medicalJustification || "");
    setEditingAiConfidence(c.aiConfidence || 5);
  };

  const saveCaseChanges = () => {
    if (!selectedCase || !editingManchester) return;

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
    filterByManchester === "Todos"
      ? visibleCases
      : visibleCases.filter((c) => c.manchester === filterByManchester);

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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center py-12 px-4">
        <Container>
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl mb-4">
                <PhoneCall className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                ViaVerde
              </h1>
              <p className="text-gray-600 text-sm">Painel de Gestão Clínica</p>
              <p className="text-gray-500 text-xs mt-1">MISAU - Ministério da Saúde</p>
            </div>

            <div className="space-y-4">
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
                placeholder="E-mail institucional"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
                placeholder="Palavra-chave"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl"
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
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* HEADER MODERNO */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center">
                <PhoneCall className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  ViaVerde
                </h1>
                <p className="text-xs text-gray-500">Painel de Gestão Clínica</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right mr-2">
                <p className="text-sm font-medium text-gray-900">Nilton Novele</p>
                <p className="text-xs text-gray-500">Administrador</p>
              </div>
              <button
                onClick={() => setLock(!lock)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg border border-gray-200 hover:bg-gray-200 transition-all hover:shadow-sm"
              >
                {lock ? "📌 Este Hospital" : "🌍 Todos"}
              </button>
              <button
                onClick={() => setLogged(false)}
                className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-all hover:shadow-sm"
              >
                <LogOut className="w-4 h-4 inline mr-1" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      <Container>
        <div className="py-8">
          {/* FILTROS MODERNOS */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {lock && (
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide flex items-center gap-2">
                  <Hospital className="w-4 h-4" />
                  Unidade Sanitária
                </label>
                <select
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition bg-white"
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
              <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Filtrar por Urgência
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition bg-white"
                value={filterByManchester}
                onChange={(e) => setFilterByManchester(e.target.value as ManchesterLevel | "Todos")}
              >
                <option value="Todos">📊 Todas as Urgências</option>
                <option value="Vermelho">🔴 Emergência (Imediato)</option>
                <option value="Laranja">🟠 Muito Urgente (10 min)</option>
                <option value="Amarelo">🟡 Urgente (1H)</option>
                <option value="Verde">🟢 Pouco Urgente (2H)</option>
                <option value="Azul">🔵 Não Urgente (4H)</option>
              </select>
            </div>
          </div>

          {/* STATS CARDS MODERNOS */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Total de Casos</p>
                  <p className="text-4xl font-bold text-gray-900 mt-2">{filteredCases.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Emergências</p>
                  <p className="text-4xl font-bold text-red-600 mt-2">
                    {filteredCases.filter((c) => c.manchester === "Vermelho").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Em Progresso</p>
                  <p className="text-4xl font-bold text-orange-600 mt-2">
                    {filteredCases.filter((c) => c.status === "Em Progresso").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Resolvidos</p>
                  <p className="text-4xl font-bold text-green-600 mt-2">
                    {filteredCases.filter((c) => c.status === "Resolvido").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* TABELA DE CASOS - DESIGN MELHORADO */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-8">
            <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                Casos Clínicos Activos
              </h2>
              <p className="text-sm text-gray-500 mt-1">Gestão de pacientes e triagem</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">ID</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Utente</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Tipo</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Sintomas</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Urgência</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Tempo Espera</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Estado</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCases.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4 text-xs font-mono font-semibold text-green-700">{c.id}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{c.name} {c.surname}</p>
                          <p className="text-xs text-gray-500">{c.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700">
                          {c.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700 max-w-xs truncate">{c.symptoms}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${getPriorityColor(c.manchester)}`}>
                          {c.manchester}
                        </span>
                       </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-900 font-medium">
                            {formatWaitTime(getManchesterWaitTime(c.manchester))}
                          </span>
                        </div>
                       </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${
                          c.status === "Pendente" ? "bg-yellow-100 text-yellow-800" :
                          c.status === "Em Progresso" ? "bg-blue-100 text-blue-800" :
                          "bg-green-100 text-green-800"
                        }`}>
                          {c.status}
                        </span>
                       </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openCaseDetail(c)}
                            className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg border border-gray-300 hover:bg-gray-200 transition-all hover:shadow-sm"
                          >
                            Detalhes
                          </button>
                          {c.status !== "Resolvido" && (
                            <button
                              onClick={() => updateStatus(c.id, "Resolvido")}
                              className="px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 rounded-lg border border-green-300 hover:bg-green-100 transition-all hover:shadow-sm"
                            >
                              Resolver
                            </button>
                          )}
                          <button
                            onClick={() => openTransferModal(c)}
                            className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg border border-blue-300 hover:bg-blue-100 transition-all hover:shadow-sm"
                          >
                            Transferir
                          </button>
                          <button
                            onClick={() => deleteCase(c.id)}
                            className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-lg border border-red-300 hover:bg-red-100 transition-all hover:shadow-sm"
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

          {/* ================= BOTÃO E SEÇÃO DE CHAMADAS ================= */}
          <div className="mt-8">
            <button
              onClick={() => setShowCalls(!showCalls)}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl p-4 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold">Registo de Chamadas - Linha Verde</h3>
                    <p className="text-sm text-green-100">Últimas chamadas recebidas</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {showCalls ? "Ocultar" : "Visualizar"}
                  </span>
                  {showCalls ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </div>
            </button>

            {showCalls && (
              <div className="mt-4 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm animate-fadeIn">
                <div className="bg-gradient-to-r from-green-50 to-white border-b border-gray-200 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <PhoneCall className="w-5 h-5 text-green-600" />
                        Histórico de Chamadas
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">Registo detalhado de todas as chamadas recebidas</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600 font-medium">Ao vivo</span>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold text-gray-900">ID</th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-900">Hora</th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-900">Status</th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-900">Agente</th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-900">Utente</th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-900">Telefone</th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-900">Descrição</th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-900">Hospital</th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-900">Gravidade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {calls.map((call) => (
                        <tr key={call.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-xs font-mono font-semibold text-green-700">{call.id}</td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-gray-900">{call.time}</p>
                              <p className="text-xs text-gray-500">{call.date}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${
                              call.attended 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {call.attended ? '✓ Atendida' : '✗ Não Atendida'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-3 h-3 text-blue-600" />
                              </div>
                              <span className="font-medium text-gray-900">{call.agent}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-medium text-gray-900">{call.clientName} {call.clientSurname}</p>
                          </td>
                          <td className="px-6 py-4 text-gray-700 font-mono text-xs">{call.clientPhone}</td>
                          <td className="px-6 py-4 text-gray-700 max-w-xs">
                            <div className="truncate" title={call.description}>
                              {call.description}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1">
                              <Hospital className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-700">{call.recommendedHospital}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${getPriorityColor(call.manchester)}`}>
                              {call.manchester}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>

    {/* ================= MODAL DE DETALHES MODERNO ================= */}
    {selectedCase && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto animate-fadeIn">
        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto my-8">
          {/* HEADER */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 sticky top-0 z-20">
            <div className="flex justify-between items-start">
              <div className="text-white">
                <h2 className="text-2xl font-bold">
                  {selectedCase.name} {selectedCase.surname}
                </h2>
                <p className="text-green-100 text-sm mt-1">ID: {selectedCase.id}</p>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="text-white hover:bg-green-600 p-2 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* PATIENT INFO */}
            <div className="grid md:grid-cols-2 gap-4 pb-4 border-b border-gray-200">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Telefone</p>
                  <p className="text-gray-900 font-medium">{selectedCase.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Stethoscope className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Tipo</p>
                  <p className="text-gray-900 font-medium">{selectedCase.type}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Hospital className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Hospital</p>
                  <p className="text-gray-900 font-medium">{selectedCase.hospital}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Estado</p>
                  <span className="inline-flex px-2 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-800">
                    {selectedCase.status}
                  </span>
                </div>
              </div>
            </div>

            {/* ID Info */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-green-600" />
                Identificação
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-gray-500">Código da Ocorrência</p>
                  <p className="text-2xl font-mono font-bold text-green-700">{selectedCase.id}</p>
                </div>
                <div>
                  <p className="text-gray-500">Data de Registo</p>
                  <p className="text-gray-900 font-medium">{new Date().toLocaleDateString('pt-PT')}</p>
                </div>
              </div>
            </div>

            {/* MANCHESTER SCALE */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                Urgência (Manchester)
              </h3>
              <div className="flex flex-wrap gap-2">
                {(["Vermelho", "Laranja", "Amarelo", "Verde", "Azul"] as ManchesterLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => setEditingManchester(level)}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                      editingManchester === level
                        ? getManchesterColor(level) + " ring-4 ring-offset-2 shadow-lg transform scale-105"
                        : getManchesterBgColor(level) + " hover:scale-105"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              {editingManchester && (
                <p className="mt-3 text-sm text-gray-700 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-green-600" />
                  ✓ Selecionado: <span className="font-semibold z-0">{editingManchester}</span>
                </p>
              )}
            </div>

            {/* MEDICAL JUSTIFICATION */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Observações Clínicas</h3>
              <textarea
                value={editingJustification}
                onChange={(e) => setEditingJustification(e.target.value)}
                placeholder="Descreva observações ou alterações clínicas relevantes..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition resize-none bg-white text-sm"
                rows={4}
              />
              <p className="text-xs text-gray-500 mt-2">
                {editingJustification.length} caracteres
              </p>
            </div>

            {/* CLINICAL INFO */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Informações Clínicas</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-gray-500 text-xs">Consciência</p>
                  <p className="text-gray-900 font-semibold mt-1">{selectedCase.consciousness}</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-gray-500 text-xs">Respiração</p>
                  <p className="text-gray-900 font-semibold mt-1">{selectedCase.breathing}</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-gray-500 text-xs">Hemorragia</p>
                  <p className="text-gray-900 font-semibold mt-1">{selectedCase.bleeding}</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-gray-500 text-xs">Sintomas</p>
                  <p className="text-gray-900 font-semibold mt-1">{selectedCase.symptoms}</p>
                </div>
              </div>
            </div>

            {/* HOSPITAL PORTFOLIO */}
            {selectedCase.portfolioHospital && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Especialidades Disponíveis</h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {selectedCase.portfolioHospital.map((specialty, idx) => (
                    <div key={idx} className="bg-white p-2 rounded-lg text-sm flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        specialty.available ? "bg-green-600" : "bg-gray-300"
                      }`}></div>
                      <span className={specialty.available ? "text-gray-900" : "text-gray-400 line-through"}>
                        {specialty.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BUTTONS */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={saveCaseChanges}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all font-semibold shadow-md"
              >
                Guardar Alterações
              </button>
              <button
                onClick={() => setSelectedCase(null)}
                className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-300 transition-all font-semibold"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* ================= MODAL DE TRANSFERÊNCIA MODERNO ================= */}
    {transferCase && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-2xl">
            <div className="flex justify-between items-start">
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-2">
                  Transferir Paciente
                </h2>
                <p className="text-blue-100 text-sm">
                  {transferCase.name} {transferCase.surname} • ID: {transferCase.id}
                </p>
              </div>
              <button
                onClick={() => setTransferCase(null)}
                className="text-white hover:bg-blue-600 p-2 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* CURRENT INFO */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Hospital className="w-4 h-4" />
                Informação Atual
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-700">Hospital Atual</p>
                  <p className="font-semibold text-gray-900">{transferCase.hospital}</p>
                </div>
                <div>
                  <p className="text-blue-700">Estado</p>
                  <span className="inline-block mt-1 px-2 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-800">
                    {transferCase.status}
                  </span>
                </div>
                <div>
                  <p className="text-blue-700">Urgência</p>
                  <span className={`inline-block mt-1 px-3 py-1 rounded-lg text-xs font-semibold border ${getPriorityColor(transferCase.manchester)}`}>
                    {transferCase.manchester}
                  </span>
                </div>
                <div>
                  <p className="text-blue-700">Tempo de Espera</p>
                  <p className="font-semibold text-gray-900 mt-1">
                    {formatWaitTime(getManchesterWaitTime(transferCase.manchester))}
                  </p>
                </div>
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
                    className={`p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                      transferTarget === h
                        ? "border-blue-600 bg-blue-50 shadow-md transform scale-[1.01]"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition resize-none"
                rows={4}
              />
              <p className="text-xs text-gray-600">
                {transferReason.length} caracteres
              </p>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={executeTransfer}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-md"
              >
                Confirmar Transferência
              </button>
              <button
                onClick={() => setTransferCase(null)}
                className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-300 transition-all font-semibold"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    <style jsx>{`
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fadeIn {
        animation: fadeIn 0.3s ease-out;
      }
    `}</style>
    </>
  );
}