"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Hospital,
  MapPin,
  Navigation,
  Search,
  Sparkles,
  Stethoscope,
  UserRound,
  Users,
} from "lucide-react";

type HospitalType = "public" | "private";
type CapacityStatus = "Vazio" | "Moderado" | "Cheio";
type RecommendationPriority = "Alta" | "Média" | "Baixa";

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  available: boolean;
  nextSlot: string;
  experience: string;
};

type HospitalItem = {
  id: number;
  name: string;
  type: HospitalType;
  zone: string;
  x: number;
  y: number;
  rating: number;
  estimatedWait: number;
  status: CapacityStatus;
  contact: string;
  hours: string;
  specialties: string[];
  doctors: Doctor[];
};

type UserPoint = {
  x: number;
  y: number;
};

const GRID_W = 12;
const GRID_H = 10;
const CELL = 44;

const SPECIALTIES = [
  "Médico Geral",
  "Dermatologista",
  "Oncologista",
  "Ginecologista",
  "Ortopedista",
  "Cardiologista",
  "Neurologista",
  "Pediatra",
  "Otorrinolaringologista",
  "Psiquiatra",
  "Oftalmologista",
  "Dentista",
  "Urologista",
  "Endocrinologista",
  "Gastroenterologista",
  "Pneumologista",
  "Reumatologista",
  "Infectologista",
  "Nefrologista",
  "Cirurgião Geral",
];

