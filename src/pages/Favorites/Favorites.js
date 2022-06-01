import "./Favorites.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
const Favorites = ({
  setUser,
  dataFavorites,
  setDataFavorites,
  setFavorites,
}) => {
  console.log(dataFavorites, "5 mapping sur data favorites ");

  return (
    <div>
      <div>
        <h1>My Collection</h1>
      </div>
      <div className="result-section">
        <div className="results">
          {dataFavorites.map((favoriteGame, index) => {
            return (
              <div className="result-card" key={index}>
                <div className="result-favorite-content">
                  <FontAwesomeIcon
                    icon="fa-solid fa-bookmark"
                    className="result-favorite-btn"
                    on
                  />
                </div>
                <img src={favoriteGame.image} className="result-img" />
                <div className="result-info">
                  <div className="result-title"> {favoriteGame.name} </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Favorites;
