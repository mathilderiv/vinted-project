import logo from "../img/logo-vinted.svg";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <img className="logo-vinted" src={logo} alt="logo-vinted" />
      <input type="text" placeholder="Rechercher des articles" />

      <Link to="/user/signup">
        <button className="button-1">S'inscrire | Se connecter</button>
      </Link>
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