const HOSPITALS: HospitalItem[] = [
  {
    id: 1,
    name: "Hospital Central de Maputo",
    type: "public",
    zone: "Centro",
    x: 7,
    y: 4,
    rating: 4.8,
    estimatedWait: 34,
    status: "Moderado",
    contact: "+258 21 000 001",
    hours: "24 horas",
    specialties: [
      "Médico Geral",
      "Cardiologista",
      "Neurologista",
      "Oncologista",
      "Ortopedista",
      "Pediatra",
      "Ginecologista",
    ],
    doctors: [
      {
        id: 11,
        name: "Dr. Paulo Nhantumbo",
        specialty: "Cardiologista",
        available: true,
        nextSlot: "Hoje • 15:30",
        experience: "12 anos",
      },
      {
        id: 12,
        name: "Dra. Sílvia Mondlane",
        specialty: "Oncologista",
        available: false,
        nextSlot: "Amanhã • 09:00",
        experience: "10 anos",
      },
      {
        id: 13,
        name: "Dr. Ernesto Mussa",
        specialty: "Médico Geral",
        available: true,
        nextSlot: "Hoje • 13:45",
        experience: "8 anos",
      },
      {
        id: 14,
        name: "Dra. Catarina Bila",
        specialty: "Ginecologista",
        available: true,
        nextSlot: "Hoje • 16:10",
        experience: "9 anos",
      },
    ],
  },
  {
    id: 2,
    name: "Hospital Geral de Mavalane",
    type: "public",
    zone: "Mavalane",
    x: 4,
    y: 2,
    rating: 4.4,
    estimatedWait: 22,
    status: "Vazio",
    contact: "+258 21 000 002",
    hours: "24 horas",
    specialties: [
      "Médico Geral",
      "Pediatra",
      "Dermatologista",
      "Ortopedista",
      "Otorrinolaringologista",
    ],
    doctors: [
      {
        id: 21,
        name: "Dra. Elisa Mucavele",
        specialty: "Médico Geral",
        available: true,
        nextSlot: "Hoje • 11:20",
        experience: "7 anos",
      },
      {
        id: 22,
        name: "Dr. Luís Juma",
        specialty: "Ortopedista",
        available: true,
        nextSlot: "Hoje • 14:00",
        experience: "11 anos",
      },
      {
        id: 23,
        name: "Dra. Camila Ubisse",
        specialty: "Dermatologista",
        available: false,
        nextSlot: "Amanhã • 08:30",
        experience: "6 anos",
      },
    ],
  },
  {
    id: 3,
    name: "Hospital José Macamo",
    type: "public",
    zone: "Maxaquene",
    x: 5,
    y: 5,
    rating: 4.3,
    estimatedWait: 41,
    status: "Cheio",
    contact: "+258 21 000 003",
    hours: "24 horas",
    specialties: [
      "Médico Geral",
      "Pneumologista",
      "Infectologista",
      "Neurologista",
    ],
    doctors: [
      {
        id: 31,
        name: "Dr. Carlos Manjate",
        specialty: "Infectologista",
        available: true,
        nextSlot: "Hoje • 17:00",
        experience: "13 anos",
      },
      {
        id: 32,
        name: "Dra. Teresa Zimba",
        specialty: "Pneumologista",
        available: false,
        nextSlot: "Amanhã • 10:00",
        experience: "9 anos",
      },
    ],
  },
  {
    id: 4,
    name: "Clínica Sommerschield",
    type: "private",
    zone: "Sommerschield",
    x: 9,
    y: 3,
    rating: 4.9,
    estimatedWait: 14,
    status: "Vazio",
    contact: "+258 21 000 004",
    hours: "08:00 - 20:00",
    specialties: [
      "Dermatologista",
      "Dentista",
      "Oftalmologista",
      "Ginecologista",
      "Endocrinologista",
    ],
    doctors: [
      {
        id: 41,
        name: "Dra. Ana Sitoe",
        specialty: "Dermatologista",
        available: true,
        nextSlot: "Hoje • 12:10",
        experience: "8 anos",
      },
      {
        id: 42,
        name: "Dr. Joel Mavie",
        specialty: "Dentista",
        available: true,
        nextSlot: "Hoje • 15:00",
        experience: "5 anos",
      },
      {
        id: 43,
        name: "Dra. Isabel Cossa",
        specialty: "Ginecologista",
        available: true,
        nextSlot: "Hoje • 18:20",
        experience: "14 anos",
      },
    ],
  },
  {
    id: 5,
    name: "Clínica MaputoCare",
    type: "private",
    zone: "Polana",
    x: 8,
    y: 6,
    rating: 4.7,
    estimatedWait: 19,
    status: "Moderado",
    contact: "+258 21 000 005",
    hours: "07:00 - 22:00",
    specialties: [
      "Cardiologista",
      "Neurologista",
      "Psiquiatra",
      "Urologista",
      "Gastroenterologista",
    ],
    doctors: [
      {
        id: 51,
        name: "Dr. Nelson Mucana",
        specialty: "Neurologista",
        available: true,
        nextSlot: "Hoje • 16:40",
        experience: "12 anos",
      },
      {
        id: 52,
        name: "Dra. Marta Pelembe",
        specialty: "Psiquiatra",
        available: true,
        nextSlot: "Hoje • 13:10",
        experience: "10 anos",
      },
      {
        id: 53,
        name: "Dr. Ricardo Mbanze",
        specialty: "Cardiologista",
        available: false,
        nextSlot: "Amanhã • 11:00",
        experience: "15 anos",
      },
    ],
  },
  {
    id: 6,
    name: "Hospital da Matola Sul",
    type: "public",
    zone: "Periferia",
    x: 2,
    y: 7,
    rating: 4.2,
    estimatedWait: 27,
    status: "Moderado",
    contact: "+258 21 000 006",
    hours: "24 horas",
    specialties: [
      "Médico Geral",
      "Pediatra",
      "Ginecologista",
      "Ortopedista",
      "Nefrologista",
    ],
    doctors: [
      {
        id: 61,
        name: "Dra. Joana Tembe",
        specialty: "Pediatra",
        available: true,
        nextSlot: "Hoje • 12:50",
        experience: "9 anos",
      },
      {
        id: 62,
        name: "Dr. Augusto Mahumane",
        specialty: "Ortopedista",
        available: true,
        nextSlot: "Hoje • 15:20",
        experience: "11 anos",
      },
      {
        id: 63,
        name: "Dra. Beatriz Chembene",
        specialty: "Ginecologista",
        available: false,
        nextSlot: "Amanhã • 09:40",
        experience: "7 anos",
      },
    ],
  },
  {
    id: 7,
    name: "Clínica Costa do Sol",
    type: "private",
    zone: "Costa do Sol",
    x: 10,
    y: 1,
    rating: 4.6,
    estimatedWait: 17,
    status: "Vazio",
    contact: "+258 21 000 007",
    hours: "08:00 - 21:00",
    specialties: [
      "Médico Geral",
      "Pediatra",
      "Oftalmologista",
      "Dermatologista",
      "Ortopedista",
    ],
    doctors: [
      {
        id: 71,
        name: "Dr. Jaime Alberto",
        specialty: "Oftalmologista",
        available: true,
        nextSlot: "Hoje • 14:25",
        experience: "11 anos",
      },
      {
        id: 72,
        name: "Dra. Paula Simango",
        specialty: "Dermatologista",
        available: true,
        nextSlot: "Hoje • 17:15",
        experience: "7 anos",
      },
      {
        id: 73,
        name: "Dr. Sérgio Ubisse",
        specialty: "Médico Geral",
        available: true,
        nextSlot: "Hoje • 12:05",
        experience: "9 anos",
      },
    ],
  },
];

