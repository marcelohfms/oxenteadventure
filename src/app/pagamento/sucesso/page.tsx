// app/pagamento/sucesso/page.tsx
"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

// Componente interno que usa os hooks
function SuccessContent() {
  const searchParams = useSearchParams();
  const [isSaving, setIsSaving] = useState(true); // Começa tentando salvar
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loteId = searchParams.get('lote_id');

  useEffect(() => {
    // Só executa uma vez quando os searchParams estiverem disponíveis
    if (searchParams && saveStatus === 'idle') {
        console.log("Página de sucesso carregada, extraindo dados...");
        const reservasParaSalvar = [];
        const viagem = searchParams.get('viagem');
        const valorTotal = searchParams.get('valor_total');
        const valorIndividual = valorTotal ? (parseFloat(valorTotal) / (searchParams.toString().match(/p\d+_nome/g)?.length || 1)).toFixed(2) : "0.00"; // Calcula valor individual aproximado

        let index = 0;
        while (searchParams.has(`p${index}_nome`)) {
            reservasParaSalvar.push({
                lote_id: loteId,
                timestamp: new Date().toISOString(), // Timestamp do momento do salvamento
                nome: searchParams.get(`p${index}_nome`),
                email: searchParams.get(`p${index}_email`),
                telefone: searchParams.get(`p${index}_telefone`),
                assento: searchParams.get(`p${index}_assento`),
                viagem: viagem,
                valor_individual: valorIndividual,
                valor_total_lote: valorTotal,
                status_pagamento: 'APROVADO', // <<< Status final
            });
            index++;
        }

        if (reservasParaSalvar.length > 0) {
            console.log("Dados reconstruídos:", reservasParaSalvar);
            console.log("Enviando para /api/salvar-reserva-confirmada...");

            fetch('/api/salvar-reserva-confirmada', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reservas: reservasParaSalvar }), // Envia como um objeto com a chave 'reservas'
            })
            .then(async (res) => {
                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({ message: 'Erro desconhecido ao salvar.'}));
                    throw new Error(errorData.message || `Erro ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                console.log("Resposta do salvamento:", data);
                if (data.status === 'success') {
                    setSaveStatus('success');
                } else {
                    throw new Error(data.message || 'Falha ao salvar na API.');
                }
            })
            .catch(error => {
                console.error("Erro ao salvar reserva confirmada:", error);
                setSaveStatus('error');
                setErrorMessage(error.message);
            })
            .finally(() => {
                setIsSaving(false);
            });
        } else {
           console.warn("Nenhum dado de passageiro encontrado nos parâmetros da URL.");
           setIsSaving(false);
           setSaveStatus('error'); // Considera erro se não achar dados
           setErrorMessage("Não foi possível encontrar os dados da reserva na URL.")
        }
    }
  }, [searchParams, saveStatus]); // Depende de searchParams e saveStatus para rodar só uma vez

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h1 className="text-3xl font-bold text-green-700 mb-3">Pagamento Aprovado!</h1>
        <p className="text-lg mb-4 text-gray-700">Sua reserva foi confirmada.</p>

        {/* Feedback do salvamento */}
        {isSaving && <p className="text-sm text-blue-600 animate-pulse">Registrando sua reserva...</p>}
        {saveStatus === 'success' && !isSaving && <p className="text-sm text-green-600">Sua reserva foi registrada com sucesso!</p>}
        {saveStatus === 'error' && !isSaving && <p className="text-sm text-red-600">Ocorreu um erro ao registrar sua reserva: {errorMessage || 'Tente contatar o suporte.'}</p>}

        <p className="text-sm text-gray-500 mt-6 mb-6">Detalhes foram registrados. Entraremos em contato se necessário.</p>
        {loteId && (
          <p className="text-xs text-gray-400 mb-6 font-mono">ID do Pedido: {loteId}</p>
        )}
        <Link href="/" className="inline-block mt-4 px-8 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition duration-300 shadow-md hover:shadow-lg">
          Voltar para o Início
        </Link>
      </div>
    </div>
  );
}

// Componente da página que envolve com Suspense
export default function PagamentoSucessoPage() {
  return (
    // Suspense é essencial aqui para useSearchParams funcionar corretamente
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Carregando confirmação...</div>}>
      <SuccessContent />
    </Suspense>
  );
}