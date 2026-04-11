"use client";

import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import { Home, Info, Mail, Activity } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-700 to-green-600 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        
        {/* Logo + About */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 relative">
              <Image
                src="/logo.png"
                alt="SaudeFila+"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold">
              SaúdeFila+
            </h3>
          </div>

          <p className="text-white/80 mb-4 max-w-md">
            Plataforma inteligente de marcação e triagem digital que reduz filas,
            melhora o atendimento e torna o acesso à saúde mais eficiente em Moçambique.
          </p>

          {/* Newsletter */}
          <form
            action="https://formsubmit.co/nilton.novele@gmail.com"
            method="POST"
            className="flex flex-col sm:flex-row gap-3"
          >
            <input type="hidden" name="_captcha" value="false" />

            <input
              type="email"
              name="email"
              required
              placeholder="Seu email"
              className="px-3 py-2 rounded-md text-black text-sm w-full"
            />

            <button
              type="submit"
              className="bg-white text-blue-700 font-semibold px-5 py-2 rounded-md hover:opacity-90 transition"
            >
              Subscrever
            </button>
          </form>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Links</h3>
          <div className="flex flex-col gap-2 text-white/80">
            <Link href="/" className="hover:text-white flex items-center gap-2">
              <Home size={16} /> Início
            </Link>
            <Link href="/about" className="hover:text-white flex items-center gap-2">
              <Info size={16} /> Sobre
            </Link>
            <Link href="/triage" className="hover:text-white flex items-center gap-2">
              <Activity size={16} /> Triagem
            </Link>
            <Link href="/contact" className="hover:text-white flex items-center gap-2">
              <Mail size={16} /> Contacto
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contacto</h3>
          <div className="text-white/80 space-y-2">
            <p>Email: info@synctechx.com</p>
            <p>Telefone: +258 XXX XXX XXX</p>
          </div>

          {/* Socials */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:scale-110 transition">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="hover:scale-110 transition">
              <FaTiktok size={18} />
            </a>
            <a href="#" className="hover:scale-110 transition">
              <FaFacebook size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/20 mt-10 pt-6 text-xs flex flex-col md:flex-row justify-between items-center gap-3 text-white/70">
        <p>&copy; {new Date().getFullYear()} SaúdeFila+. Todos os direitos reservados.</p>
        <p>
          Desenvolvido por{" "}
          <a
            href="https://www.niltonnovele.com"
            target="_blank"
            className="underline hover:text-white"
          >
            Nilton Novele
          </a>
        </p>
      </div>
    </footer>
  );
}