import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Signup = ({ handleToken }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [newsLetter, setNewsletter] = useState(false);

  const navigate = useNavigate(); //pour naviguer on créé une variable qui contient la fonction use navigate

  const handleSubmit = async (event) => {
    event.preventDefault(); //empêche le rafraîchissement
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email, // autre syntaxe si les 2 noms sont identiques : juste email, username,
          username: username,
          password: password,
          newsletter: newsLetter,
        }
      );
      // console.log(response.data);
      handleToken(response.data.token); //utilisation de la fonction Token
      navigate("/"); //Au click s'inscrire l'utilisateur sera redirigé vers la page home
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
      <form onSubmit={handleSubmit}>
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

        <br />
        <input
          type="checkbox"
          checked={newsLetter}
          onChange={() => {
            setNewsletter(!newsLetter);
          }}
        />
        <br />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Signup;
