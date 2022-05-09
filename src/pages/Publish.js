import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  ///////////////////////////////////////////////////////////////////////////////
  //                      GESTION DE L'IMPORT DE L'IMAGE                     //

  const [picture, setPicture] = useState(null);
  const [isPictureSending, setPictureSending] = useState(false);

  const handleSendPicture = async (event) => {
    event.preventDefault();
    setPictureSending(true);
  };

  const formData = new FormData();
  formData.append("picture", picture);

  ////////////////////////////////////////////////////////////////////////////////
  //                   GESTION DES CHAMPS DU FORMULAIRE                         //

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        {
          title: title,
          description: description,
          price: price,
          condition: state,
          city: city,
          brand: brand,
          size: size,
          color: color,
          picture: picture, // le fichier image sélectionné par l'utilisateur
        }

        //     {
        //       headers: {
        //         authorization: `Bearer ${token}`,
        //       },
        // }
      );

      console.log(response.data);
    } catch (error) {
      console.log(error.response.status);
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

  const handleStateChange = (event) => {
    const value = event.target.value;
    setState(value);
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
            setPicture(event.target.files);
          }}
        />
        <br />

        <input
          type="text"
          name="title"
          id="title"
          value={title}
          placeholder="ex : Chemise Sézane verte"
          onChange={handleTitleChange}
        />

        <br />

        <input
          type="text"
          name="description"
          id="description"
          value={description}
          placeholder="ex : porté quelquefois, taille correctement"
          onChange={handleDescriptionChange}
        />

        <br />

        <input
          type="text"
          name="brand"
          id="brand"
          value={brand}
          placeholder="ex : Zara"
          onChange={handleBrandChange}
        />

        <br />

        <input
          type="text"
          name="size"
          id="size"
          value={size}
          placeholder="ex : L / 40 / 12"
          onChange={handleSizeChange}
        />

        <br />

        <input
          type="text"
          name="color"
          id="color"
          value={color}
          placeholder="ex : Fushia"
          onChange={handleColorChange}
        />

        <br />

        <input
          type="text"
          name="state"
          id="state"
          value={state}
          placeholder="ex : Neuf sans étiquette"
          onChange={handleStateChange}
        />

        <br />

        <input
          type="text"
          name="city"
          id="city"
          value={city}
          placeholder="ex : Paris"
          onChange={handleCityChange}
        />

        <br />

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
    </div>
  );
};

export default Publish;
