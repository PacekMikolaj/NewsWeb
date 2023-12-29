import React from "react";
import "./ArticlesSidebar.less";
import ArticleSmall from "./ArticleSmall/ArticleSmall";
import { Article } from "../../../services/articleAPI";

type ArticlesSidebarProps = {
  articlesList: Article[];
};

const ArticlesSidebar: React.FC<ArticlesSidebarProps> = ({ articlesList }) => {
  console.log(articlesList);
  return (
    <aside className="articles-sidebar">
      <ul className="articles-sidebar__list">
        {articlesList.map((article: Article) => (
          <ArticleSmall key={article.id} article={article} />
        ))}
      </ul>
    </aside>
  );
};

export default ArticlesSidebar;
