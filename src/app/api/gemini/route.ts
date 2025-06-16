import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY não configurada. Verifique seu arquivo .env.local");
    return NextResponse.json({ message: 'API Key not configured' }, { status: 500 });
  }

  const { respostasQuiz } = await req.json();

  if (!respostasQuiz) {
    return NextResponse.json({ message: 'Respostas do quiz são necessárias.' }, { status: 400 });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const preferencias = Object.entries(respostasQuiz)
      .map(([perguntaId, resposta]) => {
        switch (perguntaId) {
          case 'genero': return `gênero ${resposta}`;
          case 'humor': return `com ${resposta === 'Sim' ? 'toque de humor' : resposta === 'Não' ? 'nenhum humor' : 'ou sem humor'}`;
          case 'complexidade': return `leitura ${resposta === 'Tanto faz' ? 'leve ou densa' : resposta}`;
          case 'ambientacao': return `ambientado em época ${resposta === 'Não importa' ? 'atual, futurista ou histórica' : resposta.toLowerCase()}`;
          case 'protagonista': return `com protagonista ${resposta.toLowerCase()}`;
          default: return '';
        }
      })
      .filter(Boolean)
      .join(', ');

    const prompt = `Baseado nas seguintes preferências: ${preferencias}. Por favor, me sugira um único livro que se encaixe perfeitamente. O retorno deve ser SOMENTE o nome do livro e o nome do autor, formatados exatamente como 'Nome do Livro' por 'Nome do Autor'. Não inclua nenhuma outra informação ou frase. Se você não conseguir sugerir um livro, retorne 'Nenhum livro encontrado'.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text().trim();

    if (text.includes("Nenhum livro encontrado")) {
      return NextResponse.json({ livro: null, autor: null, message: "Não foi possível encontrar um livro com base nas preferências." }, { status: 200 });
    }

    const parts = text.split(' por ');
    if (parts.length === 2) {
      const livro = parts[0].trim().replace(/^['"]|['"]$/g, '');
      const autor = parts[1].trim().replace(/^['"]|['"]$/g, '');
      return NextResponse.json({ livro, autor }, { status: 200 });
    } else {
      console.warn("Formato de resposta inesperado do Gemini:", text);
      return NextResponse.json({ livro: null, autor: null, message: "Formato de sugestão inválido." }, { status: 200 });
    }

  } catch (error) {
    console.error('Erro ao chamar a API do Gemini:', error);
    return NextResponse.json({ message: 'Erro ao processar a requisição de recomendação de livro.', error: (error as Error).message }, { status: 500 });
  }
}