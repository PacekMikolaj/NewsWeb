import { Link } from "react-router-dom";
import './WelcomePanel.less';

type WelcomePanelProps = {
  image: string;
  title: string;
  content: string;
  btnText: string;
  path: string;
  side: string;
};

const WelcomePanel: React.FC<WelcomePanelProps> = ({
  image,
  title,
  content,
  btnText,
  path,
  side,
}) => {
  const style = side === "right" ? { 
    left: "50%"
  } : {}

  
  return (
    <div className="panel-container" style={style}>
      <div className="panel-container__panel panel-container__panel--left">
        <div className="panel-container__content">
          <h4>{title}</h4>
          <p>
            {content}
          </p>
          <Link to={path} className="panel-container__button">
            {btnText}
          </Link>
        </div>
        <img
          src={image}
          className="panel-container__image"
          alt="Login Visual"
        />
      </div>
    </div>
  );
};

export default WelcomePanel;
