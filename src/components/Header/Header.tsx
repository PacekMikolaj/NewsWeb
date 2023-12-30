import "./Header.less";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { useContext } from "react";
import { Button } from "../UI/Button/Button";
import logo from "../../assets/logo.png";
import { logoutUser } from "../../services/userAPI";

const Header = () => {
  const { isAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleAddArticleClick = () => {
    navigate("/add-article");
  };

  const handleLogoutClick = () => {
    logoutUser();
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="header__logo-container">
            <img
              className="header__logo-container__logo"
              src={logo}
              alt="Logo"
            />
          </div>
        </Link>
            {/* <h1 className="header__logo-container__title">News web</h1> */}
        <div className="header__login-button-container">
          {isAuthenticated ? (
            <>
              <Button onClick={handleAddArticleClick}>Add article</Button>
              <Button onClick={handleLogoutClick}>Logout</Button>
            </>
          ) : (
            <>
              <Button onClick={handleLoginClick}>Login</Button>
              <Button onClick={handleRegisterClick}>Register</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
