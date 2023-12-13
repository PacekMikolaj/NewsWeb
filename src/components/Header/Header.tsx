import './Header.less';
import { useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../../../firebase';

const Header = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    const isAuthenticated = firebaseAuth.currentUser !== null;
    if(isAuthenticated){
      alert('Jesteś już zalogowany!')
    } else {
      navigate('/login');
    }
  }
  return (
    <header className="header">
      <div className="header__logo-container">
        <img src="path-to-logo.png" alt="Logo" />
      </div>
      <div className="header__login-button-container">
        <button onClick={handleLoginClick}>Login</button>
      </div>
    </header>
  );
};

export default Header;
