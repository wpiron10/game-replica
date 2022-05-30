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

const Login = ({ setSignupModalIsOpen, signupModalIsOpen, setIsOpen }) => {
  let subtitle;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function openModal() {
    setSignupModalIsOpen(false);
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "blue";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button
        onClick={() => {
          openModal();
          setSignupModalIsOpen(false);
        }}
      >
        Login
      </button>
      <Modal
        isOpen={signupModalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>
          <FontAwesomeIcon icon="fa-solid fa-circle-xmark" />
        </button>
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
          Veuillez créer un compte
        </h2>
        <form>
          <input type="text" />
          <input type="text" />
        </form>
        <div>
          Déja inscrit ?
          <div
            onClick={() => {
              closeModal();
              setSignupModalIsOpen(true);
            }}
          >
            Connectez-vous en cliquant ici!
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
