import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import { useState } from "react";

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
// Modal.setAppElement("#yourAppElement");

const Login = ({
  setSignupModalIsOpen,
  signupModalIsOpen,
  setIsOpen,
  isOpen,
  modalIsOpen,
}) => {
  let subtitle;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  function openModal() {
    setIsOpen(true);
    setSignupModalIsOpen(false);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "blue";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      // setErrorMessage(false);

      if (email.length > 1 && password.length > 1) {
        const response = await axios.post(
          "http://localhost:4000/user-login",
          email,
          password
        );

        console.log("connecté", response.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          openModal();
        }}
      >
        Login
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>
          <FontAwesomeIcon icon="fa-solid fa-circle-xmark" />
        </button>
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Connectez-vous</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={email}
            onChange={(event) => {
              const value = event.target.value;
              setEmail(value);
            }}
          />
          <input
            type="text"
            value={password}
            onChange={(event) => {
              const value = event.target.value;
              setPassword(value);
            }}
          />
          <input type="submit" value="Je m'inscris"></input>
        </form>

        <div>
          Vous n'avez pas encore un compte ?
          <div
            onClick={() => {
              closeModal();
              setSignupModalIsOpen(true);
            }}
          >
            Créez en un en cliquant ici!
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
