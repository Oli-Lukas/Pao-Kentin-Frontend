import { useEffect, useState } from 'react';
import { v4 as uuid4 }         from 'uuid';

import { Bread } from '../../types/Bread';
import { api }   from '../../lib/axios';

import "./styles.scss";

function Baker()
{
  const [breadList    , setBreadList    ] = useState<Bread[]>([]);
  const [chosedBreadId, setChosedBreadId] = useState<number>(0);
  const [chosedBread  , setChosedBread  ] = useState<Bread>();
  const [time         , setTime         ] = useState<string>('');

  useEffect(loadBread    , [chosedBreadId]);
  useEffect(loadAllBreads, []);

  function loadBread()
  {
    api.get<Bread>(`bread/${chosedBreadId}`)
      .then(response => { setChosedBread(response.data); })
      .catch(error => { console.error(error); });
  }

  function loadAllBreads()
  {
    api.get<Bread[]>(`bread`)
      .then(response => { setBreadList(response.data); })
      .catch(error => { console.error(error); });
  }

  function createBatch()
  {
    const breadId: number = chosedBreadId;
    const batchStartTimestamp: number = getBatchStartTimestamp();
    const batchEndTimestamp: number   = getBatchEndTimestamp(batchStartTimestamp);

    console.log(new Date(batchStartTimestamp));
    console.log(new Date(batchEndTimestamp));

    api.post(
      `fornada/${breadId}`,
      {
        startTime: batchStartTimestamp,
        endTime: batchEndTimestamp
      },
      { headers: { "Content-Type": "application/json;charset=utf-8" } }
    )
      .catch(error => { console.error(error); });
  }
  
  function getBatchStartTimestamp(): number
  {
    const batchStartTime: Date = new Date();
    
    batchStartTime.setHours(Number(time.split(":")[0]));
    batchStartTime.setMinutes(Number(time.split(":")[1]));
    batchStartTime.setSeconds(0);
    
    return batchStartTime.getTime();
  }
  
  function getBatchEndTimestamp(startTimestamp: number): number
  {
    const preparationTime  : number = (chosedBread?.preparationTime ?? 0) * 1000;
    const batchEndTimestamp: number = startTimestamp + preparationTime;

    return batchEndTimestamp;
  }

  return (
    <div className="baker">

      <table className="table" >
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Descrição</th>
            <th scope="col">Tempo de Preparo</th>
            <th scope="col">Ação</th>
          </tr>
        </thead>
        <tbody>

          {
            breadList.map((bread, index) => {
              return (
                <tr key={uuid4()} >
                  <th>{index}</th>
                  <td>{bread.name}</td>
                  <td>{bread.description}</td>
                  <td>{bread.preparationTime}</td>
                  <td>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => setChosedBreadId(bread.id)} >
                      Cadastrar Fornada
                    </button>
                  </td>
                </tr>
              );
            })
          }

        </tbody>
      </table>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <p>Informe o horário exato em que a fornada {chosedBread?.name ?? ""} iniciou: </p>
              <input type="time" name="" id="" value={time} onChange={(e) => { setTime(e.target.value); }} />
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
              <button type="button" className="btn btn-primary" onClick={createBatch}>Criar Fornada</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Baker;