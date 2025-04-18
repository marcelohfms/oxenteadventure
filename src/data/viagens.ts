// Defina uma interface para os detalhes (opcional, mas bom para TypeScript)
interface DetalhesViagemEstruturada {
    pontoEncontro: string[];
    horarioSaida: string;
    horarioRetorno: string;
    inclusos: string[];
    opcionais?: { item: string; preco: string }[]; // Opcional pode não existir
    oQueLevar: string[];
    // Preços e pagamento podem ficar aqui ou serem tratados separadamente
    // preços?: { tipo: string; valor: string }[];
    // formasPagamento?: string[];
  }
  
  // Defina a interface para a Viagem completa
  export interface Viagem {
    slug: string;
    titulo: string;
    imagem: string;
    data: string;
    descricao: string; // Removido
    detalhes: DetalhesViagemEstruturada; // Adicionado
  }
  
  // Atualize seu array de viagens
  // (COLOQUE ESTE ARRAY EM UM LOCAL ACESSÍVEL PELA PÁGINA DE DETALHES,
  // talvez em um arquivo separado ex: data/viagens.ts e importe-o)
  
  export const viagens: Viagem[] = [
    {
        slug: "encantos-das-cachoeiras",
        titulo: "Encantos das Cachoeiras",
        imagem: "/cachoeira.png", // Certifique-se que a imagem existe em /public
        data: "17/05/2025 (sábado)",
        detalhes: {
            pontoEncontro: [
                "Posto Free Way (entre Avenida Epitácio Pessoa/Ruy Carneiro)",
                "Posto Pichilau (Ronaldão)",
            ],
            horarioSaida: "00:30h",
            horarioRetorno: "Após fim da atividade (entre 16:00h- 17:00h)",
            inclusos: [
                "Transporte ida e volta",
                "Seguro aventura",
                "Café da manhã",
                "Almoço",
                "Trilhas",
                "Acesso às cachoeiras",
                "Brindes e sorteios",
            ],
            opcionais: [
                { item: "Rapel", preco: "R$70,00" },
                { item: "Drone no rapel", preco: "R$35,00" },
            ],
            oQueLevar: [
                "Roupas (calça e/ou short/bermuda, toalha, roupa de banho)",
                "Calçado (fechado tipo tênis com aderência ou bota + sandália)",
                "Água e lanches",
                "Protetor solar e repelente",
            ],
            // Você pode adicionar preços e formas de pagamento aqui se quiser
            // ou mostrá-los apenas na página de inscrição.
        },
        descricao: "Embarque rumo aos cenários deslumbrantes de São Benedito do Sul - PE, a cidade das águas!"
    },
    // {
    //   slug: "rapel-na-pedra-do-bau",
    //   titulo: "Rapel na Pedra do Baú",
    //   imagem: "/rapel.png",
    //   data: "28/05/2025",
    //   detalhes: {
    //      // PREENCHA OS DETALHES ESPECÍFICOS PARA ESTA VIAGEM AQUI
    //      pontoEncontro: ["Local A", "Local B"],
    //      horarioSaida: "01:00h",
    //      horarioRetorno: "18:00h",
    //      inclusos: ["Transporte", "Equipamento Rapel", "Seguro"],
    //      oQueLevar: ["Roupas confortáveis", "Água", "Protetor"],
    //   }
    // },
    // Adicione outras viagens com seus detalhes específicos...
  ];
  
  // Função para encontrar viagem (pode ficar junto com os dados ou na página)
  export function encontrarViagemPorSlug(slug: string): Viagem | undefined {
    return viagens.find(v => v.slug === slug);
  }