import "./Header.scss";
import Logo from "./../../assets/img/Logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

import Login from "../Login/Login";
import Signup from "../Signup/Signup";

const Header = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);

  return (
    <div className="header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/">
            <img className="logo" src={Logo} alt="logo-gamepad" />
          </Link>
        </div>

        <div className="header-menu">
          <h2>My Collection</h2>
          <Login
            setIsOpen={setIsOpen}
            modalIsOpen={modalIsOpen}
            setSignupModalIsOpen={setSignupModalIsOpen}
          />
          <Signup
            setSignupModalIsOpen={setSignupModalIsOpen}
            signupModalIsOpen={signupModalIsOpen}
            setIsOpen={setIsOpen}
          />
          {/* <LoginModal /> */}
        </div>
      </div>
    </div>
  );
};
export default Header;
