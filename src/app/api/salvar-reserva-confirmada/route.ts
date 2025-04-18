// app/api/salvar-reserva-confirmada/route.ts
import { NextRequest, NextResponse } from 'next/server';

const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;

if (!googleScriptUrl) {
  console.error("Erro Crítico: GOOGLE_SCRIPT_URL não definido para salvar reserva confirmada.");
}

export async function POST(request: NextRequest) {
  if (!googleScriptUrl) {
    return NextResponse.json({ message: 'Erro de configuração no servidor (Script URL).' }, { status: 500 });
  }

  try {
    const body = await request.json(); // Recebe os dados da reserva reconstruídos do frontend

    console.log("Recebido para salvar reserva confirmada:", JSON.stringify(body));

    // Validação simples dos dados recebidos
    if (!body || !Array.isArray(body.reservas) || body.reservas.length === 0) {
      return NextResponse.json({ message: 'Dados de reserva inválidos ou ausentes.' }, { status: 400 });
    }

    // Chama o Google Apps Script para salvar
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Envia os dados no formato que o Apps Script espera (com 'data' sendo um array)
      body: JSON.stringify({
          action: 'addReservasBatch', // Usando a mesma action do script anterior
          data: body.reservas // Passa o array de reservas
        }),
    });

    // Analisa a resposta do Apps Script
    const scriptResult = await response.json();

    if (!response.ok || scriptResult.status !== 'success') {
      console.error("Erro retornado pelo Google Apps Script:", scriptResult);
      throw new Error(scriptResult.message || 'Falha ao salvar dados na planilha.');
    }

    console.log("Resposta do Apps Script:", scriptResult);
    return NextResponse.json({ status: 'success', message: 'Reserva salva com sucesso na planilha.' });

  } catch (error) {
    console.error("Erro na API /api/salvar-reserva-confirmada:", error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao salvar reserva.';
    return NextResponse.json({ status: 'error', message: errorMessage }, { status: 500 });
  }
}