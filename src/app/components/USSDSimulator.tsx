"use client";

import React, { useEffect, useMemo, useState } from "react";
import { X, Phone, PhoneOff, Delete, CornerDownLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MotionDiv = motion.div as React.FC<any>;
const MotionButton = motion.button as React.FC<any>;

type Screen =
  | "idle"
  | "main"
  | "booking_specialty"
  | "booking_hospital_type"
  | "booking_notes"
  | "booking_analyzing"
  | "booking_recommendation"
  | "booking_confirm"
  | "booking_ticket"
  | "history_name"
  | "history_list"
  | "history_detail"
  | "queue_ticket"
  | "queue_result"
  | "contacts";

type HospitalType = "public" | "private";
type CapacityStatus = "Vazio" | "Moderado" | "Cheio";
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
  district: string;
  distance: number;
  estimatedWait: number;
  status: CapacityStatus;
  contact: string;
  hours: string;
  specialties: string[];
  doctors: Doctor[];
};

type HistoryItem = {
  id: string;
  date: string;
  hospital: string;
  title: string;
  status: string;
  doctor: string;
};

interface USSDState {
  screen: Screen;
  currentInput: string;
  inputBuffer: string;
  messages: string[];

  selectedSpecialty: string;
  selectedHospitalType: HospitalType | "all";
  notes: string;

  patientPhone: string;
  patientName: string;

  recommendedHospital: HospitalItem | null;
  recommendedDoctor: Doctor | null;
  urgency: UrgencyTraffic;
  ticketNumber: string;

  historyItems: HistoryItem[];
  selectedHistoryItem: HistoryItem | null;

  queueLookupTicket: string;
  queueStatus: string;
}

const CURRENT_USER_NAME = "Nilton Novele";
const CURRENT_USER_PHONE = "840000000";

const SPECIALTIES = [
  "Médico Geral",
  "Cardiologista",
  "Dermatologista",
  "Ginecologista",
  "Ortopedista",
  "Neurologista",
  "Pediatra",
  "Dentista",
];

const HOSPITALS: HospitalItem[] = [
  {
    id: 1,
    name: "Hospital Central de Maputo",
    type: "public",
    district: "Maputo",
    distance: 2,
    estimatedWait: 34,
    status: "Moderado",
    contact: "+258 21 000 001",
    hours: "24 horas",
    specialties: [
      "Médico Geral",
      "Cardiologista",
      "Neurologista",
      "Ortopedista",
      "Ginecologista",
      "Pediatra",
    ],
    doctors: [
      {
        id: 11,
        name: "Dr. Paulo Nhantumbo",
        specialty: "Cardiologista",
        available: true,
        nextSlot: "Hoje 15:30",
        experience: "12 anos",
      },
      {
        id: 12,
        name: "Dra. Catarina Bila",
        specialty: "Ginecologista",
        available: true,
        nextSlot: "Hoje 16:10",
        experience: "9 anos",
      },
      {
        id: 13,
        name: "Dr. Ernesto Mussa",
        specialty: "Médico Geral",
        available: true,
        nextSlot: "Hoje 13:45",
        experience: "8 anos",
      },
    ],
  },
  {
    id: 2,
    name: "Hospital Geral de Mavalane",
    type: "public",
    district: "Mavalane",
    distance: 5,
    estimatedWait: 22,
    status: "Vazio",
    contact: "+258 21 000 002",
    hours: "24 horas",
    specialties: [
      "Médico Geral",
      "Dermatologista",
      "Ortopedista",
      "Pediatra",
    ],
    doctors: [
      {
        id: 21,
        name: "Dra. Elisa Mucavele",
        specialty: "Médico Geral",
        available: true,
        nextSlot: "Hoje 11:20",
        experience: "7 anos",
      },
      {
        id: 22,
        name: "Dr. Luís Juma",
        specialty: "Ortopedista",
        available: true,
        nextSlot: "Hoje 14:00",
        experience: "11 anos",
      },
      {
        id: 23,
        name: "Dra. Camila Ubisse",
        specialty: "Dermatologista",
        available: false,
        nextSlot: "Amanhã 08:30",
        experience: "6 anos",
      },
    ],
  },
  {
    id: 3,
    name: "Hospital José Macamo",
    type: "public",
    district: "Polana",
    distance: 3,
    estimatedWait: 41,
    status: "Cheio",
    contact: "+258 21 000 003",
    hours: "24 horas",
    specialties: ["Médico Geral", "Neurologista"],
    doctors: [
      {
        id: 31,
        name: "Dra. Teresa Zimba",
        specialty: "Neurologista",
        available: false,
        nextSlot: "Amanhã 10:00",
        experience: "9 anos",
      },
      {
        id: 32,
        name: "Dr. Carlos Manjate",
        specialty: "Médico Geral",
        available: true,
        nextSlot: "Hoje 17:00",
        experience: "13 anos",
      },
    ],
  },
  {
    id: 4,
    name: "Clínica Sommerschield",
    type: "private",
    district: "Sommerschield",
    distance: 2,
    estimatedWait: 14,
    status: "Vazio",
    contact: "+258 21 000 004",
    hours: "08:00 - 20:00",
    specialties: ["Dermatologista", "Dentista", "Ginecologista"],
    doctors: [
      {
        id: 41,
        name: "Dra. Ana Sitoe",
        specialty: "Dermatologista",
        available: true,
        nextSlot: "Hoje 12:10",
        experience: "8 anos",
      },
      {
        id: 42,
        name: "Dr. Joel Mavie",
        specialty: "Dentista",
        available: true,
        nextSlot: "Hoje 15:00",
        experience: "5 anos",
      },
    ],
  },
  {
    id: 5,
    name: "Clínica MaputoCare",
    type: "private",
    district: "Polana",
    distance: 4,
    estimatedWait: 19,
    status: "Moderado",
    contact: "+258 21 000 005",
    hours: "07:00 - 22:00",
    specialties: ["Cardiologista", "Neurologista", "Médico Geral"],
    doctors: [
      {
        id: 51,
        name: "Dr. Ricardo Mbanze",
        specialty: "Cardiologista",
        available: false,
        nextSlot: "Amanhã 11:00",
        experience: "15 anos",
      },
      {
        id: 52,
        name: "Dr. Nelson Mucana",
        specialty: "Neurologista",
        available: true,
        nextSlot: "Hoje 16:40",
        experience: "12 anos",
      },
    ],
  },
];

