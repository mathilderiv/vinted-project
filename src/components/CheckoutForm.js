import { useState } from "react";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = () => {
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
    // console.log(stripeResponse);

    //NUMEO 3 : envoi du token à mon serveur reacteur

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          stripeToken: stripeResponse.token.id,
        }
      );

      if (response.data.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.response.data);
    }

    return (
      <>
        {!completed ? (
          <form onSubmit={handleSubmit}>
            <h2>Résumé de la commande</h2>
            <ul>
              <li>Commande </li>
              <li>Frais de protection acheteurs</li>
              <li>Frais de port</li>
            </ul>
            <h3>Total</h3>
            <p>
              Il ne vous reste plus qu'une étape pour vous offrir "nom du
              produit". Vous allez payer "total" (frais de protection et frais
              de port inclus).
            </p>
            <button type="submit">Valider le paiement</button>
          </form>
        ) : (
          <span>Paiement effectué !</span>
        )}
      </>
    );
  };
};

export default CheckoutForm;
