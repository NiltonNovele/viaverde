"use client";

import Link from "next/link";
import { useState, MouseEventHandler } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* 1. Lado Esquerdo: Logo */}
        <div className="flex-1 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 relative">
              <Image src="/logo.png" alt="ViaVerde" fill className="object-contain" />
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-900">
              Via<span className="text-green-600">Verde</span>
            </span>
          </Link>
        </div>

        {/* 2. Centro: Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          <NavItem href="/" label="Início" />
          <NavItem href="/about" label="Sobre" />
          <NavItem href="/consultas" label="Consultas" />
          <NavItem href="/history" label="Histórico" />
        </nav>

        {/* 3. Lado Direito: Botão Painel */}
        <div className="hidden md:flex flex-1 justify-end">
          <Link
            href="/dashboard"
            className="text-sm font-medium bg-gray-900 text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            Painel
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gray-600" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <nav className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4 shadow-lg animate-fadeIn">
          <NavItem href="/" label="Início" onClick={toggleMenu} block />
          <NavItem href="/about" label="Sobre" onClick={toggleMenu} block />
          <NavItem href="/consultas" label="Consultas" onClick={toggleMenu} block />
          <NavItem href="/history" label="Histórico" onClick={toggleMenu} block />
          <Link
            href="/dashboard"
            onClick={toggleMenu}
            className="block text-center bg-gray-900 text-white py-2 rounded-lg text-sm font-medium"
          >
            Painel
          </Link>
        </nav>
      )}

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
};

type NavItemProps = {
  href: string;
  label: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  block?: boolean;
};

const NavItem = ({ href, label, onClick, block = false }: NavItemProps) => (
  <Link
    href={href}
    onClick={onClick}
    className={`
      ${block ? "block py-2" : "inline-block"}
      text-sm font-medium text-gray-600 hover:text-green-600 transition-colors
    `}
  >
    {label}
  </Link>
);