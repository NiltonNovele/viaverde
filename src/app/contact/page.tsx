"use client";
import { useState } from "react";

export default function ContactPage() {
  // Form states
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [feedback, setFeedback] = useState({ rating: "", comments: "" });
  const [contactSent, setContactSent] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Simple email regex for validation
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    let errs: { [key: string]: string } = {};
    if (!contact.name.trim()) errs.name = "Name is required";
    if (!contact.email.trim()) errs.email = "Email is required";
    else if (!validateEmail(contact.email)) errs.email = "Email is invalid";
    if (!contact.message.trim()) errs.message = "Message is required";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });

      const json = await res.json();

      if (res.ok) {
        setContactSent(true);
        setContact({ name: "", email: "", message: "" });
      } else {
        setErrors({ form: json.error || "Failed to send message" });
      }
    } catch (err) {
      setErrors({ form: "Failed to send message" });
    }
  }

  function handleFeedbackSubmit(e: React.FormEvent) {
    e.preventDefault();
    let errs: { [key: string]: string } = {};
    if (!feedback.rating) errs.rating = "Please select a rating";
    if (!feedback.comments.trim()) errs.comments = "Comments are required";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setFeedbackSent(true);
    setFeedback({ rating: "", comments: "" });
  }

  return (
    <main className="min-h-screen bg-orange-50 py-16 px-6 sm:px-12 w-full">
      <h1 className="text-4xl font-bold text-center text-orange-600 mb-12">
        Contact Us & Feedback
      </h1>

      <section className="grid md:grid-cols-2 gap-12">
        {/* Contact Details & Form */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-orange-600">
              Contact Information
            </h2>
            <p className="text-gray-700">
              We’d love to hear from you! Reach out anytime using the form or
              the contact details below.
            </p>
          </div>

          <div className="space-y-1 text-gray-700">
            <p>
              <strong>Address:</strong> 123 Orange Street, Cape Town, South
              Africa
            </p>
            <p>
              <strong>Phone:</strong> +27 (76) 191-5804
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:info@synctechx.com"
                className="text-orange-600 underline"
              >
                info@synctechx.com
              </a>
            </p>
            <p>
              <strong>Working Hours:</strong> Mon-Fri, 9am - 6pm
            </p>
          </div>

          <form
            onSubmit={handleContactSubmit}
            noValidate
            className="bg-white p-6 rounded-lg shadow space-y-6"
          >
            <h3 className="text-xl font-semibold text-orange-600">
              Send us a message
            </h3>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={contact.name}
                onChange={(e) =>
                  setContact({ ...contact, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={contact.email}
                onChange={(e) =>
                  setContact({ ...contact, email: e.target.value })
                }
                className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                value={contact.message}
                onChange={(e) =>
                  setContact({ ...contact, message: e.target.value })
                }
                rows={4}
                className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Write your message here..."
              />
              {errors.message && (
                <p className="text-red-600 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-semibold py-3 rounded-md shadow hover:bg-orange-600 transition"
            >
              Send Message
            </button>
            {errors.form && (
              <p className="text-red-600 text-center mt-2">{errors.form}</p>
            )}
            {contactSent && (
              <p className="text-green-600 text-center mt-2">
                Message sent successfully!
              </p>
            )}
          </form>
        </div>

        {/* Feedback Form */}
        <div className="bg-white p-6 rounded-lg shadow space-y-6">
          <h2 className="text-2xl font-semibold text-orange-600 text-center">
            Feedback
          </h2>
          <p className="text-gray-700 text-center">
            Help us improve BookIt! Please rate your experience and leave any
            comments.
          </p>

          <form onSubmit={handleFeedbackSubmit} noValidate>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Rating
              </label>
              <div className="flex space-x-4 justify-center">
                {[1, 2, 3, 4, 5].map((ratingValue) => (
                  <label
                    key={ratingValue}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      checked={Number(feedback.rating) === ratingValue}
                      onChange={(e) =>
                        setFeedback({ ...feedback, rating: e.target.value })
                      }
                      className="hidden"
                    />
                    <span
                      className={`text-3xl ${
                        Number(feedback.rating) >= ratingValue
                          ? "text-orange-500"
                          : "text-gray-300"
                      } hover:text-orange-400 transition`}
                    >
                      ★
                    </span>
                  </label>
                ))}
              </div>
              {errors.rating && (
                <p className="mt-1 text-red-600 text-sm text-center">
                  {errors.rating}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="comments"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Comments
              </label>
              <textarea
                id="comments"
                value={feedback.comments}
                onChange={(e) =>
                  setFeedback({ ...feedback, comments: e.target.value })
                }
                rows={4}
                className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                  errors.comments ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Share your thoughts..."
              />
              {errors.comments && (
                <p className="mt-1 text-red-600 text-sm">{errors.comments}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-semibold py-3 rounded-md shadow hover:bg-orange-600 transition"
            >
              Submit Feedback
            </button>
            {feedbackSent && (
              <p className="text-green-600 text-center mt-2">
                Thank you for your feedback!
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
