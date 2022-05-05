import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from "./img/logo-vinted.svg";
import "./App.css";
import { Link } from "react-router-dom"; // pour rediriger vers une page

import { useState } from "react";

//////////////////////////////////////////////////////////////////////////////////////////////
//                                    Import des pages                                     //
/////////////////////////////////////////////////////////////////////////////////////////////

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  const [token, setToken] = useState("");
  return (
    <Router>
      <header className="header">
        <img className="logo-vinted" src={logo} alt="logo-vinted" />
        <input type="text" placeholder="Rechercher des articles" />

        <Link to="/user/signup">
          {/* <div>
            {setToken ? (
              <button className="button-deconnect">Se déconnecter</button>
            ) : ( */}
          <button className="button-1">S'inscrire | Se connecter</button>
          {/* )}
          </div> */}
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
