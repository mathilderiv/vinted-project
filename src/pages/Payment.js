import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();

  const token = Cookies.get("userToken");
  console.log(token);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //NUMERO 1 : envoi du numéro de carte à stripe
    const cardElements = elements.getElement(CardElement);
    console.log(cardElements);

    //NUMERO 2 : Envoi des données à l'API de stripe
    const stripeResponse = await stripe.createToken(cardElements);
    console.log(stripeResponse);

    //NUMEO 3 : envoi du token à mon serveur reacteur

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          stripeToken: stripeResponse.token.id,
        }
      );
    } catch (error) {
      console.log(error.response.data);
    }
    return (
      <form onSubmit={handleSubmit}>
        <h2>Résumé de la commande</h2>
        <ul>
          <li>Commande </li>
          <li>Frais de protection acheteurs</li>
          <li>Frais de port</li>
        </ul>
        <h3>Total</h3>
        <p>
          Il ne vous reste plus qu'une étape pour vous offrir "nom du produit".
          Vous allez payer "total" (frais de protection et frais de port
          inclus).
        </p>
        <CardElement />
        <input type="submit" />
      </form>
    );
  };
}
