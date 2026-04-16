"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  User,
  Users,
  MapPin,
  Loader2,
  Phone,
  ShieldAlert,
  Stethoscope,
  Clock3,
  Route,
  Star,
  Activity,
  Brain,
  HeartPulse,
  ClipboardList,
  Ambulance,
  CheckCircle2,
  Info,
  Building2,
  MessageSquareWarning,
} from "lucide-react";

type Step =
  | "who"
  | "identity"
  | "survey"
  | "details"
  | "triage"
  | "result";

type ManchesterColor = "Vermelho" | "Laranja" | "Amarelo" | "Verde" | "Azul";
type ConfidenceLevel = "Baixa" | "Média" | "Alta";
type ActorView = "utente" | "linha_verde" | "triagem";

type HospitalItem = {
  id: number;
  name: string;
  district: string;
  lat: number;
  lng: number;
  distanceKm: number;
  etaMin: number;
  type: "Público" | "Privado";
  capability: string[];
  queueStatus: "Livre" | "Moderado" | "Cheio";
  lineGreenPriority: boolean;
  phone: string;
  portfolio: string[];
  images: string[];
};

type TriageResult = {
  priority: "Alta" | "Média" | "Baixa";
  manchester: ManchesterColor;
  confidenceScore: number;
  confidenceLabel: ConfidenceLevel;
  aiSummary: string;
  aiJustification: string[];
  redFlags: string[];
  instructions: string[];
  hospital: HospitalItem;
  alternativeHospitals: HospitalItem[];
  route: {
    distanceKm: number;
    etaMin: number;
    description: string;
  };
  reference: string;
  preTriageNote: string;
  greenLineNote: string;
  nurseHandover: string;
  suggestedDisposition: string;
  timeline: { label: string; time: string; status: "done" | "current" | "pending" }[];
};

const HOSPITALS: HospitalItem[] = [
  {
    id: 1,
    name: "Hospital Central de Maputo",
    district: "Maputo",
    lat: -25.9653,
    lng: 32.5892,
    distanceKm: 2.1,
    etaMin: 9,
    type: "Público",
    capability: [
      "Emergência",
      "Cardiologia",
      "Neurologia",
      "Trauma",
      "Manchester",
      "Linha Verde",
    ],
    queueStatus: "Moderado",
    lineGreenPriority: true,
    phone: "+258 21 000 001",
    portfolio: [
      "Urgência 24h",
      "Triagem avançada",
      "Imagem e laboratório",
      "Internamento",
    ],
    images: [
      "/hospital/mavalane1.jpg",
      "/hospital/mavalane2.jpg",
      "/hospital/mavalane3.jpg",
    ],
  },
  {
    id: 2,
    name: "Hospital Geral de Mavalane",
    district: "Mavalane",
    lat: -25.9314,
    lng: 32.5864,
    distanceKm: 3.4,
    etaMin: 12,
    type: "Público",
    capability: [
      "Clínica Geral",
      "Pediatria",
      "Ortopedia",
      "Manchester",
      "Linha Verde",
    ],
    queueStatus: "Livre",
    lineGreenPriority: true,
    phone: "+258 21 000 002",
    portfolio: [
      "Atendimento rápido",
      "Triagem inicial",
      "Consultas gerais",
      "Encaminhamento",
    ],
    images: [
      "/hospital/mavalane1.jpg",
      "/hospital/mavalane2.jpg",
      "/hospital/mavalane3.jpg",
    ],
  },
  {
    id: 3,
    name: "Hospital José Macamo",
    district: "Maputo",
    lat: -25.9551,
    lng: 32.5734,
    distanceKm: 4.6,
    etaMin: 16,
    type: "Público",
    capability: [
      "Pneumologia",
      "Infecciologia",
      "Neurologia",
      "Linha Verde",
    ],
    queueStatus: "Cheio",
    lineGreenPriority: true,
    phone: "+258 21 000 003",
    portfolio: [
      "Urgência respiratória",
      "Doenças infecciosas",
      "Pré-estabilização",
    ],
    images: [
      "/hospital/mavalane1.jpg",
      "/hospital/mavalane2.jpg",
      "/hospital/mavalane3.jpg",
    ],
  },
  {
    id: 4,
    name: "Clínica Sommerschield",
    district: "Sommerschield",
    lat: -25.9589,
    lng: 32.6031,
    distanceKm: 2.8,
    etaMin: 11,
    type: "Privado",
    capability: ["Dermatologia", "Ginecologia", "Odontologia"],
    queueStatus: "Livre",
    lineGreenPriority: false,
    phone: "+258 21 000 004",
    portfolio: [
      "Consultas especializadas",
      "Baixo tempo de espera",
      "Seguimento clínico",
    ],
    images: [
      "/hospital/mavalane1.jpg",
      "/hospital/mavalane2.jpg",
      "/hospital/mavalane3.jpg",
    ],
  },
];

