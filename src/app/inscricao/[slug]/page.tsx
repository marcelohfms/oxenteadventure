"use client";

import { useEffect, useState } from "react"; // 'use' foi removido

// --- Interfaces ---
interface Reserva {
  nome: string;
  email: string;
  telefone: string;
  assento: string | number | null;
  viagem: string;
}
interface Passageiro {
  nome: string;
  email: string;
  telefone: string;
}

// --- Assinatura da Função Padronizada ---
export default function InscricaoViagem({ params }: { params: { slug: string } }) {
  const slug = params.slug; // Acesso direto

  // --- O resto do seu componente continua aqui ---
  const [assentosSelecionados, setAssentosSelecionados] = useState<string[]>([]);
  const [assentosOcupados, setAssentosOcupados] = useState<string[]>([]);
  const [passageiros, setPassageiros] = useState<Passageiro[]>([]);
  const [aceitouTermo, setAceitouTermo] = useState(false);
  const [loadingAssentos, setLoadingAssentos] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [souClienteAntigo, setSouClienteAntigo] = useState(false);
  const [codigoCliente, setCodigoCliente] = useState("");

  const API_URL = "https://script.google.com/macros/s/AKfycby9Kh_wky6abFmqC1emDH7WwtjvDqIYmcIsmsU21TggrRi_H1YLY8WLy2UJKfLotY1m/exec";

  // --- Hooks useEffect (mantidos) ---
  useEffect(() => {
    setLoadingAssentos(true);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) { throw new Error(`Erro HTTP: ${res.status}`); }
        return res.json();
      })
      .then((data: Reserva[]) => {
        const ocupados = data
          .filter((reserva) => reserva.viagem === slug && reserva.assento != null && reserva.assento !== '')
          .map((reserva) => String(reserva.assento).padStart(2, "0"));
        setAssentosOcupados(ocupados);
      })
      .catch(error => { console.error("Erro ao buscar assentos ocupados:", error); })
      .finally(() => { setLoadingAssentos(false); });
  }, [slug]);

  useEffect(() => {
    setPassageiros(
      assentosSelecionados.map((_, idx) => passageiros[idx] || { nome: "", email: "", telefone: "" })
    );
  }, [assentosSelecionados]);

  // --- Funções (mantidas) ---
  const toggleAssento = (assento: string) => { /* ...código mantido... */
    if (assentosOcupados.includes(assento)) return;
    if (assentosSelecionados.includes(assento)) {
      setAssentosSelecionados(assentosSelecionados.filter(a => a !== assento));
    } else {
      setAssentosSelecionados([...assentosSelecionados, assento].sort((a, b) => parseInt(a) - parseInt(b)));
    }
  };
  const handlePassageiroChange = (index: number, field: keyof Passageiro, value: string) => { /* ...código mantido... */
    const novosPassageiros = [...passageiros];
    if (!novosPassageiros[index]) {
        novosPassageiros[index] = { nome: "", email: "", telefone: "" };
    }
    novosPassageiros[index][field] = value;
    setPassageiros(novosPassageiros);
  };
  const calcularPreco = () => { /* ...código mantido... */
    const quantidade = assentosSelecionados.length;
    let precoPorAssento = 300;
    if (souClienteAntigo && codigoCliente.toUpperCase() === "SOUOXENTE") precoPorAssento = 280;
    else if (quantidade >= 3) precoPorAssento = 280;
    else if (quantidade === 2) precoPorAssento = 290;
    return precoPorAssento * quantidade;
  };
  const handleCheckout = async () => { /* ...código mantido... */
    if (assentosSelecionados.length === 0) { alert("Selecione pelo menos um assento."); return; }
    if (!aceitouTermo) { alert("Você precisa aceitar o termo de responsabilidade."); return; }
    const passageirosIncompletos = passageiros.some(p => !p.nome || !p.email || !p.telefone);
    if (passageirosIncompletos) { alert("Preencha os dados de todos os passageiros."); return; }
    if (souClienteAntigo && !codigoCliente) { alert("Por favor, insira seu código de cliente antigo."); return; }
    setIsLoading(true);
    try {
      const response = await fetch("/api/pagamento", { /* ... */ });
      if (!response.ok) { const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido.' })); throw new Error(errorData.message || `Erro ${response.status}`); }
      const data = await response.json();
      if (data.init_point) { window.location.href = data.init_point; }
      else { console.error("Resposta inesperada:", data); alert("Erro ao criar link."); }
    } catch (error) { console.error("Erro checkout:", error); alert(`Erro: ${error instanceof Error ? error.message : 'Erro inesperado.'}`); }
    finally { setIsLoading(false); }
  };

  // --- Constantes e Funções de Renderização (mantidas) ---
  const fileiras = [ /* ... */ ];
  const renderAssento = (assento: string) => ( /* ...código JSX mantido... */
    <button
      key={assento} type="button" disabled={loadingAssentos || assentosOcupados.includes(assento)}
      onClick={() => toggleAssento(assento)}
      className={`relative w-14 h-20 flex flex-col items-center justify-end p-1 rounded-b-lg font-bold shadow-md transition-all duration-300 ${ loadingAssentos ? "..." : assentosOcupados.includes(assento) ? "..." : assentosSelecionados.includes(assento) ? "..." : "..." }`}
      aria-label={`Assento ${assento}...`}>
      <div className={`absolute top-0 w-10 h-8 rounded-t-full ${ assentosOcupados.includes(assento) ? '...' : assentosSelecionados.includes(assento) ? '...' : '...' }`}></div>
      <span className="z-10">{assento}</span>
    </button>
  );


  // --- Component Return JSX (mantido igual, exceto pela remoção do <p> de teste) ---
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          Inscrição para: <span className="text-orange-600">{slug.replace(/-/g, " ")}</span>
        </h1>

        {/* Bus Layout Section */}
        <div className="mb-8 p-4 border rounded-lg bg-gray-50">
           {/* ... (código do layout do ônibus mantido) ... */}
           {/* ... */}
        </div>

        {/* Passenger Forms Section */}
        {assentosSelecionados.length > 0 && (
          <form className="w-full max-w-lg mx-auto flex flex-col gap-6 mb-8" onSubmit={(e) => e.preventDefault()}>
            {/* ... (código dos forms de passageiro mantido) ... */}
          </form>
        )}

        {/* Checkout Section */}
        {assentosSelecionados.length > 0 && (
          <div className="w-full max-w-lg mx-auto flex flex-col gap-5 mt-4 p-4 border rounded-lg bg-gray-50 shadow-sm">
            {/* ... (código do checkout mantido, garantindo que o <p> de teste foi removido) ... */}
             {souClienteAntigo && (
                 <div className="mt-3">
                    {/* ... (label e input do código) ... */}
                    {/* CERTIFIQUE-SE QUE O <p id="codigoHelp"> FOI REMOVIDO DAQUI */}
                 </div>
               )}
            {/* ... */}
          </div>
        )}
      </div>
    </div>
  );
}