const MOCK_HISTORY: Record<string, HistoryItem[]> = {
  "840000000": [
    {
      id: "VV-10021",
      date: "2026-03-18",
      hospital: "Hospital Central de Maputo",
      title: "Dor torácica aguda",
      status: "Resolvido",
      doctor: "Dr. Paulo Nhantumbo",
    },
    {
      id: "VV-10022",
      date: "2026-02-11",
      hospital: "Hospital Geral de Mavalane",
      title: "Febre alta persistente",
      status: "Concluído",
      doctor: "Dra. Elisa Mucavele",
    },
    {
      id: "VV-10023",
      date: "2026-01-05",
      hospital: "Hospital José Macamo",
      title: "Consulta neurológica",
      status: "Seguimento",
      doctor: "Dra. Teresa Zimba",
    },
  ],
};

const KEYBOARD_ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

function generateTicket() {
  return `VV-${Math.floor(100000 + Math.random() * 900000)}`;
}

function normalize(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function inferSpecialty(notes: string): { specialty: string; urgency: UrgencyTraffic } {
  const s = normalize(notes);

  if (
    s.includes("peito") ||
    s.includes("coracao") ||
    s.includes("palpit") ||
    s.includes("falta de ar")
  ) {
    return { specialty: "Cardiologista", urgency: "Vermelho" };
  }

  if (
    s.includes("pele") ||
    s.includes("coceira") ||
    s.includes("manchas") ||
    s.includes("alergia")
  ) {
    return { specialty: "Dermatologista", urgency: "Verde" };
  }

  if (
    s.includes("joelho") ||
    s.includes("osso") ||
    s.includes("fratura") ||
    s.includes("ombro") ||
    s.includes("coluna")
  ) {
    return { specialty: "Ortopedista", urgency: "Amarelo" };
  }

  if (
    s.includes("cabeca") ||
    s.includes("enxaqueca") ||
    s.includes("tontura")
  ) {
    return { specialty: "Neurologista", urgency: "Amarelo" };
  }

  if (
    s.includes("gravida") ||
    s.includes("menstru") ||
    s.includes("pelv")
  ) {
    return { specialty: "Ginecologista", urgency: "Amarelo" };
  }

  if (s.includes("dente") || s.includes("dent")) {
    return { specialty: "Dentista", urgency: "Verde" };
  }

  return { specialty: "Médico Geral", urgency: "Verde" };
}

function recommendHospital(
  selectedSpecialty: string,
  selectedType: HospitalType | "all",
  notes: string
) {
  const inferred = inferSpecialty(notes);
  const finalSpecialty =
    selectedSpecialty === "skip" ? inferred.specialty : selectedSpecialty;

  const candidates = HOSPITALS.filter((hospital) => {
    const typeMatch = selectedType === "all" ? true : hospital.type === selectedType;
    const specialtyMatch = hospital.specialties.includes(finalSpecialty);
    return typeMatch && specialtyMatch;
  });

  const scored = [...candidates]
    .map((hospital) => {
      const matchingDoctors = hospital.doctors.filter(
        (doctor) => doctor.specialty === finalSpecialty
      );
      const availableDoctors = matchingDoctors.filter((doctor) => doctor.available);

      let score = hospital.distance;
      if (availableDoctors.length > 0) score -= 2;
      if (hospital.status === "Vazio") score -= 1;
      if (hospital.status === "Cheio") score += 2;
      score += hospital.estimatedWait * 0.03;

      return {
        hospital,
        doctor: availableDoctors[0] ?? matchingDoctors[0] ?? null,
        score,
        urgency: inferred.urgency,
        specialty: finalSpecialty,
      };
    })
    .sort((a, b) => a.score - b.score);

  return scored[0] ?? null;
}

function getQueueStatus(ticket: string) {
  const num = Number(ticket.replace(/\D/g, "").slice(-2) || "0");

  if (num % 3 === 0) {
    return {
      position: 2,
      eta: "10 min",
      hospital: "Hospital Central de Maputo",
      doctor: "Dr. Paulo Nhantumbo",
    };
  }

  if (num % 3 === 1) {
    return {
      position: 6,
      eta: "24 min",
      hospital: "Hospital Geral de Mavalane",
      doctor: "Dra. Elisa Mucavele",
    };
  }

  return {
    position: 11,
    eta: "41 min",
    hospital: "Hospital José Macamo",
    doctor: "Dr. Carlos Manjate",
  };
}

const USSDSimulator: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [state, setState] = useState<USSDState>({
    screen: "idle",
    currentInput: "",
    inputBuffer: "",
    messages: [],
    selectedSpecialty: "",
    selectedHospitalType: "public",
    notes: "",
    patientPhone: CURRENT_USER_PHONE,
    patientName: "",
    recommendedHospital: null,
    recommendedDoctor: null,
    urgency: "Verde",
    ticketNumber: "",
    historyItems: [],
    selectedHistoryItem: null,
    queueLookupTicket: "",
    queueStatus: "",
  });

  const isTextScreen = useMemo(
    () =>
      [
        "booking_notes",
        "history_name",
        "queue_ticket",
      ].includes(state.screen),
    [state.screen]
  );

  useEffect(() => {
    if (!isOpen || !isTextScreen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();

      if (/^[a-zA-Záàâãäéèêëíìîïóòôõöúùûüçñ0-9+\- ]$/.test(e.key)) {
        setState((prev) => ({
          ...prev,
          inputBuffer: prev.inputBuffer + e.key,
        }));
      } else if (e.key === "Backspace") {
        setState((prev) => ({
          ...prev,
          inputBuffer: prev.inputBuffer.slice(0, -1),
        }));
      } else if (e.key === "Enter") {
        handleSubmitText(state.inputBuffer);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isTextScreen, state.inputBuffer]);

  const showMainMenu = () => {
    setState((prev) => ({
      ...prev,
      screen: "main",
      currentInput: "",
      inputBuffer: "",
      messages: [
        "*808# ViaVerde",
        "",
        "1. Marcar consulta",
        "2. Ver meu histórico",
        "3. Estado da fila",
        "4. Contactos úteis",
        "0. Sair",
      ],
    }));
  };

  const handleCharacter = (char: string) => {
    if (!isTextScreen) return;
    setState((prev) => ({
      ...prev,
      inputBuffer: prev.inputBuffer + char.toLowerCase(),
    }));
  };

  const handleBackspace = () => {
    setState((prev) => ({
      ...prev,
      inputBuffer: prev.inputBuffer.slice(0, -1),
    }));
  };

  const handleDigit = (digit: string) => {
    if (state.screen === "idle") {
      showMainMenu();
      return;
    }

    setState((prev) => ({
      ...prev,
      currentInput: digit,
    }));

    setTimeout(() => {
      handleMenuSelection(digit);
    }, 220);
  };

  const handleSubmitText = (text: string) => {
    const value = text.trim();

    if (state.screen === "booking_notes") {
      if (!value) {
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, "", "Notas inválidas. Tente novamente."],
          inputBuffer: "",
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        notes: value,
        screen: "booking_analyzing",
        messages: [
          "A processar consulta...",
          "A analisar especialidade...",
          "A verificar hospitais e médicos...",
          "",
          "⏳ Aguarde...",
        ],
        inputBuffer: "",
        currentInput: "",
      }));

      setTimeout(() => {
        const rec = recommendHospital(
          state.selectedSpecialty || "skip",
          state.selectedHospitalType,
          value
        );

        if (!rec) {
          setState((prev) => ({
            ...prev,
            screen: "booking_confirm",
            messages: [
              "Não encontrámos",
              "unidade compatível.",
              "",
              "1. Recomeçar",
              "0. Sair",
            ],
          }));
          return;
        }

        setState((prev) => ({
          ...prev,
          selectedSpecialty: rec.specialty,
          recommendedHospital: rec.hospital,
          recommendedDoctor: rec.doctor,
          urgency: rec.urgency,
          screen: "booking_recommendation",
          messages: [
            "Melhor unidade:",
            `${rec.hospital.name}`,
            `${rec.hospital.type === "public" ? "Pública" : "Privada"} • ${rec.hospital.district}`,
            `Especialidade: ${rec.specialty}`,
            `Espera: ${rec.hospital.estimatedWait} min`,
            `Estado: ${rec.hospital.status}`,
            `Urgência: ${rec.urgency}`,
            rec.doctor
              ? `Médico: ${rec.doctor.name}`
              : "Médico: a confirmar",
            "",
            "1. Confirmar",
            "2. Recomeçar",
          ],
          currentInput: "",
          inputBuffer: "",
        }));
      }, 1700);
    } else if (state.screen === "history_name") {
      if (!value) {
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, "", "Nome inválido."],
          inputBuffer: "",
        }));
        return;
      }

      const expected = normalize(CURRENT_USER_NAME);
      const received = normalize(value);

      if (!expected.includes(received) && !received.includes(expected.split(" ")[0])) {
        setState((prev) => ({
          ...prev,
          messages: [
            "Nome não confirmado.",
            "",
            "Tente novamente.",
            `Número atual: ${CURRENT_USER_PHONE}`,
          ],
          inputBuffer: "",
        }));
        return;
      }

      const items = MOCK_HISTORY[CURRENT_USER_PHONE] ?? [];

      setState((prev) => ({
        ...prev,
        patientName: value,
        historyItems: items,
        screen: "history_list",
        messages: [
          "Meu histórico",
          `Número: ${CURRENT_USER_PHONE}`,
          "",
          ...items.slice(0, 3).map((item, idx) => `${idx + 1}. ${item.title}`),
          "",
          "Selecione 1-3",
          "0. Voltar",
        ],
        currentInput: "",
        inputBuffer: "",
      }));
    } else if (state.screen === "queue_ticket") {
      if (!value || value.length < 4) {
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, "", "Ticket inválido."],
          inputBuffer: "",
        }));
        return;
      }

      const queue = getQueueStatus(value);

      setState((prev) => ({
        ...prev,
        queueLookupTicket: value,
        screen: "queue_result",
        messages: [
          "Estado da fila",
          "",
          `Ticket: ${value}`,
          `Posição: ${queue.position}`,
          `Espera estimada: ${queue.eta}`,
          `Hospital: ${queue.hospital}`,
          `Médico: ${queue.doctor}`,
          "",
          "0. Voltar",
        ],
        currentInput: "",
        inputBuffer: "",
      }));
    }
  };

  const handleMenuSelection = (digit: string) => {
    if (digit === "*" || digit === "#") return;

    if (state.screen === "main") {
      if (digit === "1") {
        setState((prev) => ({
          ...prev,
          screen: "booking_specialty",
          messages: [
            "Marcar consulta",
            "",
            "Escolha a especialidade:",
            "1. Médico Geral",
            "2. Cardiologista",
            "3. Dermatologista",
            "4. Ginecologista",
            "5. Ortopedista",
            "6. Neurologista",
            "7. Pediatra",
            "8. Ignorar",
          ],
          currentInput: "",
        }));
      } else if (digit === "2") {
        setState((prev) => ({
          ...prev,
          screen: "history_name",
          messages: [
            "Ver meu histórico",
            "",
            `Número atual: ${CURRENT_USER_PHONE}`,
            "Confirme o seu nome:",
          ],
          currentInput: "",
          inputBuffer: "",
        }));
      } else if (digit === "3") {
        setState((prev) => ({
          ...prev,
          screen: "queue_ticket",
          messages: [
            "Estado da fila",
            "",
            "Introduza o ticket:",
            "(Ex: VV-123456)",
          ],
          currentInput: "",
          inputBuffer: "",
        }));
      } else if (digit === "4") {
        setState((prev) => ({
          ...prev,
          screen: "contacts",
          messages: [
            "Contactos úteis",
            "",
            "Emergência: 117",
            "ViaVerde apoio:",
            "+258 84 000 0000",
            "SMS: 808",
            "",
            "0. Voltar",
          ],
          currentInput: "",
        }));
      } else if (digit === "0") {
        handleHangup();
      }
    } else if (state.screen === "booking_specialty") {
      const map: Record<string, string> = {
        "1": "Médico Geral",
        "2": "Cardiologista",
        "3": "Dermatologista",
        "4": "Ginecologista",
        "5": "Ortopedista",
        "6": "Neurologista",
        "7": "Pediatra",
        "8": "skip",
      };

      if (map[digit]) {
        setState((prev) => ({
          ...prev,
          selectedSpecialty: map[digit],
          screen: "booking_hospital_type",
          messages: [
            "Tipo de unidade",
            "",
            "1. Pública",
            "2. Pública e privada",
            "0. Voltar",
          ],
          currentInput: "",
        }));
      } else if (digit === "0") {
        showMainMenu();
      }
    } else if (state.screen === "booking_hospital_type") {
      if (digit === "1" || digit === "2") {
        setState((prev) => ({
          ...prev,
          selectedHospitalType: digit === "1" ? "public" : "all",
          screen: "booking_notes",
          messages: [
            "Descreva o problema",
            "",
            "Ex: dor no peito",
            "ou consulta rotina",
            "",
            "Prima Enter para enviar",
          ],
          currentInput: "",
          inputBuffer: "",
        }));
      } else if (digit === "0") {
        setState((prev) => ({
          ...prev,
          screen: "booking_specialty",
          messages: [
            "Marcar consulta",
            "",
            "Escolha a especialidade:",
            "1. Médico Geral",
            "2. Cardiologista",
            "3. Dermatologista",
            "4. Ginecologista",
            "5. Ortopedista",
            "6. Neurologista",
            "7. Pediatra",
            "8. Ignorar",
          ],
        }));
      }
    } else if (state.screen === "booking_recommendation") {
      if (digit === "1") {
        const ticket = generateTicket();
        setState((prev) => ({
          ...prev,
          ticketNumber: ticket,
          screen: "booking_confirm",
          messages: [
            "Confirmar marcação",
            "",
            `Unidade: ${prev.recommendedHospital?.name ?? "-"}`,
            `Especialidade: ${prev.selectedSpecialty}`,
            `Urgência: ${prev.urgency}`,
            "",
            "1. Confirmar agora",
            "2. Recomeçar",
            "0. Menu",
          ],
          currentInput: "",
        }));
      } else if (digit === "2") {
        showMainMenu();
      }
    } else if (state.screen === "booking_confirm") {
      if (digit === "1") {
        setState((prev) => ({
          ...prev,
          screen: "booking_ticket",
          messages: [
            "Consulta marcada",
            "",
            `Ticket: ${prev.ticketNumber || generateTicket()}`,
            `Hospital: ${prev.recommendedHospital?.name ?? "-"}`,
            `Especialidade: ${prev.selectedSpecialty}`,
            `Médico: ${prev.recommendedDoctor?.name ?? "A confirmar"}`,
            `Espera: ${prev.recommendedHospital?.estimatedWait ?? "-"} min`,
            `Urgência: ${prev.urgency}`,
            `Estado: ${prev.recommendedHospital?.status ?? "-"}`,
            "",
            "SMS enviado com detalhes",
            "",
            "0. Sair",
          ],
          currentInput: "",
        }));
      } else if (digit === "2") {
        showMainMenu();
      } else if (digit === "0") {
        showMainMenu();
      }
    } else if (state.screen === "booking_ticket") {
      if (digit === "0") {
        handleHangup();
      }
    } else if (state.screen === "history_list") {
      const idx = Number(digit) - 1;
      if (!Number.isNaN(idx) && state.historyItems[idx]) {
        const item = state.historyItems[idx];
        setState((prev) => ({
          ...prev,
          selectedHistoryItem: item,
          screen: "history_detail",
          messages: [
            "Detalhe da ocorrência",
            "",
            `Ref: ${item.id}`,
            `Data: ${item.date}`,
            `Motivo: ${item.title}`,
            `Hospital: ${item.hospital}`,
            `Médico: ${item.doctor}`,
            `Estado: ${item.status}`,
            "",
            "0. Voltar",
          ],
          currentInput: "",
        }));
      } else if (digit === "0") {
        showMainMenu();
      }
    } else if (state.screen === "history_detail") {
      if (digit === "0") {
        setState((prev) => ({
          ...prev,
          screen: "history_list",
          messages: [
            "Meu histórico",
            `Número: ${CURRENT_USER_PHONE}`,
            "",
            ...prev.historyItems.slice(0, 3).map((item, idx) => `${idx + 1}. ${item.title}`),
            "",
            "Selecione 1-3",
            "0. Voltar",
          ],
          currentInput: "",
        }));
      }
    } else if (state.screen === "queue_result") {
      if (digit === "0") {
        showMainMenu();
      }
    } else if (state.screen === "contacts") {
      if (digit === "0") {
        showMainMenu();
      }
    }
  };

  const handleHangup = () => {
    setState({
      screen: "idle",
      currentInput: "",
      inputBuffer: "",
      messages: [],
      selectedSpecialty: "",
      selectedHospitalType: "public",
      notes: "",
      patientPhone: CURRENT_USER_PHONE,
      patientName: "",
      recommendedHospital: null,
      recommendedDoctor: null,
      urgency: "Verde",
      ticketNumber: "",
      historyItems: [],
      selectedHistoryItem: null,
      queueLookupTicket: "",
      queueStatus: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        onClick={onClose}
      >
        <MotionDiv
          initial={{ scale: 0.97, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.97, opacity: 0.8 }}
          onClick={(e: any) => e.stopPropagation()}
          className="relative h-full w-full"
        >
          <div className="flex h-screen w-full flex-col overflow-hidden bg-black shadow-2xl">
            <div className="flex h-8 items-center justify-between bg-black px-8 text-xs text-white">
              <span>9:41</span>
              <div className="flex gap-1">
                <span>📶</span>
                <span>4G</span>
                <span>🔋</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-green-900/40 bg-[#020a02] px-5 py-2 text-[11px] text-green-500">
              <span>USSD SESSION</span>
              <span>*808# ViaVerde</span>
            </div>

            <div className="flex-1 overflow-hidden bg-black text-green-400">
              <div className="flex h-full flex-col justify-between p-5 font-mono">
                <div className="min-h-0 overflow-y-auto pr-1">
                  <div className="space-y-1 text-[15px] leading-6">
                    {state.messages.map((msg, idx) => (
                      <MotionDiv
                        key={idx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={
                          msg.includes("Consulta marcada") ||
                          msg.includes("Melhor unidade") ||
                          msg.includes("Meu histórico") ||
                          msg.includes("Detalhe da ocorrência") ||
                          msg.includes("Estado da fila") ||
                          msg.includes("Contactos úteis")
                            ? "font-bold text-green-300"
                            : ""
                        }
                      >
                        {msg}
                      </MotionDiv>
                    ))}

                    {isTextScreen && (
                      <MotionDiv
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2 font-semibold text-green-300"
                      >
                        &gt; {state.inputBuffer}
                        <span className="animate-pulse">_</span>
                      </MotionDiv>
                    )}

                    {state.screen === "idle" && (
                      <MotionDiv
                        animate={{ opacity: [0.45, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="mt-8 text-sm text-green-500"
                      >
                        Prima qualquer tecla para começar...
                      </MotionDiv>
                    )}
                  </div>
                </div>

                {state.currentInput && !isTextScreen && (
                  <MotionDiv
                    initial={{ scale: 1.15, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="py-2 text-center text-lg font-bold text-green-300"
                  >
                    {state.currentInput}
                  </MotionDiv>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-800 p-4">
              {isTextScreen ? (
                <div className="space-y-2">
                  {KEYBOARD_ROWS.map((row, rowIdx) => (
                    <div key={rowIdx} className="flex justify-center gap-1">
                      {row.map((char) => (
                        <MotionButton
                          key={char}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.92 }}
                          onClick={() => handleCharacter(char)}
                          className="rounded bg-gray-700 px-2 py-2 text-xs font-semibold text-white transition hover:bg-gray-600"
                        >
                          {char.toUpperCase()}
                        </MotionButton>
                      ))}
                    </div>
                  ))}

                  <div className="flex justify-center gap-1">
                    <MotionButton
                      whileTap={{ scale: 0.95 }}
                      onClick={handleBackspace}
                      className="flex flex-1 items-center justify-center gap-1 rounded bg-red-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-red-700"
                    >
                      <Delete size={14} />
                      DEL
                    </MotionButton>

                    <MotionButton
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCharacter(" ")}
                      className="flex-1 rounded bg-gray-700 px-3 py-2 text-xs font-bold text-white transition hover:bg-gray-600"
                    >
                      ESPAÇO
                    </MotionButton>

                    <MotionButton
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSubmitText(state.inputBuffer)}
                      className="flex flex-1 items-center justify-center gap-1 rounded bg-green-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-green-700"
                    >
                      <CornerDownLeft size={14} />
                      OK
                    </MotionButton>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <MotionButton
                        key={num}
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={() => handleDigit(num.toString())}
                        className="rounded bg-gray-700 py-3 font-bold text-white transition hover:bg-gray-600"
                      >
                        {num}
                      </MotionButton>
                    ))}
                  </div>

                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <MotionButton
                      whileTap={{ scale: 0.94 }}
                      onClick={() => handleDigit("*")}
                      className="rounded bg-gray-700 py-3 text-xl font-bold text-white transition hover:bg-gray-600"
                    >
                      *
                    </MotionButton>

                    <MotionButton
                      whileTap={{ scale: 0.94 }}
                      onClick={() => handleDigit("0")}
                      className="rounded bg-gray-700 py-3 font-bold text-white transition hover:bg-gray-600"
                    >
                      0
                    </MotionButton>

                    <MotionButton
                      whileTap={{ scale: 0.94 }}
                      onClick={() => handleDigit("#")}
                      className="rounded bg-gray-700 py-3 text-xl font-bold text-white transition hover:bg-gray-600"
                    >
                      #
                    </MotionButton>
                  </div>
                </>
              )}

              <div className="mt-3 grid grid-cols-2 gap-2">
                <MotionButton
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (state.screen === "idle") {
                      showMainMenu();
                    }
                  }}
                  className={`flex items-center justify-center rounded py-3 font-bold transition ${
                    state.screen !== "idle"
                      ? "cursor-not-allowed bg-gray-600 text-gray-400"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  <Phone size={20} />
                </MotionButton>

                <MotionButton
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleHangup}
                  className="flex items-center justify-center rounded bg-red-600 py-3 font-bold text-white transition hover:bg-red-700"
                >
                  <PhoneOff size={20} />
                </MotionButton>
              </div>
            </div>
          </div>

          <MotionButton
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="absolute right-4 top-4 z-50 rounded-full bg-red-600 p-3 text-white shadow-lg hover:bg-red-700"
          >
            <X size={28} />
          </MotionButton>
        </MotionDiv>
      </MotionDiv>
    </AnimatePresence>
  );
};

export default USSDSimulator;