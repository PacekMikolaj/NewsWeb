import './Header.less';
import { useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../../../firebase';
import { Button } from '../UI/Button/Button';

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
      <h2>News Web</h2>
      <div className="header__login-button-container">
        <Button onClick={handleLoginClick}>Login</Button>
      </div>
    </header>
  );
};

export default Header;
