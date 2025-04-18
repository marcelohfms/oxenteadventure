import Header from "../components/Header";
import Banner from "../components/Banner"; // Assumindo que este componente será estilizado conforme sugestões
import CardViagem from "../components/CardViagem"; // Assumindo que este componente será estilizado conforme sugestões
import Footer from "../components/Footer";

// Dados das Viagens (mantidos)
import { viagens } from "@/data/viagens"; // Ajuste o caminho se necessário

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen bg-beige-50"> {/* Fundo mais natural */}
      {/* 
        Header: Certifique-se de que o Header também use a paleta de cores 
        e fontes definidas para consistência. Pode ter um fundo transparente
        ou levemente terroso.
      */}
      <Header />

      {/* 
        Banner: Componente crucial para a primeira impressão. 
        Deve ter uma imagem de fundo de alta qualidade de aventura,
        um overlay escuro para contraste, título forte, subtítulo e um botão CTA laranja.
        Veja sugestão de implementação nos comentários abaixo.
      */}
      <Banner />

      <main className="flex-1" id="viagens">
        {/* Usando um container para limitar a largura e centralizar em telas maiores */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Título da seção com cores e fontes da identidade visual */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-cactus-green-700 font-display"> {/* Fonte forte para títulos */}
            Prepare-se para as próximas aventuras!
          </h2>
          {/* Texto introdutório */}
          <p className="text-lg text-center text-gray-600 mb-12 md:mb-16 max-w-2xl mx-auto font-body"> {/* Fonte amigável para corpo */}
            Explore destinos incríveis perto de João Pessoa.<br></br> Escolha sua experiência e venha viver momentos inesquecíveis conosco.
          </p>

          {/* Grid de Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {/* 
              CardViagem: Cada card deve ser visualmente atraente.
              Pense em bordas sutis, talvez um fundo levemente texturizado,
              imagem ocupando boa parte, título destacado (verde cacto?),
              descrição clara e um botão "Ver Detalhes" (laranja queimado).
              Veja sugestão de implementação nos comentários abaixo.
            */}
            {viagens.map((viagem) => (
              <CardViagem key={viagem.slug} {...viagem} />
            ))}
          </div>

           {/* Opcional: Botão extra para ver todas as viagens */}
           <div className="text-center mt-16">
               <a href="/todas-viagens" className="inline-block bg-transparent border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition duration-300 font-body">
                   Ver Todas as Aventuras
               </a>
           </div>

        </div>
      </main>

      {/* 
        Footer: Deve seguir o mesmo estilo visual, talvez com um fundo
        terroso escuro ou preto, usando as cores verde/bege/laranja para
        links e textos.
      */}
      <Footer />
    </div>
  );
}