import "./FeatureCard.less";
import { useState, useEffect } from "react";
import noImage from "../../../assets/no-image.jpg";
import { fetchImage } from "../../../App";
import { Link } from "react-router-dom";
import CategoriesDisplay from "../../CategoriesDisplay/CategoriesDisplay";
import { News } from "../../../services/newsAPI";

type FeaturedCardProps = {
  article: News;
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
      <Link to={`/news/${article.id}`} className="feature-card__link">
        <div
          className="feature-card"
          style={{ backgroundImage: `url(${url !== "" ? url : noImage})` }}
        >
          <div className="feature-card__content">
            <h3 className="feature-card__content__title">{article.title}</h3>
            <CategoriesDisplay categories={article.categories} />
            <footer className="feature-card__content__footer">
              <p className="feature-card__content__footer__author">
                {article.author}
              </p>
              <span>—</span>
              <p className="feature-card__content__footer__date">
                {article.date}
              </p>
            </footer>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default FeatureCard;
