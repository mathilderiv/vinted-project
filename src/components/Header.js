import logo from "../img/logo-vinted.svg";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Header = ({ handleToken, userToken }) => {
  return (
    <header className="header">
      <img className="logo-vinted" src={logo} alt="logo-vinted" />
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
          onClick={() => {
            handleToken(); //Pas d'argument cela supprimera donc le cookie
          }}
        >
          Déconnexion
        </button>
      )}

      <button className="button-2">Vends maitenant</button>

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
