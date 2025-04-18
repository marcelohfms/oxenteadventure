import type { Metadata } from "next";
// REMOVA COMPLETAMENTE as importações Geist
// import { GeistSans } from 'geist/font/sans';
// import { GeistMono } from 'geist/font/mono';
import { Montserrat, Lato } from 'next/font/google'; // Mantenha estas
import "./globals.css";

// REMOVA COMPLETAMENTE as configurações Geist
/*
const geistSans = GeistSans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = GeistMono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
*/

// Mantenha as configurações Montserrat e Lato
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['700', '800'],
});

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: "Sua Aventura JP | Viagens de Aventura",
  description: "Explore trilhas, rapel e cavernas em João Pessoa e região. Viva momentos inesquecíveis!",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    // REMOVA as variáveis Geist da className
    <html lang="pt-BR" className={`${montserrat.variable} ${lato.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}