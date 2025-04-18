import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { URLSearchParams } from 'url'; // Para construir query strings

// --- Definição da Interface (para tipagem) ---
interface Passageiro {
  nome: string;
  email: string;
  telefone: string;
  // Adicione outros campos se houver mais dados por passageiro
}

// --- Configuração ---
const mpAccessToken = process.env.MP_ACCESS_TOKEN;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!mpAccessToken) console.error("Erro Crítico: MP_ACCESS_TOKEN não definido.");
if (!baseUrl) console.error("Erro Crítico: NEXT_PUBLIC_BASE_URL não definido.");

const client = mpAccessToken ? new MercadoPagoConfig({ accessToken: mpAccessToken }) : null;
const preference = client ? new Preference(client) : null;

export async function POST(request: NextRequest) {
  if (!client || !preference || !baseUrl) {
    return NextResponse.json({ message: 'Erro de configuração no servidor.' }, { status: 500 });
  }

  try {
    // Tipando o body esperado (opcional, mas bom)
    const body: {
        assentosSelecionados: string[];
        passageiros: Passageiro[]; // Usando a interface
        viagem: string;
        valorTotal: number;
    } = await request.json();

    const { assentosSelecionados, passageiros, viagem, valorTotal } = body;

    // Validação simples (mantida)
    if (!assentosSelecionados || !passageiros || !viagem || !valorTotal || passageiros.length !== assentosSelecionados.length) {
        return NextResponse.json({ message: 'Dados inválidos recebidos.' }, { status: 400 });
    }

    // Gera um ID único para este lote (mantido)
    const loteId = `LOTE-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

    console.log("Dados recebidos, NÃO salvando na planilha neste momento.");

    // --- PREPARAR PARÂMETROS PARA URL DE SUCESSO ---
    const paramsParaUrl = new URLSearchParams();
    paramsParaUrl.append('lote_id', loteId);
    paramsParaUrl.append('viagem', viagem);
    paramsParaUrl.append('valor_total', String(valorTotal));

    // ===== CORREÇÃO AQUI =====
    // Substituído 'p: any' por 'p: Passageiro'
    passageiros.forEach((p: Passageiro, index: number) => {
        // Verifica se as propriedades existem antes de acessá-las (boa prática)
        paramsParaUrl.append(`p${index}_nome`, p.nome || '');
        paramsParaUrl.append(`p${index}_email`, p.email || '');
        paramsParaUrl.append(`p${index}_telefone`, p.telefone || '');
        // Acessando assentosSelecionados pelo índice, garantindo que exista
        if (assentosSelecionados[index]) {
          paramsParaUrl.append(`p${index}_assento`, assentosSelecionados[index]);
        }
    });
    // =========================

    // Constrói as URLs (mantido)
    const urlSucesso = `${baseUrl}/pagamento/sucesso?${paramsParaUrl.toString()}`;
    const urlFalha = `${baseUrl}/pagamento/falha?lote_id=${loteId}`;
    const urlPendente = `${baseUrl}/pagamento/pendente?lote_id=${loteId}`;

    if (urlSucesso.length > 2000) {
       console.warn("URL de sucesso pode exceder limite de caracteres:", urlSucesso.length);
     }

    console.log("Criando preferência de pagamento...");

    // Ajuste nos dados do pagador (payer) para melhor tipagem e segurança
    const firstPayer = passageiros[0]; // Pega o primeiro passageiro para dados do pagador

    const preferenceData = await preference.create({
      body: {
        items: [
          {
            id: `viagem-${viagem}-${loteId}`,
            title: `Reserva ${passageiros.length} assento(s) - Viagem: ${viagem.replace(/-/g, " ")}`,
            description: `Assentos: ${assentosSelecionados.join(', ')}`,
            quantity: 1,
            unit_price: valorTotal,
            currency_id: 'BRL',
          },
        ],
        payer: firstPayer ? { // Verifica se existe pelo menos um passageiro
          name: firstPayer.nome,
          email: firstPayer.email,
          phone: {
              area_code: firstPayer.telefone?.substring(1, 3) || '', // Adicionado '?' para segurança
              number: firstPayer.telefone?.substring(5).replace('-', '') || '' // Adicionado '?' para segurança
          },
        } : undefined, // Se não houver passageiro, não envia 'payer'
        back_urls: {
          success: urlSucesso,
          failure: urlFalha,
          pending: urlPendente,
        },
        auto_return: 'approved',
        external_reference: loteId,
      },
    });

    console.log("Preferência criada:", preferenceData.id);
    return NextResponse.json({ init_point: preferenceData.init_point });

  } catch (error) {
    console.error("Erro geral na API /api/pagamento:", error);
    let errorMessage = 'Erro desconhecido no servidor';
     if (error instanceof Error) {
        errorMessage = error.message;
        if ('cause' in error && error.cause) {
            // Tenta pegar a mensagem de erro da causa se for um objeto com 'message'
            const causeMessage = (typeof error.cause === 'object' && error.cause !== null && 'message' in error.cause)
                                 ? (error.cause as { message: string }).message
                                 : JSON.stringify(error.cause);
            errorMessage += ` - Causa: ${causeMessage}`;
        }
    }
    return NextResponse.json({ message: 'Erro ao processar pagamento.', error: errorMessage }, { status: 500 });
  }
}