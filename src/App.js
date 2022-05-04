import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";

import logo from "./img/logo-vinted.svg";
import mainimage from "./img/main-image.jpg";
import offer1 from "./img/offre1.jpeg";
import offer2 from "./img/offre2.jpeg";
import offer3 from "./img/offre3.jpeg";
import offer4 from "./img/offre4.jpeg";
import offer5 from "./img/offre5.jpeg";

//////////////////////////////////////////////////////////////////////////////////////////////
//                                    Import des pages                                     //
/////////////////////////////////////////////////////////////////////////////////////////////

import Home from "./pages/Home";
import Offer from "./pages/Offer";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  //////////////////////////////////////////////////////////////////////////////////////////////
  //                                    Requête vers l'API                                   //
  /////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="header">
          <img className="logo-vinted" src={logo} alt="logo-vinted" />
          <input type="text" placeholder="Rechercher des articles" />

          <button className="button-1">S'inscrire | Se connecter</button>

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

        <main>
          <div className="main-bloc">
            <img
              className="main-image"
              src={mainimage}
              alt="image principale acheteuse"
            />
            <div className="white-container">
              <h1>Prêts à faire du tri dans vos placards ?</h1>
              <button>Vends maintenant</button>
              <p>Décourir comment ça marche</p>
            </div>
          </div>

          <section className="popular-articles">
            <h2>Articles populaires</h2>
            <div className="offers-images">
              <img className="offer1" src={offer1} alt="article à vendre 1" />
              <img className="offer2" src={offer2} alt="article à vendre 2" />
              <img className="offer3" src={offer3} alt="article à vendre 3" />
              <img className="offer4" src={offer4} alt="article à vendre 4" />
              <img className="offer5" src={offer5} alt="article à vendre 5" />
            </div>
          </section>
        </main>
      </div>

      <nav className="container">
        <Link to="/home">Se diriger vers la page home</Link>
        <Link to="/offer">Se diriger vers l'offre</Link>
      </nav>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/offer" element={<Offer />} />
      </Routes>
    </Router>
  );
}

export default App;
