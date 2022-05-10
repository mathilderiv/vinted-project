import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Offer = () => {
  const { id } = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
      );

      setData(response.data);
      // console.log(isLoading);
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  return isLoading === true ? (
    <div> En cours de chargement </div>
  ) : (
    <div className="my-offer">
      <div className="left">
        <img
          className="picture-offer"
          src={data.product_image.secure_url}
          alt=""
        />
      </div>
      <div className="right">
        <span>{data.product_price}€</span>
        <p className="text">
          Notre <span>protection acheteurs</span> est ajoutée moyennant des
          frais, pour chaque transaction effectuée par le biais du bouton
          "Acheter". Cette protection acheteurs comprends notre
          <span> politique de remboursement</span>.
        </p>

        <h2>{data.product_name}</h2>
      </div>

      <div>
        {data.product_details.map((details, index) => {
          const keys = Object.keys(details); //méthode

          return (
            <div key={index}>
              {/* accéder aux clés de l'objet via une variable */}
              {keys[0]} : {details[keys[0]]}
            </div>
          );
        })}
      </div>

      <Link
        to="/payment"
        state={{ title: data.product_name, price: data.product_price }}
      >
        <button>Acheter</button>
      </Link>
    </div>
  );
};

export default Offer;
