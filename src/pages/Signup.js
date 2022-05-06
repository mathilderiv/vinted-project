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

  ///////////////////////////////////////////////////////////////
  //Pour afficher le message d'erreur si l'email existe déjà////

  const [errorMessage, setErrorMessage] = useState("");

  //pour naviguer on créé une variable qui contient la fonction use navigate

  const navigate = useNavigate();

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
      console.log(error.response.status);
      if (error.response.status === 409) {
        setErrorMessage("Email déjà utilisé pour un autre compte");
      }
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
      <h2>S'inscrire</h2>
      <form className="form-input" onSubmit={handleSubmit}>
        <input
          className="username"
          type="text"
          name="username"
          id="username"
          value={username}
          placeholder="Nom d'utilisateur"
          onChange={handleUsernameChange}
        />

        <br />

        <input
          className="email"
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder="Email"
          onChange={handleEmailChange}
        />
        <br />

        <input
          className="password"
          type="password"
          name="password"
          id="password"
          value={password}
          placeholder="Mot de passe"
          onChange={handlePasswordChange}
        />

        <br />
        <input
          className="newsletter"
          type="checkbox"
          checked={newsLetter}
          onChange={() => {
            setNewsletter(!newsLetter);
          }}
        />
        <span>S'inscrire à notre newsletter</span>
        <p>
          En m'inscrivant je confirme avoir lu et accepté les Termes et
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans
        </p>
        <br />
        <button type="submit">S'inscrire</button>
        <p>{errorMessage}</p>
      </form>
    </div>
  );
};

export default Signup;
