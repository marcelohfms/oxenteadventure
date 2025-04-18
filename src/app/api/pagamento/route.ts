import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { URLSearchParams } from 'url'; // Para construir query strings

// --- Configuração (igual antes) ---
const mpAccessToken = process.env.MP_ACCESS_TOKEN;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // Só precisamos da base URL agora

if (!mpAccessToken) console.error("Erro Crítico: MP_ACCESS_TOKEN não definido.");
if (!baseUrl) console.error("Erro Crítico: NEXT_PUBLIC_BASE_URL não definido.");

const client = mpAccessToken ? new MercadoPagoConfig({ accessToken: mpAccessToken }) : null;
const preference = client ? new Preference(client) : null;

export async function POST(request: NextRequest) {
  if (!client || !preference || !baseUrl) {
    return NextResponse.json({ message: 'Erro de configuração no servidor.' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { assentosSelecionados, passageiros, viagem, valorTotal } = body;

    if (!assentosSelecionados || !passageiros || !viagem || !valorTotal || passageiros.length !== assentosSelecionados.length) {
        return NextResponse.json({ message: 'Dados inválidos recebidos.' }, { status: 400 });
    }

    // Gera um ID único para este lote
    const loteId = `LOTE-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

    // --- NÃO SALVA NA PLANILHA AQUI ---
    console.log("Dados recebidos, NÃO salvando na planilha neste momento.");

    // --- PREPARAR PARÂMETROS PARA URL DE SUCESSO ---
    const paramsParaUrl = new URLSearchParams();
    paramsParaUrl.append('lote_id', loteId);
    paramsParaUrl.append('viagem', viagem);
    paramsParaUrl.append('valor_total', String(valorTotal)); // Passa como string
    passageiros.forEach((p: any, index: number) => {
        paramsParaUrl.append(`p${index}_nome`, p.nome);
        paramsParaUrl.append(`p${index}_email`, p.email);
        paramsParaUrl.append(`p${index}_telefone`, p.telefone);
        paramsParaUrl.append(`p${index}_assento`, assentosSelecionados[index]);
    });

    // Constrói a URL de sucesso completa (ATENÇÃO AO LIMITE DE TAMANHO DA URL!)
    const urlSucesso = `${baseUrl}/pagamento/sucesso?${paramsParaUrl.toString()}`;
    const urlFalha = `${baseUrl}/pagamento/falha?lote_id=${loteId}`; // Falha não precisa dos dados
    const urlPendente = `${baseUrl}/pagamento/pendente?lote_id=${loteId}`; // Pendente também não

     // Verifica o tamanho da URL de sucesso (limite comum é ~2000 caracteres)
     if (urlSucesso.length > 2000) {
       console.warn("URL de sucesso pode exceder limite de caracteres:", urlSucesso.length);
       // CONSIDERAR UMA ABORDAGEM ALTERNATIVA (ex: temp storage) se isso acontecer frequentemente
     }

    console.log("Criando preferência de pagamento...");
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
        payer: {
          name: passageiros[0]?.nome,
          email: passageiros[0]?.email,
          phone: {
              area_code: passageiros[0]?.telefone.substring(1, 3) || '',
              number: passageiros[0]?.telefone.substring(5).replace('-', '') || ''
          },
        },
        back_urls: {
          success: urlSucesso, // <<< URL COM OS PARÂMETROS
          failure: urlFalha,
          pending: urlPendente,
        },
        auto_return: 'approved',
        external_reference: loteId, // Mantém para referência futura (webhooks!)
        // notification_url: comentada
      },
    });

    console.log("Preferência criada:", preferenceData.id);
    return NextResponse.json({ init_point: preferenceData.init_point });

  } catch (error) {
    console.error("Erro geral na API /api/pagamento:", error);
    let errorMessage = 'Erro desconhecido no servidor';
    // ... (lógica de tratamento de erro igual antes) ...
     if (error instanceof Error) {
        errorMessage = error.message;
        if ('cause' in error && error.cause) {
            errorMessage += ` - Causa: ${JSON.stringify(error.cause)}`;
        }
    }
    return NextResponse.json({ message: 'Erro ao processar pagamento.', error: errorMessage }, { status: 500 });
  }
}