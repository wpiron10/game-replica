import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState } from "react";
import axios from "axios";
// import SignupModal from "../SignupModal/SignupModal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "1200",
    color: "black",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement("#header");

const Signup = ({ setIsOpen, modalIsOpen, setSignupModalIsOpen }) => {
  let subtitle;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const openModal = () => {
    setIsOpen(false);
    setSignupModalIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "orange";
  };

  const closeModal = () => {
    setSignupModalIsOpen(false);
  };

  const fetchData = async (event) => {
    event.preventDefault();
    if (
      username.length > 1 &&
      email.length > 1 &&
      password.length > 1 &&
      confirmationPassword.length > 1
    ) {
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
    }

    // const response = await axios.post("", {
    //   username: username,
    //   email: email,
    //   password: password,
    // });
  };

  return (
    <div>
      <button onClick={openModal}>Signup</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          onClick={() => {
            closeModal();
            setIsOpen(false);
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-circle-xmark" />
        </button>
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
          Veuillez vous connecter
        </h2>
        <form
          onSubmit={fetchData}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => {
              const value = event.target.value;
              setUsername(value);
            }}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              const value = event.target.value;
              setEmail(value);
            }}
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              const value = event.target.value;
              setPassword(value);
            }}
          />
          <input
            type="text"
            placeholder="Confirm your password"
            value={confirmationPassword}
            onChange={(event) => {
              const value = event.target.value;
              setConfirmationPassword(value);
            }}
          />
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes et
            Conditions et Politique de Confidentialité de GamePad. Je confirme
            avoir au moins 18 ans.
          </p>
          {errorMessage === true && (
            <p style={{ color: "red" }}>Veuillez remplir tous les champs</p>
          )}
          <input type="submit" value="Je m'inscris"></input>
        </form>
        <div>
          Vous n'avez pas encore un compte ?
          <div
            onClick={() => {
              closeModal();
              setIsOpen(true);
            }}
          >
            Créez en un en cliquant ici!
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Signup;
