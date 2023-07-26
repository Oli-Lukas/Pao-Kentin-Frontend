import { useState, useEffect } from "react";
import { v4 as uuid4 }         from "uuid";

import { api }   from "../../lib/axios";
import { Bread } from "../../types/Bread";
import { Batch } from "../../types/Batch";

import "./styles.scss";

function User()
{
  const [breadList  , setBreadList  ] = useState<Bread[]>([]);
  const [lastBatches, setLastBatches] = useState<Batch[]>([]);

  useEffect(loadAllBreads  , []);
  useEffect(loadLastBatches, [breadList]);

  function loadAllBreads()
  {
    api.get<Bread[]>(`bread`)
      .then(response => { setBreadList(response.data); })
      .catch(error => { console.error(error); });
  }

  function loadLastBatches()
  {
    const batches: Batch[] = [];

    for (const bread of breadList)
    {
      api.get<Batch>(`fornada/last/${bread.id}`)
        .then(response => { batches.push(response.data); })
        .catch(error => { console.error(error); });
    }

    setLastBatches(batches);
  }

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
            lastBatches.map((batch, index) => {
              return (
                <tr key={uuid4()}>
                  <td>{index}</td>
                  <td>{batch.bread.name}</td>
                  <td>{batch.endTime.toString()}</td>
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