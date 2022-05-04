import axios from "axios";
import { useEffect, useState } from "react";

import logo from "../img/logo-vinted.svg";
import mainimage from "../img/main-image.jpg";

export default function Home() {
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

  return isLoading === true ? (
    <div>Chargement...</div>
  ) : (
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

          {data.offers.map((element) => {
            return (
              <div
                key={element._id}
                onClick={() => {
                  console.log(element);
                }}
              />
            );
          })}

          <img
            className="offer1"
            src="{element.owner.account.avatar.secure_url"
            alt="article à vendre 1"
          />
          {/* <img className="offer2" src="" alt="article à vendre 2" />
            <img className="offer3" src="" alt="article à vendre 3" />
            <img className="offer4" src="" alt="article à vendre 4" />
            <img className="offer5" src="" alt="article à vendre 5" /> */}
        </section>
      </main>
    </div>
  );
}
