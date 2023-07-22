import { useState, useEffect } from "react";
import axios from 'axios';

import "./styles.scss";

function User()
{
  const [paes, setPaes] = useState<any>([]);
  const [ultimasFornadas, setUltimasFornadas] = useState<any>([]);

  useEffect(() => {

    async function fetchPaes()
    {
      const response = await axios.get(`http://localhost:8080/pao`);
      setPaes(response.data);
    }

    fetchPaes();

  }, []);

  useEffect(() => {

    async function fetchData()
    {
      let fornadas = [];

      for (let pao of paes)
      {
        let fornada = await axios.get(`http://localhost:8080/fornada/last/${pao.id}`);
        fornadas.push(fornada.data);
      }

      setUltimasFornadas(fornadas);
    }

    fetchData();
    
  }, [paes]);

  return (
    <div className="user">
      
      <table className="table" >
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tipo de Pão</th>
            <th scope="col">Tempo</th>
          </tr>
        </thead>
        <tbody>

          {
            ultimasFornadas.map((fornada, index) => {
              return (
                <tr key={index} >
                  <td>{index}</td>
                  <td>{fornada.tipoDePao.nome}</td>
                  <td>{fornada.fimDaFornada}</td>
                </tr>
              );
            })

          }

        </tbody>
      </table>

    </div>
  );
}

export default User;