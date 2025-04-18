import Link from "next/link";

interface CardViagemProps {
  titulo: string;
  imagem: string;
  data: string;
  descricao?: string; // Adicionei como opcional
}

export default function CardViagem({ titulo, imagem, data, descricao }: CardViagemProps) {
  // Criação do slug (mantida)
  const slug = titulo.toLowerCase().replace(/\s+/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return (
    // O Link agora envolve tudo e aplica o hover geral com 'group'
    <Link href={`/viagem/${slug}`} className="block group h-full"> {/* Adicionado h-full para garantir que o Link preencha a altura do grid item */}
      {/* Card Container */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full border border-beige-200 hover:shadow-xl transition-shadow duration-300"> {/* Usando h-full para ocupar a altura disponível */}

        {/* Área da Imagem com Aspect Ratio */}
        <div className="w-full overflow-hidden"> {/* Container para evitar problemas de overflow com bordas arredondadas */}
          <img
            src={imagem}
            alt={titulo}
            // Aplicando aspect-ratio (ex: 16:9) e object-cover
            // Escolha a proporção que melhor se adapta às suas imagens:
            // aspect-video (16:9)
            // aspect-square (1:1)
            // aspect-[4/3] (4:3)
            // aspect-[3/4] (3:4 - Vertical)
            className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out" // Adicionado efeito de zoom no hover
          />
        </div>

        {/* Área de Conteúdo */}
        <div className="p-5 flex flex-col flex-grow"> {/* Aumentei padding e usei flex-grow */}
          <h3 className="text-xl font-bold mb-2 text-cactus-green-800 font-display group-hover:text-burnt-orange-600 transition-colors duration-300"> {/* Cor muda no hover do card */}
            {titulo}
          </h3>
          <p className="text-sm text-gray-500 mb-3 font-body">{data}</p>

          {/* Descrição Opcional e Truncada */}
          {descricao && (
             <p className="text-gray-700 mb-4 flex-grow font-body text-base"> {/* Fonte aumentada aqui */}
               {descricao.length > 100 ? `${descricao.substring(0, 97)}...` : descricao} {/* Trunca descrição longa */}
             </p>
          )}

          {/* Botão/Chamada para Ação (empurrado para baixo com mt-auto) */}
          <div className="mt-auto pt-2">
             <span className="inline-block bg-burnt-orange-500 group-hover:bg-burnt-orange-600 text-white text-center font-semibold py-2 px-4 rounded-md transition duration-300 font-body text-sm shadow group-hover:shadow-lg">
               Ver Detalhes
             </span>
          </div>
        </div>
      </div>
    </Link>
  );
}