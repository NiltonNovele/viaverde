"use client";

import React, { useEffect, useState } from "react";
import {
  AlertTriangle,
  User,
  Users,
  MapPin,
  Loader2,
  Phone,
  ShieldAlert,
  Route,
  Brain,
  HeartPulse,
  ClipboardList,
  CheckCircle2,
  Building2,
  Ambulance,
} from "lucide-react";

type Step = "who" | "identity" | "details" | "triage" | "result";

type ManchesterColor = "Vermelho" | "Laranja" | "Amarelo" | "Verde" | "Azul";
type ConfidenceLevel = "Baixa" | "Média" | "Alta";

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
};

type TriageResult = {
  priority: "Alta" | "Média" | "Baixa";
  manchester: ManchesterColor;
  confidenceScore: number;
  confidenceLabel: ConfidenceLevel;
  aiSummary: string;
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
  nurseHandover: string;
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
  },
];

type FormState = {
  name: string;
  surname: string;
  phone: string;
  relation: string;
  chronicDiseases: string;
  allergies: string;
  medication: string;
  type: string;
  consciousness: string;
  breathing: string;
  bleeding: string;
  painScale: string;
  duration: string;
  symptoms: string;
  notes: string;
};

const initialForm: FormState = {
  name: "",
  surname: "",
  phone: "",
  relation: "",
  chronicDiseases: "",
  allergies: "",
  medication: "",
  type: "",
  consciousness: "",
  breathing: "",
  bleeding: "",
  painScale: "",
  duration: "",
  symptoms: "",
  notes: "",
};

