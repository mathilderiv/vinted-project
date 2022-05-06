import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import { Link } from "react-router-dom"; // pour rediriger vers une page
import Cookies from "js-cookie";
import { useState } from "react";

//////////////////////////////////////////////////////////////////////////////////////////////
//                                    Import des pages                                     //
/////////////////////////////////////////////////////////////////////////////////////////////

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";

function App() {
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
      </Routes>
    </Router>
  );
}

export default App;
