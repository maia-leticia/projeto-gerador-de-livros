export async function recomendarLivro(livro: string | null) {
if (!livro) return null;
  const resposta = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(livro)}&maxResults=1&orderBy=relevance&printType=books`
  );

  if (!resposta.ok) throw new Error("Erro ao buscar livro");

  const data = await resposta.json();
  const primeiro = data.items?.[0];

  return {
    id: primeiro.id,
    capa: primeiro.volumeInfo.imageLinks?.thumbnail || null,
  };
}

