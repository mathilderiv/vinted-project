import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Cookies from "js-cookie";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "./App.css";

//////////////////////////////////////////////////////////////////////////////////////////////
//                                    Import des pages                                     //
/////////////////////////////////////////////////////////////////////////////////////////////

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

function App() {
  const stripePromise = loadStripe(
    "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
  );
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null); // Si pas connecter state vaut null donc ternaire dans le header affiche connexion et s'inscrire sinon contient un token donc ternaire réévaluer et le bouton déconnexion s'affiche

  const handleToken = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 2 });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };
  //   }
  return (
    <Router>
      <Header handleToken={handleToken} userToken={userToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route
          path="/user/signup"
          element={<Signup handleToken={handleToken} />}
        />
        <Route
          path="/user/login"
          element={<Login handleToken={handleToken} />}
        />
        <Route path="/publish" element={<Publish />} />

        <Elements stripe={stripePromise}>
          <Route path="/payment" element={<Payment />} />
        </Elements>
      </Routes>
    </Router>
  );
}

export default App;
