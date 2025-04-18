// src/components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const LOGO_WIDTH_ORIGINAL = 500;
  const LOGO_HEIGHT_ORIGINAL = 500;

  return (
    <header className="bg-green-800 text-beige-50 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-24">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center">
          <Image
            src="/logo.png"
            alt="Logo Oxente Adventure"
            width={LOGO_WIDTH_ORIGINAL}
            height={LOGO_HEIGHT_ORIGINAL}
            className="h-60 w-auto" // Ajuste conforme necessário
            priority
          />
        </Link>

        {/* Navegação Desktop */}
        <nav className="hidden md:block">
          <ul className="flex gap-6 lg:gap-8 items-center font-body text-base lg:text-lg">
            <li>
              {/* ===== ALTERAÇÃO DE HOVER AQUI ===== */}
              <Link href="/#viagens" scroll={true} className="text-beige-50/90 hover:text-orange-500 hover:underline underline-offset-4 transition-colors duration-200">
              {/* Use hover:text-burnt-orange-500 se tiver configurado */}
                Viagens
              </Link>
            </li>
            <li>
              {/* ===== ALTERAÇÃO DE HOVER AQUI ===== */}
              <a
                href="https://wa.me/5583999446026"
                target="_blank"
                rel="noopener noreferrer"
                className="text-beige-50/90 hover:text-orange-500 hover:underline underline-offset-4 transition-colors duration-200"
                // Use hover:text-burnt-orange-500 se tiver configurado
              >
                Contato
              </a>
            </li>
            <li>
              {/* ===== ALTERAÇÃO DE HOVER AQUI ===== */}
              <Link href="/sobre" className="text-beige-50/90 hover:text-orange-500 hover:underline underline-offset-4 transition-colors duration-200">
              {/* Use hover:text-burnt-orange-500 se tiver configurado */}
                Sobre Nós
              </Link>
            </li>
          </ul>
        </nav>

        {/* Botão Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-beige-50 hover:text-orange-500 focus:outline-none p-2 transition-colors duration-200" // Hover laranja também no ícone
            aria-label="Abrir menu"
          >
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-cactus-green-800 absolute top-24 left-0 right-0 shadow-lg z-40">
          <nav className="px-4 pt-2 pb-4 space-y-2 font-body">
            {/* ===== ALTERAÇÃO DE HOVER AQUI ===== */}
            <Link
              href="/#viagens"
              scroll={true}
              className="block px-3 py-2 rounded-md text-lg font-medium text-beige-50/90 hover:bg-cactus-green-700 hover:text-orange-500" // fundo + texto laranja
              // Use hover:text-burnt-orange-500 se tiver configurado
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Viagens
            </Link>
            {/* ===== ALTERAÇÃO DE HOVER AQUI ===== */}
            <a
              href="https://wa.me/5583999446026"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 rounded-md text-lg font-medium text-beige-50/90 hover:bg-cactus-green-700 hover:text-orange-500" // fundo + texto laranja
              // Use hover:text-burnt-orange-500 se tiver configurado
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contato
            </a>
            {/* ===== ALTERAÇÃO DE HOVER AQUI ===== */}
            <Link
              href="/sobre"
              className="block px-3 py-2 rounded-md text-lg font-medium text-beige-50/90 hover:bg-cactus-green-700 hover:text-orange-500" // fundo + texto laranja
              // Use hover:text-burnt-orange-500 se tiver configurado
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sobre Nós
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}