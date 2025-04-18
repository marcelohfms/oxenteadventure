// app/pagamento/pendente/page.tsx
"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function PendingContent() {
  const searchParams = useSearchParams();
  const loteId = searchParams.get('lote_id');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gradient-to-br from-yellow-50 to-amber-100">
       <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
         <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-6 mx-auto">
           {/* Ícone de Relógio/Ampulheta */}
           <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
         </div>
        <h1 className="text-3xl font-bold text-yellow-700 mb-3">Pagamento Pendente</h1>
        <p className="text-lg mb-6 text-gray-700">Seu pagamento está sendo processado.</p>
        <p className="text-sm text-gray-500 mb-6">Normalmente, isso leva apenas alguns instantes. Assim que for aprovado, sua reserva será confirmada. Você pode acompanhar o status no seu aplicativo do Mercado Pago ou aguardar nossa notificação.</p>
        {loteId && (
          <p className="text-xs text-gray-400 mb-6 font-mono">ID do Pedido: {loteId}</p>
        )}
        <Link href="/" className="inline-block px-8 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition duration-300 shadow-md hover:shadow-lg">
          Voltar para o Início
        </Link>
      </div>
    </div>
  );
}

export default function PagamentoPendentePage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Carregando informações...</div>}>
      <PendingContent />
    </Suspense>
  );
}