// src/app/sobre/page.tsx
import Link from "next/link";
import Header from "@/components/Header"; // Ajuste o caminho se necessário
import Footer from "@/components/Footer"; // Ajuste o caminho se necessário

export default function SobreNosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Conteúdo Principal */}
      {/* Use bg-beige-50 ou outra cor do tema quando o config funcionar */}
      <main className="flex-grow bg-gray-100 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl bg-white p-8 md:p-12 rounded-lg shadow-lg">

          {/* Título Principal */}
          {/* Use text-cactus-green-800 font-display quando o config funcionar */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
            Sobre a Oxente Adventure
          </h1>

          {/* Seção: Nossa Paixão */}
          <section className="mb-10">
            {/* Use text-cactus-green-700 font-display quando o config funcionar */}
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Nossa Paixão é Conectar Você à Natureza
            </h2>
            {/* Use text-gray-700 font-body leading-relaxed quando o config funcionar */}
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              A Oxente Adventure nasceu do amor pela beleza natural exuberante da Paraíba e da vontade de compartilhar
              a energia transformadora que só a aventura ao ar livre proporciona. Mais do que apenas viagens,
              oferecemos experiências autênticas que criam memórias inesquecíveis, sempre com segurança e respeito
              pelo meio ambiente.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Seja explorando trilhas escondidas, sentindo a adrenalina do rapel ou descobrindo a magia das cachoeiras,
              nosso objetivo é que você se reconecte consigo mesmo e com o mundo ao seu redor.
            </p>
          </section>

          {/* Seção: Nossos Pilares */}
          <section className="mb-10">
            {/* Use text-cactus-green-700 font-display quando o config funcionar */}
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Nossos Pilares
            </h2>
            {/* Use text-gray-700 font-body quando o config funcionar */}
            <ul className="space-y-3 list-disc list-inside text-lg text-gray-600">
              <li>
                <span className="font-semibold">Segurança Acima de Tudo:</span> Nossos guias são experientes, treinados e
                utilizamos equipamentos certificados para garantir sua tranquilidade em cada aventura.
              </li>
              <li>
                <span className="font-semibold">Respeito Ambiental:</span> Praticamos o turismo sustentável, buscando
                minimizar nosso impacto e conscientizar sobre a preservação das nossas riquezas naturais.
              </li>
              <li>
                <span className="font-semibold">Experiência Local:</span> Valorizamos a cultura e as comunidades locais,
                proporcionando roteiros que vão além do óbvio e mostram a verdadeira essência da Paraíba.
              </li>
              <li>
                <span className="font-semibold">Paixão pela Aventura:</span> Somos aventureiros de coração e queremos
                compartilhar esse entusiasmo, adaptando cada experiência ao seu ritmo e desejo.
              </li>
            </ul>
          </section>

          {/* ===== SEÇÃO CREDENCIAIS AJUSTADA ===== */}
          <section className="mb-10 p-6 border border-orange-300 rounded-lg bg-orange-50"> {/* Destaque visual */}
            {/* Use text-cactus-green-700 font-display quando o config funcionar */}
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Empresa Registrada e Confiável
            </h2>
            {/* Use text-gray-700 font-body quando o config funcionar */}
            <p className="text-base text-gray-600 mb-4">
              A Oxente Adventure é uma prestadora de serviços turísticos formalizada e comprometida com as normas do setor.
              Estamos registrados no **CADASTUR**, o sistema de cadastro de pessoas físicas e jurídicas que atuam no setor do turismo,
              vinculado ao Ministério do Turismo.
            </p>
            <div className="space-y-2 text-base text-gray-800">
              <p>
                <span className="font-semibold">Registro CADASTUR (CNPJ):</span> 60.098.690/0001-95
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-3">
                 {/* Link para consulta online */}
                 <a
                  href="https://cadastur.turismo.gov.br/" // Link oficial para consulta
                  target="_blank"
                  rel="noopener noreferrer"
                  // Use bg-blue-600 hover:bg-blue-700 text-white se preferir um botão azul
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 transition duration-150 ease-in-out"
                  aria-label="Verificar registro online no Cadastur"
                >
                   Verificar Registro Online
                   <svg className="ml-2 -mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </a>
                {/* Link para download do PDF */}
                 <a
                  href="/CERTIFICADO_CADASTUR.pdf" // Caminho para o PDF dentro da pasta /public
                  download // Atributo para sugerir o download
                  // Use border-blue-600 text-blue-700 hover:bg-blue-50 se preferir um botão azul
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition duration-150 ease-in-out"
                  aria-label="Baixar certificado Cadastur em PDF"
                >
                   Baixar Certificado (PDF)
                   <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                   </svg>
                 </a>
               </div>
            </div>
          </section>
          {/* ===== FIM DA SEÇÃO CREDENCIAIS ===== */}

          {/* Seção: Chamada para Ação */}
          <section className="text-center mt-10">
            {/* Use text-gray-700 font-body quando o config funcionar */}
            <p className="text-lg text-gray-600 mb-6">
              Pronto para sua próxima aventura? Explore nossos roteiros e venha viver momentos incríveis conosco!
            </p>
            <Link
              href="/#viagens" // Leva para a seção de viagens na home
              scroll={true}
              // Use bg-burnt-orange-600 hover:bg-burnt-orange-700 text-white quando o config funcionar
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-bold text-lg transition duration-300 shadow-md hover:shadow-lg"
            >
              Ver Próximas Viagens
            </Link>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}