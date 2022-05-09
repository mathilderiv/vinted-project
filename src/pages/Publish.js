import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Publish = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(Number);

  const { id } = useParams();

  const navigate = useNavigate();

  ///////////////////////////////////////////////////////////////////////////////
  //                      GESTION DE L'IMPORT DE L'IMAGE                     //

  const [picture, setPicture] = useState(null);
  const [isPictureSending, setPictureSending] = useState(false);

  ////////////////////////////////////////////////////////////////////////////////
  //                       TOKEN                                                //

  const token = Cookies.get("userToken");
  //   console.log(token);

  ////////////////////////////////////////////////////////////////////////////////
  //                   GESTION DES CHAMPS DU FORMULAIRE                         //

  const handleSubmit = async (event) => {
    event.preventDefault();

    // setPictureSending(true);

    const formData = new FormData();
    formData.append("picture", picture);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",

        formData,

        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      navigate("/offer/" + response.data._id);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handleBrandChange = (event) => {
    const value = event.target.value;
    setBrand(value);
  };

  const handleSizeChange = (event) => {
    const value = event.target.value;
    setSize(value);
  };

  const handleColorChange = (event) => {
    const value = event.target.value;
    setColor(value);
  };

  const handleConditionChange = (event) => {
    const value = event.target.value;
    setCondition(value);
  };

  const handleCityChange = (event) => {
    const value = event.target.value;
    setCity(value);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPrice(value);
  };

  return isLoading === true ? (
    <p>En cours de chargement...</p>
  ) : (
    <div className="offer-form">
      <h2>Vends ton article</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(event) => {
            setPicture(event.target.files[0]);
          }}
        />
        <br />
        <span>Titre</span>

        <input
          type="text"
          name="title"
          id="title"
          value={title}
          placeholder="ex : Chemise Sézane verte"
          onChange={handleTitleChange}
        />

        <br />
        <span>Description</span>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          placeholder="ex : porté quelquefois, taille correctement"
          onChange={handleDescriptionChange}
        />

        <br />

        <span>Marque</span>
        <input
          type="text"
          name="brand"
          id="brand"
          value={brand}
          placeholder="ex : Zara"
          onChange={handleBrandChange}
        />

        <br />

        <span>Taille</span>
        <input
          type="text"
          name="size"
          id="size"
          value={size}
          placeholder="ex : L / 40 / 12"
          onChange={handleSizeChange}
        />

        <br />

        <span>Couleur</span>
        <input
          type="text"
          name="color"
          id="color"
          value={color}
          placeholder="ex : Fushia"
          onChange={handleColorChange}
        />

        <br />
        <span>Condition</span>
        <input
          type="text"
          name="condition"
          id="condition"
          value={condition}
          placeholder="ex : Neuf sans étiquette"
          onChange={handleConditionChange}
        />

        <br />
        <span>Ville</span>
        <input
          type="text"
          name="city"
          id="city"
          value={city}
          placeholder="ex : Paris"
          onChange={handleCityChange}
        />

        <br />

        <span>Prix</span>
        <input
          type="text"
          name="price"
          id="price"
          value={price}
          placeholder="ex : 0,00 euros"
          onChange={handlePriceChange}
        />

        <br />
        <button type="submit">Ajouter</button>
      </form>
      {isPictureSending === true ? (
        <div>Image en cours de téléchargement</div>
      ) : (
        data && <img src={data.secure_url} alt="" />
      )}
    </div>
  );
};

export default Publish;
