import Link from "next/link";
import Image from "next/image"; // <<< 1. Importar Image

interface CardViagemProps {
  titulo: string;
  imagem: string;
  data: string;
  descricao?: string;
}

export default function CardViagem({ titulo, imagem, data, descricao }: CardViagemProps) {
  const slug = titulo.toLowerCase().replace(/\s+/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return (
    <Link href={`/viagem/${slug}`} className="block group h-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full border border-beige-200 hover:shadow-xl transition-shadow duration-300">

        {/* Área da Imagem com Aspect Ratio - ALTERAÇÃO AQUI */}
        {/* O container pai precisa ser 'relative' para 'layout="fill"' funcionar */}
        <div className="w-full overflow-hidden relative aspect-video"> {/* <<< 2. Adicionado 'relative' e movido aspect-video aqui */}
          <Image
            src={imagem}
            alt={titulo}
            layout="fill" // <<< 3. Usar layout="fill"
            objectFit="cover" // <<< 4. Usar objectFit="cover"
            className="group-hover:scale-105 transition-transform duration-300 ease-in-out" // <<< 5. Removido w-full, aspect-video, object-cover daqui
            // width e height não são necessários com layout="fill"
            // Adicionar sizes pode otimizar ainda mais, mas layout="fill" é o principal
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        {/* --- Fim da Alteração --- */}

        {/* Área de Conteúdo (mantida igual) */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2 text-cactus-green-800 font-display group-hover:text-burnt-orange-600 transition-colors duration-300">
            {titulo}
          </h3>
          <p className="text-sm text-gray-500 mb-3 font-body">{data}</p>
          {descricao && (
             <p className="text-gray-700 mb-4 flex-grow font-body text-base">
               {descricao.length > 100 ? `${descricao.substring(0, 97)}...` : descricao}
             </p>
          )}
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