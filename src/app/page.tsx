import Header from "../components/Header";
import Banner from "../components/Banner";
import CardViagem from "../components/CardViagem";
import Footer from "../components/Footer";

export default function Home() {
  const viagens = [
    { titulo: "Trilha na Mata Atlântica", imagem: "/trilha.png", data: "20/05/2025" },
    { titulo: "Rapel na Pedra do Baú", imagem: "/rapel.png", data: "28/05/2025" },
    { titulo: "Exploração de Caverna", imagem: "/caverna.png", data: "05/06/2025" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Banner />
      <main className="flex-1 p-8 bg-gray-100" id="viagens">
        <h2 className="text-2xl font-bold mb-6 text-center">Próximas Aventuras</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {viagens.map((viagem, index) => (
            <CardViagem key={index} {...viagem} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}