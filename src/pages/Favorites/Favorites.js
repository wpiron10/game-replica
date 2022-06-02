import "./Favorites.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Favorites = ({ setUser }) => {
  const navigate = useNavigate();

  // création d'une state pour afficher : false : pas de fav - true : map sur les cookies
  const [cookieEmpty, setCookieEmpty] = useState(false);
  const [dataFavoritesToTab, setDataFavoritesToTab] = useState();

  // récupération du coookie

  const dataFavoritesStr = Cookies.get("userFavorites");
  console.log(dataFavoritesStr, "userfav");

  // s'il existe, on le parse

  if (dataFavoritesStr) {
    const getCookie = JSON.parse(Cookies.get("userFavorites"));
    setDataFavoritesToTab(getCookie);

    // si quand on le parse, la longueur du tableau est > 0, on affiche le resultat

    // if (dataFavoritesToTab && dataFavoritesToTab.length > 0) {

    // }
  }

  return (
    <div>
      <div>
        <h1>My Collection</h1>
      </div>
      <div className="result-section">
        <div className="results">
          {dataFavoritesStr ? (
            getCookie.map((favoriteGame, index) => {
              console.log(getCookie, "datafavorites ");

              return (
                <div className="result-card" key={index}>
                  <div className="result-favorite-content">
                    <FontAwesomeIcon
                      icon="fa-solid fa-bookmark"
                      className="result-favorite-btn"
                      onClick={() => {
                        console.log(getCookie, "avant splice");

                        getCookie.splice(favoriteGame, 1);
                        console.log(getCookie, "apres splice");

                        const dataFavoritesToStr = JSON.stringify(getCookie);
                        console.log(
                          dataFavoritesToStr,
                          "<< dataFavoritesToStr"
                        );
                        Cookies.set("userFavorites", dataFavoritesToStr, {
                          expires: 10,
                        });
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
