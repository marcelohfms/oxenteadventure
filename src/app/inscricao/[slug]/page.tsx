// src/app/inscricao/[slug]/page.tsx (VERSÃO MÍNIMA PARA TESTE)

// Mantém a interface explícita
interface PageProps {
  params: { slug: string };
}

// Usa o tipo PageProps
export default function InscricaoViagem({ params }: PageProps) {
const slug = params.slug;

return (
  <div>
    <h1>Inscrição para: {slug}</h1>
    <p>Conteúdo mínimo da página.</p>
    {/* Sem hooks useEffect, useState */}
    {/* Sem chamadas fetch */}
    {/* Sem JSX complexo */}
  </div>
);
}