import "./styles.scss";

interface ModalDetalheProps
{
  id          : number;
  nome        : string;
  descricao   : string;
  tempoPreparo: number;
}

function ModalDetalhe(props: ModalDetalheProps)
{
  return (
    <div className="modal-detalhe">
      
      <div className="modal fade" id={`staticBackdrop${props.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <p>Nome: {props.nome}</p>
              <p>Descrição: {props.descricao}</p>
              <p>Tempo de preparo: {props.tempoPreparo}</p>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Understood</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ModalDetalhe;