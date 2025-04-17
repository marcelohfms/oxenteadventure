import { notFound } from "next/navigation";
import Link from "next/link"; // Adicionamos a importação do Link aqui

const viagens = [
  { slug: "trilha-na-mata-atlantica", titulo: "Trilha na Mata Atlântica", imagem: "/trilha.png", data: "20/05/2025", descricao: "Explore as belezas da Mata Atlântica em uma trilha inesquecível." },
  { slug: "rapel-na-pedra-do-bau", titulo: "Rapel na Pedra do Baú", imagem: "/rapel.png", data: "28/05/2025", descricao: "Sinta a adrenalina de descer uma das rochas mais incríveis do Brasil." },
  { slug: "exploracao-de-caverna", titulo: "Exploração de Caverna", imagem: "/caverna.png", data: "05/06/2025", descricao: "Aventure-se nas profundezas e descubra a beleza escondida das cavernas." }
];

export default function DetalhesViagem({ params }: { params: { slug: string } }) {
  const viagem = viagens.find(v => v.slug === params.slug);

  if (!viagem) {
    notFound();
  }

  return (
    <div className="min-h-screen p-8 flex flex-col items-center gap-6">
      <h1 className="text-4xl font-bold">{viagem?.titulo}</h1>
      <img
        src={viagem?.imagem}
        alt={viagem?.titulo}
        className="w-full max-w-2xl rounded-lg shadow-md object-cover"
      />
      <p className="text-lg text-center">{viagem?.descricao}</p>
      <p className="text-md font-semibold">Data: {viagem?.data}</p>
      <Link
        href={`/inscricao/${params.slug}`}
        className="mt-6 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-semibold"
      >
        Fazer Inscrição
      </Link>
    </div>
  );
}
