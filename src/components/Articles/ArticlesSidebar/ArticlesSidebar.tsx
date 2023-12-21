import React from "react";
import "./ArticlesSidebar.less";
import { useState, useEffect } from "react";
import { fetchImage } from "../../../App";
import noImage from "../../../assets/no-image.jpg";

interface ArticleSmallProps {
  article: any;
}

interface ArticlesSidebarProps {
  articles: any;
}

const ArticleSmall: React.FC<ArticleSmallProps> = ({ article }) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const fetch = async () => {
      setUrl(await fetchImage(article));
    };
    fetch();
  }, []);

  return (
    <li className="article-small">
      <div className="article-small__wrapper">
        <img
          src={url !== "" ? url : noImage}
          alt={article.title}
          className="article-small__image"
        />
      </div>
      <h3 className="article-small__title">{article.title}</h3>
      {article.description && (
        <p className="article-small__description">{article.description}</p>
      )}
    </li>
  );
};

const ArticlesSidebar: React.FC<ArticlesSidebarProps> = ({ articles }) => (
  <aside className="articles-sidebar">
    <ul className="articles-sidebar__list">
      {articles.map((article: any) => (
        <ArticleSmall key={article.id} article={article} />
      ))}
    </ul>
  </aside>
);

export default ArticlesSidebar;