const QUICK_SYMPTOMS = [
  "dor no peito e falta de ar",
  "febre alta e fraqueza",
  "dor no joelho após queda",
  "manchas e comichão na pele",
  "tontura e dor de cabeça",
];

const statusStyles: Record<CapacityStatus, string> = {
  Vazio: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Moderado: "bg-amber-100 text-amber-700 border-amber-200",
  Cheio: "bg-rose-100 text-rose-700 border-rose-200",
};

const priorityStyles: Record<RecommendationPriority, string> = {
  Alta: "bg-rose-100 text-rose-700",
  Média: "bg-amber-100 text-amber-700",
  Baixa: "bg-emerald-100 text-emerald-700",
};

function distance(a: UserPoint, b: UserPoint) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function formatGridDistance(d: number) {
  return `${(d * 0.8).toFixed(1)} km`;
}

function normalize(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function inferSpecialtyFromSymptoms(symptoms: string): {
  specialty: string;
  reason: string;
  priority: RecommendationPriority;
} {
  const s = normalize(symptoms);

  if (
    s.includes("peito") ||
    s.includes("coracao") ||
    s.includes("palpit") ||
    s.includes("falta de ar")
  ) {
    return {
      specialty: "Cardiologista",
      reason: "Sintomas compatíveis com avaliação cardiovascular.",
      priority: "Alta",
    };
  }

  if (
    s.includes("pele") ||
    s.includes("coceira") ||
    s.includes("manchas") ||
    s.includes("alergia")
  ) {
    return {
      specialty: "Dermatologista",
      reason: "Os sintomas parecem relacionados com pele ou reação cutânea.",
      priority: "Baixa",
    };
  }

  if (
    s.includes("gravida") ||
    s.includes("menstru") ||
    s.includes("pelv") ||
    s.includes("gesta")
  ) {
    return {
      specialty: "Ginecologista",
      reason: "Os sintomas sugerem avaliação ginecológica.",
      priority: "Média",
    };
  }

  if (
    s.includes("osso") ||
    s.includes("joelho") ||
    s.includes("tornozelo") ||
    s.includes("ombro") ||
    s.includes("fratura") ||
    s.includes("muscular") ||
    s.includes("coluna")
  ) {
    return {
      specialty: "Ortopedista",
      reason: "Os sintomas indicam possível necessidade ortopédica.",
      priority: "Média",
    };
  }

  if (
    s.includes("cabeca") ||
    s.includes("enxaqueca") ||
    s.includes("convuls") ||
    s.includes("tontura")
  ) {
    return {
      specialty: "Neurologista",
      reason: "Pode ser útil uma avaliação neurológica.",
      priority: "Média",
    };
  }

  if (
    s.includes("tumor") ||
    s.includes("cancro") ||
    s.includes("cancer") ||
    s.includes("massa")
  ) {
    return {
      specialty: "Oncologista",
      reason: "Os termos descritos sugerem acompanhamento oncológico.",
      priority: "Alta",
    };
  }

  if (s.includes("crianca") || s.includes("bebe") || s.includes("pedi")) {
    return {
      specialty: "Pediatra",
      reason: "A descrição parece relacionada a atendimento pediátrico.",
      priority: "Média",
    };
  }

  if (
    s.includes("febre") ||
    s.includes("dor") ||
    s.includes("tosse") ||
    s.includes("fraqueza") ||
    s.includes("mal estar")
  ) {
    return {
      specialty: "Médico Geral",
      reason: "Os sintomas pedem triagem clínica geral inicial.",
      priority: "Baixa",
    };
  }

  return {
    specialty: "Médico Geral",
    reason: "Sem padrão claro; começamos com avaliação clínica geral.",
    priority: "Baixa",
  };
}

function getHospitalStatusDescription(status: CapacityStatus) {
  if (status === "Vazio") return "Baixa lotação";
  if (status === "Moderado") return "Lotação moderada";
  return "Alta lotação";
}

export default function ConsultasPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("Médico Geral");
  const [hospitalFilter, setHospitalFilter] = useState<"public" | "all">("public");
  const [searchTerm, setSearchTerm] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [userPosition, setUserPosition] = useState<UserPoint>({ x: 6, y: 8 });
  const [selectedHospitalId, setSelectedHospitalId] = useState<number | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisStep, setAnalysisStep] = useState("");
  const [analysisRecommendation, setAnalysisRecommendation] = useState<{
    specialty: string;
    reason: string;
    priority: RecommendationPriority;
  } | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const specialtyOptions = useMemo(() => {
    const q = normalize(searchTerm);
    if (!q) return SPECIALTIES;
    return SPECIALTIES.filter((item) => normalize(item).includes(q));
  }, [searchTerm]);

  const filteredHospitals = useMemo(() => {
    return HOSPITALS.filter((hospital) => {
      const typeMatch =
        hospitalFilter === "all" ? true : hospital.type === hospitalFilter;
      const specialtyMatch = hospital.specialties.includes(selectedSpecialty);
      return typeMatch && specialtyMatch;
    });
  }, [hospitalFilter, selectedSpecialty]);

  const rankedHospitals = useMemo(() => {
    return [...filteredHospitals]
      .map((hospital) => {
        const d = distance(userPosition, { x: hospital.x, y: hospital.y });
        const matchingDoctors = hospital.doctors.filter(
          (doctor) => doctor.specialty === selectedSpecialty
        );
        const availableDoctors = matchingDoctors.filter((doctor) => doctor.available);

        let score = d;
        if (availableDoctors.length > 0) score -= 1.2;
        if (hospital.status === "Vazio") score -= 0.8;
        if (hospital.status === "Cheio") score += 1.2;
        score -= hospital.rating * 0.08;

        return {
          hospital,
          distance: d,
          score,
          matchingDoctors,
          availableDoctors,
        };
      })
      .sort((a, b) => a.score - b.score);
  }, [filteredHospitals, selectedSpecialty, userPosition]);

  const recommendedHospital = rankedHospitals[0] ?? null;

  useEffect(() => {
    if (recommendedHospital) {
      setSelectedHospitalId(recommendedHospital.hospital.id);
    } else {
      setSelectedHospitalId(null);
    }
  }, [recommendedHospital]);

  const selectedHospitalData =
    rankedHospitals.find((item) => item.hospital.id === selectedHospitalId) ?? null;

  const selectedHospital = selectedHospitalData?.hospital ?? null;
  const selectedDoctors = selectedHospitalData?.matchingDoctors ?? [];
  const selectedAvailableDoctors = selectedHospitalData?.availableDoctors ?? [];
  const recommendedDoctor =
    recommendedHospital?.availableDoctors[0] ??
    recommendedHospital?.matchingDoctors[0] ??
    null;

  const loadingMessages = [
    "A analisar sintomas principais...",
    "A cruzar sintomas com especialidades...",
    "A verificar hospitais compatíveis...",
    "A calcular proximidade e lotação...",
    "A preparar recomendação clínica simulada...",
  ];

  const submitPanel = () => {
    setHasSubmitted(true);
    if (symptoms.trim()) {
      runSymptomsSimulation();
    }
  };

  const runSymptomsSimulation = () => {
    const result = inferSpecialtyFromSymptoms(symptoms || selectedSpecialty);

    setAnalysisLoading(true);
    setAnalysisRecommendation(null);
    setAnalysisStep(loadingMessages[0]);

    let index = 0;

    const interval = setInterval(() => {
      index += 1;
      if (index < loadingMessages.length) {
        setAnalysisStep(loadingMessages[index]);
      }
    }, 850);

    setTimeout(() => {
      clearInterval(interval);
      setAnalysisLoading(false);
      setAnalysisStep("");
      setAnalysisRecommendation(result);
      setSelectedSpecialty(result.specialty);
    }, 4200);
  };

  const roadsHorizontal = [1, 3, 5, 7, 8];
  const roadsVertical = [2, 4, 6, 8, 10];

  const moveUser = (x: number, y: number) => {
    setUserPosition({ x, y });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_20px_60px_rgba(16,24,40,0.08)] backdrop-blur">
          <p className="mb-1 text-sm font-semibold uppercase tracking-[0.18em] text-green-600">
            ViaVerde Consultas
          </p>
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Simulação inteligente de hospitais em Maputo
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            Escolha a especialidade ou descreva sintomas para receber uma recomendação
            simples e rápida.
          </p>
        </div>

        <div className={`grid gap-6 ${hasSubmitted ? "xl:grid-cols-[minmax(0,1fr)_380px]" : ""}`}>
          {hasSubmitted && (
            <section className="space-y-6 order-2 xl:order-1">
              <section className="rounded-[30px] border border-slate-200/80 bg-white p-4 shadow-[0_20px_60px_rgba(16,24,40,0.08)]">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 md:text-xl">
                      Mapa simulado de Maputo
                    </h2>
                    <p className="text-sm text-slate-500">
                      Toque num bloco para mover o utilizador ou selecione um hospital.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
                    <Navigation size={16} className="text-green-600" />
                    Bloco {userPosition.x}, {userPosition.y}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <div
                    className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#eef7ff_100%)]"
                    style={{
                      width: GRID_W * CELL,
                      height: GRID_H * CELL,
                      minWidth: GRID_W * CELL,
                    }}
                  >
                    <div className="absolute inset-0">
                      {Array.from({ length: GRID_H }).map((_, y) =>
                        Array.from({ length: GRID_W }).map((__, x) => {
                          const isRoad =
                            roadsHorizontal.includes(y) || roadsVertical.includes(x);

                          return (
                            <div
                              key={`${x}-${y}`}
                              onClick={() => moveUser(x, y)}
                              className={`absolute cursor-pointer border border-white/70 transition ${
                                isRoad
                                  ? "bg-slate-200/80 hover:bg-slate-300/80"
                                  : "bg-emerald-50/60 hover:bg-emerald-100/80"
                              }`}
                              style={{
                                left: x * CELL,
                                top: y * CELL,
                                width: CELL,
                                height: CELL,
                              }}
                            />
                          );
                        })
                      )}
                    </div>

                    <svg
                      className="pointer-events-none absolute inset-0 h-full w-full"
                      viewBox={`0 0 ${GRID_W * CELL} ${GRID_H * CELL}`}
                    >
                      {roadsHorizontal.map((row) => (
                        <line
                          key={`h-${row}`}
                          x1={0}
                          y1={row * CELL + CELL / 2}
                          x2={GRID_W * CELL}
                          y2={row * CELL + CELL / 2}
                          stroke="#94a3b8"
                          strokeWidth="7"
                          strokeDasharray="10 8"
                          opacity="0.8"
                        />
                      ))}

                      {roadsVertical.map((col) => (
                        <line
                          key={`v-${col}`}
                          x1={col * CELL + CELL / 2}
                          y1={0}
                          x2={col * CELL + CELL / 2}
                          y2={GRID_H * CELL}
                          stroke="#94a3b8"
                          strokeWidth="7"
                          strokeDasharray="10 8"
                          opacity="0.8"
                        />
                      ))}

                      {selectedHospital && (
                        <line
                          x1={userPosition.x * CELL + CELL / 2}
                          y1={userPosition.y * CELL + CELL / 2}
                          x2={selectedHospital.x * CELL + CELL / 2}
                          y2={selectedHospital.y * CELL + CELL / 2}
                          stroke="#16a34a"
                          strokeWidth="4"
                          strokeDasharray="8 8"
                          opacity="0.9"
                        />
                      )}
                    </svg>

                    {HOSPITALS.map((hospital) => {
                      const isVisible = rankedHospitals.some(
                        (item) => item.hospital.id === hospital.id
                      );
                      const isSelected = selectedHospitalId === hospital.id;
                      const isRecommended = recommendedHospital?.hospital.id === hospital.id;

                      return (
                        <button
                          key={hospital.id}
                          type="button"
                          onClick={() => setSelectedHospitalId(hospital.id)}
                          className={`absolute z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border-2 shadow-md transition hover:scale-105 ${
                            isSelected
                              ? "border-green-600 bg-green-600 text-white"
                              : isRecommended
                              ? "border-blue-500 bg-blue-500 text-white"
                              : isVisible
                              ? "border-slate-200 bg-white text-slate-700"
                              : "border-slate-200 bg-slate-100 text-slate-400"
                          }`}
                          style={{
                            left: hospital.x * CELL + CELL / 2,
                            top: hospital.y * CELL + CELL / 2,
                          }}
                        >
                          <Hospital size={16} />
                        </button>
                      );
                    })}

                    <div
                      className="absolute z-30 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-slate-900 text-white shadow-lg"
                      style={{
                        left: userPosition.x * CELL + CELL / 2,
                        top: userPosition.y * CELL + CELL / 2,
                      }}
                    >
                      <UserRound size={16} />
                    </div>
                  </div>
                </div>
              </section>

              {recommendedHospital && (
                <section className="rounded-[28px] border border-green-200 bg-gradient-to-br from-green-50 to-blue-50 p-5 shadow-[0_20px_60px_rgba(16,24,40,0.08)]">
                  <div className="mb-3 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-green-600" />
                    <h3 className="text-lg font-bold text-slate-900">Melhor recomendação</h3>
                  </div>

                  <div className="rounded-2xl bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-base font-bold text-slate-900 md:text-lg">
                          {recommendedHospital.hospital.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          {recommendedHospital.hospital.zone}
                        </p>
                      </div>
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[recommendedHospital.hospital.status]}`}
                      >
                        {recommendedHospital.hospital.status}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-2xl bg-slate-50 p-3">
                        <p className="text-slate-500">Distância</p>
                        <p className="font-semibold text-slate-900">
                          {formatGridDistance(recommendedHospital.distance)}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-slate-50 p-3">
                        <p className="text-slate-500">Espera</p>
                        <p className="font-semibold text-slate-900">
                          {recommendedHospital.hospital.estimatedWait} min
                        </p>
                      </div>
                    </div>

                    {recommendedDoctor && (
                      <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                        <p className="font-semibold text-slate-900">
                          {recommendedDoctor.name}
                        </p>
                        <p className="text-sm text-slate-600">
                          {recommendedDoctor.specialty} • {recommendedDoctor.nextSlot}
                        </p>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => setSelectedHospitalId(recommendedHospital.hospital.id)}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                    >
                      Ver unidade
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </section>
              )}

              <section className="rounded-[28px] border border-slate-200/80 bg-white p-5 shadow-[0_20px_60px_rgba(16,24,40,0.08)]">
                <div className="mb-4 flex items-center gap-2">
                  <Building2 size={18} className="text-blue-600" />
                  <h3 className="text-lg font-bold text-slate-900">Hospitais compatíveis</h3>
                </div>

                <div className="space-y-3">
                  {rankedHospitals.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                      Não há hospitais compatíveis com esta especialidade.
                    </div>
                  )}

                  {rankedHospitals.map((item, index) => (
                    <button
                      key={item.hospital.id}
                      type="button"
                      onClick={() => setSelectedHospitalId(item.hospital.id)}
                      className={`w-full rounded-2xl border p-4 text-left transition ${
                        selectedHospitalId === item.hospital.id
                          ? "border-green-500 bg-green-50"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            {index === 0 && (
                              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
                                Recomendado
                              </span>
                            )}
                            <p className="font-semibold text-slate-900">{item.hospital.name}</p>
                          </div>
                          <p className="mt-1 text-sm text-slate-500">
                            {item.hospital.zone}
                          </p>
                        </div>
                        <ChevronRight size={18} className="text-slate-400" />
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">
                          {formatGridDistance(item.distance)}
                        </span>
                        <span
                          className={`rounded-full border px-2.5 py-1 ${statusStyles[item.hospital.status]}`}
                        >
                          {item.hospital.status}
                        </span>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">
                          {item.hospital.estimatedWait} min
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            </section>
          )}

          <aside className={`space-y-6 ${hasSubmitted ? "order-1 xl:order-2" : ""}`}>
            <section className="rounded-[28px] border border-slate-200/80 bg-white p-5 shadow-[0_20px_60px_rgba(16,24,40,0.08)]">
              <div className="mb-4 flex items-center gap-2">
                <Sparkles size={18} className="text-green-600" />
                <h3 className="text-lg font-bold text-slate-900">Painel de consulta</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Procurar especialidade
                  </label>
                  <div className="relative">
                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Ex: cardio, derma, orto..."
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-green-400 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Especialidade
                  </label>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-green-400 focus:bg-white"
                  >
                    {specialtyOptions.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Tipo de hospital
                  </label>
                  <div className="flex rounded-2xl bg-slate-100 p-1">
                    <button
                      type="button"
                      onClick={() => setHospitalFilter("public")}
                      className={`flex-1 rounded-2xl px-4 py-2 text-sm font-medium transition ${
                        hospitalFilter === "public"
                          ? "bg-green-600 text-white shadow"
                          : "text-slate-600"
                      }`}
                    >
                      Público
                    </button>
                    <button
                      type="button"
                      onClick={() => setHospitalFilter("all")}
                      className={`flex-1 rounded-2xl px-4 py-2 text-sm font-medium transition ${
                        hospitalFilter === "all"
                          ? "bg-blue-600 text-white shadow"
                          : "text-slate-600"
                      }`}
                    >
                      Público + Privado
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Sintomas
                  </label>
                  <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    rows={4}
                    placeholder="Ex: dor no peito, falta de ar, tontura..."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-400"
                  />

                  <div className="mt-3 flex flex-wrap gap-2">
                    {QUICK_SYMPTOMS.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setSymptoms(item)}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-green-300 hover:text-green-700"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {!hasSubmitted && (
                  <button
                    type="button"
                    onClick={submitPanel}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
                  >
                    <Activity size={16} />
                    Continuar
                  </button>
                )}

                {hasSubmitted && (
                  <>
                    {analysisLoading && (
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                          <Activity size={16} className="animate-pulse text-green-600" />
                          Sistema em análise
                        </div>
                        <p className="text-sm text-slate-500">{analysisStep}</p>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-green-500 to-blue-500" />
                        </div>
                      </div>
                    )}

                    {analysisRecommendation && !analysisLoading && (
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              Recomendação simulada
                            </p>
                            <p className="mt-1 text-sm text-slate-600">
                              {analysisRecommendation.reason}
                            </p>
                          </div>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[analysisRecommendation.priority]}`}
                          >
                            {analysisRecommendation.priority}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center gap-2 text-sm text-green-700">
                          <Stethoscope size={16} />
                          <span className="font-semibold">
                            {analysisRecommendation.specialty}
                          </span>
                        </div>
                      </div>
                    )}

                    {selectedHospital && !analysisLoading && (
                      <section className="rounded-[28px] border border-slate-200/80 bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <div>
                            <div className="mb-1 flex items-center gap-2">
                              <MapPin size={16} className="text-green-600" />
                              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-green-600">
                                Unidade selecionada
                              </p>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">
                              {selectedHospital.name}
                            </h3>
                            <p className="text-sm text-slate-500">
                              {selectedHospital.zone}
                            </p>
                          </div>

                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[selectedHospital.status]}`}
                          >
                            {selectedHospital.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-2xl bg-slate-50 p-3">
                            <div className="mb-1 flex items-center gap-2 text-slate-500">
                              <Clock3 size={15} />
                              <span className="text-xs">Espera</span>
                            </div>
                            <p className="font-semibold text-slate-900">
                              {selectedHospital.estimatedWait} min
                            </p>
                          </div>

                          <div className="rounded-2xl bg-slate-50 p-3">
                            <div className="mb-1 flex items-center gap-2 text-slate-500">
                              <Navigation size={15} />
                              <span className="text-xs">Distância</span>
                            </div>
                            <p className="font-semibold text-slate-900">
                              {formatGridDistance(selectedHospitalData?.distance ?? 0)}
                            </p>
                          </div>

                          <div className="rounded-2xl bg-slate-50 p-3">
                            <div className="mb-1 flex items-center gap-2 text-slate-500">
                              <Users size={15} />
                              <span className="text-xs">Disponíveis</span>
                            </div>
                            <p className="font-semibold text-slate-900">
                              {selectedAvailableDoctors.length}/{selectedDoctors.length}
                            </p>
                          </div>

                          <div className="rounded-2xl bg-slate-50 p-3">
                            <div className="mb-1 flex items-center gap-2 text-slate-500">
                              <Building2 size={15} />
                              <span className="text-xs">Estado</span>
                            </div>
                            <p className="font-semibold text-slate-900">
                              {getHospitalStatusDescription(selectedHospital.status)}
                            </p>
                          </div>
                        </div>

                        {selectedDoctors.length > 0 && (
                          <div className="mt-4 rounded-2xl bg-slate-50 p-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                              Médico principal
                            </p>
                            <p className="mt-1 font-semibold text-slate-900">
                              {selectedDoctors[0].name}
                            </p>
                            <p className="text-sm text-slate-600">
                              {selectedDoctors[0].nextSlot}
                            </p>
                          </div>
                        )}
                      </section>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setHasSubmitted(false);
                        setAnalysisLoading(false);
                        setAnalysisStep("");
                        setAnalysisRecommendation(null);
                      }}
                      className="w-full rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                    >
                      Editar pesquisa
                    </button>
                  </>
                )}
              </div>
            </section>

            {hasSubmitted && (
              <section className="rounded-[28px] border border-amber-200 bg-amber-50 p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle size={18} className="mt-0.5 text-amber-600" />
                  <div>
                    <p className="font-semibold text-amber-800">Nota</p>
                    <p className="mt-1 text-sm text-amber-700">
                      Esta página é uma simulação visual e funcional para prototipagem.
                    </p>
                  </div>
                </div>
              </section>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}