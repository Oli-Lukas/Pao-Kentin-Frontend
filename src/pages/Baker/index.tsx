import { useEffect, useState } from 'react';
import axios from 'axios';

import "./styles.scss";

function Baker()
{
  const [paes, setPaes] = useState<any>([]);
  const [chosedBreadId, setChosedBreadId] = useState<number>(0);
  const [chosedBread, setChosedBread] = useState();
  const [time, setTime] = useState('');

  useEffect(() => {

    async function fetchBread()
    {
      const response = await axios.get(`http://localhost:8080/pao/${chosedBreadId}`);
      setChosedBread(response.data);
    }

    fetchBread();

  }, [chosedBreadId]);

  useEffect(() => {
    async function fetchData()
    {
      const response = await axios.get(`http://localhost:8080/pao`);
      setPaes(response.data);
    }

    fetchData();
  }, []);

  const criaFornada = async (e: MouseEvent) => {
    const id = chosedBreadId;
    let inicioDaFornada: Date | number = new Date();

    inicioDaFornada.setHours(Number(time.split(":")[0]));
    inicioDaFornada.setMinutes(Number(time.split(":")[1]));
    inicioDaFornada.setSeconds(0);

    const tempoDePreparoEmMilisegundos = (chosedBread?.tempoDePreparoEmSegundos ?? 0) * 1000;
    let fimDaFornada: Date | number = new Date(inicioDaFornada.getTime() + tempoDePreparoEmMilisegundos);

    inicioDaFornada = inicioDaFornada.getTime();
    fimDaFornada    = fimDaFornada.getTime();

    console.log({id, inicioDaFornada, fimDaFornada});

    await axios.post(
      `http://localhost:8080/fornada/${id}`,
      {
        inicioDaFornada,
        fimDaFornada
      },
      {
        headers: { 'Content-Type': 'application/json;charset=utf-8' }
      }
    );

    setTime("");
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
            (paes as Array<any>).map((pao, index) => {
              return (
                <tr key={index} >
                  <th>
                    {index}
                  </th>
                  <td>{pao.nome}</td>
                  <td>{pao.descricao}</td>
                  <td>{pao.tempoDePreparoEmSegundos}</td>
                  <td>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => setChosedBreadId(pao.id)} >
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
              <p>Informe o horário exato em que a fornada {chosedBread?.nome ?? ""} iniciou: </p>
              <input type="time" name="" id="" value={time} onChange={(e) => { setTime(e.target.value); }} />
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
              <button type="button" className="btn btn-primary" onClick={criaFornada}  >Criar Fornada</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Baker;