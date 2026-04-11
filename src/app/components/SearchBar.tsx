"use client";

import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";

type Step =
  | "auth"
  | "actions"
  | "appointment"
  | "sos"
  | "medication"
  | "report"
  | "chronic"
  | "result";

const SearchBar = () => {
  const [step, setStep] = useState<Step>("auth");
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [user, setUser] = useState<any>({});
  const [form, setForm] = useState<any>({});
  const [result, setResult] = useState<any>(null);

  const handleChange = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const generateAppointment = () => {
    let priority = "Baixa";
    if (form.symptoms?.includes("dor intensa")) priority = "Alta";
    else if (form.symptoms?.includes("febre")) priority = "Média";

    setResult({
      type: "appointment",
      priority,
      hospital: "Hospital Geral de Maputo",
      doctor: "Clínico Geral",
      queue: Math.floor(Math.random() * 50) + 1,
      time: "30-60 min",
    });

    setStep("result");
  };

  const generateSOS = () => {
    setResult({
      type: "sos",
      hospitals: [
        "Hospital Central de Maputo",
        "Hospital Geral de Mavalane",
        "Clínica Sommerschield",
      ],
    });
    setStep("result");
  };

  const generateMedication = () => {
    setResult({
      type: "medication",
      meds: [
        { name: "Paracetamol", dosage: "500mg 3x/dia" },
        { name: "Ibuprofeno", dosage: "400mg 2x/dia" },
      ],
      pharmacy: "Farmácia Central de Maputo",
    });
    setStep("result");
  };

  const generateReport = () => {
    setResult({
      type: "report",
      message: "Ticket submetido com sucesso.",
    });
    setStep("result");
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 p-8 rounded-3xl shadow-lg border border-blue-100 max-w-3xl mx-auto">

      {/* AUTH */}
      {step === "auth" && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Está registado no SaúdeFila+?
          </h2>

          <div className="flex gap-4 mb-6">
            <button onClick={() => setIsRegistered(true)} className="btn-secondary">
              Sim
            </button>
            <button onClick={() => setIsRegistered(false)} className="btn-secondary">
              Não
            </button>
          </div>

          {isRegistered !== null && (
            <div className="space-y-4">
              <input placeholder="Nome (ex: João)" onChange={(e) => handleChange("name", e.target.value)} className="input" />
              <input placeholder="Apelido (ex: Mabunda)" onChange={(e) => handleChange("surname", e.target.value)} className="input" />

              {isRegistered ? (
                <input placeholder="Número do Paciente (ex: MPT-2026-0001)" onChange={(e) => handleChange("id", e.target.value)} className="input" />
              ) : (
                <>
                  <input placeholder="Data de Nascimento (DD/MM/AAAA)" className="input" />
                  <input placeholder="Endereço (ex: Maputo, Sommerschield)" className="input" />
                  <input placeholder="Contacto (ex: +258 84 000 0000)" className="input" />
                </>
              )}

              <button onClick={() => setStep("actions")} className="btn-primary w-full">
                Continuar
              </button>
            </div>
          )}
        </div>
      )}

      {/* ACTIONS */}
      {step === "actions" && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            O que pretende fazer?
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => setStep("appointment")} className="atm-btn">Marcar Consulta</button>
            <button onClick={() => setStep("chronic")} className="atm-btn">Doença Crónica</button>
            <button onClick={() => setStep("medication")} className="atm-btn">Medicamento</button>
            <button onClick={() => setStep("report")} className="atm-btn">Reportar</button>

            <button
              onClick={() => setStep("sos")}
              className="atm-btn col-span-2 bg-red-500 text-red hover:bg-red-600 flex items-center justify-center gap-2"
            >
              <AlertTriangle size={18} />
              SOS Emergência
            </button>
          </div>
        </div>
      )}

      {/* APPOINTMENT */}
      {step === "appointment" && (
        <div className="space-y-4">
          <textarea placeholder="Descreva os seus sintomas (ex: febre, dor de cabeça...)" onChange={(e) => handleChange("symptoms", e.target.value)} className="input" />
          <input placeholder="Há quanto tempo sente estes sintomas? (ex: 3 dias)" className="input" />
          <textarea placeholder="Observações adicionais (opcional)" className="input" />
          <input type="date" className="input" />

          <button onClick={generateAppointment} className="btn-primary w-full">
            Confirmar Marcação
          </button>
        </div>
      )}

      {/* SOS */}
      {step === "sos" && (
        <div className="space-y-4">
          <textarea placeholder="Descreva a emergência (ex: acidente, dor intensa...)" className="input border-red-300" />
          <input placeholder="Localização actual (ex: Av. Julius Nyerere)" className="input border-red-300" />
          <label className="flex gap-2 items-center text-sm text-gray-600">
            <input type="checkbox" className="accent-red-500" />
            Preciso de ambulância imediatamente
          </label>

          <button onClick={generateSOS} className="btn-danger w-full">
            Enviar SOS
          </button>
        </div>
      )}

      {/* MEDICATION */}
      {step === "medication" && (
        <div className="space-y-4">
          <input type="file" className="input" />
          <button onClick={generateMedication} className="btn-primary w-full">
            Analisar Receita
          </button>
        </div>
      )}

      {/* REPORT */}
      {step === "report" && (
        <div className="space-y-4">
          <textarea placeholder="Descreva o problema ou dúvida..." className="input" />
          <button onClick={generateReport} className="btn-primary w-full">
            Submeter
          </button>
        </div>
      )}

      {/* RESULT */}
      {step === "result" && result && (
        <div className="bg-white p-6 rounded-2xl shadow-md border">
          {result.type === "appointment" && (
            <>
              <h3 className="text-green-600 font-bold text-lg mb-4">Consulta Confirmada</h3>
              <div className="space-y-1 text-sm text-gray-700">
                <p><strong>Prioridade:</strong> {result.priority}</p>
                <p><strong>Hospital:</strong> {result.hospital}</p>
                <p><strong>Médico:</strong> {result.doctor}</p>
                <p><strong>Fila:</strong> #{result.queue}</p>
                <p><strong>Tempo estimado:</strong> {result.time}</p>
              </div>
            </>
          )}

          {result.type === "sos" && (
            <>
              <h3 className="text-red-600 font-bold text-lg mb-4">SOS Enviado</h3>
              <ul className="list-disc pl-5 text-sm">
                {result.hospitals.map((h: string) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </>
          )}

          {result.type === "medication" && (
            <>
              <h3 className="text-blue-600 font-bold text-lg mb-4">Medicamentos</h3>
              {result.meds.map((m: any) => (
                <p key={m.name}>{m.name} — {m.dosage}</p>
              ))}
              <p className="mt-2">Disponível em: {result.pharmacy}</p>
            </>
          )}

          {result.type === "report" && <p>{result.message}</p>}

          <button onClick={() => setStep("actions")} className="btn mt-6 w-full">
            Voltar
          </button>
        </div>
      )}

      {/* STYLES */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #cbd5e1;
          font-size: 14px;
          transition: 0.2s;
        }
        .input:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
        }

        .btn {
          padding: 12px;
          background: #e2e8f0;
          border-radius: 10px;
          font-weight: 500;
          transition: 0.2s;
        }
        .btn:hover {
          background: #cbd5e1;
        }

        .btn-primary {
          padding: 12px;
          background: linear-gradient(to right, #2563eb, #22c55e);
          color: white;
          border-radius: 10px;
          font-weight: 600;
          transition: 0.2s;
        }
        .btn-primary:hover {
          opacity: 0.9;
        }

        .btn-danger {
          padding: 12px;
          background: #ef4444;
          color: white;
          border-radius: 10px;
          font-weight: 600;
        }

        .btn-secondary {
          padding: 10px 16px;
          background: white;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
        }

        .atm-btn {
          padding: 18px;
          background: white;
          border-radius: 14px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.06);
          font-weight: 500;
          transition: 0.25s;
        }
        .atm-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
        }
      `}</style>
    </section>
  );
};

export default SearchBar;