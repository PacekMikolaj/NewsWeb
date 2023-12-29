import { Article } from "../../services/articleAPI";
import ArticleMedium from "./ArticleMedium/ArticleMedium";
import "./Articles.less";
type ArticlesProps = {
  articlesList: Article[];
};

const Articles: React.FC<ArticlesProps> = ({ articlesList }) => {
  return (
    <section className="articles-container">
      <ul className="articles-container__list">
        {articlesList.map((article: Article) => (
          <ArticleMedium article={article} key={article.id} />
        ))}
      </ul>
    </section>
  );
};

export default Articles;
