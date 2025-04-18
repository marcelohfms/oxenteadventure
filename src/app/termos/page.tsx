// src/app/termos/page.tsx
import Header from "@/components/Header"; // Ajuste o caminho
import Footer from "@/components/Footer"; // Ajuste o caminho

export default function TermosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Conteúdo Principal */}
      {/* Use bg-beige-50 ou outra cor do tema quando o config funcionar */}
      <main className="flex-grow bg-gray-100 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl bg-white p-8 md:p-10 rounded-lg shadow-lg">

          {/* Título Principal */}
          {/* Use text-cactus-green-800 font-display quando o config funcionar */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center border-b pb-4">
            TERMO DE RESPONSABILIDADE E CONHECIMENTO DE RISCOS
            <br />
            <span className="text-xl md:text-2xl text-orange-600"> {/* Use text-burnt-orange-600 */}
              OXENTE ADVENTURE
            </span>
          </h1>

          {/* Use text-gray-700 font-body leading-relaxed quando o config funcionar */}
          <div className="prose prose-base lg:prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
            {/* Introdução */}
            <p className="font-semibold">
              DECLARO que efetuei a leitura do presente Termo de Responsabilidade e
              Conhecimento de Riscos, me certificando de haver entendido e aceitado as seguintes
              disposições:
            </p>

            {/* Seção 1: Natureza da Atividade e Riscos Gerais */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">1. Natureza da Atividade e Riscos Gerais</h2>
              <p>
                Atividade de aventura é em regra praticada em ambientes naturais, e que, apesar
                da boa organização, segurança e seriedade no roteiro, sempre existirão riscos
                que vão desde pequenas escoriações, torções, cortes e fraturas, até acidentes de
                natureza mais grave ou fatais.
              </p>
            </section>

            {/* Seção 2: Condições Ambientais e Esforço */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">2. Condições Ambientais e Esforço Físico</h2>
              <p>
                Atividades realizadas ao ar livre, junto à natureza, deixam expostos às condições
                climáticas e metereológicas diversas (sol, chuva, frio, vento), executando muitas
                vezes atividades que exigem esforço elevado, algum desconforto físico e
                psicológico, em terrenos acidentados, encharcados, íngremes, descampados,
                com restrição a água, tendo contato com insetos, animais peçonhentos, animais
                silvestres, entre outros.
              </p>
            </section>

             {/* Seção 3: Impacto no Roteiro */}
             <section>
               <h2 className="text-lg font-semibold text-gray-800 mb-2">3. Execução do Roteiro</h2>
               <p>
                 A execução regular e integral do roteiro poderá ser prejudicada em virtude da
                 ocorrência de situação de risco à vida, saúde ou integridade física de qualquer
                 participante ou membro da equipe de trabalho.
               </p>
             </section>

             {/* Seção 4: Alterações Inesperadas */}
             <section>
               <h2 className="text-lg font-semibold text-gray-800 mb-2">4. Alterações Inesperadas</h2>
               <p>
                 Poderão acontecer alterações de última hora no roteiro ou na sua execução,
                 provocadas pelo inesperado, caso fortuito ou força maior, o que na atividade de
                 aventura faz parte integrante da experiência.
               </p>
             </section>

            {/* Seção 5: Responsabilidades do Participante */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">5. Responsabilidades do Participante</h2>
              <ol className="list-decimal list-outside pl-5 space-y-2">
                <li>
                  Fornecer informações corretas à respeito do seu estado e condições de saúde,
                  bem como, sobre a utilização de medicamentos e planos de saúde, tendo em
                  vista que essas informações podem afetar sua segurança e saúde na prática de
                  atividade esportiva de aventura.
                </li>
                <li>
                  Cumprir as normas de segurança apresentadas pela equipe de instrução do
                  Oxente Adventure e parceiros, sem jamais exceder seus limites em impulsos
                  desmedidos.
                </li>
                <li>
                  Caminhar respeitando as trilhas e atividades permitidas e em caso de dúvidas
                  procurar imediatamente algum membro da equipe Oxente Adventure para
                  esclarecimentos.
                </li>
                <li>
                  Não realizar quaisquer atos que venham a degradar o meio ambiente, ou, que
                  infrinjam as regras ambientais.
                </li>
                <li>
                  É vedada a participação de gestantes, cardíacos, recém cirurgiados, pessoas com
                  limitações físicas importantes.
                </li>
                <li>
                  Não é aconselhável participar das atividades de aventura, pessoa sedentária,
                  visto que por vezes as atividades exigem esforço físico elevado, podendo levar
                  situação de risco à vida da mesma e de outros participantes ou membro da
                  equipe de trabalho.
                </li>
                <li>
                  A utilização de serviços de emergência médica durante a prática da atividade de
                  aventura pode ser dificultada pela distância e meios de transporte a um serviço
                  de atendimento avançado.
                </li>
                <li>
                  A atividade de aventura a ser praticada não exige experiência prévia, porém o
                  participante deverá seguir atentamente as orientações de segurança da
                  contratada.
                </li>
                <li>Que entendo e aceito os riscos mencionados.</li>
                <li>
                  Tenho ciência de que qualquer ato meu, contrário às informações recebidas e
                  orientações da equipe da CONTRATADA, podem causar danos à minha
                  integridade física, ao meio ambiente e a terceiros, os quais assumo
                  integralmente.
                </li>
                <li>
                  Que isento a Equipe Oxente Adventure de todos os danos causados a mim ou a
                  terceiros, por questões físicas que me acometam ou que eu venha a dar causa por
                  ato próprio.
                </li>
                <li>
                  Que condições meteorológicas e ambientais podem agravar os riscos inerentes a
                  atividade de aventura, motivo pelo qual recebida a instrução para findar a prática
                  pelo profissional disponibilizado pela CONTRATADA deverei acatar.
                </li>
                <li>
                  Que não é aconselhável fazer uso de bebidas alcóolicas antes e durante as
                  atividades de aventura.
                </li>
              </ol>
            </section>

            {/* Seção 6: Direito de Imagem */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">6. Direito de Imagem</h2>
              <p>
                O participante autoriza de modo não oneroso, por prazo indeterminado, a utilização e
                divulgação para fins exclusivamente promocionais (impresso ou virtual) de sua
                atividade comercial das imagens fotográficas ou filmagens, assim como o eventual
                testemunho ou relato de viagem, obtidos pelos integrantes da equipe ao longo da
                atividade.
              </p>
            </section>

            {/* Seção 7: Perigos e Riscos Específicos */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">7. Perigos e Riscos Específicos da Atividade</h2>
              <ol className="list-decimal list-outside pl-5 space-y-2">
                <li>
                  Quedas de materiais pessoais, como por exemplo, máquinas fotográficas,
                  equipamentos de filmagem, óculos de sol ou de grau, bonés, celulares dentre
                  outros, onde a equipe não se responsabilizará por qualquer dano causado aos
                  equipamentos pessoais levados para a prática da atividade.
                </li>
                <li>
                  Riscos gerais de passeios na natureza, tais como picadas de insetos (carrapatos,
                  abelhas, marimbondos), animais peçonhentos, queda de árvore, desprendimento
                  de pedras causadas pelo grupo ou não, contato com plantas urticantes e
                  espinhosas, riscos de afogamento, insolação, desmaios, mal súbito, dentre
                  outros.
                </li>
                <li>
                  Condições climáticas e mudanças meteorológicas como chuva com raios,
                  podendo aumentar repentinamente o volume de água e causar queda de árvores.
                </li>
                <li>Atrito com estrutura física feita de corda podendo causar queimaduras.</li>
                <li>Queda da própria altura, queda de média, baixa e grande altura.</li>
                <li>
                  Choque com pedras ou galhos durante o percurso e durante o banho da
                  cachoeira.
                </li>
                <li>
                  Lesões leves, graves ou gravíssimas e se perder do grupo pelo não cumprimento
                  das orientações da Equipe Oxente Adventure.
                </li>
                <li>
                  Percurso com terreno irregular, com buracos e com trechos de declive acentuado
                  que podem ocasionar, esforço excessivo nas articulações: fadiga, escorregões,
                  escoriações, arranhões, pequenas queimaduras, dentre outros.
                </li>
                <li>Contato com animais silvestres de pequeno, médio e grande porte.</li>
              </ol>
            </section>

            {/* Seção: Orientações Gerais */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Orientações Gerais</h2>
              <ol className="list-decimal list-outside pl-5 space-y-2">
                <li>
                  Não faz parte do escopo desse contrato o fornecimento de alimentos. Por precaução,
                  leve alimentos para consumi-los durante o passeio e faça uma alimentação prévia
                  adequada.
                </li>
                <li>
                  Para a boa realização da atividade você deverá estar usando vestimenta adequada que
                  assegure proteção, mobilidade e conforto, calçado fechado apropriado para caminhada,
                  proteção para a cabeça como chapéu ou boné, repelente, roupa de banho, protetor solar,
                  recipiente para água entre outros itens de uso pessoal.
                </li>
                <li>Caso faça uso de algum remédio de uso regular, leve-o para a atividade.</li>
                <li>
                  Os valores Pagos para realização da atividade só serão devolvidos em caso de
                  desistência, no prazo de 48 horas após a efetuação do pagamento pelo participante.
                </li>
                <li>
                  A Equipe Oxente Adventure se resguarda do direito de reagendar todo e qualquer
                  passeio em caso de condições climáticas inadequadas para o pleno desenvolvimento das
                  atividades agendadas para o dia.
                </li>
                <li>
                  Declaro ter recebido, no dia da atividade, reunião de orientação prévia para atividade
                  a ser realizada, e que tive todas as minha dúvidas sanadas. Entendo que a reunião
                  supracitada é de caráter didático para que eu me familiarize com os equipamentos e
                  procedimentos que serão adotados durante o evento, não sendo portanto, caracterizado
                  como curso sobre a atividade proposta.
                </li>
                <li>
                  Declaro estar em boas condições físicas e mentais adequadas à prática de atividades
                  de cunho radical, Trilhas, Rapel, Escaladas bem como qualquer outra atividade ao ar
                  livre promovida pela Equipe Oxente Adventure.
                </li>
              </ol>
            </section>
          </div> {/* Fim da div .prose */}
        </div>
      </main>

      <Footer />
    </div>
  );
}