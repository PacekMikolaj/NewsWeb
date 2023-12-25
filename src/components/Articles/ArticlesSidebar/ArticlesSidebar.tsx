import React from "react";
import "./ArticlesSidebar.less";
import ArticleSmall from "./ArticleSmall/ArticleSmall";

type ArticlesSidebarProps = {
  articles: any;
}

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
