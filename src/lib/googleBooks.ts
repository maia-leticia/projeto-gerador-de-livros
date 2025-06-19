type GoogleBook = {
  id: string
  volumeInfo: {
    title: string
    authors?: string[]
    imageLinks?: {
      thumbnail?: string
    }
    pageCount?: number
  }
}

export async function buscarLivrosPorEstilo(estilo: string ) {
  const resposta = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(estilo)}&maxResults=8&orderBy=relevance&printType=books`
  );

  if (!resposta.ok) throw new Error("Erro ao buscar livros");

  const data = await resposta.json();

  return (data.items || []).map((livro: GoogleBook) => ({
    id: livro.id,
    volumeInfo: {
      title: livro.volumeInfo.title,
      authors: livro.volumeInfo.authors || ["Autor desconhecido"],
      imageLinks: {
        thumbnail: livro.volumeInfo.imageLinks?.thumbnail || null,
      },
      pageCount: livro.volumeInfo.pageCount || 0,
    }
  }));
}
