// app/pagamento/falha/page.tsx
"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function FailureContent() {
  const searchParams = useSearchParams();
  const loteId = searchParams.get('lote_id');
  // Poderia pegar a URL original da viagem aqui se fosse passada, para link "Tentar Novamente"

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gradient-to-br from-red-50 to-rose-100">
       <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
          {/* Ícone de X */}
          <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </div>
        <h1 className="text-3xl font-bold text-red-700 mb-3">Falha no Pagamento</h1>
        <p className="text-lg mb-6 text-gray-700">Não foi possível processar seu pagamento.</p>
        <p className="text-sm text-gray-500 mb-6">Verifique os dados informados ou tente usar outro método de pagamento. Nenhum valor foi cobrado.</p>
        {loteId && (
          <p className="text-xs text-gray-400 mb-6 font-mono">ID da Tentativa: {loteId}</p>
        )}
         {/* Idealmente, o link abaixo deveria voltar para a página da viagem específica */}
        <Link href="/" className="inline-block px-8 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition duration-300 shadow-md hover:shadow-lg">
          Voltar para o Início
        </Link>
        {/* <Link href="/viagens" className="ml-4 text-sm text-gray-600 hover:underline">Ver outras viagens</Link> */}
      </div>
    </div>
  );
}

export default function PagamentoFalhaPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Carregando informações...</div>}>
      <FailureContent />
    </Suspense>
  );
}