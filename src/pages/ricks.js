import { useEffect, useState } from "react";

export default function Ricks() {
  const [rickDados, setRickDados] = useState([]);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [todosRicks, setTodosRicks] = useState([]);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character/?name=rick")
      .then((res) => res.json())
      .then((data) => {
        setRickDados(data.results);
        setTotalPaginas(data.info.pages);
      });
  }, []);

  useEffect(() => {
    const fetchTodosRicks = async () => {
      let todosResultados = [];

      for (let i = 1; i < totalPaginas; i++) {
        const res = await fetch(
          "https://rickandmortyapi.com/api/character/?name=rick&page=" + i
        );
        const data = await res.json();
        todosResultados = [...todosResultados, ...data.results];
      }
      setTodosRicks(todosResultados);
    };

    fetchTodosRicks();
  }, [totalPaginas]);

  return (
    <div>
      <h1>Lista</h1>
      <div className="grid-chars">
        {todosRicks.map((rick) => (
          <div id={rick.id} className="container-ricks">
            <img src={rick.image} className="icone-char"></img>
            <p className="text-char">{rick.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
