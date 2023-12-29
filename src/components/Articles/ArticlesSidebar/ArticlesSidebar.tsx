import React from "react";
import "./ArticlesSidebar.less";
import ArticleSmall from "./ArticleSmall/ArticleSmall";
import { News } from "../../../services/newsAPI";

type ArticlesSidebarProps = {
  articles: any;
}

const ArticlesSidebar: React.FC<ArticlesSidebarProps> = ({ articles }) => (
  <aside className="articles-sidebar">
    <ul className="articles-sidebar__list">
      {articles.map((article: News) => (
        <ArticleSmall key={article.id} article={article} />
      ))}
    </ul>
  </aside>
);

export default ArticlesSidebar;
