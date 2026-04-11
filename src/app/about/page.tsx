"use client";

import { useState } from "react";
import { Accordion, AccordionItem } from "@radix-ui/react-accordion";
import {
  Rocket,
  Users,
  MessageCircle,
  FileText,
  ChevronDown,
  Smartphone,
  Lightbulb,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const sections = [
  { id: "about", label: "About" },
  { id: "team", label: "Team" },
  { id: "how", label: "How It Works" },
  { id: "ai", label: "BookAI" },
  { id: "docs", label: "Docs" },
];

const AboutPage = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const toggleAccordion = (item: string) => {
    setOpenItem(openItem === item ? null : item);
  };

  return (
    <main className="w-full bg-white text-[#333]">
      {/* Sticky Navigation */}
      <nav className="relative w-full bg-white/90 backdrop-blur border-b border-orange-100 shadow-sm py-4">
        <ul className="flex justify-center gap-6 text-sm sm:text-base font-semibold text-orange-600">
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="hover:underline">
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section
        id="about"
        className="max-w-7xl mx-auto px-6 py-20 text-center space-y-8"
      >
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <Rocket className="w-12 h-12 text-orange-500 mx-auto" />
          <h1 className="text-5xl font-bold text-orange-600">
            BookIt: Booking Made Simple
          </h1>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg">
            Born in Cape Town, BookIt was crafted by young African students who
            believe booking a service should be as easy as sending a message.
            Whether you are in Kaapstad or Joburg — we bridge the gap between
            you and what you need.
          </p>
          <div className="w-full h-90 rounded-xl bg-orange-100 shadow-inner flex items-center justify-center mt-6 relative">
            <Image
              src="/banner.jpg"
              alt="Hero Banner"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
        </motion.div>
      </section>

      <section
        id="team"
        className="max-w-7xl mx-auto px-6 py-20 space-y-12 text-center"
      >
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <Users className="w-12 h-12 text-orange-500 mx-auto" />
          <h2 className="text-4xl font-bold text-orange-600">
            Meet the Founders
          </h2>

          {/* About Us description */}
          <p className="text-gray-700 max-w-2xl mx-auto mt-4">
            We are a passionate team committed to revolutionizing service
            delivery across Africa. By blending technology and design, our app
            empowers providers to connect, manage, and grow their businesses
            efficiently.
          </p>

          <div className="flex flex-col gap-16 pt-12 max-w-4xl mx-auto">
            {/* Founder 1 */}
            <div className="flex items-center gap-6 text-left">
              {/* Image */}
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg flex-shrink-0">
                <Image
                  src="/nilton.jpeg"
                  alt="Nilton Novele"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Text + quote + LinkedIn */}
              <div>
                <h4 className="text-lg font-bold">Nilton Novele</h4>
                <p className="text-sm text-gray-600 mb-2">CTO</p>
                <p className="text-gray-700 mb-4 max-w-md">
                  Nilton is a seasoned tech visionary with a passion for
                  building scalable solutions that empower businesses. He leads
                  the technical development to ensure the app is robust and
                  user-friendly.
                </p>
                <blockquote className="bg-orange-50 border-l-4 border-orange-400 p-4 italic text-orange-700 shadow-sm rounded mb-4 max-w-md">
                  “Our vision is to create seamless tech that empowers service
                  providers to focus on what matters most — delivering
                  exceptional value to their clients.”
                </blockquote>
                <a
                  href="https://www.linkedin.com/in/nilton-novele-82211821b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
                  aria-label="Nilton Novele LinkedIn"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Founder 2 */}
            <div className="flex items-center gap-6 text-left">
              {/* Image */}
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg flex-shrink-0">
                <Image
                  src="/jumpex.jpg"
                  alt="Henzel Tibana"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Text + quote + LinkedIn */}
              <div>
                <h4 className="text-lg font-bold">Henzel Tibana</h4>
                <p className="text-sm text-gray-600 mb-2">COO</p>
                <p className="text-gray-700 mb-4 max-w-md">
                  Henzel brings a strategic mindset and operational expertise,
                  focusing on sustainable growth and delivering value to service
                  providers across Africa.
                </p>
                <blockquote className="bg-orange-50 border-l-4 border-orange-400 p-4 italic text-orange-700 shadow-sm rounded mb-4 max-w-md">
                  “We built this app with a mission to simplify operations for
                  African service providers, helping them grow sustainably in a
                  competitive market.”
                </blockquote>
                <a
                  href="https://www.linkedin.com/in/henzel-tibana-a07068211/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
                  aria-label="Henzel Tibana LinkedIn"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="how" className="bg-orange-50 py-20 px-6">
        <motion.div
          className="max-w-7xl mx-auto space-y-16"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-4xl font-bold text-orange-600 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-2xl text-orange-500 font-semibold">
                <Smartphone /> Clients
              </h3>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Search services via web or WhatsApp</li>
                <li>Filter by location, category, or availability</li>
                <li>No login, no hassle — just book!</li>
                <li>Confirmation via SMS & Email</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-2xl text-orange-500 font-semibold">
                <Lightbulb /> Providers
              </h3>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Build a profile with your services & pricing</li>
                <li>Get bookings in real-time</li>
                <li>Use our dashboard to manage traffic</li>
                <li>Connect with clients via WhatsApp</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      <section
        id="ai"
        className="max-w-7xl mx-auto px-6 py-20 text-center space-y-8"
      >
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <MessageCircle className="text-orange-500 w-10 h-10 mx-auto" />
          <h2 className="text-4xl font-bold text-orange-600">
            BookAI + WhatsApp
          </h2>
          <p className="max-w-2xl mx-auto text-gray-700">
            No more forms. Just type “Book a haircut at 2pm” and BookAI handles
            it all. Seamlessly connects to WhatsApp so service providers can
            reply fast.
          </p>

          {/* Fancy 4-picture arrangement */}
          <div className="relative max-w-4xl mx-auto mt-10 h-64 sm:h-80 grid grid-cols-3 grid-rows-2 gap-4 select-none overflow-hidden">
            {/* Image 1: spans 2 rows */}
            <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/sc1.jpg"
                alt="Screenshot 1"
                fill
                style={{ objectFit: "cover" }}
                draggable={false}
                sizes="(max-width: 768px) 100vw, 600px"
                priority
              />
            </div>

            {/* Image 2 */}
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/sc2.png"
                alt="Screenshot 2"
                fill
                style={{ objectFit: "cover" }}
                draggable={false}
                sizes="(max-width: 768px) 100vw, 300px"
                priority
              />
            </div>

            {/* Image 3 */}
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/sc.jpg"
                alt="Screenshot 3"
                fill
                style={{ objectFit: "cover" }}
                draggable={false}
                sizes="(max-width: 768px) 100vw, 300px"
                priority
              />
            </div>

            {/* Image 4: positioned overlapping bottom right */}
            <div
              className="absolute bottom-0 right-0 w-40 h-40 rounded-xl overflow-hidden shadow-2xl border-4 border-white"
              style={{ transform: "translate(25%, 25%)" }}
            >
              <Image
                src="/ai.jpg"
                alt="Screenshot 4"
                fill
                style={{ objectFit: "cover" }}
                draggable={false}
                priority
              />
            </div>
          </div>
        </motion.div>
      </section>

      <section id="docs" className="bg-orange-50 py-20 px-6">
        <motion.div
          className="max-w-4xl mx-auto space-y-10"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <FileText className="text-orange-500 w-10 h-10 mx-auto" />
          <h2 className="text-4xl font-bold text-orange-600 text-center">
            Legal & Documentation
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                title: "Terms & Conditions",
                desc: "All terms, legal responsibilities, and platform liabilities.",
                file: "/docs/terms-and-conditions.pdf",
              },
              {
                title: "Privacy Policy",
                desc: "How we manage and protect your data, including AI and WhatsApp use.",
                file: "/docs/privacy-policy.pdf",
              },
              {
                title: "Terms of Use",
                desc: "Guidelines for using BookIt as a client or service provider.",
                file: "/docs/terms-of-use.pdf",
              },
            ].map(({ title, desc, file }, i) => (
              <AccordionItem key={i} value={title}>
                <button
                  onClick={() => toggleAccordion(title)}
                  className="w-full text-left flex justify-between items-center py-4 px-5 bg-orange-100 rounded-lg shadow"
                >
                  <span className="font-semibold text-orange-800">{title}</span>
                  <ChevronDown
                    className={`transition-transform ${
                      openItem === title ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openItem === title && (
                  <div className="bg-white px-5 py-4 border border-orange-200 rounded-b-xl shadow-sm">
                    <p className="text-sm text-gray-700 mb-2">{desc}</p>
                    <a
                      href={file}
                      target="_blank"
                      className="text-orange-600 underline text-sm font-medium"
                    >
                      Download PDF
                    </a>
                  </div>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </section>
    </main>
  );
};

export default AboutPage;
