import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// scss
import "./App.scss";

//imports des components
import Header from "./components/Header/Header";

// imports des pages
import Home from "./pages/Home";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleLeft,
  faAngleRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faAngleRight, faAngleLeft);

function App() {
  return (
    <div className="app">
      <div className="main-container">
        <div className="secondary-container">
          <Header />
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
