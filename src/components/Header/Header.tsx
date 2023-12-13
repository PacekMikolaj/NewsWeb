import './Header.less';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo-container">
        <img src="path-to-logo.png" alt="Logo" />
      </div>
      <div className="header__login-button-container">
        <button>Login</button>
      </div>
    </header>
  );
};

export default Header;
