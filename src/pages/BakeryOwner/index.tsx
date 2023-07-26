import { useState, useEffect } from "react";
import { Link }                from "react-router-dom";
import { v4 as uuid4 }         from "uuid";

import { Bread } from "../../types/Bread";
import { api }   from "../../lib/axios";

import "./styles.scss";

function BakeryOwner()
{
  const [breadList, setBreadList] = useState<Bread[]>([]);

  const [name           , setName           ] = useState<string>('');
  const [description    , setDescription    ] = useState<string>('');
  const [preparationTime, setPreparationTime] = useState<number>(0);

  useEffect(refreshTable, []);

  function submitForm()
  {
    api.post(
      `bread`,
      { name, description, preparationTime },
      { headers: { "Content-Type": "application/json;charset=utf-8" } }
    )
      .catch(error => { console.error(error); });

    setName("");
    setDescription("");
    setPreparationTime(0);

    refreshTable();
  }

  function refreshTable()
  {
    api.get<Bread[]>(`bread`)
      .then(response => { setBreadList(response.data); })
      .catch(error => { console.error(error); });
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                /><br />
                Descrição:
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                /><br />
                Tempo de Preparo (em segundos):
                <input
                  type="number"
                  className="form-control"
                  value={preparationTime}
                  onChange={(e) => setPreparationTime(Number(e.target.value))}
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
            breadList.map((bread, index) => {
              return (
                <tr key={uuid4()}>
                  <th><Link to={`/details/${bread.id}`}>{index}</Link></th>
                  <td>{bread.name}</td>
                  <td>{bread.description}</td>
                  <td>{bread.preparationTime} segundos</td>
                </tr>
              )
            })
          }

        </tbody>
      </table>

    </div>
  );
}

export default BakeryOwner;