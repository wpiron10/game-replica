import "./Login.scss";

import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement("#yourAppElement");

const Login = ({
  setUser,
  setSignupModalIsOpen,
  signupModalIsOpen,
  setIsOpen,
  isOpen,
  setDataProfile,
  modalIsOpen,
}) => {
  // let subtitle;
  // enable the navigate to the login page after sign up
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  function openModal() {
    setIsOpen(true);
    setSignupModalIsOpen(false);
  }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = "blue";
  // }

  function closeModal() {
    setIsOpen(false);
  }

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      // setErrorMessage(false);

      if (email.length > 1 && password.length > 1) {
        const response = await axios.post("http://localhost:4000/user-login", {
          email,
          password,
        });

        if (response.data.token) {
          setUser(response.data.token);
          setIsOpen(false);
          setDataProfile(response.data);
          // console.log(response, "<<<   response");
          // console.log(modalIsOpen, "<<<   modalisopen");
          // console.log(response.data, "<<<   data");

          closeModal();
          // redirection
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const customStyles = {
    overlay: { zIndex: 1000, backgroundColor: "rgba(0, 0, 0, 0.5)" },
    content: {
      border: "none",
      width: "150vh",
      height: "60vh",
      top: "50%",
      overflow: "visible",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      zIndex: "1200",
      color: "white",
      background: "linear-gradient(#323335,#171718)",
      boxSizing: "border-box",
      borderRadius: "10px",
    },
  };

  return (
    <div>
      <button
        onClick={() => {
          openModal();
        }}
        className="btn-login-signup"
      >
        Login
      </button>

      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="content-close-form">
          <FontAwesomeIcon
            className="close-form"
            icon="fa-solid fa-circle-xmark"
            onClick={closeModal}
          />
        </div>
        <div className="content-form">
          <div className="left-content-form">
            <div>
              <h2>How it works ?</h2>
              <div className="subsection-left-title-line"></div>
              <div>
                <div className="left-content-reasons">
                  <FontAwesomeIcon
                    icon="fa-solid fa-user-ninja"
                    className="left-content-reason-icon"
                  />
                  <p className="left-content-reason">
                    Log in to your free account to be able to get all features
                    of Gamepad
                  </p>
                </div>
                <div className="left-content-reasons">
                  <FontAwesomeIcon
                    icon="fa-solid fa-bookmark"
                    className="left-content-reason-icon"
                  />
                  <p className="left-content-reason">
                    Add a game to your collection
                  </p>
                </div>
                <div className="left-content-reasons">
                  <FontAwesomeIcon
                    icon="fa-solid fa-message"
                    className="left-content-reason-icon"
                  />
                  <p className="left-content-reason">
                    Leave a review for a game
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="right-content-form">
            <h2 className="login-form-title">Log in</h2>
            <form onSubmit={handleLogin} className="login-form">
              <input
                type="text"
                placeholder="Email"
                className="login-form-input"
                value={email}
                onChange={(event) => {
                  const value = event.target.value;
                  setEmail(value);
                }}
              />
              <input
                type="password"
                className="login-form-input"
                placeholder="Password"
                value={password}
                onChange={(event) => {
                  const value = event.target.value;
                  setPassword(value);
                }}
              />
              <input
                type="submit"
                className="login-form-submit"
                value="Log in"
              />
            </form>
            <div className="right-content-signup">
              Don't have an account yet?
              <div
                className="right-content-signup-redirect"
                onClick={() => {
                  closeModal();
                  setSignupModalIsOpen(true);
                }}
              >
                Create an account now!
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
