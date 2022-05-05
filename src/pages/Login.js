import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fetchData = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,

          password: password,
        }
      );
      console.log(response.data);
      setData(response.data);
      Cookies.set("token", response.data.token, { expires: 1 });
      setIsLoading(false);
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
    <div className="form">
      <h1>Se connecter</h1>
      <form onSubmit={fetchData}>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder="Email"
          onChange={handleEmailChange}
        />
        <br />
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          placeholder="Mot de passe"
          onChange={handlePasswordChange}
        />
        <button type="submit">S'inscrire</button>
        <Link to="/user/signup">
          <p>Pas encore de compte ? Inscris toi</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
