import React, { useEffect, useState } from "react";
import "./ArticleMedium.less";
import noImage from "../../../assets/no-image.jpg";
import { getImage } from "../../../services/storageAPI";
import CategoriesDisplay from "../../CategoriesDisplay/CategoriesDisplay";
import { Link } from "react-router-dom";
import { Article } from "../../../services/articleAPI";

type ArticleMediumProps = {
  article: Article;
};

const ArticleMedium: React.FC<ArticleMediumProps> = ({ article }) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const fetch = async () => {
      setUrl(await getImage(article.image));
    };
    fetch();
  }, []);

  return (
    <li>
      <Link to={`/article/${article.id}`} style={{ textDecoration: "none" }}>
        <article className="article-medium">
          <img
            className="article-medium__image"
            src={url !== "" ? url : noImage}
            alt={url}
          />
          <div className="article-medium__content">
            <h5 className="article-medium__title">{article.title}</h5>
            <p className="article-medium__summary p1">{article.entry}</p>
            <CategoriesDisplay categories={article.categories} />
            <footer className="article-medium__footer">
              <p className="article-medium__footer__author">{article.author}</p>
              <p className="article-medium__footer__date">{article.date}</p>
            </footer>
          </div>
        </article>
      </Link>
    </li>
  );
};

export default ArticleMedium;
