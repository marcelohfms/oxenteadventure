interface CardViagemProps {
    titulo: string;
    imagem: string;
    data: string;
  }
  
  export default function CardViagem({ titulo, imagem, data }: CardViagemProps) {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition">
        <img src={imagem} alt={titulo} className="h-48 w-full object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{titulo}</h3>
          <p className="text-gray-600">{data}</p>
        </div>
      </div>
    );
  }
  