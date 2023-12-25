import "./Header.less";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../../firebase";
import { Button } from "../UI/Button/Button";
import logo from "../../assets/logo.png";

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = async () => {
    await signOut(firebaseAuth);
  };
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" style={{textDecoration: 'none'}}>
        <div className="header__logo-container">
          <img className="header__logo-container__logo" src={logo} alt="Logo" />
          <h1 className="header__logo-container__title">News web</h1>
        </div>

        </Link>
        <div className="header__login-button-container">
          {isAuthenticated ? (
            <Button onClick={handleLogoutClick}>Logout</Button>
          ) : (
            <Button onClick={handleLoginClick}>Login</Button>
          )}
          <Button onClick={() => navigate("/register")}>Register</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
