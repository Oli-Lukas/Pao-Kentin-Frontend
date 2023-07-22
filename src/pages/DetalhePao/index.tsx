import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

import "./styles.scss";

function DetalhePao()
{
  const { id } = useParams();
  const [n, setNome] = useState<string>('');
  const [desc, setDescricao] = useState<string>('');
  const [tempoPreparo, setTempoPreparo] = useState<number>(0);

  useEffect(() => {
    async function fetchData()
    {
      const response = await axios.get(`http://localhost:8080/pao/${id}`);
      const { nome, descricao, tempoDePreparoEmSegundos } = response.data;

      setNome(nome);
      setDescricao(descricao);
      setTempoPreparo(tempoDePreparoEmSegundos);
    }

    fetchData();
  }, []);

  return (
    <div className="detalhe-pao">
      <p>Id: { id }</p>
      <p>Nome: { n }</p>
      <p>Descrição: { desc }</p>
      <p>Tempo de Preparo: { tempoPreparo }</p>
    </div>
  );
}

export default DetalhePao;