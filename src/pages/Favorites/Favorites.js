import "./Favorites.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Favorites = ({ setUser }) => {
  const navigate = useNavigate();

  // création d'une state

  const [favorites, setFavorites] = useState(
    Cookies.get("userFavorites") || null
  );

  return (
    <div>
      <div>
        <h1>My Collection</h1>
      </div>
      <div className="result-section">
        <div className="results">
          {favorites ? (
            JSON.parse(favorites).map((favoriteGame, index) => {
              return (
                <div className="result-card" key={index}>
                  <div className="result-favorite-content">
                    <FontAwesomeIcon
                      icon="fa-solid fa-bookmark"
                      className="result-favorite-btn"
                      onClick={() => {
                        const tab = JSON.parse(favorites);
                        tab.splice(index, 1);

                        if (tab.length > 0) {
                          const str = JSON.stringify(tab);
                          Cookies.set("userFavorites", str);
                          setFavorites(str);
                        } else {
                          Cookies.remove("userFavorites");
                          setFavorites(null);
                        }
                      }}
                    />
                  </div>
                  <img src={favoriteGame.image} className="result-img" />
                  <div className="result-info">
                    <div className="result-title"> {favoriteGame.name} </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>Pas de favoris ajouté</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Favorites;
