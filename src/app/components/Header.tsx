"use client";

import Link from "next/link";
import { useState, MouseEventHandler, ReactNode } from "react";
import {
  Menu,
  X,
  Home,
  Info,
  Mail,
  LogIn,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo + Name */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 relative">
            {/* Replace with your logo path */}
            <Image
              src="/logo.png"
              alt="SaudeFila+"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-2xl font-bold">
            <span className="text-blue-600">Saúde</span>
            <span className="text-green-500">Fila+</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center text-sm font-medium">
          <NavItem href="/" icon={<Home size={16} />} label="Início" />
          <NavItem href="/about" icon={<Info size={16} />} label="Sobre" />
          <NavItem href="/triage" icon={<Activity size={16} />} label="Triagem" />
          <NavItem href="/contact" icon={<Mail size={16} />} label="Contacto" />

          <NavItem
            href="/dashboard"
            icon={<LogIn size={16} />}
            label="Painel"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-green-500 text-white hover:opacity-90 transition"
          />
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden px-4 pb-6 space-y-3 bg-white border-t"
        >
          <NavItem href="/" icon={<Home size={18} />} label="Início" onClick={toggleMenu} block />
          <NavItem href="/about" icon={<Info size={18} />} label="Sobre" onClick={toggleMenu} block />
          <NavItem href="/triage" icon={<Activity size={18} />} label="Triagem" onClick={toggleMenu} block />
          <NavItem href="/contact" icon={<Mail size={18} />} label="Contacto" onClick={toggleMenu} block />

          <NavItem
            href="/dashboard"
            icon={<LogIn size={18} />}
            label="Painel"
            onClick={toggleMenu}
            block
            className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-4 py-2 rounded-md"
          />
        </motion.nav>
      )}
    </header>
  );
};

type NavItemProps = {
  href: string;
  icon: ReactNode;
  label: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  block?: boolean;
};

const NavItem = ({
  href,
  icon,
  label,
  className = "",
  onClick,
  block = false,
}: NavItemProps) => (
  <Link
    href={href}
    onClick={onClick}
    className={`${
      block ? "flex" : "inline-flex"
    } items-center gap-2 text-gray-700 hover:text-blue-600 transition ${className}`}
  >
    {icon}
    <span>{label}</span>
  </Link>
);