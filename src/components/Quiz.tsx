'use client'
import { useState, useEffect } from 'react'
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
  onSubmit: (resultado: { livro: string | null; autor: string | null; descricao: string | null; message?: string }) => void;
}

export default function Quiz({ onSubmit }: Props) {
  const [indice, setIndice] = useState(0)
  const [respostas, setRespostas] = useState<Record<string, string>>({})
  const pergunta = perguntas[indice]
  const [respostaAtual, setRespostaAtual] = useState('')
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false); 

  const progressoClasse = [
    "w-0",
    "w-1/5", 
    "w-2/5",
    "w-3/5",
    "w-4/5",
    "w-full"
  ][indice];

  useEffect(() => {
    setRespostaAtual(respostas[pergunta.id] || '');
  }, [pergunta.id, respostas]);

  const handleSelecionar = (opcao: string) => {
    setRespostaAtual(opcao);
    setRespostas((prev) => ({ ...prev, [pergunta.id]: opcao })); 
    setError(""); 
  }

  const enviarRespostasParaGemini = async () => {
    setLoading(true); 
    setError(""); 
    try {
      const response = await fetch('/api/gemini', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ respostasQuiz: respostas }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.livro && data.autor) {
          onSubmit({ livro: data.livro, autor: data.autor, descricao: data.descricao });
        } else {
          setError(data.message || "Não foi possível obter uma recomendação de livro.");
          onSubmit({ livro: "Nenhum livro encontrado", autor: "", descricao:"" }); 
        }
      } else {
        setError(data.message || "Ocorreu um erro ao buscar a recomendação.");
        onSubmit({ livro: "Erro na recomendação", autor: "", descricao:""}); 
      }
    } catch (err) {
      console.error('Erro ao enviar respostas para o Gemini:', err);
      setError("Não foi possível conectar com o servidor de recomendação.");
      onSubmit({ livro: "Erro de conexão", autor: "",descricao:"" }); 
    } finally {
      setLoading(false); 
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
    <div className=' h-[42vw] pt-[5vw]'>
      <div className='flex items-center justify-center gap-15'>
        <div className='w-[60vw]'>
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
                  className='flex text-[#7A7A7A] text-[1.5vw] gap-[1vw] cursor-pointer' 
                >
                  <input
                    type="radio"
                    value={opcao}
                    checked={respostaAtual === opcao}
                    onChange={() => {}} 
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
            disabled={loading} 
            className='w-[10vw] border border-[#C0C0C0] text-[1vw] text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? "Carregando..." : (indice === perguntas.length - 1 ? "Recomendar Livro" : "Próximo")}
          </button>
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