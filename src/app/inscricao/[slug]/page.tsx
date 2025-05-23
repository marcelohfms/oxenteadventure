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

// Tente APENAS com esta interface
interface PageParams {
  params: { slug: string };
}

export default function InscricaoViagem({ params }: PageParams) {
  const slug = params.slug;
  // ... resto do código

  // --- Estados ---
  const [assentosSelecionados, setAssentosSelecionados] = useState<string[]>([]);
  const [assentosOcupados, setAssentosOcupados] = useState<string[]>([]);
  const [passageiros, setPassageiros] = useState<Passageiro[]>([]);
  // !!! Essas variáveis AGORA serão usadas !!!
  const [aceitouTermo, setAceitouTermo] = useState(false);
  const [loadingAssentos, setLoadingAssentos] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [souClienteAntigo, setSouClienteAntigo] = useState(false);
  const [codigoCliente, setCodigoCliente] = useState("");

  const API_URL = "https://script.google.com/macros/s/AKfycby9Kh_wky6abFmqC1emDH7WwtjvDqIYmcIsmsU21TggrRi_H1YLY8WLy2UJKfLotY1m/exec";

  // --- Hooks useEffect ---
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

  // !!! Este useEffect AGORA terá a dependência 'passageiros' adicionada !!!
  useEffect(() => {
    // Usando a forma funcional do setState para evitar dependência direta de 'passageiros'
    // Isso recalcula com base no estado anterior seguro
    setPassageiros(currentPassageiros =>
      assentosSelecionados.map((_, idx) => currentPassageiros[idx] || { nome: "", email: "", telefone: "" })
    );
  // Depende APENAS de assentosSelecionados para evitar loops,
  // mas o ESLint pode continuar avisando. Podemos desabilitar a regra aqui.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assentosSelecionados]);


  // --- Funções ---
  // !!! Essas funções AGORA serão usadas !!!
  const toggleAssento = (assento: string) => {
    if (assentosOcupados.includes(assento)) return;
    if (assentosSelecionados.includes(assento)) {
      setAssentosSelecionados(current => current.filter(a => a !== assento));
    } else {
      setAssentosSelecionados(current => [...current, assento].sort((a, b) => parseInt(a) - parseInt(b)));
    }
  };
  const handlePassageiroChange = (index: number, field: keyof Passageiro, value: string) => {
     // Usando forma funcional para segurança com estados derivados
    setPassageiros(currentPassageiros => {
        const novosPassageiros = [...currentPassageiros];
        // Garante que o objeto exista antes de modificar
        if (!novosPassageiros[index]) {
            novosPassageiros[index] = { nome: "", email: "", telefone: "" };
        }
        novosPassageiros[index] = { ...novosPassageiros[index], [field]: value };
        return novosPassageiros;
    });
  };
  const calcularPreco = () => {
    const quantidade = assentosSelecionados.length;
    let precoPorAssento = 300;
    if (souClienteAntigo && codigoCliente.toUpperCase() === "SOUOXENTE") precoPorAssento = 280;
    else if (quantidade >= 3) precoPorAssento = 280;
    else if (quantidade === 2) precoPorAssento = 290;
    return precoPorAssento * quantidade;
  };
  const handleCheckout = async () => {
    if (assentosSelecionados.length === 0) { alert("Selecione pelo menos um assento."); return; }
    if (!aceitouTermo) { alert("Você precisa aceitar o termo de responsabilidade."); return; }
    const passageirosIncompletos = passageiros.some(p => !p?.nome || !p?.email || !p?.telefone); // Adicionado ?. para segurança
    if (passageirosIncompletos || passageiros.length !== assentosSelecionados.length) { alert("Preencha os dados de todos os passageiros selecionados."); return; }
    if (souClienteAntigo && !codigoCliente) { alert("Por favor, insira seu código de cliente antigo."); return; }
    setIsLoading(true); // Usado aqui
    try {
      const response = await fetch("/api/pagamento", {
         method: "POST",
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           assentosSelecionados,
           passageiros,
           viagem: slug,
           valorTotal: calcularPreco(), // Usado aqui
         }),
      });
      if (!response.ok) { const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido.' })); throw new Error(errorData.message || `Erro ${response.status}`); }
      const data = await response.json();
      if (data.init_point) { window.location.href = data.init_point; }
      else { console.error("Resposta inesperada:", data); alert("Erro ao criar link."); }
    } catch (error) { console.error("Erro checkout:", error); alert(`Erro: ${error instanceof Error ? error.message : 'Erro inesperado.'}`); }
    finally { setIsLoading(false); } // Usado aqui
  };

  // --- Constantes e Funções de Renderização ---
  // !!! Essas constantes/funções AGORA serão usadas !!!
  const fileiras = [
    ["01", "02", "04", "03"], ["05", "06", "08", "07"], ["09", "10", "12", "11"],
    ["13", "14", "16", "15"], ["17", "18", "20", "19"], ["21", "22", "24", "23"],
    ["25", "26", "28", "27"], ["29", "30", "32", "31"], ["33", "34", "36", "35"],
    ["37", "38", "40", "39"], ["41", "42", "44", "43"], ["45", "46", "48", "47"],
    ["49", "50"]
  ];

  const renderAssento = (assento: string) => (
    <button
      key={assento}
      type="button"
      disabled={loadingAssentos || assentosOcupados.includes(assento)}
      onClick={() => toggleAssento(assento)} // Usado aqui
      className={`relative w-14 h-20 flex flex-col items-center justify-end p-1 rounded-b-lg font-bold shadow-md transition-all duration-300 ${
        loadingAssentos
          ? "bg-gray-300 cursor-wait animate-pulse"
          : assentosOcupados.includes(assento)
          ? "bg-red-400 cursor-not-allowed text-white line-through"
          : assentosSelecionados.includes(assento)
          ? "bg-orange-600 text-white scale-105 ring-2 ring-orange-300"
          : "bg-green-500 hover:bg-green-600 text-white"
      }`}
      aria-label={`Assento ${assento}${assentosOcupados.includes(assento) ? ' (Ocupado)' : assentosSelecionados.includes(assento) ? ' (Selecionado)' : ' (Disponível)'}`}
    >
      <div className={`absolute top-0 w-10 h-8 rounded-t-full ${
         assentosOcupados.includes(assento) ? 'bg-red-500' : assentosSelecionados.includes(assento) ? 'bg-orange-700' : 'bg-green-600'
      }`}></div>
      <span className="z-10">{assento}</span>
    </button>
  );

  // --- Component Return JSX (AGORA COMPLETO E CORRETO) ---
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          Inscrição para: <span className="text-orange-600">{slug.replace(/-/g, " ")}</span>
        </h1>

        {/* Bus Layout Section */}
        <div className="mb-8 p-4 border rounded-lg bg-gray-50">
           <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">Selecione seus assentos</h2>
           <div className="flex justify-center gap-4 mb-4 text-sm text-gray-600">
              <div className="flex items-center gap-1"><span className="w-4 h-4 bg-green-500 rounded"></span> Disponível</div>
              <div className="flex items-center gap-1"><span className="w-4 h-4 bg-orange-600 rounded"></span> Selecionado</div>
              <div className="flex items-center gap-1"><span className="w-4 h-4 bg-red-400 rounded"></span> Ocupado</div>
           </div>
           <div className="flex flex-col items-center gap-3 my-6">
             <div className="flex items-center gap-2 mb-4 self-start ml-4 sm:ml-[250px]">
                 <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white text-xl">🛞</div>
                 <div className="text-gray-700 font-semibold">Motorista</div>
             </div>
             {loadingAssentos ? ( <div className="text-center text-gray-500 py-10">Carregando assentos...</div> )
              : (
                // !!! Usando 'fileiras' e 'renderAssento' aqui !!!
                fileiras.map((fileira, idx) => (
                   <div key={idx} className="flex items-center justify-center gap-4 relative w-full max-w-md">
                     {idx === 12 ? ( <> <div className="flex gap-2">{fileira.map(renderAssento)}</div> <div className="w-10"></div> <div className="w-[7.5rem] h-1 flex-shrink-0"></div> </> )
                      : ( <> <div className="flex gap-2">{fileira.slice(0, 2).map(renderAssento)}</div> <div className="w-10"></div> <div className="flex gap-2">{fileira.slice(2, 4).map(renderAssento)}</div> </> )}
                     {(idx === 0 || idx === 2 || idx === 8) && ( <div className="absolute left-[190px] text-sm text-gray-500 hidden sm:block">📺</div> )}
                     {idx === 5 && ( <div className="absolute right-[190px] text-sm text-gray-500 hidden sm:block">📺</div> )}
                     {idx === 12 && ( <div className="absolute left-[calc(50%+75px)] sm:left-[130px] flex items-center gap-2 transform -translate-x-1/2 sm:translate-x-0 top-0">
                         <div className="w-12 h-20 bg-blue-300 flex flex-col items-center justify-center rounded-md shadow text-center p-1 ml-[65px]"><span className="text-xs font-bold">Geladeira</span></div>
                         <div className="w-32 h-20 bg-blue-600 text-white flex flex-col items-center justify-center rounded-md shadow text-center p-1"><span className="text-xs font-bold">WC</span></div>
                       </div> )}
                   </div>
                ))
             )}
           </div>
        </div>

        {/* Passenger Forms Section */}
        {assentosSelecionados.length > 0 && (
          <form className="w-full max-w-lg mx-auto flex flex-col gap-6 mb-8" onSubmit={(e) => e.preventDefault()}>
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">Dados dos Passageiros</h2>
            {assentosSelecionados.map((assento, index) => (
              <div key={assento} className="flex flex-col gap-3 border p-4 rounded-md shadow-sm bg-white">
                <h3 className="font-bold text-lg text-gray-800">Passageiro - Assento <span className="text-orange-600">{assento}</span></h3>
                <div className="flex flex-col gap-2">
                   <label htmlFor={`nome-${index}`} className="text-sm font-medium text-gray-600">Nome completo</label>
                   {/* !!! Usando 'handlePassageiroChange' aqui !!! */}
                   <input id={`nome-${index}`} type="text" placeholder="Nome completo" value={passageiros[index]?.nome || ""} onChange={(e) => handlePassageiroChange(index, "nome", e.target.value)} className="p-2 border rounded-md focus:ring-orange-500 focus:border-orange-500" required />
                </div>
                <div className="flex flex-col gap-2">
                   <label htmlFor={`email-${index}`} className="text-sm font-medium text-gray-600">E-mail</label>
                   {/* !!! Usando 'handlePassageiroChange' aqui !!! */}
                   <input id={`email-${index}`} type="email" placeholder="E-mail" value={passageiros[index]?.email || ""} onChange={(e) => handlePassageiroChange(index, "email", e.target.value)} className="p-2 border rounded-md focus:ring-orange-500 focus:border-orange-500" required />
                 </div>
                 <div className="flex flex-col gap-2">
                    <label htmlFor={`telefone-${index}`} className="text-sm font-medium text-gray-600">Telefone (com DDD)</label>
                    {/* !!! Usando 'handlePassageiroChange' aqui !!! */}
                    <input id={`telefone-${index}`} type="tel" placeholder="(XX) XXXXX-XXXX" value={passageiros[index]?.telefone || ""} onChange={(e) => handlePassageiroChange(index, "telefone", e.target.value)} className="p-2 border rounded-md focus:ring-orange-500 focus:border-orange-500" required />
                 </div>
              </div>
            ))}
          </form>
        )}

        {/* Checkout Section */}
        {assentosSelecionados.length > 0 && (
          <div className="w-full max-w-lg mx-auto flex flex-col gap-5 mt-4 p-4 border rounded-lg bg-gray-50 shadow-sm">
             <h2 className="text-xl font-semibold mb-2 text-center text-gray-700">Resumo e Pagamento</h2>

            <div className="border-b pb-4">
               <label className="flex items-center gap-2 cursor-pointer">
                 <input
                   type="checkbox"
                   className="rounded text-orange-600 focus:ring-orange-500"
                   checked={souClienteAntigo}
                   // !!! Usando 'setSouClienteAntigo' aqui !!!
                   onChange={(e) => {
                       setSouClienteAntigo(e.target.checked);
                       if (!e.target.checked) setCodigoCliente("");
                   }}
                 />
                 <span className="text-sm text-gray-700">Sou cliente antigo (Possuo código de desconto)</span>
               </label>

               {souClienteAntigo && (
                 <div className="mt-3">
                    <label htmlFor="codigoCliente" className="text-sm font-medium text-gray-600 block mb-1">Código do cliente</label>
                    <input
                       id="codigoCliente"
                       type="text"
                       placeholder="Digite seu código"
                       value={codigoCliente}
                       // !!! Usando 'setCodigoCliente' aqui !!!
                       onChange={(e) => setCodigoCliente(e.target.value)}
                       className="p-2 border rounded-md w-full focus:ring-orange-500 focus:border-orange-500"
                       required={souClienteAntigo}
                     />
                  </div>
               )}
             </div>

             <div className="text-center font-semibold text-lg text-gray-800">
                {/* !!! Usando 'calcularPreco' aqui !!! */}
                Valor Total: R$ {calcularPreco().toFixed(2).replace('.', ',')}
                <p className="text-sm text-gray-600 font-normal">({assentosSelecionados.length} assento(s) selecionado(s))</p>
             </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                 className="rounded text-orange-600 focus:ring-orange-500"
                checked={aceitouTermo}
                // !!! Usando 'setAceitouTermo' aqui !!!
                onChange={(e) => setAceitouTermo(e.target.checked)}
                required
                aria-describedby="termoHelp"
              />
              <span id="termoHelp" className="text-sm text-gray-700">Li e aceito o <a href="/termos" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">termo de responsabilidade</a></span>
            </label>

            <button
              type="button"
              // !!! Usando 'aceitouTermo', 'isLoading', 'passageiros', 'souClienteAntigo', 'codigoCliente' aqui !!!
              disabled={!aceitouTermo || isLoading || assentosSelecionados.length === 0 || passageiros.some(p => !p?.nome || !p?.email || !p?.telefone) || passageiros.length !== assentosSelecionados.length || (souClienteAntigo && !codigoCliente)}
              // !!! Usando 'handleCheckout' aqui !!!
              onClick={handleCheckout}
              className={`w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed ${isLoading ? 'opacity-75 cursor-wait' : ''}`}
            >
              {/* !!! Usando 'isLoading' e 'calcularPreco' aqui !!! */}
              {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                     {/* ... svg ... */}
                     Processando...
                  </div>
              ) : `Continuar para Pagamento (R$ ${calcularPreco().toFixed(2).replace('.', ',')})`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}