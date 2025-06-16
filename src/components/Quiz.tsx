'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image';
import book from "@/../public/img/book.png";

type Pergunta = {
  id: string
  texto: string
  opcoes: string[]
}

const perguntas: Pergunta[] = [
  {
    id: "genero",
    texto: "Qual gênero você mais gosta?",
    opcoes: ["Romance", "Suspense", "Ficção científica", "Fantasia", "Autoajuda"],
  },
  {
    id: "humor",
    texto: "Você prefere livros com um toque de humor?",
    opcoes: ["Sim", "Não", "Indiferente"],
  },
  {
    id: "complexidade",
    texto: "Você quer uma leitura mais leve ou densa?",
    opcoes: ["Leve", "Densa", "Tanto faz"],
  },
  {
    id: "ambientacao",
    texto: "Você prefere histórias ambientadas em que época?",
    opcoes: ["Atual", "Futurista", "Histórica", "Não importa"],
  },
  {
    id: "protagonista",
    texto: "Você se interessa mais por protagonistas...",
    opcoes: ["Femininos", "Masculinos", "Tanto faz"],
  },
];

type Props = {
  onSubmit: (respostas: Record<string, string>) => void;
}

export default function Quiz({ onSubmit }: Props) {
  const [indice, setIndice] = useState(0)
  const [respostas, setRespostas] = useState<Record<string, string>>({})
  const pergunta = perguntas[indice]
  const [respostaAtual, setRespostaAtual] = useState('')
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false); // Novo estado para controlar o loading

  const progressoClasse = [
    "w-0",
    "w-1/5", // Ajustado para 5 perguntas
    "w-2/5",
    "w-3/5",
    "w-4/5",
    "w-full"
  ][indice];

  // Adicionado useEffect para sincronizar respostaAtual com respostas
  useEffect(() => {
    setRespostaAtual(respostas[pergunta.id] || '');
  }, [pergunta.id, respostas]);

  const handleSelecionar = (opcao: string) => {
    setRespostaAtual(opcao); // Atualiza a resposta selecionada na UI
    setRespostas((prev) => ({ ...prev, [pergunta.id]: opcao })); // Salva a resposta no estado geral
    setError(""); // Limpa o erro ao selecionar uma opção
  }

  const enviarRespostasParaGemini = async () => {
    setLoading(true); // Ativa o estado de loading
    setError(""); // Limpa erros anteriores
    try {
      const response = await fetch('/api/gemini', { // AQUI É A MUDANÇA
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ respostasQuiz: respostas }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.livro && data.autor) {
          // Aqui você pode chamar a função onSubmit ou lidar com a recomendação
          // console.log("Livro recomendado:", data.livro, "por", data.autor);
          // Supondo que onSubmit espera um objeto com livro e autor ou similar
          onSubmit({ livro: data.livro, autor: data.autor });
        } else {
          setError(data.message || "Não foi possível obter uma recomendação de livro.");
          onSubmit({ livro: "Nenhum livro encontrado", autor: "" }); // Envia um feedback negativo
        }
      } else {
        setError(data.message || "Ocorreu um erro ao buscar a recomendação.");
        onSubmit({ livro: "Erro na recomendação", autor: "" }); // Envia um feedback de erro
      }
    } catch (err) {
      console.error('Erro ao enviar respostas para o Gemini:', err);
      setError("Não foi possível conectar com o servidor de recomendação.");
      onSubmit({ livro: "Erro de conexão", autor: "" }); // Envia um feedback de erro de conexão
    } finally {
      setLoading(false); // Desativa o estado de loading
    }
  }

  const handleAvancar = () => {
    setError("");
    if (!respostas[pergunta.id]) {
      setError("Escolha uma alternativa!");
      return;
    }
    if (indice < perguntas.length - 1) {
      setIndice(indice + 1);
    } else {
      enviarRespostasParaGemini();
    }
  }

  return (
    <div className='bg-[#F3F2EC] h-[42vw]'>
      <div className='flex items-center justify-center gap-15'>
        <div className='w-[40vw]'>
          <div className='bg-[white] w-[100%] h-[0.5vw] rounded-sm border'>
            <div className={`bg-[green] ${progressoClasse} h-[0.4vw] rounded-sm `}></div>
          </div>
          <h2 className='text-[#222222] text-[3vw] pt-[2vw]'>{pergunta.texto}</h2>
          <div className='grid grid-cols-2 pt-[2vw] pb-[4vw] leading-[3.5vw]'>
            {
              pergunta.opcoes.map((opcao) => (
                <label
                  key={opcao}
                  onClick={() => handleSelecionar(opcao)}
                  className='flex text-[#7A7A7A] text-[1.5vw] gap-[1vw] cursor-pointer' // Adicionado cursor-pointer
                >
                  <input
                    type="radio"
                    value={opcao}
                    checked={respostaAtual === opcao}
                    onChange={() => {}} // onChange handler vazio porque a lógica está no onClick do label
                    className='w-[1.3vw] accent-[#74642F]'
                  />
                  {opcao}
                </label>
              ))
            }
          </div>

          <p className={`text-[1vw] text-[red] `}>{error}</p>
          <button
            onClick={handleAvancar}
            disabled={loading} // Desabilita o botão enquanto estiver carregando
            className='w-[10vw] border border-[#C0C0C0] text-[1vw] text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed' // Estilo para disabled
          >
            {loading ? "Carregando..." : (indice === perguntas.length - 1 ? "Recomendar Livro" : "Próximo")}
          </button>
        </div>
        <div className='w-[25vw] hidden sm:flex'>
          <Image src={book} alt='livro-representativo' />
        </div>
      </div>
      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}