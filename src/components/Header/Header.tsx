import "./Header.less";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../../firebase";
import { Button } from "../UI/Button/Button";

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
      <div className="header__logo-container">
        <img src="path-to-logo.png" alt="Logo" />
      </div>
      <h2>News Web</h2>
      <div className="header__login-button-container">
        {isAuthenticated ? (
          <Button onClick={handleLogoutClick}>Logout</Button>
        ) : (
          <Button onClick={handleLoginClick}>Login</Button>
        )}
      </div>
    </header>
  );
};

export default Header;
