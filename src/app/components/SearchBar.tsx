"use client";

import React, { useState, useEffect } from "react";
import { AlertTriangle, User, Users, MapPin, Loader2 } from "lucide-react";

type Step = "who" | "identity" | "details" | "triage" | "result";

const ViaVerdeForm = () => {
  const [loadingMap, setLoadingMap] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const images = [
    "/hospital/mavalane1.jpg",
    "/hospital/mavalane2.jpg",
    "/hospital/mavalane3.jpg",
  ];

  const [step, setStep] = useState<Step>("who");
  const [isSelf, setIsSelf] = useState<boolean | null>(null);
  const [form, setForm] = useState<any>({});
  const [result, setResult] = useState<any>(null);
  const [loadingText, setLoadingText] = useState("");
  const [isChronic, setIsChronic] = useState(false);
  const [hospitalNumber, setHospitalNumber] = useState("");
  const [profile, setProfile] = useState<any>(null);

  const handleChange = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const loadingMessages = [
    "A analisar sintomas...",
    "A avaliar nível de urgência...",
    "A procurar unidade sanitária mais próxima...",
    "A verificar disponibilidade hospitalar...",
    "A preparar pré-notificação...",
    "A validar protocolos clínicos...",
  ];

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
      }, 6000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [step]);

  const getPriority = () => {
    if (
      form.consciousness === "inconsciente" ||
      form.breathing === "dificuldade" ||
      form.bleeding === "grave"
    )
      return "Alta";

    if (
      form.symptoms?.toLowerCase().includes("dor intensa") ||
      form.symptoms?.toLowerCase().includes("febre alta")
    )
      return "Média";

    return "Baixa";
  };

  const getInstructions = (priority: string) => {
    if (priority === "Alta") {
      return [
        "Dirija-se imediatamente ao hospital mais próximo.",
        "Se possível, chame uma ambulância.",
        "Mantenha o paciente estável e consciente.",
        "Evite movimentos desnecessários.",
      ];
    }

    if (priority === "Média") {
      return [
        "Dirija-se a uma unidade sanitária nas próximas horas.",
        "Mantenha o paciente hidratado.",
        "Evite automedicação sem orientação.",
      ];
    }

    return [
      "Monitorar os sintomas.",
      "Caso piorem, procurar uma unidade sanitária.",
    ];
  };

  const getHospital = () => {
    const hospitals = [
      "Hospital Central de Maputo",
      "Hospital Geral de Mavalane",
      "Hospital José Macamo",
    ];
    return hospitals[Math.floor(Math.random() * hospitals.length)];
  };

  const generateResult = () => {
    const priority = getPriority();
    const instructions = getInstructions(priority);
    const hospital = getHospital();

    setResult({
      priority,
      instructions,
      hospital,
      reference: "VV-" + Math.floor(Math.random() * 100000),
    });

    setStep("result");
  };

  const handleChronicLookup = () => {
    // MOCK PROFILE DATABASE
    const mockProfiles: any = {
      "MPT-0384-18382": {
        name: "Nilton Novele",
        disease: "Diabetes Tipo 2",
        phone: "+258 84 000 0000",
      },
      "MPT-1000-99999": {
        name: "Maria João",
        disease: "Hipertensão",
        phone: "+258 82 111 2222",
      },
    };

    const found = mockProfiles[hospitalNumber];

    if (found) {
      setProfile({ id: hospitalNumber, ...found });
    } else {
      alert("Número hospitalar não encontrado.");
    }
  };

  const submitOccurrence = () => {
    setStep("triage");
  };

  return (
    <>
      <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 p-8 rounded-3xl shadow-xl border max-w-3xl mx-auto">

        {/* PROFILE (CHRONIC PATIENT HEADER) */}
        {profile && (
          <div className="bg-white p-4 rounded-xl shadow border mb-6">
            <h3 className="font-bold text-green-700">Paciente Crónico</h3>
            <p><strong>Nome:</strong> {profile.name}</p>
            <p><strong>Nº Único:</strong> {profile.id}</p>
            <p><strong>Doença:</strong> {profile.disease}</p>
          </div>
        )}

        {/* STEP 1 */}
        {step === "who" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              A ocorrência é para si ou outra pessoa?
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => { setIsSelf(true); setStep("identity"); }} className="choice-btn">
                <User /> Para mim
              </button>

              <button onClick={() => { setIsSelf(false); setStep("identity"); }} className="choice-btn">
                <Users /> Outra pessoa
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === "identity" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Dados do paciente</h2>

            {/* CHRONIC OPTION */}
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={isChronic}
                onChange={(e) => setIsChronic(e.target.checked)}
              />
              Paciente crónico
            </label>

            {isChronic && (
              <div className="space-y-2">
                <input
                  placeholder="Número Único Hospitalar (ex: MPT-XXXX)"
                  className="input"
                  value={hospitalNumber}
                  onChange={(e) => setHospitalNumber(e.target.value)}
                />

                <button
                  onClick={handleChronicLookup}
                  className="btn-primary w-full"
                >
                  Validar Paciente
                </button>
              </div>
            )}

            <input
              placeholder="Nome"
              className="input"
              onChange={(e) => handleChange("name", e.target.value)}
            />

            <input
              placeholder="Apelido"
              className="input"
              onChange={(e) => handleChange("surname", e.target.value)}
            />

            <input
              placeholder="Telefone"
              className="input"
              onChange={(e) => handleChange("phone", e.target.value)}
            />

            <button onClick={() => setStep("details")} className="btn-primary w-full">
              Continuar
            </button>
          </div>
        )}

        {/* STEP 3 */}
        {step === "details" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <AlertTriangle className="text-red-500" /> Detalhes da Emergência
            </h2>

            <select className="input" onChange={(e) => handleChange("type", e.target.value)}>
              <option>Tipo de emergência</option>
              <option>Acidente</option>
              <option>Dor súbita</option>
              <option>Problema respiratório</option>
              <option>Febre</option>
              <option>Outro</option>
            </select>

            <select className="input" onChange={(e) => handleChange("consciousness", e.target.value)}>
              <option>Estado de consciência</option>
              <option value="normal">Consciente</option>
              <option value="confuso">Confuso</option>
              <option value="inconsciente">Inconsciente</option>
            </select>

            <select className="input" onChange={(e) => handleChange("breathing", e.target.value)}>
              <option>Respiração</option>
              <option value="normal">Normal</option>
              <option value="dificuldade">Dificuldade</option>
            </select>

            <select className="input" onChange={(e) => handleChange("bleeding", e.target.value)}>
              <option>Hemorragia</option>
              <option value="nenhuma">Nenhuma</option>
              <option value="leve">Leve</option>
              <option value="grave">Grave</option>
            </select>

            <textarea placeholder="Sintomas" className="input" onChange={(e) => handleChange("symptoms", e.target.value)} />
            <textarea placeholder="Descrição da ocorrência" className="input" onChange={(e) => handleChange("description", e.target.value)} />
            <textarea placeholder="Observações adicionais" className="input" onChange={(e) => handleChange("notes", e.target.value)} />

            <button onClick={submitOccurrence} className="btn-danger w-full">
              Submeter Emergência
            </button>
          </div>
        )}

        {/* TRIAGE */}
        {step === "triage" && (
          <div className="flex flex-col items-center justify-center text-center py-16 space-y-6">
            <Loader2 className="animate-spin text-green-600" size={40} />

            <h3 className="text-xl font-semibold text-gray-800">
              A Via Verde está a analisar a situação
            </h3>

            <p className="text-gray-600 text-sm animate-pulse">
              {loadingText}
            </p>

            <div className="text-xs text-gray-400">
              Sistema inteligente + validação clínica
            </div>
          </div>
        )}

        {/* RESULT */}
        {step === "result" && result && (
          <div className="bg-white p-6 rounded-2xl shadow text-center space-y-4">

            <h3 className="text-xl font-bold text-green-600">
              Atendimento Ativado
            </h3>

            <p><strong>Prioridade:</strong> {result.priority}</p>
            <p><strong>Referência:</strong> {result.reference}</p>

            {/* INSTRUÇÕES */}
            <div className="text-left">
              <h4 className="font-semibold mt-4 mb-2">Instruções Imediatas:</h4>
              <ul className="list-disc pl-5 text-sm">
                {result.instructions.map((i: string) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>

            {/* UNIDADE */}
            <div className="bg-green-50 p-4 rounded-xl mt-4 text-left">

              <p className="flex items-center gap-2">
                <MapPin size={16} />
                <strong>Unidade Recomendada:</strong> {"Hospital Geral de Mavalane"}
              </p>

              <p className="text-sm text-gray-700 mt-2">
                A unidade já foi notificada e está preparada para o seu atendimento.
              </p>

              {/* 🔥 GALERIA SLIDER */}
              <div className="mt-4">
                <h4 className="font-semibold mb-3">Fotos da Unidade:</h4>

                <div className="relative overflow-hidden rounded-xl">

                  {/* SLIDES */}
                  <div
                    className="flex transition-transform duration-300"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
                    onTouchEnd={(e) => {
                      const diff = touchStart - e.changedTouches[0].clientX;

                      if (diff > 50) {
                        setCurrentIndex((prev) =>
                          prev === images.length - 1 ? 0 : prev + 1
                        );
                      } else if (diff < -50) {
                        setCurrentIndex((prev) =>
                          prev === 0 ? images.length - 1 : prev - 1
                        );
                      }
                    }}
                  >
                    {images.map((img) => (
                      <img
                        key={img}
                        src={img}
                        className="w-full h-48 object-cover flex-shrink-0 cursor-pointer"
                        onClick={() => setSelectedImage(img)}
                      />
                    ))}
                  </div>

                  {/* BOTÃO ESQUERDA */}
                  <button
                    onClick={() =>
                      setCurrentIndex((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-1 rounded-full"
                  >
                    ‹
                  </button>

                  {/* BOTÃO DIREITA */}
                  <button
                    onClick={() =>
                      setCurrentIndex((prev) =>
                        prev === images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-1 rounded-full"
                  >
                    ›
                  </button>

                  {/* INDICADORES */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${i === currentIndex ? "bg-white" : "bg-white/50"
                          }`}
                      />
                    ))}
                  </div>

                </div>
              </div>

              {/* BOTÃO MAPA */}
              <button
                className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                onClick={() => {
                  setLoadingMap(true);

                  const hospital = {
                    lat: -25.9314668,
                    lng: 32.5864728
                  };

                  navigator.geolocation.getCurrentPosition(
                    (position) => {
                      const userLat = position.coords.latitude;
                      const userLng = position.coords.longitude;

                      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${hospital.lat},${hospital.lng}`;

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
                {loadingMap ? "A obter localização..." : "Ver rota até o hospital"}
              </button>

            </div>

            <button onClick={() => setStep("who")} className="btn w-full">
              Nova Ocorrência
            </button>
          </div>
        )}

        {/* STYLES */}
        <style jsx>{`
        .input {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: 1px solid #d1d5db;
        }

        .btn {
          padding: 12px;
          background: #e5e7eb;
          border-radius: 12px;
        }

        .btn-primary {
          padding: 14px;
          background: linear-gradient(to right, #16a34a, #2563eb);
          color: white;
          border-radius: 12px;
        }

        .btn-danger {
          padding: 14px;
          background: linear-gradient(to right, #ef4444, #dc2626);
          color: white;
          border-radius: 12px;
        }

        .choice-btn {
          padding: 20px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
      `}</style>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            className="max-w-4xl w-full rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default ViaVerdeForm;