const ViaVerdeForm = () => {
  const [step, setStep] = useState<Step>("who");
  const [form, setForm] = useState<FormState>(initialForm);
  const [isSelf, setIsSelf] = useState<boolean | null>(null);
  const [isChronic, setIsChronic] = useState(false);
  const [hospitalNumber, setHospitalNumber] = useState("");
  const [profile, setProfile] = useState<any>(null);
  const [result, setResult] = useState<TriageResult | null>(null);
  const [loadingText, setLoadingText] = useState("");
  const [loadingMap, setLoadingMap] = useState(false);

  const loadingMessages = [
    "A analisar sinais e sintomas...",
    "A estimar prioridade clínica...",
    "A sugerir Manchester inicial...",
    "A localizar a melhor unidade...",
    "A preparar nota para a triagem...",
  ];

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleChronicLookup = () => {
    const mockProfiles: Record<
      string,
      {
        name: string;
        disease: string;
        phone: string;
        allergies: string;
        medication: string;
      }
    > = {
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

    if (!found) {
      alert("Número hospitalar não encontrado.");
      return;
    }

    setProfile({ id: hospitalNumber, ...found });
    setForm((prev) => ({
      ...prev,
      name: found.name.split(" ")[0] || "",
      surname: found.name.split(" ").slice(1).join(" ") || "",
      phone: found.phone,
      chronicDiseases: found.disease,
      allergies: found.allergies,
      medication: found.medication,
    }));
  };

  const getManchester = (): ManchesterColor => {
    const symptoms = form.symptoms.toLowerCase();
    const pain = Number(form.painScale || 0);

    if (
      form.consciousness === "inconsciente" ||
      form.breathing === "dificuldade" ||
      form.bleeding === "grave" ||
      symptoms.includes("convuls") ||
      symptoms.includes("dor no peito") ||
      symptoms.includes("desmaio")
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
    if (form.type) score += 1;
    if (form.symptoms) score += 1;
    if (form.consciousness) score += 1;
    if (form.breathing) score += 1;
    if (form.bleeding) score += 1;
    if (form.painScale) score += 1;
    return Math.min(score, 10);
  };

  const confidenceLabel = (score: number): ConfidenceLevel => {
    if (score >= 8) return "Alta";
    if (score >= 5) return "Média";
    return "Baixa";
  };

  const buildRedFlags = () => {
    const flags: string[] = [];
    const symptoms = form.symptoms.toLowerCase();

    if (form.consciousness === "inconsciente") flags.push("Paciente inconsciente");
    if (form.breathing === "dificuldade") flags.push("Dificuldade respiratória");
    if (form.bleeding === "grave") flags.push("Hemorragia grave");
    if (symptoms.includes("peito")) flags.push("Dor torácica");
    if (symptoms.includes("convuls")) flags.push("Convulsão");

    return flags;
  };

  const chooseHospital = () => {
    const priority = getPriority();
    const symptoms = form.symptoms.toLowerCase();

    const capable = HOSPITALS.filter((h) => {
      if (priority === "Alta") return h.lineGreenPriority;
      if (symptoms.includes("pele")) return h.capability.includes("Dermatologia");
      if (symptoms.includes("coração") || symptoms.includes("peito")) {
        return h.capability.includes("Cardiologia") || h.capability.includes("Emergência");
      }
      return true;
    });

    const ordered = [...capable].sort((a, b) => {
      const queueWeight = (q: HospitalItem["queueStatus"]) =>
        q === "Livre" ? 0 : q === "Moderado" ? 1 : 2;

      return (
        a.distanceKm + queueWeight(a.queueStatus) -
        (b.distanceKm + queueWeight(b.queueStatus))
      );
    });

    return {
      best: ordered[0] || HOSPITALS[0],
      alternatives: ordered.slice(1, 3),
    };
  };

  const getInstructions = (priority: "Alta" | "Média" | "Baixa") => {
    if (priority === "Alta") {
      return [
        "Siga imediatamente para a unidade recomendada.",
        "Mantenha o paciente em observação contínua.",
        "Leve informação sobre medicação, alergias e antecedentes.",
      ];
    }

    if (priority === "Média") {
      return [
        "Dirija-se à unidade recomendada assim que possível.",
        "Evite automedicação sem orientação clínica.",
        "Observe agravamento dos sintomas no percurso.",
      ];
    }

    return [
      "Monitorize os sintomas.",
      "Procure ajuda imediata se houver agravamento.",
      "Mantenha registo do início e evolução do quadro.",
    ];
  };

  const generateResult = () => {
    const priority = getPriority();
    const manchester = getManchester();
    const confidenceScore = getConfidenceScore();
    const { best, alternatives } = chooseHospital();
    const redFlags = buildRedFlags();

    const reference = `VV-${Math.floor(Math.random() * 1000000)}`;

    const aiSummary = `Pré-triagem concluída com prioridade ${priority.toLowerCase()} e sugestão Manchester ${manchester}. Unidade recomendada: ${best.name}.`;
    const preTriageNote = `Paciente ${form.name || "não identificado"}, prioridade ${priority}, Manchester ${manchester}, confiança ${confidenceScore}/10, encaminhado para ${best.name}.`;
    const nurseHandover = `Rever consciência, respiração, hemorragia, dor, antecedentes clínicos e reaplicar Manchester à chegada.`;

    setResult({
      priority,
      manchester,
      confidenceScore,
      confidenceLabel: confidenceLabel(confidenceScore),
      aiSummary,
      redFlags,
      instructions: getInstructions(priority),
      hospital: best,
      alternativeHospitals: alternatives,
      route: {
        distanceKm: best.distanceKm,
        etaMin: best.etaMin,
        description: `Seguir para ${best.name}, em ${best.district}, pela entrada da urgência/triagem.`,
      },
      reference,
      preTriageNote,
      nurseHandover,
    });

    setStep("result");
  };

  useEffect(() => {
    if (step !== "triage") return;

    let index = 0;

    const interval = setInterval(() => {
      setLoadingText(loadingMessages[index % loadingMessages.length]);
      index += 1;
    }, 900);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      generateResult();
    }, 4200);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [step]);

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
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const resetFlow = () => {
    setStep("who");
    setForm(initialForm);
    setResult(null);
    setProfile(null);
    setIsChronic(false);
    setHospitalNumber("");
    setIsSelf(null);
    setLoadingText("");
  };

  return (
    <section className="mx-auto max-w-5xl rounded-[32px] border border-slate-200 bg-gradient-to-br from-green-50 via-white to-blue-50 p-4 shadow-[0_20px_60px_rgba(16,24,40,0.08)] md:p-8">
      <div className="mb-6">
        <p className="mb-1 text-sm font-semibold uppercase tracking-[0.16em] text-green-600">
          ViaVerde Emergência
        </p>
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Pré-triagem rápida para linha de emergência
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Fluxo simplificado para recolher o essencial, estimar prioridade,
          sugerir Manchester e encaminhar rapidamente para a unidade mais adequada.
        </p>
      </div>

      {profile && (
        <div className="mb-6 rounded-2xl border border-green-100 bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-green-700">
            <CheckCircle2 size={18} />
            <h3 className="font-bold">Paciente crónico validado</h3>
          </div>
          <div className="grid gap-2 text-sm text-slate-700 md:grid-cols-2">
            <p><strong>Nome:</strong> {profile.name}</p>
            <p><strong>Nº:</strong> {profile.id}</p>
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
            A chamada é para si ou para outra pessoa?
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
                  Registar uma emergência própria.
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
                  Registar um paciente ou familiar.
                </p>
              </div>
            </button>
          </div>
        </div>
      )}

      {step === "identity" && (
        <div className="space-y-5">
          <h2 className="text-xl font-semibold text-slate-900">
            Identificação rápida
          </h2>

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
                  placeholder="Número Único Hospitalar"
                  className="input"
                  value={hospitalNumber}
                  onChange={(e) => setHospitalNumber(e.target.value)}
                />
                <button
                  onClick={handleChronicLookup}
                  className="btn-primary whitespace-nowrap"
                  type="button"
                >
                  Validar
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

          <div className="flex gap-3">
            <button onClick={() => setStep("who")} className="btn w-full" type="button">
              Voltar
            </button>
            <button
              onClick={() => setStep("details")}
              className="btn-primary w-full"
              type="button"
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {step === "details" && (
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
            <AlertTriangle className="text-red-500" />
            Dados clínicos essenciais
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <select
              className="input"
              value={form.type}
              onChange={(e) => handleChange("type", e.target.value)}
            >
              <option value="">Tipo de ocorrência</option>
              <option>Acidente</option>
              <option>Dor súbita</option>
              <option>Problema respiratório</option>
              <option>Febre</option>
              <option>Quadro cardíaco</option>
              <option>Neurológico</option>
              <option>Outro</option>
            </select>

            <select
              className="input"
              value={form.consciousness}
              onChange={(e) => handleChange("consciousness", e.target.value)}
            >
              <option value="">Estado de consciência</option>
              <option value="normal">Consciente</option>
              <option value="confuso">Confuso</option>
              <option value="inconsciente">Inconsciente</option>
            </select>

            <select
              className="input"
              value={form.breathing}
              onChange={(e) => handleChange("breathing", e.target.value)}
            >
              <option value="">Respiração</option>
              <option value="normal">Normal</option>
              <option value="dificuldade">Dificuldade</option>
            </select>

            <select
              className="input"
              value={form.bleeding}
              onChange={(e) => handleChange("bleeding", e.target.value)}
            >
              <option value="">Hemorragia</option>
              <option value="nenhuma">Nenhuma</option>
              <option value="leve">Leve</option>
              <option value="grave">Grave</option>
            </select>

            <select
              className="input"
              value={form.painScale}
              onChange={(e) => handleChange("painScale", e.target.value)}
            >
              <option value="">Escala de dor (0–10)</option>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>

            <select
              className="input"
              value={form.duration}
              onChange={(e) => handleChange("duration", e.target.value)}
            >
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
            className="input min-h-[110px]"
            value={form.symptoms}
            onChange={(e) => handleChange("symptoms", e.target.value)}
          />

          <div className="grid gap-4 md:grid-cols-3">
            <textarea
              placeholder="Doenças crónicas"
              className="input min-h-[110px]"
              value={form.chronicDiseases}
              onChange={(e) => handleChange("chronicDiseases", e.target.value)}
            />
            <textarea
              placeholder="Alergias"
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
          </div>

          <textarea
            placeholder="Notas curtas para equipa / linha verde"
            className="input min-h-[90px]"
            value={form.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
          />

          <div className="flex gap-3">
            <button onClick={() => setStep("identity")} className="btn w-full" type="button">
              Voltar
            </button>
            <button
              onClick={() => setStep("triage")}
              className="btn-danger w-full"
              type="button"
            >
              Executar pré-triagem
            </button>
          </div>
        </div>
      )}

      {step === "triage" && (
        <div className="flex flex-col items-center justify-center space-y-6 py-16 text-center">
          <Loader2 className="animate-spin text-green-600" size={42} />
          <h3 className="text-xl font-semibold text-slate-800">
            A preparar resposta clínica inicial
          </h3>
          <p className="animate-pulse text-sm text-slate-600">{loadingText}</p>
          <div className="rounded-full bg-slate-100 px-4 py-2 text-xs text-slate-500">
            IA + Manchester + encaminhamento hospitalar
          </div>
        </div>
      )}

      {step === "result" && result && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-2xl font-bold text-green-600">
                  Pré-triagem concluída
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Encaminhamento inicial pronto para ação.
                </p>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                  <strong>Referência:</strong> {result.reference}
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                  <strong>Prioridade:</strong> {result.priority}
                </div>
                <div
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${getManchesterStyle(
                    result.manchester
                  )}`}
                >
                  Manchester: {result.manchester}
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                  <strong>IA:</strong> {result.confidenceScore}/10 ({result.confidenceLabel})
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Brain className="text-green-600" size={18} />
                  <h4 className="font-semibold text-slate-900">Resumo da IA</h4>
                </div>
                <p className="text-sm leading-6 text-slate-700">{result.aiSummary}</p>

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

                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <ClipboardList className="text-blue-600" size={18} />
                    <h4 className="font-semibold text-slate-900">Handover clínico</h4>
                  </div>
                  <p className="text-sm leading-6 text-slate-700">
                    {result.nurseHandover}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-green-50 p-5">
                <div className="mb-3 flex items-center gap-2 text-green-800">
                  <MapPin size={18} />
                  <h4 className="font-semibold">Unidade recomendada</h4>
                </div>

                <p className="text-lg font-bold text-slate-900">{result.hospital.name}</p>
                <p className="text-sm text-slate-600">
                  {result.hospital.type} • {result.hospital.queueStatus} •{" "}
                  {result.hospital.distanceKm} km
                </p>

                <div className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm shadow-sm">
                  <p><strong>ETA:</strong> {result.route.etaMin} min</p>
                  <p><strong>Telefone:</strong> {result.hospital.phone}</p>
                  <p><strong>Rota:</strong> {result.route.description}</p>
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

                <div className="mt-4 flex flex-col gap-3">
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
                    type="button"
                  >
                    <Route size={16} />
                    {loadingMap ? "A obter rota..." : "Ver rota até ao hospital"}
                  </button>

                  <a
                    href={`tel:${result.hospital.phone}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-800"
                  >
                    <Phone size={16} />
                    Ligar agora
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="mb-3 flex items-center gap-2">
                  <HeartPulse className="text-purple-600" size={18} />
                  <h4 className="font-semibold text-slate-900">Instruções imediatas</h4>
                </div>
                <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                  {result.instructions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Ambulance className="text-red-600" size={18} />
                  <h4 className="font-semibold text-slate-900">Pré-nota clínica</h4>
                </div>
                <p className="text-sm leading-6 text-slate-700">
                  {result.preTriageNote}
                </p>

                {result.alternativeHospitals.length > 0 && (
                  <div className="mt-4 rounded-xl bg-slate-50 p-3">
                    <div className="mb-2 flex items-center gap-2">
                      <Building2 className="text-green-600" size={16} />
                      <p className="text-sm font-semibold text-slate-800">Alternativas</p>
                    </div>

                    <div className="space-y-2">
                      {result.alternativeHospitals.map((hospital) => (
                        <div
                          key={hospital.id}
                          className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm"
                        >
                          <span className="font-medium text-slate-800">{hospital.name}</span>
                          <span className="text-slate-500">
                            {hospital.etaMin} min
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button onClick={resetFlow} className="btn w-full" type="button">
                Nova ocorrência
              </button>

              <button className="btn-primary w-full" type="button">
                Confirmar chegada / notificar equipa
              </button>
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
  );
};

export default ViaVerdeForm;