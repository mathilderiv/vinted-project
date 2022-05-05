import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

//////////////////////////////////////////////////////////////////////////////////////////////
//                                    Import des pages                                     //
/////////////////////////////////////////////////////////////////////////////////////////////

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
