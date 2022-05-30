import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRef } from "react";

// scss
import "./App.scss";

//imports des components
import Header from "./components/Header/Header";

// imports des pages
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleLeft,
  faAngleRight,
  faMagnifyingGlass,
  faBookmark,
  faMessage,
  faThumbsDown,
  faThumbsUp,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
library.add(
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

  return (
    <div className="app">
      <div className="main-container">
        <div className="secondary-container">
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/game/:id" element={<Game aboutRef={aboutRef} />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
