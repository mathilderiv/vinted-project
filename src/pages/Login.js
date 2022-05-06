import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = ({ handleToken }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );

      // console.log(response.data);
      handleToken(response.data.token); //Pour stocker les valeurs
      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };
  return isLoading === true ? (
    <p>Chargement en cours</p>
  ) : (
    <div className="formlogin">
      <h2>Se connecter</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="email-login"
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder="Email"
          onChange={handleEmailChange}
        />
        <br />
        <input
          className="password-login"
          type="password"
          name="password"
          id="password"
          value={password}
          placeholder="Mot de passe"
          onChange={handlePasswordChange}
        />

        <div className="input-submit">
          <input type="submit" value="Se connecter" />
        </div>
        <Link to="/user/signup" style={{ textDecoration: "none" }}>
          <p>Pas encore de compte ? Inscris toi</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
