import Link from "next/link";

interface CardViagemProps {
  titulo: string;
  imagem: string;
  data: string;
}

export default function CardViagem({ titulo, imagem, data }: CardViagemProps) {
  const slug = titulo.toLowerCase().replace(/\s+/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return (
    <Link href={`/viagem/${slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform transform hover:scale-105">
        <img src={imagem} alt={titulo} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{titulo}</h3>
          <p className="text-gray-600">{data}</p>
        </div>
      </div>
    </Link>
  );
}
