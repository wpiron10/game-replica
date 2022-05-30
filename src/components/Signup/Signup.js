import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState } from "react";
import axios from "axios";

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

const Signup = ({
  setIsOpen,
  modalIsOpen,
  setSignupModalIsOpen,
  signupModalIsOpen,
}) => {
  let subtitle;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState();
  const [isPictureUploaded, setIsPictureUploaded] = useState();
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [preview, setPreview] = useState();

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
    event.preventDefault();
    setErrorMessage(false);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("picture", picture);
    formData.append("password", password);

    if (
      username.length > 1 &&
      email.length > 1 &&
      password.length > 1 &&
      confirmationPassword.length > 1
    ) {
      const response = await axios.post(
        "http://localhost:4000/user-signup",
        formData
        //   ,
        // {
        //   headers: {
        //     authorization: "token",
        //   },
        // }
      );
      setIsPictureUploaded(response.data);
    } else {
      setErrorMessage(true);
    }
  };

  return (
    <div>
      <button onClick={openModal}>Signup</button>
      <Modal
        isOpen={signupModalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          onClick={() => {
            closeModal();
            // setIsOpen(false);
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-circle-xmark" />
        </button>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <h2>Créez votre compte</h2>
          {preview && (
            <img
              style={{ width: 100, height: 100, borderRadius: "50%" }}
              src={preview}
            />
          )}
        </div>
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
            type="file"
            placeholder="Avatar"
            // accept=".jpg, .jpeg, .png"
            onChange={(event) => {
              const value = event.target.files[0];
              setPicture(value);
              // Add a preview picture after upload
              setPreview(URL.createObjectURL(value));
            }}
          />

          {/* <img style={{ width: 100, height: 100 }} src={picture} /> */}
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
          Déja inscrit ?
          <div
            onClick={() => {
              closeModal();
              setIsOpen(true);
            }}
          >
            Connectez-vous en cliquant ici!
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Signup;
