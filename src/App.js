import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRef, useState } from "react";

// scss
import "./App.scss";

//imports des components
import Header from "./components/Header/Header";

// imports des cookies
import Cookies from "js-cookie";

// imports des pages
import Home from "./pages/Home/Home";
import Favorites from "./pages/Favorites/Favorites";
import Game from "./pages/Game/Game";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrash,
  faUserNinja,
  faAngleLeft,
  faAngleRight,
  faMagnifyingGlass,
  faBookmark,
  faMessage,
  faThumbsDown,
  faThumbsUp,
  faCircleXmark,
  faSquareCheck,
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faTrash,
  faSquareXmark,
  faSquareCheck,
  faUserNinja,
  faMagnifyingGlass,
  faAngleRight,
  faAngleLeft,
  faBookmark,
  faMessage,
  faCircleXmark,
  faThumbsDown,
  faThumbsUp
);

function App() {
  const aboutRef = useRef(null); //represents about section

  // creation d'une fonction de connexion / deconnexion

  const [token, setToken] = useState(Cookies.get("userToken") || null);

  const setUser = (token) => {
    if (token) {
      // connexion

      console.log("Création d'un cookie pour le sign up");
      Cookies.set("userToken", token, { expires: 10 });
      setToken(token);
      console.log(
        "Mise à jour du state token en fonction de la connexion / deconnexion"
      );
    } else {
      // déconnexion
      console.log("Suppression d'un cookie pour le sign up");
      Cookies.remove("userToken");
      setToken(null);
    }
  };

  // création d'une fonction d'ajout aux favoris
  const [dataFavorites, setDataFavorites] = useState([]);

  // const setFavorites = (tab) => {
  //   console.log(tab, "<<<   tab");
  //   if (dataFavorites.length >= 1) {
  //   } else if (dataFavorites.length < 1) {
  //   }
  // };

  return (
    <div className="app">
      <div className="main-container">
        <div className="secondary-container">
          <Router>
            <Header setUser={setUser} token={token} setToken={setToken} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/favorites"
                element={
                  <Favorites
                    setUser={setUser}
                    // dataFavorites={dataFavorites}
                    // setDataFavorites={setDataFavorites}
                    // setFavorites={setFavorites}
                  />
                }
              />
              <Route
                path="/game/:id"
                element={
                  <Game
                    aboutRef={aboutRef}
                    // setFavorites={setFavorites}
                  />
                }
              />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
