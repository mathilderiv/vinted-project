import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";

//////////////////////////////////////////////////////////////////////////////////////////////
//                                    Import des pages                                     //
/////////////////////////////////////////////////////////////////////////////////////////////

import Home from "./pages/Home";
import Offer from "./pages/Offer";

function App() {
  return (
    <Router>
      <nav className="container">
        {/* <Link to="/">Se diriger vers la page home</Link>
        <br /> */}
        {/* <Link to="/offer">Se diriger vers l'offre</Link> */}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer" element={<Offer />} />
      </Routes>
    </Router>
  );
}

export default App;
