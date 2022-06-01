import "./Signup.scss";

import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement("#header");

const Signup = ({
  setUser,
  setIsOpen,
  setDataProfile,
  modalIsOpen,
  setSignupModalIsOpen,
  signupModalIsOpen,
}) => {
  let subtitle;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const openModal = () => {
    setIsOpen(false);
    setSignupModalIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  };

  const closeModal = () => {
    setSignupModalIsOpen(false);
  };

  const fetchData = async (event) => {
    try {
      event.preventDefault();
      setErrorMessage(false);
      console.log(picture);
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("picture", picture);
      formData.append("password", password);

      // if (
      //   username.length > 0 &&
      //   email.length > 0 &&
      //   password.length > 0 &&
      //   confirmationPassword.length > 0
      // ) {
      const response = await axios.post(
        "http://localhost:4000/user-signup",
        formData
      );

      //state saving token for login/signup
      setUser(response.data.token);
      setDataProfile(response.data);
      //Redirect to login modal
      setSignupModalIsOpen(false);
      setIsOpen(true);
      // } else {
      //   // if (error.response.status === 409) {
      //   //   setErrorMessage("Cet email a déjà un compte !");
      //   // }
      //   setErrorMessage(true);
      // }
    } catch (error) {
      console.log(error.message);
      // if (error.response.status === 409) {
      //   setErrorMessage("Cet email a déjà un compte !");
      // }
      // setErrorMessage(true);
    }
  };
  const customStyles = {
    overlay: { zIndex: 1000, backgroundColor: "rgba(0, 0, 0, 0.5)" },
    content: {
      border: "none",
      width: "150vh",
      height: "80vh",
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
      <button onClick={openModal} className="btn-login-signup">
        Signup
      </button>
      <Modal
        isOpen={signupModalIsOpen}
        onAfterOpen={afterOpenModal}
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

                {preview && (
                  <div className="left-content-profile">
                    <div className="left-content-profile-preview">
                      <img
                        className="left-content-profile-preview-img"
                        src={preview}
                      />
                      <p>you profile picture</p>
                    </div>{" "}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="right-content-form">
            <h2 className="login-form-title">Create your account</h2>

            <form onSubmit={fetchData} className="login-form">
              <input
                className="login-form-input"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => {
                  const value = event.target.value;
                  setUsername(value);
                }}
              />
              <div className="login-form-import-file">
                <input
                  className="login-form-import-file-input"
                  // className="login-form-input"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  placeholder="Avatar"
                  name="profile_picture"
                  // accept=".jpg, .jpeg, .png"
                  onChange={(event) => {
                    const value = event.target.files[0];
                    setPicture(value);
                    // Add a preview picture after upload
                    setPreview(URL.createObjectURL(value));
                  }}
                />

                {preview && (
                  <FontAwesomeIcon
                    icon="fa-solid fa-trash"
                    className="login-form-delete-file"
                    onClick={() => {
                      setPicture(null);
                      setPreview(null);
                    }}
                  />
                )}
              </div>
              {/* <img style={{ width: 100, height: 100 }} src={picture} /> */}
              <input
                className="login-form-input"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(event) => {
                  const value = event.target.value;
                  setEmail(value);
                }}
              />
              <input
                className="login-form-input"
                type="text"
                placeholder="Password"
                value={password}
                onChange={(event) => {
                  const value = event.target.value;
                  setPassword(value);
                }}
              />
              <input
                className="login-form-input"
                type="text"
                placeholder="Confirm your password"
                value={confirmationPassword}
                onChange={(event) => {
                  const value = event.target.value;
                  setConfirmationPassword(value);
                }}
              />
              <p className="login-form-terms">
                By registering I confirm that I have read and agree to the Terms
                and Conditions and Privacy Policy of GamePad.
              </p>
              {errorMessage === true && (
                <p style={{ color: "red" }}>Please fill all the fields.</p>
              )}
              <input
                className="login-form-submit"
                type="submit"
                value="Sign up"
              ></input>
            </form>
            <div className="right-content-signup">
              <div>
                Already registered?
                <div
                  onClick={() => {
                    closeModal();
                    setIsOpen(true);
                  }}
                  className="right-content-signup-redirect"
                >
                  Log in by clicking here!
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Signup;
