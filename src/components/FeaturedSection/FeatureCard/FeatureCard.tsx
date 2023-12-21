import "./FeatureCard.less";
import { useState, useEffect } from "react";
import noImage from "../../../assets/no-image.jpg";
import { fetchImage } from "../../../App";

type FeaturedCardProps = {
  article: any;
};

const FeatureCard: React.FC<FeaturedCardProps> = ({ article }) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const fetch = async () => {
      setUrl(await fetchImage(article));
    };
    fetch();
  }, []);

  return (
    <li>
      <div
        className="feature-card"
        style={{ backgroundImage: `url(${url !== "" ? url : noImage})` }}
      >
        <div className="feature-card__content">
          <h3 className="feature-card__content__title">{article.title}</h3>
        <div className="feature-card__content__categories">
          <ul>
            {article.categories.map((category: string) => (
              <li className="feature-card__content__categories__category">{category}</li>
            ))}
          </ul>
        </div>
          <footer className="feature-card__content__footer">
            <p className="feature-card__content__footer__author">{article.author}</p>
            <span>—</span>
            <p className="feature-card__content__footer__date">{article.date}</p>
          </footer>
        </div>
      </div>
    </li>
  );
};

export default FeatureCard;
