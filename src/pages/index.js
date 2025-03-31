import { useEffect, useState } from "react"; 

export default function Home() {
  const [characters, setCharacters] = useState([]); //variavel que vai armazenar os dados dos personagens e atualiza-los
  const [pesquisa, setPesquisa] = useState('');//variavel para armazenar pesquisa
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => { //quando executado sem dependencias roda somente uma vez, quando o componente for montado
    fetch("https://rickandmortyapi.com/api/character/?page=" + paginaAtual) //faz uma aquisição para a API
      .then((res) => res.json()) //recebe a resposta da API e converte para JSON
      .then((data) => { 
        setCharacters(data.results); //recebe os dados e usa setCharacters para atualizar
        setTotalPaginas(data.info.pages); //recebe os dados de total de paginas para que possa ser colocado nas paginas lá de baixo (teste)
      });
  }, [paginaAtual]);

  let botoes = [];
  for(let i = 1; i <= totalPaginas; i++){
    botoes.push(<input key={i} className="button-page" type="button" value={i} onClick={() => setPaginaAtual(i)}/>);
  }

  //Personagem filtrado = obj + filtro(faz uma array só com os elementos que tem o que está escrito na pesquisa), no caso, somente os que tem o mesmo nome no char.name e na pesquisa
  const personagemFiltrado = characters.filter((char) => char.name.toLowerCase().includes(pesquisa.toLowerCase()));

  
  function paginas(){
    console.log(totalPaginas);
    for(let i = 1; i < totalPaginas; i++){
      document.write("<input className='button-page' type='button' value='"+i+"' onClick={() => {setPaginaAtual("+1+");console.log('page="+i+"')}}/>");
      console.log(i);
    }
  }

  return (
    <div>
      <h1>Personagens de Rick and Morty</h1>
      {characters.length === 0 ? (<p>Carregando...</p>) : ( //se não tiver nada no objeto ele vai aparecer esse label
        <div className="grid-chars">
          <div className="linha-pesquisar"><input className="pesquisar-input" placeholder="Pesquisar" type="text" value={pesquisa} onChange={(e) => setPesquisa(e.target.value)}></input></div>
          {personagemFiltrado.map((char) => ( //funciona como um forEach, mas printa o resultado e pode modificar o array caso necessário; Está mostrando o personagem filtrado
            <div key={char.id} className="container-char">
              <img className="icone-char" src={char.image} alt={char.name}></img>
              <p className="text-char">{char.name}</p>
            </div>
          ))}
          <div className="linha-pages">
            {botoes}
            {/* preciso automatizar as páginas que seram exibidas, já tenho o total de páginas, só preciso saber como usar for ou alguma estrutura de repetição dentro do return */}
          </div>
        </div>
      )}
    </div>
  );
}
