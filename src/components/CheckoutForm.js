import { useState } from "react";
import { useLocation } from "react-router-dom";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const location = useLocation();
  const { title } = location.state;
  const { price } = location.state;

  const priceProtection = price * 0.5;
  const expeditionCost = price * 0.2;
  const totalPrice = price + priceProtection + expeditionCost;

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //NUMERO 1 : envoi du numéro de carte à stripe - données bancaire de l'utilisateur
    const cardElements = elements.getElement(CardElement);
    // console.log(cardElements);

    //NUMERO 2 : Envoi des données à l'API de stripe
    const stripeResponse = await stripe.createToken(cardElements);
    console.log(stripeResponse);

    const stripeToken = stripeResponse.token.id;
    //NUMEO 3 : envoi du token à mon serveur reacteur

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          title: { title },
          amount: { price },
        }
      );

      if (response.data.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <h2>Résumé de la commande</h2>
          <ul>
            <li>
              Commande<span>{price}</span>
            </li>
            <li>
              Frais de protection acheteurs<span>{priceProtection}</span>
            </li>
            <li>
              Frais de port<span>{expeditionCost}</span>
            </li>
          </ul>
          <h3>Total</h3>
          <p>
            Il ne vous reste plus qu'une étape pour vous offrir {title}. Vous
            allez payer {totalPrice} (frais de protection et frais de port
            inclus).
          </p>
          <CardElement />
          <button type="submit">Valider le paiement</button>
        </form>
      ) : (
        <span>Paiement effectué !</span>
      )}
    </>
  );
};

export default CheckoutForm;
