import { Link } from "react-router-dom";

import ChefHat     from "../../assets/chef-hat.png";
import BakeryOwner from "../../assets/entrepreneur.png";
import Baker       from "../../assets/baker.png";
import User        from "../../assets/user.png";

import "./styles.scss";

function Home()
{
  return (
    <div className="home">
      <header>
        <img src={ChefHat} className="logo" />
        <h1 className="brand-title">Pão Kentin</h1>
      </header>

      <div className="options-list">
        <Link to="/bakery-owner" className="card bakery-owner">
          <img src={BakeryOwner} className="card-logo" />
          <h2>Dono da padaria</h2>
          <p>
            Clique aqui para cadastrar pães no sistema.
          </p>
        </Link>

        <Link to="/baker" className="card baker">
          <img src={Baker} className="card-logo" />
          <h2>Padeiro</h2>
          <p>
            Clique aqui para cadastrar as fornadas de cada pão.
          </p>
        </Link>

        <Link to="/user" className="card user">
          <img src={User} className="card-logo" />
          <h2>Usuário</h2>
          <p>
            Clique aqui para verificar as fornadas disponíveis.
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Home;