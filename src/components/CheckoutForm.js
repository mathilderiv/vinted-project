import { useState } from "react";
import { useLocation } from "react-router-dom";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ title, price }) => {
  const stripe = useStripe();
  const elements = useElements();

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
          title,
          amount: price,
        }
      );

      if (response.data.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.response.data);
      console.log(typeof price);
    }
  };

  return (
    <div>
      {completed ? (
        <p>Paiement validé</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit">Valider le paiement</button>
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;
