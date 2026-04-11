"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BookingModalProps {
  provider: {
    id: number;
    name: string;
    category: string;
    description: string;
    location: string;
  } | null;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ provider, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    idNumber: "",
    birthday: "",
    bookingDateTime: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  if (!provider) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Booking:", formData);
    setSubmitted(true);
    // TODO: Implement backend submission logic here
  };

  const ProgressBar = () => (
    <div className="flex justify-between mb-6">
      {[1, 2, 3].map((s) => (
        <div
          key={s}
          className={`w-full h-1 mx-1 rounded ${
            step >= s ? "bg-orange-600" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="bg-white rounded-xl p-6 max-w-lg w-full shadow-xl relative transition-all"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
          aria-label="Close"
        >
          ✕
        </button>

        {!submitted ? (
          <>
            <h2 className="text-xl font-bold text-orange-700 mb-1">
              Book with {provider.name}
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              {provider.category} — {provider.location}
            </p>
            <p className="text-gray-600 text-sm mb-4 italic">
              {provider.description}
            </p>

            <ProgressBar />

            <AnimatePresence mode="wait">
              <motion.form
                key={step}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {step === 1 && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Name
                      </label>
                      <input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md border-orange-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Surname
                      </label>
                      <input
                        name="surname"
                        type="text"
                        value={formData.surname}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md border-orange-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Phone Number
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md border-orange-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md border-orange-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        ID Number
                      </label>
                      <input
                        name="idNumber"
                        type="text"
                        value={formData.idNumber}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md border-orange-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Birthday
                      </label>
                      <input
                        name="birthday"
                        type="date"
                        value={formData.birthday}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md border-orange-300"
                      />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Booking Date & Time
                      </label>
                      <input
                        name="bookingDateTime"
                        type="datetime-local"
                        value={formData.bookingDateTime}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md border-orange-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Notes (optional)
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md border-orange-300"
                      />
                    </div>
                  </>
                )}

                {step === 3 && (
                  <div className="text-sm text-gray-700 space-y-2">
                    <p>
                      <strong>Name:</strong> {formData.name} {formData.surname}
                    </p>
                    <p>
                      <strong>Phone:</strong> {formData.phone}
                    </p>
                    <p>
                      <strong>Email:</strong> {formData.email}
                    </p>
                    <p>
                      <strong>ID:</strong> {formData.idNumber}
                    </p>
                    <p>
                      <strong>Birthday:</strong> {formData.birthday}
                    </p>
                    <p>
                      <strong>Booking Time:</strong> {formData.bookingDateTime}
                    </p>
                    {formData.notes && (
                      <p>
                        <strong>Notes:</strong> {formData.notes}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-2 text-sm rounded-md border border-orange-600 text-orange-600 hover:bg-orange-50"
                    >
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-4 py-2 text-sm rounded-md bg-orange-600 text-white hover:bg-orange-700"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm rounded-md bg-green-600 text-white hover:bg-green-700"
                    >
                      Confirm Booking
                    </button>
                  )}
                </div>
              </motion.form>
            </AnimatePresence>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4 p-4"
          >
            <h2 className="text-xl font-semibold text-green-700">
              Booking Confirmed!
            </h2>
            <p className="text-sm text-gray-600">
              Please check your mailbox to view your booking confirmation and
              receive communication from the service provider if needed.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 rounded bg-orange-600 text-white hover:bg-orange-700"
            >
              Close
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default BookingModal;
