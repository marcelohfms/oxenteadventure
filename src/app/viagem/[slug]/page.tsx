// app/viagem/[slug]/page.tsx (ou onde estiver seu arquivo)

import { notFound } from "next/navigation";
import Link from "next/link";
import { encontrarViagemPorSlug, Viagem } from "@/data/viagens";

const ListaItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start mb-1">
    <span className="mr-2 text-orange-600 text-lg">›</span>
    <span>{children}</span>
  </li>
);

export default function DetalhesViagemPage({ params }: { params: { slug: string } }) {
  const viagem = encontrarViagemPorSlug(params.slug);

  if (!viagem) {
    notFound();
  }

  const { detalhes } = viagem;

  return (
    <div className="min-h-screen bg-beige-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg">

        {/* Título e Data */}
        <h1 className="text-3xl sm:text-4xl font-bold text-cactus-green-800 font-display mb-2 text-center">
          {viagem.titulo}
        </h1>
        <p className="text-center text-gray-600 font-semibold mb-6">{viagem.data}</p>

        {/* Imagem Principal - ALTERAÇÃO AQUI */}
        <img
          src={viagem.imagem}
          alt={viagem.titulo}
          // Removido: h-64, md:h-80, object-cover
          // Mantido: w-full, rounded-lg, shadow-md, mb-8
          // Opcional: Adicionar um fundo enquanto carrega
          className="w-full rounded-lg shadow-md mb-8 bg-gray-100"
          loading="lazy" // Adicionado para melhor performance
        />
        {/* Fim da Alteração na Imagem */}


        {/* Container para os Detalhes */}
        <div className="space-y-6 text-gray-800 font-body text-base">
          {/* Seção: Ponto de Encontro */}
          <div>
            <h3 className="text-xl font-semibold text-cactus-green-700 mb-2 flex items-center">
              <span className="text-2xl mr-2">📌</span> Ponto de Encontro (Saída de João Pessoa)
            </h3>
            <ul className="pl-4">
              {detalhes.pontoEncontro.map((ponto, index) => (
                <ListaItem key={index}>📍 {ponto}</ListaItem>
              ))}
            </ul>
          </div>

          {/* Seção: Horários */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-semibold text-cactus-green-700 mb-1 flex items-center">
                <span className="text-2xl mr-2">⏳</span> Saída
              </h3>
              <p className="pl-8">{detalhes.horarioSaida}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cactus-green-700 mb-1 flex items-center">
                <span className="text-2xl mr-2">⏳</span> Retorno Previsto
              </h3>
              <p className="pl-8">{detalhes.horarioRetorno}</p>
            </div>
          </div>

          {/* Seção: Inclusos */}
          <div>
            <h3 className="text-xl font-semibold text-cactus-green-700 mb-2 flex items-center">
              <span className="text-2xl mr-2">📦</span> Inclusos
            </h3>
            <ul className="pl-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              {detalhes.inclusos.map((item, index) => (
                <ListaItem key={index}>
                  {item.toLowerCase().includes("transporte") ? "🚌 " :
                   item.toLowerCase().includes("seguro") ? "🔐 " :
                   item.toLowerCase().includes("café") ? "☕ " :
                   item.toLowerCase().includes("almoço") ? "🍽️ " :
                   item.toLowerCase().includes("trilha") ? "🍃 " :
                   item.toLowerCase().includes("cachoeira") ? "💦 " :
                   item.toLowerCase().includes("brinde") || item.toLowerCase().includes("sorteio") ? "🎁 " : ""}
                  {item}
                </ListaItem>
              ))}
            </ul>
          </div>

          {/* Seção: Opcionais */}
          {detalhes.opcionais && detalhes.opcionais.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-cactus-green-700 mb-2 flex items-center">
                <span className="text-2xl mr-2">🚨</span> Opcional (Pago à parte)
              </h3>
              <ul className="pl-4">
                {detalhes.opcionais.map((op, index) => (
                  <ListaItem key={index}>
                    {op.item.toLowerCase().includes("rapel") ? "🧗🏻‍♀️ " :
                     op.item.toLowerCase().includes("drone") ? "🛸 " : ""}
                    {op.item} ({op.preco})
                  </ListaItem>
                ))}
              </ul>
            </div>
          )}

          {/* Seção: O que levar */}
          <div>
            <h3 className="text-xl font-semibold text-cactus-green-700 mb-2 flex items-center">
              <span className="text-2xl mr-2">🎒</span> O que levar?
            </h3>
            <ul className="pl-4">
              {detalhes.oQueLevar.map((item, index) => (
                 <ListaItem key={index}>
                    {item.toLowerCase().includes("roupas") ? "👗 " :
                     item.toLowerCase().includes("calçado") ? "👟 " :
                     item.toLowerCase().includes("água") || item.toLowerCase().includes("lanche") ? "🥪 " :
                     item.toLowerCase().includes("protetor") || item.toLowerCase().includes("repelente") ? "🧴 " : ""}
                    {item}
                 </ListaItem>
              ))}
            </ul>
          </div>

        </div> {/* Fim do container de detalhes */}

        {/* Botão de Inscrição */}
        <div className="mt-10 text-center">
          <Link
            href={`/inscricao/${params.slug}`}
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-bold font-body text-lg transition duration-300 shadow-md hover:shadow-lg"
            // className="inline-block bg-burnt-orange-600 hover:bg-burnt-orange-700 text-white px-8 py-3 rounded-full font-bold font-body text-lg transition duration-300 shadow-md hover:shadow-lg" // << Use este quando o config funcionar
          >
            Quero Participar!
          </Link>
        </div>

      </div> {/* Fim do card branco */}
    </div> // Fim do container principal
  );
}