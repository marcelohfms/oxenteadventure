"use client";

import { useEffect, useState } from "react";

const API_URL = "https://script.google.com/macros/s/AKfycby9Kh_wky6abFmqC1emDH7WwtjvDqIYmcIsmsU21TggrRi_H1YLY8WLy2UJKfLotY1m/exec"; // Sua URL da API

interface Reserva {
  nome: string;
  email: string;
  telefone: string;
  assento: string;
  viagem: string;
}

export default function InscricaoViagem({ params }: { params: { slug: string } }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [assentoSelecionado, setAssentoSelecionado] = useState("");
  const [assentosOcupados, setAssentosOcupados] = useState<string[]>([]);
  const [aceitouTermo, setAceitouTermo] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: Reserva[]) => {
        const ocupados = data
          .filter((reserva) => reserva.viagem === params.slug)
          .map((reserva) => reserva.assento);
        setAssentosOcupados(ocupados);
      });
  }, [params.slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!aceitouTermo) {
      alert("Você precisa aceitar o termo de responsabilidade.");
      return;
    }

    const formData = new URLSearchParams();
    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("telefone", telefone);
    formData.append("assento", assentoSelecionado);
    formData.append("viagem", params.slug);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar inscrição.");
      }

      alert("Inscrição enviada com sucesso! 🚀");
      window.location.href = "/";
    } catch (error) {
      console.error("Erro ao enviar inscrição:", error);
      alert("Falha ao enviar inscrição. Tente novamente.");
    }
  };

  const fileiras = [
    ["1A", "1B", "1C", "1D"],
    ["2A", "2B", "2C", "2D"],
    ["3A", "3B", "3C", "3D"],
    ["4A", "4B", "4C", "4D"],
    ["5A", "5B", "5C", "5D"],
  ];

  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Inscrição para: {params.slug.replace(/-/g, " ")}</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-6">
        {/* Formulário de dados */}
        <input
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="p-3 border rounded"
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 border rounded"
          required
        />
        <input
          type="tel"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="p-3 border rounded"
          required
        />

        {/* Mapa de Assentos */}
        <div className="flex flex-col items-center gap-3 my-6">
          <div className="text-sm font-semibold text-gray-700 mb-2">Frente do Ônibus</div>

          {fileiras.map((fileira, idx) => (
            <div key={idx} className="flex items-center gap-6">
              {/* Lado esquerdo */}
              <div className="flex gap-2">
                {fileira.slice(0, 2).map((assento) => (
                  <button
                    key={assento}
                    type="button"
                    disabled={assentosOcupados.includes(assento)}
                    onClick={() => setAssentoSelecionado(assento)}
                    className={`relative w-14 h-20 flex flex-col items-center justify-end p-1 rounded-b-lg font-bold shadow-md transition-all duration-300 ${
                      assentosOcupados.includes(assento)
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : assentoSelecionado === assento
                        ? "bg-orange-600 text-white scale-105"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    {/* Encosto da cadeira */}
                    <div className="absolute top-0 w-10 h-8 bg-green-600 rounded-t-full"></div>
                    {/* Número do assento */}
                    <span className="z-10">{assento}</span>
                  </button>
                ))}
              </div>

              {/* Corredor */}
              <div className="w-10"></div>

              {/* Lado direito */}
              <div className="flex gap-2">
                {fileira.slice(2, 4).map((assento) => (
                  <button
                    key={assento}
                    type="button"
                    disabled={assentosOcupados.includes(assento)}
                    onClick={() => setAssentoSelecionado(assento)}
                    className={`relative w-14 h-20 flex flex-col items-center justify-end p-1 rounded-b-lg font-bold shadow-md transition-all duration-300 ${
                      assentosOcupados.includes(assento)
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : assentoSelecionado === assento
                        ? "bg-orange-600 text-white scale-105"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    {/* Encosto da cadeira */}
                    <div className="absolute top-0 w-10 h-8 bg-green-600 rounded-t-full"></div>
                    {/* Número do assento */}
                    <span className="z-10">{assento}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="text-sm font-semibold text-gray-700 mt-4">Fundo do Ônibus</div>
        </div>

        {/* Aceite do termo */}
        {assentoSelecionado && (
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={aceitouTermo}
              onChange={(e) => setAceitouTermo(e.target.checked)}
              required
            />
            Aceito o termo de responsabilidade
          </label>
        )}

        {/* Botão de enviar */}
        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-full"
        >
          Confirmar Inscrição
        </button>
      </form>
    </div>
  );
}