const ViaVerdeForm = () => {
  const [step, setStep] = useState<Step>("who");
  const [view, setView] = useState<ActorView>("utente");

  const [form, setForm] = useState<any>({
    name: "",
    surname: "",
    phone: "",
    relation: "",
    chronicDiseases: "",
    allergies: "",
    medication: "",
    sensitivities: [],
    type: "",
    consciousness: "",
    breathing: "",
    bleeding: "",
    painScale: "",
    duration: "",
    symptoms: "",
    description: "",
    notes: "",
    patientLat: -25.9553,
    patientLng: 32.5898,
  });

  const [isSelf, setIsSelf] = useState<boolean | null>(null);
  const [isChronic, setIsChronic] = useState(false);
  const [hospitalNumber, setHospitalNumber] = useState("");
  const [profile, setProfile] = useState<any>(null);
  const [result, setResult] = useState<TriageResult | null>(null);
  const [loadingText, setLoadingText] = useState("");
  const [loadingMap, setLoadingMap] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [trackingProgress, setTrackingProgress] = useState(12);
  const [rating, setRating] = useState(0);

  const loadingMessages = [
    "A recolher quadro clínico e contexto do paciente...",
    "A aplicar pré-triagem apoiada por IA...",
    "A estimar prioridade com base em sinais e sintomas...",
    "A sugerir Manchester inicial para apoio clínico...",
    "A localizar unidade com melhor capacidade de resposta...",
    "A preparar nota para Linha Verde e equipa de triagem...",
  ];

  const handleChange = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const toggleSensitivity = (value: string) => {
    setForm((prev: any) => {
      const current = prev.sensitivities || [];
      return {
        ...prev,
        sensitivities: current.includes(value)
          ? current.filter((item: string) => item !== value)
          : [...current, value],
      };
    });
  };

  const handleChronicLookup = () => {
    const mockProfiles: any = {
      "MPT-0384-18382": {
        name: "Nilton Novele",
        disease: "Diabetes Tipo 2",
        phone: "+258 84 000 0000",
        allergies: "Penicilina",
        medication: "Metformina",
      },
      "MPT-1000-99999": {
        name: "Maria João",
        disease: "Hipertensão",
        phone: "+258 82 111 2222",
        allergies: "Nenhuma conhecida",
        medication: "Amlodipina",
      },
    };

    const found = mockProfiles[hospitalNumber];
    if (found) {
      setProfile({ id: hospitalNumber, ...found });
      setForm((prev: any) => ({
        ...prev,
        name: found.name.split(" ")[0] || "",
        surname: found.name.split(" ").slice(1).join(" ") || "",
        phone: found.phone || "",
        chronicDiseases: found.disease || "",
        allergies: found.allergies || "",
        medication: found.medication || "",
      }));
    } else {
      alert("Número hospitalar não encontrado.");
    }
  };

  const confidenceLabel = (score: number): ConfidenceLevel => {
    if (score >= 8) return "Alta";
    if (score >= 5) return "Média";
    return "Baixa";
  };

  const getManchester = (): ManchesterColor => {
    const symptoms = (form.symptoms || "").toLowerCase();
    const desc = (form.description || "").toLowerCase();
    const pain = Number(form.painScale || 0);

    if (
      form.consciousness === "inconsciente" ||
      form.breathing === "dificuldade" ||
      form.bleeding === "grave" ||
      symptoms.includes("convuls") ||
      symptoms.includes("dor no peito") ||
      desc.includes("desmai")
    ) {
      return "Vermelho";
    }

    if (
      form.consciousness === "confuso" ||
      pain >= 8 ||
      symptoms.includes("falta de ar") ||
      symptoms.includes("hemorragia") ||
      symptoms.includes("fraqueza intensa")
    ) {
      return "Laranja";
    }

    if (
      pain >= 5 ||
      symptoms.includes("febre alta") ||
      symptoms.includes("dor intensa") ||
      symptoms.includes("vómitos")
    ) {
      return "Amarelo";
    }

    if (pain >= 2 || symptoms.length > 0) return "Verde";
    return "Azul";
  };

  const getPriority = (): "Alta" | "Média" | "Baixa" => {
    const manchester = getManchester();
    if (manchester === "Vermelho" || manchester === "Laranja") return "Alta";
    if (manchester === "Amarelo") return "Média";
    return "Baixa";
  };

  const getConfidenceScore = () => {
    let score = 4;
    if (form.symptoms) score += 1;
    if (form.description) score += 1;
    if (form.consciousness) score += 1;
    if (form.breathing) score += 1;
    if (form.bleeding) score += 1;
    if (form.painScale) score += 1;
    return Math.min(score, 10);
  };

  const chooseHospital = () => {
    const priority = getPriority();
    const symptoms = (form.symptoms || "").toLowerCase();

    const capable = HOSPITALS.filter((h) => {
      if (priority === "Alta") return h.lineGreenPriority;
      if (symptoms.includes("pele")) return h.capability.includes("Dermatologia");
      if (symptoms.includes("coração") || symptoms.includes("peito"))
        return h.capability.includes("Cardiologia") || h.capability.includes("Urgência");
      return true;
    });

    const ordered = [...capable].sort((a, b) => {
      const queueWeight = (q: HospitalItem["queueStatus"]) =>
        q === "Livre" ? 0 : q === "Moderado" ? 1 : 2;
      return a.distanceKm + queueWeight(a.queueStatus) - (b.distanceKm + queueWeight(b.queueStatus));
    });

    return {
      best: ordered[0] || HOSPITALS[0],
      alternatives: ordered.slice(1, 4),
    };
  };

  const getInstructions = (priority: string) => {
    if (priority === "Alta") {
      return [
        "Dirija-se imediatamente à unidade recomendada.",
        "A Linha Verde deve priorizar o encaminhamento e manter contacto ativo.",
        "Evite movimentos desnecessários e mantenha o paciente monitorizado.",
        "Leve informação sobre medicação, alergias e doenças crónicas.",
      ];
    }

    if (priority === "Média") {
      return [
        "Procure a unidade recomendada nas próximas horas.",
        "Mantenha hidratação e evite automedicação sem orientação.",
        "Leve os dados clínicos e histórico já recolhidos pela plataforma.",
      ];
    }

    return [
      "Monitorize sintomas e evolução clínica.",
      "Caso haja agravamento, reabra a ocorrência ou contacte a Linha Verde.",
      "Mantenha registo do desconforto, febre, dor e horário de início.",
    ];
  };

  const buildAISummary = (priority: string, manchester: ManchesterColor) => {
    const base = form.type || "ocorrência clínica";
    return `A IA identificou um quadro compatível com ${base.toLowerCase()}, com prioridade ${priority.toLowerCase()} e sugestão inicial de triagem Manchester ${manchester}. Esta análise apoia a decisão clínica, mas não substitui avaliação profissional.`;
  };

  const buildJustification = () => {
    const reasons = [];
    if (form.consciousness === "inconsciente")
      reasons.push("Alteração importante do estado de consciência.");
    if (form.breathing === "dificuldade")
      reasons.push("Queixa respiratória ou esforço ventilatório aumentado.");
    if (form.bleeding === "grave")
      reasons.push("Hemorragia importante descrita no relato.");
    if (Number(form.painScale || 0) >= 8)
      reasons.push("Escala de dor elevada.");
    if ((form.symptoms || "").toLowerCase().includes("dor no peito"))
      reasons.push("Sintoma de dor torácica com potencial gravidade.");
    if ((form.symptoms || "").toLowerCase().includes("febre"))
      reasons.push("Síndrome febril relatada pelo utente.");
    if ((form.chronicDiseases || "").length > 0)
      reasons.push("Existem antecedentes clínicos relevantes.");
    return reasons.length ? reasons : ["Dados clínicos suficientes para sugestão inicial de fluxo."];
  };

  const buildRedFlags = () => {
    const flags = [];
    if (form.consciousness === "inconsciente") flags.push("Paciente inconsciente");
    if (form.breathing === "dificuldade") flags.push("Dificuldade respiratória");
    if (form.bleeding === "grave") flags.push("Hemorragia grave");
    if ((form.symptoms || "").toLowerCase().includes("peito")) flags.push("Dor torácica");
    if ((form.symptoms || "").toLowerCase().includes("convuls")) flags.push("Convulsão");
    return flags;
  };

  const generateResult = () => {
    const priority = getPriority();
    const manchester = getManchester();
    const confidenceScore = getConfidenceScore();
    const { best, alternatives } = chooseHospital();

    const timeline = [
      { label: "Ocorrência registada", time: "agora", status: "done" as const },
      { label: "Pré-triagem IA concluída", time: "agora", status: "done" as const },
      { label: "Linha Verde notificada", time: "1 min", status: "current" as const },
      { label: "Triagem clínica no hospital", time: `${best.etaMin} min`, status: "pending" as const },
      { label: "Reavaliação Manchester local", time: `${best.etaMin + 8} min`, status: "pending" as const },
    ];

    const aiSummary = buildAISummary(priority, manchester);
    const aiJustification = buildJustification();
    const redFlags = buildRedFlags();
    const instructions = getInstructions(priority);

    const reference = "VV-" + Math.floor(Math.random() * 1000000);

    const preTriageNote = `Paciente ${form.name || "não identificado"} com prioridade ${priority}, Manchester ${manchester}, confiança IA ${confidenceScore}/10. Encaminhamento sugerido para ${best.name}.`;
    const greenLineNote = `Linha Verde deve acompanhar deslocação, confirmar chegada, e manter visibilidade do quadro clínico, localização e sinais de alerta.`;
    const nurseHandover = `Ao chegar, a equipa de triagem deve rever dados recolhidos pela IA, revalidar sinais vitais, aplicar Manchester presencial e confirmar hospital de destino/capacidade resolutiva.`;
    const suggestedDisposition =
      priority === "Alta"
        ? "Encaminhamento imediato e prioridade assistencial."
        : priority === "Média"
        ? "Atendimento prioritário nas próximas horas."
        : "Avaliação programada com vigilância de agravamento.";

    setResult({
      priority,
      manchester,
      confidenceScore,
      confidenceLabel: confidenceLabel(confidenceScore),
      aiSummary,
      aiJustification,
      redFlags,
      instructions,
      hospital: best,
      alternativeHospitals: alternatives,
      route: {
        distanceKm: best.distanceKm,
        etaMin: best.etaMin,
        description: `Seguir pela via principal em direção a ${best.district}, com entrada recomendada pela urgência/triagem.`,
      },
      reference,
      preTriageNote,
      greenLineNote,
      nurseHandover,
      suggestedDisposition,
      timeline,
    });

    setStep("result");
  };

  useEffect(() => {
    if (step === "triage") {
      let i = 0;

      const interval = setInterval(() => {
        setLoadingText(loadingMessages[i % loadingMessages.length]);
        i++;
      }, 1000);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        generateResult();
      }, 6500);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [step]);

  useEffect(() => {
    if (step === "result" && result) {
      const interval = setInterval(() => {
        setTrackingProgress((prev) => {
          if (prev >= 92) return prev;
          return prev + 8;
        });
      }, 1800);

      return () => clearInterval(interval);
    }
  }, [step, result]);

  const currentImages = result?.hospital?.images || HOSPITALS[0].images;

  const getManchesterStyle = (color: ManchesterColor) => {
    switch (color) {
      case "Vermelho":
        return "bg-red-100 text-red-700 border-red-200";
      case "Laranja":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Amarelo":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Verde":
        return "bg-green-100 text-green-700 border-green-200";
      case "Azul":
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  return (
    <>
      <section className="mx-auto max-w-6xl rounded-[32px] border border-slate-200 bg-gradient-to-br from-green-50 via-white to-blue-50 p-4 shadow-[0_20px_60px_rgba(16,24,40,0.08)] md:p-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-[0.16em] text-green-600">
              ViaVerde Pré-Triagem
            </p>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Encaminhamento inteligente e apoio à triagem clínica
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              Recolha clínica inicial, apoio IA, sugestão de Manchester, indicação
              do hospital mais próximo e preparação de dados para Linha Verde e
              equipa de triagem.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { key: "utente", label: "Utente" },
              { key: "linha_verde", label: "Linha Verde" },
              { key: "triagem", label: "Triagem" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setView(item.key as ActorView)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  view === item.key
                    ? "bg-green-600 text-white"
                    : "bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {profile && (
          <div className="mb-6 rounded-2xl border border-green-100 bg-white p-4 shadow-sm">
            <h3 className="mb-2 font-bold text-green-700">Paciente Crónico Validado</h3>
            <div className="grid gap-2 text-sm text-slate-700 md:grid-cols-2">
              <p><strong>Nome:</strong> {profile.name}</p>
              <p><strong>Nº Único:</strong> {profile.id}</p>
              <p><strong>Doença:</strong> {profile.disease}</p>
              <p><strong>Telefone:</strong> {profile.phone}</p>
              <p><strong>Alergias:</strong> {profile.allergies}</p>
              <p><strong>Medicação:</strong> {profile.medication}</p>
            </div>
          </div>
        )}

        {step === "who" && (
          <div>
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              A ocorrência é para si ou para outra pessoa?
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <button
                onClick={() => {
                  setIsSelf(true);
                  setStep("identity");
                }}
                className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="rounded-2xl bg-green-100 p-4 text-green-600">
                    <User size={26} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Para mim</h3>
                  <p className="text-sm text-slate-600">
                    Registar e encaminhar a minha própria ocorrência.
                  </p>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsSelf(false);
                  setStep("identity");
                }}
                className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="rounded-2xl bg-blue-100 p-4 text-blue-600">
                    <Users size={26} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Outra pessoa</h3>
                  <p className="text-sm text-slate-600">
                    Registar ocorrência para familiar, utente ou terceiro.
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}

        {step === "identity" && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-slate-900">Identificação do paciente</h2>

            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={isChronic}
                onChange={(e) => setIsChronic(e.target.checked)}
              />
              Paciente com histórico clínico registado
            </label>

            {isChronic && (
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                  <input
                    placeholder="Número Único Hospitalar (ex: MPT-XXXX)"
                    className="input"
                    value={hospitalNumber}
                    onChange={(e) => setHospitalNumber(e.target.value)}
                  />
                  <button onClick={handleChronicLookup} className="btn-primary whitespace-nowrap">
                    Validar Paciente
                  </button>
                </div>
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <input
                placeholder="Nome"
                className="input"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              <input
                placeholder="Apelido"
                className="input"
                value={form.surname}
                onChange={(e) => handleChange("surname", e.target.value)}
              />
              <input
                placeholder="Telefone"
                className="input"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              {!isSelf && (
                <input
                  placeholder="Relação com o paciente"
                  className="input"
                  value={form.relation}
                  onChange={(e) => handleChange("relation", e.target.value)}
                />
              )}
            </div>

            <button onClick={() => setStep("survey")} className="btn-primary w-full">
              Continuar para sensibilidades e antecedentes
            </button>
          </div>
        )}

        {step === "survey" && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-slate-900">
              Survey clínico rápido do utente
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <textarea
                placeholder="Doenças crónicas / antecedentes"
                className="input min-h-[110px]"
                value={form.chronicDiseases}
                onChange={(e) => handleChange("chronicDiseases", e.target.value)}
              />
              <textarea
                placeholder="Alergias / sensibilidades conhecidas"
                className="input min-h-[110px]"
                value={form.allergies}
                onChange={(e) => handleChange("allergies", e.target.value)}
              />
              <textarea
                placeholder="Medicação atual"
                className="input min-h-[110px]"
                value={form.medication}
                onChange={(e) => handleChange("medication", e.target.value)}
              />
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="mb-3 text-sm font-semibold text-slate-800">
                  Sensibilidades relevantes
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Penicilina", "AINEs", "Latex", "Alimentos", "Contraste", "Sem informação"].map(
                    (item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleSensitivity(item)}
                        className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                          (form.sensitivities || []).includes(item)
                            ? "bg-green-600 text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {item}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            <button onClick={() => setStep("details")} className="btn-primary w-full">
              Continuar para pré-triagem
            </button>
          </div>
        )}

        {step === "details" && (
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
              <AlertTriangle className="text-red-500" /> Pré-triagem da ocorrência
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <select className="input" onChange={(e) => handleChange("type", e.target.value)}>
                <option value="">Tipo de ocorrência</option>
                <option>Acidente</option>
                <option>Dor súbita</option>
                <option>Problema respiratório</option>
                <option>Febre</option>
                <option>Quadro cardíaco</option>
                <option>Neurológico</option>
                <option>Outro</option>
              </select>

              <select className="input" onChange={(e) => handleChange("consciousness", e.target.value)}>
                <option value="">Estado de consciência</option>
                <option value="normal">Consciente</option>
                <option value="confuso">Confuso</option>
                <option value="inconsciente">Inconsciente</option>
              </select>

              <select className="input" onChange={(e) => handleChange("breathing", e.target.value)}>
                <option value="">Respiração</option>
                <option value="normal">Normal</option>
                <option value="dificuldade">Dificuldade</option>
              </select>

              <select className="input" onChange={(e) => handleChange("bleeding", e.target.value)}>
                <option value="">Hemorragia</option>
                <option value="nenhuma">Nenhuma</option>
                <option value="leve">Leve</option>
                <option value="grave">Grave</option>
              </select>

              <select className="input" onChange={(e) => handleChange("painScale", e.target.value)}>
                <option value="">Escala de dor (0–10)</option>
                {[0,1,2,3,4,5,6,7,8,9,10].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>

              <select className="input" onChange={(e) => handleChange("duration", e.target.value)}>
                <option value="">Início dos sintomas</option>
                <option>Agora / minutos</option>
                <option>Há algumas horas</option>
                <option>Hoje</option>
                <option>Ontem</option>
                <option>Há vários dias</option>
              </select>
            </div>

            <textarea
              placeholder="Sintomas principais"
              className="input min-h-[100px]"
              onChange={(e) => handleChange("symptoms", e.target.value)}
            />
            <textarea
              placeholder="Descrição da ocorrência / storytelling do caso"
              className="input min-h-[110px]"
              onChange={(e) => handleChange("description", e.target.value)}
            />
            <textarea
              placeholder="Notas adicionais para Linha Verde / triagem"
              className="input min-h-[100px]"
              onChange={(e) => handleChange("notes", e.target.value)}
            />

            <button onClick={() => setStep("triage")} className="btn-danger w-full">
              Executar pré-triagem inteligente
            </button>
          </div>
        )}

        {step === "triage" && (
          <div className="flex flex-col items-center justify-center space-y-6 py-16 text-center">
            <Loader2 className="animate-spin text-green-600" size={42} />
            <h3 className="text-xl font-semibold text-slate-800">
              A ViaVerde está a preparar a melhor resposta
            </h3>
            <p className="animate-pulse text-sm text-slate-600">{loadingText}</p>
            <div className="rounded-full bg-slate-100 px-4 py-2 text-xs text-slate-500">
              IA + Linha Verde + pré-triagem clínica + indicação hospitalar
            </div>
          </div>
        )}

        {step === "result" && result && (
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-green-600">
                    Pré-atendimento ativado
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    A ocorrência foi preparada para acompanhamento e encaminhamento.
                  </p>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                    <strong>Referência:</strong> {result.reference}
                  </div>
                  <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                    <strong>Prioridade:</strong> {result.priority}
                  </div>
                  <div className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${getManchesterStyle(result.manchester)}`}>
                    Manchester: {result.manchester}
                  </div>
                  <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                    <strong>Confiabilidade IA:</strong> {result.confidenceScore}/10 ({result.confidenceLabel})
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Brain className="text-green-600" size={18} />
                    <h4 className="font-semibold text-slate-900">Resumo da IA</h4>
                  </div>
                  <p className="text-sm leading-6 text-slate-700">{result.aiSummary}</p>

                  <div className="mt-4">
                    <p className="mb-2 text-sm font-semibold text-slate-900">
                      Justificativa clínica
                    </p>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                      {result.aiJustification.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {result.redFlags.length > 0 && (
                    <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 p-4">
                      <div className="mb-2 flex items-center gap-2 text-red-700">
                        <ShieldAlert size={18} />
                        <span className="font-semibold">Sinais de alerta</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {result.redFlags.map((flag) => (
                          <span
                            key={flag}
                            className="rounded-full bg-white px-3 py-1 text-xs font-medium text-red-700"
                          >
                            {flag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <ClipboardList className="text-blue-600" size={18} />
                    <h4 className="font-semibold text-slate-900">Visão por papel</h4>
                  </div>

                  {view === "utente" && (
                    <p className="text-sm leading-6 text-slate-700">
                      A plataforma recomenda a unidade mais adequada, mostra rota,
                      tempo estimado, instruções imediatas e acompanhamento até à chegada.
                    </p>
                  )}

                  {view === "linha_verde" && (
                    <p className="text-sm leading-6 text-slate-700">
                      A Linha Verde deve acompanhar deslocação, manter contacto com o
                      utente, confirmar hospital com capacidade resolutiva e priorizar
                      casos graves ou com pouca conectividade.
                    </p>
                  )}

                  {view === "triagem" && (
                    <p className="text-sm leading-6 text-slate-700">
                      A equipa de triagem recebe a pré-indicação da IA, revê quadro
                      clínico, antecedentes, justificativa, confiança e revalida a
                      Escala de Manchester à chegada.
                    </p>
                  )}

                  <div className="mt-4 space-y-2 text-sm text-slate-700">
                    <p><strong>Nota Linha Verde:</strong> {result.greenLineNote}</p>
                    <p><strong>Handover enfermagem:</strong> {result.nurseHandover}</p>
                    <p><strong>Destino sugerido:</strong> {result.suggestedDisposition}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-2xl bg-green-50 p-5">
                  <div className="mb-3 flex items-center gap-2 text-green-800">
                    <MapPin size={18} />
                    <h4 className="font-semibold">Unidade recomendada</h4>
                  </div>

                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-lg font-bold text-slate-900">{result.hospital.name}</p>
                      <p className="text-sm text-slate-600">
                        {result.hospital.type} • {result.hospital.queueStatus} •{" "}
                        {result.hospital.distanceKm} km
                      </p>
                      <p className="mt-2 text-sm text-slate-700">
                        {result.route.description}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white px-4 py-3 text-sm shadow-sm">
                      <p><strong>ETA:</strong> {result.route.etaMin} min</p>
                      <p><strong>Telefone:</strong> {result.hospital.phone}</p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {result.hospital.portfolio.map((item) => (
                      <div key={item} className="rounded-xl bg-white px-3 py-3 text-sm text-slate-700 shadow-sm">
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {result.hospital.capability.map((cap) => (
                      <span
                        key={cap}
                        className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <button
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
                      onClick={() => {
                        setLoadingMap(true);
                        navigator.geolocation.getCurrentPosition(
                          (position) => {
                            const userLat = position.coords.latitude;
                            const userLng = position.coords.longitude;
                            const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${result.hospital.lat},${result.hospital.lng}`;
                            setLoadingMap(false);
                            window.open(url, "_blank");
                          },
                          () => {
                            setLoadingMap(false);
                            alert("Não foi possível obter a sua localização.");
                          }
                        );
                      }}
                    >
                      <Route size={16} />
                      {loadingMap ? "A obter rota..." : "Ver rota até o hospital"}
                    </button>

                    <a
                      href={`tel:${result.hospital.phone}`}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-800"
                    >
                      <Phone size={16} />
                      Ligar / VoIP
                    </a>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <Clock3 className="text-blue-600" size={18} />
                      <h4 className="font-semibold text-slate-900">
                        Acompanhamento do paciente
                      </h4>
                    </div>

                    <div className="mb-3 h-3 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-700"
                        style={{ width: `${trackingProgress}%` }}
                      />
                    </div>

                    <p className="text-sm text-slate-600">
                      Estado atual:{" "}
                      <strong>
                        {trackingProgress < 40
                          ? "Ocorrência a ser acompanhada"
                          : trackingProgress < 70
                          ? "Em deslocação para a unidade"
                          : trackingProgress < 100
                          ? "Chegada iminente / pré-aviso ativo"
                          : "Chegada confirmada"}
                      </strong>
                    </p>

                    <div className="mt-4 space-y-3">
                      {result.timeline.map((item) => (
                        <div key={item.label} className="flex items-start gap-3">
                          <div
                            className={`mt-1 h-3 w-3 rounded-full ${
                              item.status === "done"
                                ? "bg-green-500"
                                : item.status === "current"
                                ? "bg-blue-500"
                                : "bg-slate-300"
                            }`}
                          />
                          <div>
                            <p className="text-sm font-medium text-slate-800">{item.label}</p>
                            <p className="text-xs text-slate-500">{item.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <Building2 className="text-green-600" size={18} />
                      <h4 className="font-semibold text-slate-900">
                        Outros hospitais relevantes
                      </h4>
                    </div>

                    <div className="space-y-3">
                      {result.alternativeHospitals.map((hospital) => (
                        <div
                          key={hospital.id}
                          className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-semibold text-slate-900">{hospital.name}</p>
                              <p className="text-sm text-slate-600">
                                {hospital.type} • {hospital.queueStatus}
                              </p>
                            </div>
                            <div className="text-right text-sm text-slate-600">
                              <p>{hospital.distanceKm} km</p>
                              <p>{hospital.etaMin} min</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <MessageSquareWarning className="text-red-600" size={18} />
                    <h4 className="font-semibold text-slate-900">
                      Instruções imediatas
                    </h4>
                  </div>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                    {result.instructions.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <HeartPulse className="text-purple-600" size={18} />
                    <h4 className="font-semibold text-slate-900">
                      Pré-nota clínica
                    </h4>
                  </div>
                  <p className="text-sm leading-6 text-slate-700">
                    {result.preTriageNote}
                  </p>

                  <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-500">
                    A IA ajuda, sugere e prioriza, mas a decisão final clínica e a
                    reavaliação presencial continuam a ser responsabilidade da equipa
                    de saúde.
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Info className="text-blue-600" size={18} />
                  <h4 className="font-semibold text-slate-900">
                    Classificar atendimento / feedback do utente
                  </h4>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <button
                      key={item}
                      onClick={() => setRating(item)}
                      className="transition"
                    >
                      <Star
                        size={22}
                        className={
                          item <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-slate-300"
                        }
                      />
                    </button>
                  ))}
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  O feedback pode ajudar a melhorar o serviço, a pré-triagem e a
                  aprendizagem supervisionada pelos profissionais de saúde.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => {
                    setStep("who");
                    setResult(null);
                    setRating(0);
                    setTrackingProgress(12);
                    setProfile(null);
                    setForm({});
                    setCurrentIndex(0);
                  }}
                  className="btn w-full"
                >
                  Nova Ocorrência
                </button>

                <button className="btn-primary w-full">
                  Confirmar chegada / notificar equipa
                </button>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow">
              <h4 className="mb-4 font-semibold text-slate-900">Fotos da unidade</h4>

              <div className="relative overflow-hidden rounded-2xl">
                <div
                  className="flex transition-transform duration-300"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
                  onTouchEnd={(e) => {
                    const diff = touchStart - e.changedTouches[0].clientX;
                    if (diff > 50) {
                      setCurrentIndex((prev) =>
                        prev === currentImages.length - 1 ? 0 : prev + 1
                      );
                    } else if (diff < -50) {
                      setCurrentIndex((prev) =>
                        prev === 0 ? currentImages.length - 1 : prev - 1
                      );
                    }
                  }}
                >
                  {currentImages.map((img) => (
                    <img
                      key={img}
                      src={img}
                      className="h-56 w-full flex-shrink-0 cursor-pointer object-cover"
                      onClick={() => setSelectedImage(img)}
                    />
                  ))}
                </div>

                <button
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      prev === 0 ? currentImages.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-1 text-white"
                >
                  ‹
                </button>

                <button
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      prev === currentImages.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-1 text-white"
                >
                  ›
                </button>

                <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2">
                  {currentImages.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 w-2 rounded-full ${
                        i === currentIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .input {
            width: 100%;
            padding: 14px;
            border-radius: 14px;
            border: 1px solid #d1d5db;
            background: white;
          }

          .btn {
            padding: 14px;
            background: #e5e7eb;
            border-radius: 14px;
            color: #0f172a;
            font-weight: 600;
          }

          .btn-primary {
            padding: 14px 18px;
            background: linear-gradient(to right, #16a34a, #2563eb);
            color: white;
            border-radius: 14px;
            font-weight: 600;
          }

          .btn-danger {
            padding: 14px;
            background: linear-gradient(to right, #ef4444, #dc2626);
            color: white;
            border-radius: 14px;
            font-weight: 600;
          }
        `}</style>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            className="w-full max-w-4xl rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default ViaVerdeForm;