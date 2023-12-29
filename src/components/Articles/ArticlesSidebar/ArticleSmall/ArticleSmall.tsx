import { useState, useEffect } from "react";
import { getImage } from "../../../../services/storageAPI";
import noImage from "../../../../assets/no-image.jpg";
import "./ArticleSmall.less";
import { Link } from "react-router-dom";
import { Article } from "../../../../services/articleAPI";

type ArticleSmallProps = {
  article: Article;
};

const ArticleSmall: React.FC<ArticleSmallProps> = ({ article }) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const fetch = async () => {
      setUrl(await getImage(article.image));
    };
    fetch();
  }, []);

  return (
    <Link to={`/article/${article.id}`} style={{ textDecoration: "none" }}>
      <li className="article-small">
        <div className="article-small__wrapper">
          <img
            src={url !== "" ? url : noImage}
            alt={article.title}
            className="article-small__image"
          />
        </div>
        <h3 className="article-small__title">{article.title}</h3>
      </li>
    </Link>
  );
};

export default ArticleSmall;
