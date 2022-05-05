import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // pour rediriger vers une page

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
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        //console.log(response.data); //pour afficher dans la console le retour de ma requête
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading === true ? (
    <p>Chargement en cours</p>
  ) : (
    <div className="App">
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
            <p>Découvrir comment ça marche</p>
          </div>
        </div>

        <section className="popular-articles">
          <h2>Articles populaires</h2>
          <div className="map">
            {data.offers.map((element, index) => {
              return (
                <Link to={`/offer/${element._id}`} key={element._id}>
                  <article>
                    <div className="offers">
                      {element.owner.avatar ? (
                        <img src={element.owner.account.avatar.secure_url} />
                      ) : null}

                      {element.product_pictures[0] ? (
                        <img src={element.product_pictures[0].secure_url} />
                      ) : null}
                    </div>
                    <p className="price">{element.product_price} €</p>
                    <div className="size">
                      {element.product_details[0] ? (
                        <p>{element.product_details[1].TAILLE} </p>
                      ) : null}
                    </div>

                    <p className="brand">{element.product_details[0].MARQUE}</p>
                  </article>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
