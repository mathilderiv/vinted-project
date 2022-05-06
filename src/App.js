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
  const handleToken = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 });
    } else {
      Cookies.remove("userToken");
    }
  };
  //   }
  return (
    <Router>
      <Header handleToken={handleToken} />
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
