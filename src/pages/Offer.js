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
    <div>
      <p>{data.product_name}</p>
      <span>{data.product_price}</span>
      <img
        src={data.product_image.secure_url}
        style={{ width: "100px" }}
        alt=""
      />
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
