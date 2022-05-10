import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import Cookies from "js-cookie";

export default function Payment() {
  const stripePromise = loadStripe(
    "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
  );

  const location = useLocation();
  const { title } = location.state;
  const { price } = location.state;
  console.log(location);
  const priceProtection = price * 0.5;

  const expeditionCost = price * 0.2;

  const totalPrice = price + priceProtection + expeditionCost;

  const token = Cookies.get("userToken");

  return token ? (
    <div className="recap">
      <h2>Résumé de la commande</h2>
      <ul>
        <li>
          Commande <span>{price.toFixed(2)}€</span>
        </li>
        <li>
          Frais de protection acheteurs
          <span>{priceProtection.toFixed(2)}€</span>
        </li>
        <li>
          Frais de port <span>{expeditionCost.toFixed(2)}€</span>
        </li>
      </ul>
      <h3>
        Total <span>{totalPrice.toFixed(2)}€</span>
      </h3>
      <p className="details">
        Il ne vous reste plus qu'une étape pour vous offrir
        <span>{title}</span>. Vous allez payer
        <span>{totalPrice.toFixed(2)}€</span> (frais de protection et frais de
        port inclus).
      </p>
      <div className="pay-button">
        <Elements stripe={stripePromise}>
          <CheckoutForm title={title} price={price} />
        </Elements>
      </div>
    </div>
  ) : (
    <Navigate to="/user/login" />
  );
}
