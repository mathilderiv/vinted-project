import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

export default function Signup() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const fetchData = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: true,
        }
      );
      // console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
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
      <h1>S'inscrire</h1>
      <form onSubmit={fetchData}>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          placeholder="Nom d'utilisateur"
          onChange={handleUsernameChange}
        />
        <br />

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
        <input type="checkbox" id="newsletter" value="newsletter" />
        <label htmlFor="newsletter">S'inscrire à la newsletter</label>
      </form>
    </div>
  );
}
