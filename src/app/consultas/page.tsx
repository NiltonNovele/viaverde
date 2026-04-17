"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  Building2,
  CalendarDays,
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
  X,
  ReceiptText,
} from "lucide-react";

type HospitalType = "public" | "private";
type CapacityStatus = "Vazio" | "Moderado" | "Cheio";
type RecommendationPriority = "Alta" | "Média" | "Baixa";
type UrgencyTraffic = "Verde" | "Amarelo" | "Vermelho";

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
  images: string[];
};

type UserPoint = {
  x: number;
  y: number;
};

type BookingForm = {
  fullName: string;
  phone: string;
  receiveSms: boolean;
};

const MAP_W = 900;
const MAP_H = 620;

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
    x: 540,
    y: 240,
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
    images: [
      "/hospital/hcm/1.jpg",
      "/hospital/hcm/2.jpg",
      "/hospital/hcm/3.jpg",
    ],
  },
  {
    id: 2,
    name: "Hospital Geral de Mavalane",
    type: "public",
    zone: "Mavalane",
    x: 310,
    y: 120,
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
    images: [
      "/hospital/mavalane/1.jpg",
      "/hospital/mavalane/2.jpg",
      "/hospital/mavalane/3.jpg",
    ],
  },
  {
    id: 3,
    name: "Hospital José Macamo",
    type: "public",
    zone: "Maxaquene",
    x: 420,
    y: 320,
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
    images: [
      "/hospital/hjm/1.jpeg",
      "/hospital/hjm/2.jpg",
      "/hospital/hjm/3.jpg",
    ],
  },
  {
    id: 4,
    name: "Clínica Sommerschield",
    type: "private",
    zone: "Sommerschield",
    x: 700,
    y: 150,
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
    images: [
      "/hospital/sommerschield-1.jpg",
      "/hospital/sommerschield-2.jpg",
      "/hospital/sommerschield-3.jpg",
    ],
  },
  {
    id: 5,
    name: "Clínica MaputoCare",
    type: "private",
    zone: "Polana",
    x: 650,
    y: 390,
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
    images: [
      "/hospital/maputocare-1.jpg",
      "/hospital/maputocare-2.jpg",
      "/hospital/maputocare-3.jpg",
    ],
  },
  {
    id: 6,
    name: "Hospital da Matola Sul",
    type: "public",
    zone: "Periferia",
    x: 180,
    y: 500,
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
    images: [
      "/hospital/matola-sul-1.jpg",
      "/hospital/matola-sul-2.jpg",
      "/hospital/matola-sul-3.jpg",
    ],
  },
  {
    id: 7,
    name: "Clínica Costa do Sol",
    type: "private",
    zone: "Costa do Sol",
    x: 780,
    y: 70,
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
    images: [
      "/hospital/costa-sol-1.jpg",
      "/hospital/costa-sol-2.jpg",
      "/hospital/costa-sol-3.jpg",
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

const urgencyStyles: Record<UrgencyTraffic, string> = {
  Verde: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Amarelo: "bg-amber-100 text-amber-700 border-amber-200",
  Vermelho: "bg-rose-100 text-rose-700 border-rose-200",
};

function distance(a: UserPoint, b: UserPoint) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function formatMapDistance(d: number) {
  return `${(d / 95).toFixed(1)} km`;
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
      reason: "Os sintomas descritos pedem avaliação cardiovascular prioritária.",
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
      reason: "Os sintomas indicam necessidade de avaliação ortopédica.",
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
      reason: "Os sinais descritos pedem seguimento oncológico.",
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
    reason: "Sem padrão claro; o melhor início é com avaliação clínica geral.",
    priority: "Baixa",
  };
}

function getUrgencyFromPriority(priority: RecommendationPriority): UrgencyTraffic {
  if (priority === "Alta") return "Vermelho";
  if (priority === "Média") return "Amarelo";
  return "Verde";
}

function getHospitalStatusDescription(status: CapacityStatus) {
  if (status === "Vazio") return "Baixa lotação";
  if (status === "Moderado") return "Lotação moderada";
  return "Alta lotação";
}

function formatTodayDate() {
  return new Date().toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function buildReceiptId() {
  return `VV-${Math.floor(100000 + Math.random() * 900000)}`;
}

export default function ConsultasPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("Médico Geral");
  const [hospitalFilter, setHospitalFilter] = useState<"public" | "all">("public");
  const [searchTerm, setSearchTerm] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [userPosition, setUserPosition] = useState<UserPoint>({ x: 530, y: 490 });
  const [selectedHospitalId, setSelectedHospitalId] = useState<number | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisStep, setAnalysisStep] = useState("");
  const [analysisRecommendation, setAnalysisRecommendation] = useState<{
    specialty: string;
    reason: string;
    priority: RecommendationPriority;
  } | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [receiptId, setReceiptId] = useState("");
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    fullName: "",
    phone: "",
    receiveSms: true,
  });

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
        if (availableDoctors.length > 0) score -= 65;
        if (hospital.status === "Vazio") score -= 40;
        if (hospital.status === "Cheio") score += 55;
        score -= hospital.rating * 4;

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
  const selectedDoctor = selectedAvailableDoctors[0] ?? selectedDoctors[0] ?? null;
  const recommendedDoctor =
    recommendedHospital?.availableDoctors[0] ??
    recommendedHospital?.matchingDoctors[0] ??
    null;

  const effectivePriority: RecommendationPriority =
    analysisRecommendation?.priority ?? "Baixa";

  const urgencyStatus = getUrgencyFromPriority(effectivePriority);

  const loadingMessages = [
    "A analisar sintomas principais...",
    "A cruzar sintomas com especialidades...",
    "A verificar hospitais compatíveis...",
    "A calcular proximidade e lotação...",
    "A preparar a melhor unidade para atendimento...",
  ];

  const submitPanel = () => {
    setHasSubmitted(true);
    setBookingConfirmed(false);
    if (symptoms.trim()) {
      runSymptomsAnalysis();
    } else {
      setAnalysisRecommendation({
        specialty: selectedSpecialty,
        reason: "Especialidade selecionada manualmente.",
        priority: "Baixa",
      });
    }
  };

  const runSymptomsAnalysis = () => {
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

  const openBooking = () => {
    if (!selectedHospital || !selectedDoctor) return;
    setShowBookingModal(true);
  };

  const confirmBooking = () => {
    if (!bookingForm.fullName.trim() || !bookingForm.phone.trim()) return;
    setReceiptId(buildReceiptId());
    setShowBookingModal(false);
    setBookingConfirmed(true);
  };

  const resetEditing = () => {
    setHasSubmitted(false);
    setAnalysisLoading(false);
    setAnalysisStep("");
    setAnalysisRecommendation(null);
    setBookingConfirmed(false);
    setShowBookingModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        {/* Header */}
        <div className="mb-4 sm:mb-6 rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-green-600">
            ViaVerde Consultas
          </p>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">
            Encontre a melhor unidade para a sua consulta
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Escolha a especialidade ou descreva os seus sintomas para ver a unidade
            recomendada, tempo de espera, disponibilidade médica e marcar a consulta.
          </p>
        </div>

        <div className={`grid gap-4 sm:gap-6 ${hasSubmitted ? "lg:grid-cols-[1fr_360px]" : ""}`}>
          {hasSubmitted && (
            <div className="order-2 space-y-4 sm:space-y-5 lg:order-1">
              {/* Mapa */}
              <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 p-3 sm:p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900">Mapa de Maputo</h2>
                      <p className="text-xs sm:text-sm text-slate-500">
                        Toque no mapa para mover a sua localização ou selecione uma unidade.
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-600">
                      <Navigation size={14} className="text-green-600" />
                      Posição atual
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <div
                    className="relative min-w-[760px] bg-slate-100"
                    style={{ width: MAP_W, height: MAP_H }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.05),transparent_18%)]" />

                    <svg
                      className="absolute inset-0 h-full w-full"
                      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
                    >
                      <path
                        d="M40 520 C180 470, 280 500, 390 450 S620 360, 860 300"
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth="26"
                        strokeLinecap="round"
                      />
                      <path
                        d="M110 65 C230 120, 330 160, 430 220 S620 330, 790 470"
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth="20"
                        strokeLinecap="round"
                      />
                      <path
                        d="M250 40 C260 170, 280 270, 320 380 S420 520, 470 585"
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth="18"
                        strokeLinecap="round"
                      />
                      <path
                        d="M640 30 C610 140, 570 235, 540 330 S490 510, 470 590"
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth="18"
                        strokeLinecap="round"
                      />
                      <path
                        d="M55 250 C170 240, 305 220, 470 230 S660 250, 845 230"
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth="15"
                        strokeLinecap="round"
                      />

                      {selectedHospital && (
                        <line
                          x1={userPosition.x}
                          y1={userPosition.y}
                          x2={selectedHospital.x}
                          y2={selectedHospital.y}
                          stroke="#16a34a"
                          strokeWidth="3"
                          strokeDasharray="8 6"
                          opacity="0.8"
                        />
                      )}
                    </svg>

                    <button
                      type="button"
                      onClick={() => setUserPosition({ x: 520, y: 490 })}
                      className="absolute left-[42px] top-[500px] rounded-full bg-white/90 px-2 py-1 text-[11px] font-semibold text-slate-600 shadow-sm"
                    >
                      Av. da Marginal
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserPosition({ x: 205, y: 110 })}
                      className="absolute left-[120px] top-[70px] rounded-full bg-white/90 px-2 py-1 text-[11px] font-semibold text-slate-600 shadow-sm"
                    >
                      Av. Acordos de Lusaka
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserPosition({ x: 260, y: 300 })}
                      className="absolute left-[210px] top-[255px] rounded-full bg-white/90 px-2 py-1 text-[11px] font-semibold text-slate-600 shadow-sm"
                    >
                      Av. Julius Nyerere
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserPosition({ x: 555, y: 120 })}
                      className="absolute left-[575px] top-[72px] rounded-full bg-white/90 px-2 py-1 text-[11px] font-semibold text-slate-600 shadow-sm"
                    >
                      Av. Kenneth Kaunda
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserPosition({ x: 620, y: 225 })}
                      className="absolute left-[650px] top-[205px] rounded-full bg-white/90 px-2 py-1 text-[11px] font-semibold text-slate-600 shadow-sm"
                    >
                      Av. 24 de Julho
                    </button>

                    <div className="absolute left-[32px] top-[52px] h-20 w-28 rounded-lg bg-sky-100/60" />
                    <div className="absolute left-[40px] top-[58px] rounded-full bg-sky-200 px-3 py-1 text-[11px] font-semibold text-sky-800 shadow-sm">
                      Baía de Maputo
                    </div>

                    <div
                      className="absolute z-30 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-slate-800 text-white shadow-md"
                      style={{
                        left: userPosition.x,
                        top: userPosition.y,
                      }}
                    >
                      <UserRound size={14} />
                    </div>

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
                          className={`absolute z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border-2 shadow-sm transition hover:scale-105 ${
                            isSelected
                              ? "border-green-500 bg-green-500 text-white"
                              : isRecommended
                              ? "border-blue-500 bg-blue-500 text-white"
                              : isVisible
                              ? "border-slate-200 bg-white text-slate-700"
                              : "border-slate-200 bg-slate-100 text-slate-400"
                          }`}
                          style={{
                            left: hospital.x,
                            top: hospital.y,
                          }}
                          title={hospital.name}
                        >
                          <Hospital size={16} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Recomendação Principal */}
              {recommendedHospital && (
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 sm:p-5 shadow-sm">
                  <div className="mb-3 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-green-600" />
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">Melhor recomendação</h3>
                  </div>

                  <div className="rounded-lg bg-white p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div>
                        <p className="text-base font-bold text-slate-900">
                          {recommendedHospital.hospital.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          {recommendedHospital.hospital.zone}
                        </p>
                      </div>
                      <span
                        className={`self-start rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[recommendedHospital.hospital.status]}`}
                      >
                        {recommendedHospital.hospital.status}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {recommendedHospital.hospital.images.map((image, index) => (
                        <div
                          key={image}
                          className="h-16 sm:h-20 overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
                        >
                          <img
                            src={image}
                            alt={`${recommendedHospital.hospital.name} ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-slate-500">Distância</p>
                        <p className="font-semibold text-slate-900">
                          {formatMapDistance(recommendedHospital.distance)}
                        </p>
                      </div>
                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-slate-500">Espera</p>
                        <p className="font-semibold text-slate-900">
                          {recommendedHospital.hospital.estimatedWait} min
                        </p>
                      </div>
                    </div>

                    {recommendedDoctor && (
                      <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
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
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                    >
                      Ver unidade
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Lista de Hospitais */}
              <div className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <Building2 size={18} className="text-blue-600" />
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">Hospitais compatíveis</h3>
                </div>

                <div className="space-y-3">
                  {rankedHospitals.length === 0 && (
                    <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                      Não há hospitais compatíveis com esta especialidade.
                    </div>
                  )}

                  {rankedHospitals.map((item, index) => (
                    <button
                      key={item.hospital.id}
                      type="button"
                      onClick={() => setSelectedHospitalId(item.hospital.id)}
                      className={`w-full rounded-lg border p-3 sm:p-4 text-left transition ${
                        selectedHospitalId === item.hospital.id
                          ? "border-green-500 bg-green-50"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
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
                        <ChevronRight size={18} className="text-slate-400 shrink-0" />
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {item.hospital.images.map((image, imageIndex) => (
                          <div
                            key={image}
                            className="h-14 sm:h-16 overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
                          >
                            <img
                              src={image}
                              alt={`${item.hospital.name} ${imageIndex + 1}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">
                          {formatMapDistance(item.distance)}
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
              </div>
            </div>
          )}

          {/* Sidebar */}
          <aside className={`space-y-4 sm:space-y-5 ${hasSubmitted ? "order-1 lg:order-2" : ""}`}>
            <div className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
              {!hasSubmitted ? (
                <>
                  <div className="mb-4 flex items-center gap-2">
                    <Sparkles size={18} className="text-green-600" />
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">Painel de consulta</h3>
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
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-green-400 focus:bg-white"
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
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-green-400 focus:bg-white"
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
                      <div className="flex rounded-lg bg-slate-100 p-1">
                        <button
                          type="button"
                          onClick={() => setHospitalFilter("public")}
                          className={`flex-1 rounded-md px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition ${
                            hospitalFilter === "public"
                              ? "bg-green-600 text-white shadow-sm"
                              : "text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          Público
                        </button>
                        <button
                          type="button"
                          onClick={() => setHospitalFilter("all")}
                          className={`flex-1 rounded-md px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition ${
                            hospitalFilter === "all"
                              ? "bg-blue-600 text-white shadow-sm"
                              : "text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          Público + Privado
                        </button>
                      </div>
                    </div>

                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 sm:p-4">
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Sintomas
                      </label>
                      <textarea
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        rows={4}
                        placeholder="Ex: dor no peito, falta de ar, tontura..."
                        className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-green-400"
                      />

                      <div className="mt-3 flex flex-wrap gap-2">
                        {QUICK_SYMPTOMS.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setSymptoms(item)}
                            className="rounded-full border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-green-300 hover:text-green-700"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={submitPanel}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                    >
                      <Activity size={16} />
                      Continuar
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
                      Consulta preparada
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {selectedSpecialty} • {hospitalFilter === "public" ? "Público" : "Público + Privado"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={resetEditing}
                    className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                  >
                    Editar consulta
                  </button>
                </div>
              )}
            </div>

            {hasSubmitted && analysisLoading && (
              <div className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Activity size={16} className="animate-pulse text-green-600" />
                  A processar consulta
                </div>
                <p className="text-sm text-slate-500">{analysisStep}</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-2/3 animate-pulse rounded-full bg-green-600" />
                </div>
              </div>
            )}

            {hasSubmitted && analysisRecommendation && !analysisLoading && selectedHospital && (
              <>
                <div className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
                  <div className="mb-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <MapPin size={16} className="text-green-600" />
                        <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
                          Unidade selecionada
                        </p>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {selectedHospital.name}
                      </h3>
                      <p className="text-sm text-slate-500">{selectedHospital.zone}</p>
                    </div>

                    <span
                      className={`self-start rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[selectedHospital.status]}`}
                    >
                      {selectedHospital.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="mb-1 flex items-center gap-2 text-slate-500">
                        <Clock3 size={14} />
                        <span className="text-xs">Espera</span>
                      </div>
                      <p className="font-semibold text-slate-900">
                        {selectedHospital.estimatedWait} min
                      </p>
                    </div>

                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="mb-1 flex items-center gap-2 text-slate-500">
                        <Navigation size={14} />
                        <span className="text-xs">Distância</span>
                      </div>
                      <p className="font-semibold text-slate-900">
                        {formatMapDistance(selectedHospitalData?.distance ?? 0)}
                      </p>
                    </div>

                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="mb-1 flex items-center gap-2 text-slate-500">
                        <Users size={14} />
                        <span className="text-xs">Disponíveis</span>
                      </div>
                      <p className="font-semibold text-slate-900">
                        {selectedAvailableDoctors.length}/{selectedDoctors.length}
                      </p>
                    </div>

                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="mb-1 flex items-center gap-2 text-slate-500">
                        <Building2 size={14} />
                        <span className="text-xs">Estado</span>
                      </div>
                      <p className="font-semibold text-slate-900">
                        {getHospitalStatusDescription(selectedHospital.status)}
                      </p>
                    </div>
                  </div>

                  {selectedDoctor && (
                    <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                        Médico atribuído
                      </p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {selectedDoctor.name}
                      </p>
                      <p className="text-sm text-slate-600">
                        {selectedDoctor.specialty} • {selectedDoctor.nextSlot}
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={openBooking}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                  >
                    <CalendarDays size={16} />
                    Marcar consulta
                  </button>
                </div>

                {bookingConfirmed && selectedDoctor && (
                  <div className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
                    <div className="mb-4 flex items-center gap-2">
                      <ReceiptText size={18} className="text-green-600" />
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">Comprovativo digital</h3>
                    </div>

                    <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div>
                          <p className="text-sm text-slate-500">Código</p>
                          <p className="font-bold text-slate-900">{receiptId}</p>
                        </div>
                        <span
                          className={`self-start rounded-full border px-3 py-1 text-xs font-semibold ${urgencyStyles[urgencyStatus]}`}
                        >
                          {urgencyStatus}
                        </span>
                      </div>

                      <div className="mt-4 space-y-3 text-sm">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 border-b border-slate-200 pb-2">
                          <span className="text-slate-500">Paciente</span>
                          <span className="font-medium text-slate-900 text-right">
                            {bookingForm.fullName}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 border-b border-slate-200 pb-2">
                          <span className="text-slate-500">Telefone</span>
                          <span className="font-medium text-slate-900 text-right">
                            {bookingForm.phone}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 border-b border-slate-200 pb-2">
                          <span className="text-slate-500">Data</span>
                          <span className="font-medium text-slate-900 text-right">
                            {formatTodayDate()}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 border-b border-slate-200 pb-2">
                          <span className="text-slate-500">Especialidade</span>
                          <span className="font-medium text-slate-900 text-right">
                            {selectedSpecialty}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 border-b border-slate-200 pb-2">
                          <span className="text-slate-500">Unidade</span>
                          <span className="font-medium text-slate-900 text-right">
                            {selectedHospital.name}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 border-b border-slate-200 pb-2">
                          <span className="text-slate-500">Médico</span>
                          <span className="font-medium text-slate-900 text-right">
                            {selectedDoctor.name}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 border-b border-slate-200 pb-2">
                          <span className="text-slate-500">Próximo horário</span>
                          <span className="font-medium text-slate-900 text-right">
                            {selectedDoctor.nextSlot}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 border-b border-slate-200 pb-2">
                          <span className="text-slate-500">Tempo de espera</span>
                          <span className="font-medium text-slate-900 text-right">
                            {selectedHospital.estimatedWait} min
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 border-b border-slate-200 pb-2">
                          <span className="text-slate-500">Urgência</span>
                          <span className="font-medium text-slate-900 text-right">
                            {urgencyStatus}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <span className="text-slate-500">SMS</span>
                          <span className="font-medium text-slate-900 text-right">
                            {bookingForm.receiveSms ? "Solicitado" : "Não solicitado"}
                          </span>
                        </div>
                      </div>

                      {bookingForm.receiveSms && (
                        <div className="mt-4 rounded-lg bg-emerald-50 px-3 py-3 text-sm text-emerald-700">
                          O resumo da consulta será enviado por SMS para {bookingForm.phone}.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </aside>
        </div>
      </div>

      {/* Modal */}
      {showBookingModal && selectedHospital && selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-3 sm:items-center sm:p-6">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white shadow-xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-4 sm:px-5 py-3 sm:py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
                  Confirmar consulta
                </p>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">Revisão dos dados</h3>
              </div>

              <button
                type="button"
                onClick={() => setShowBookingModal(false)}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 sm:space-y-5 p-4 sm:p-5">
              <div className="rounded-lg bg-slate-50 p-3 sm:p-4">
                <div className="grid gap-3 text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <span className="text-slate-500">Especialidade</span>
                    <span className="font-medium text-slate-900 text-right">
                      {selectedSpecialty}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <span className="text-slate-500">Unidade</span>
                    <span className="font-medium text-slate-900 text-right">
                      {selectedHospital.name}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <span className="text-slate-500">Médico</span>
                    <span className="font-medium text-slate-900 text-right">
                      {selectedDoctor.name}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <span className="text-slate-500">Próximo horário</span>
                    <span className="font-medium text-slate-900 text-right">
                      {selectedDoctor.nextSlot}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <span className="text-slate-500">Tempo de espera</span>
                    <span className="font-medium text-slate-900 text-right">
                      {selectedHospital.estimatedWait} min
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <span className="text-slate-500">Urgência</span>
                    <span className="font-medium text-slate-900 text-right">
                      {urgencyStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Nome completo
                </label>
                <input
                  value={bookingForm.fullName}
                  onChange={(e) =>
                    setBookingForm((prev) => ({ ...prev, fullName: e.target.value }))
                  }
                  placeholder="Introduza o seu nome completo"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-green-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Número de telefone
                </label>
                <input
                  value={bookingForm.phone}
                  onChange={(e) =>
                    setBookingForm((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="+258 84 000 0000"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-green-400 focus:bg-white"
                />
              </div>

              <label className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:p-4">
                <input
                  type="checkbox"
                  checked={bookingForm.receiveSms}
                  onChange={(e) =>
                    setBookingForm((prev) => ({
                      ...prev,
                      receiveSms: e.target.checked,
                    }))
                  }
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-green-600 shrink-0"
                />
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Receber detalhes por SMS
                  </p>
                  <p className="text-xs text-slate-500">
                    Inclui unidade, médico, horário, urgência e tempo de espera.
                  </p>
                </div>
              </label>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="w-full rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={confirmBooking}
                  disabled={!bookingForm.fullName.trim() || !bookingForm.phone.trim()}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <CheckCircle2 size={16} />
                  Confirmar consulta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}