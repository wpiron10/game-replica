import "./Header.scss";
import Logo from "./../../assets/img/Logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Login from "../Login/Login";
import Signup from "../Signup/Signup";

const Header = ({ setUser, token, setToken }) => {
  const [dataProfile, setDataProfile] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/">
            <img className="logo" src={Logo} alt="logo-gamepad" />
          </Link>
        </div>

        <div className="header-menu">
          <div className="header-favorites">
            {token !== null ? (
              <Link to="/favorites">
                <h2>My Collection</h2>
              </Link>
            ) : (
              <h2
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                My Collection
              </h2>
            )}
          </div>
          {token !== null ? (
            <>
              <p>{dataProfile.username}</p>
              {/* {console.log(dataProfile.picture)} */}
              <img
                src={dataProfile.picture}
                alt={dataProfile.username}
                className="header-username-img"
              />
              <button
                className="header-disconnect"
                onClick={() => {
                  setToken(null);
                  //Déconnexion / redirection vers la homepage
                  setUser(null);
                  navigate("/");
                }}
              >
                Déconnexion
              </button>
            </>
          ) : (
            <div className="header-login-signup">
              <Login
                setIsOpen={setIsOpen}
                setDataProfile={setDataProfile}
                setUser={setUser}
                modalIsOpen={modalIsOpen}
                setSignupModalIsOpen={setSignupModalIsOpen}
              />
              <Signup
                setSignupModalIsOpen={setSignupModalIsOpen}
                signupModalIsOpen={signupModalIsOpen}
                setIsOpen={setIsOpen}
                setUser={setUser}
                setDataProfile={setDataProfile}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
