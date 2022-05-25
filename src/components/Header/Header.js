import "./Header.scss";
import Logo from "./../../assets/img/Logo.svg";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="header-container">
        <div className="header-logo">
          {/* <Link to="/"> */}
          <img className="logo" src={Logo} />
          {/* </Link> */}
        </div>

        <div className="header-menu">
          <h2>My Collection</h2>
          <button>Login</button>
        </div>
      </div>
    </div>
  );
};
export default Header;
