import logo from "../img/logo-vinted.svg";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = ({ handleToken, userToken }) => {
  const token = Cookies.get("userToken");
  const navigate = useNavigate();
  return (
    <header className="header">
      <Link to="/">
        <img className="logo-vinted" src={logo} alt="logo-vinted" />
      </Link>
      <input type="text" placeholder="Rechercher des articles" />
      {!userToken ? (
        <>
          <Link to="/user/signup">
            <button className="button-1">S'inscrire</button>
          </Link>
          <Link to="user/login">
            <button className="button-3">Se Connecter</button>
          </Link>
        </>
      ) : (
        <button
          className="disconnected"
          onClick={() => {
            handleToken(); //Pas d'argument cela supprimera donc le cookie
          }}
        >
          Déconnexion
        </button>
      )}

      <Link to="/publish">
        <button className="button-2">Vends maitenant</button>
      </Link>

      <ul>
        <li>Femmes</li>
        <li>Hommes</li>
        <li>Enfants</li>
        <li>Maison</li>
        <li>Divertissement</li>
        <li>Animaux</li>
        <li>A propos</li>
        <li>Notre plateforme</li>
      </ul>
    </header>
  );
};
export default Header;
