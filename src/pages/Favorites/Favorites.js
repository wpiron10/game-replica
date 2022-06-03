import "./Favorites.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Favorites = ({ setUser }) => {
  const navigate = useNavigate();

  // création d'une state

  const [isCookieRemoved, setisCookieRemoved] = useState();

  // récupération du coookie

  const dataFavoritesStr = Cookies.get("userFavorites");
  // console.log(dataFavoritesStr, "userfav");

  // const [getCookie, setGetCookie] = useState();
  let getCookie;
  // s'il existe, on le parse
  if (dataFavoritesStr) {
    getCookie = JSON.parse(Cookies.get("userFavorites"));

    // setGetCookie(JSON.parse(Cookies.get("userFavorites")));
  }

  console.log(getCookie, "<<< getcookie");

  const isGameIsAlreadyFavorite = (id) => {
    const recupFav = Cookies.get("userFavorites");
    if (recupFav && recupFav.length > 0) {
      const arrayFav = JSON.parse(recupFav);
      let isPresent = false;
      for (let i = 0; i < arrayFav.length; i++) {
        if (arrayFav[i].id === id) {
          isPresent = i;
        }
      }
      return isPresent;
    } else {
      return false;
    }
  };

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

                        getCookie.splice(
                          isGameIsAlreadyFavorite(getCookie.id),
                          1
                        );
                        console.log(getCookie, "apres splice");

                        const dataFavoritesToStr = JSON.stringify(getCookie);
                        console.log(
                          dataFavoritesToStr,
                          "<< dataFavoritesToStr"
                        );
                        Cookies.set("userFavorites", dataFavoritesToStr, {
                          expires: 10,
                        });

                        if (getCookie.length < 1)
                          Cookies.remove("userFavorites");
                        else {
                          const tabCookiesToStr = JSON.stringify(getCookie);
                          Cookies.set("userFavorites", tabCookiesToStr, {
                            expires: 10,
                          });
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
