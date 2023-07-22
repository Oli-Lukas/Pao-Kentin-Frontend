import { useState, useEffect } from "react";
import axios from "axios";

import "./styles.scss";
import ModalDetalhe from "../../components/ModalDetalhe";
import { Link } from "react-router-dom";

function BakeryOwner()
{
  const [nome, setNome] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [tempoDePreparoEmSegundos, setTempoDePreparoEmSegundos] = useState<number>(0);

  const [paes, setPaes] = useState<any>([]);

  const submitForm = async () => {
    await axios.post(
      'http://localhost:8080/pao',
      {
        nome,
        descricao,
        tempoDePreparoEmSegundos
      },
      {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }
    );

    setNome('');
    setDescricao('');
    setTempoDePreparoEmSegundos(0);

    refreshTable();
  }

  useEffect(refreshTable, []);

  function refreshTable()
  {
    async function fetchData()
    {
      const response = await axios.get('http://localhost:8080/pao');
      setPaes(response.data);
    }

    fetchData();
  }

  return (
    <div className="bakery-owner">

      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Cadastrar Pão no Sistema
      </button>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
                Nome:
                <input
                  type="text"
                  className="form-control"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                /><br />
                Descrição:
                <input
                  type="text"
                  className="form-control"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                /><br />
                Tempo de Preparo (em segundos):
                <input
                  type="number"
                  className="form-control"
                  value={tempoDePreparoEmSegundos}
                  onChange={(e) => setTempoDePreparoEmSegundos(Number(e.target.value))}
                />
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
              <button type="button" className="btn btn-primary" onClick={submitForm} >Cadastrar Pão</button>
            </div>
          </div>
        </div>
      </div>

      <table className="table" >
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Descrição</th>
            <th scope="col">Tempo de Preparo</th>
          </tr>
        </thead>
        <tbody>

          {
            (paes as Array<any>).map((pao, index) => {
              return (
                <tr key={index} >
                  <th>
                    <Link to={`/details/${pao.id}`} >
                      {index}
                    </Link>
                    <ModalDetalhe
                      id={index}
                      nome={pao.nome}
                      descricao={pao.descricao}
                      tempoPreparo={pao.tempoDePreparoEmSegundos}
                    />
                  </th>
                  <td>{pao.nome}</td>
                  <td>{pao.descricao}</td>
                  <td>{pao.tempoDePreparoEmSegundos}</td>
                </tr>
              );
            })
          }

        </tbody>
      </table>

    </div>
  );
}

export default BakeryOwner;