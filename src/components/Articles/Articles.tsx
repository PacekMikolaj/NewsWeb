import ArticleMedium from "./ArticleMedium/ArticleMedium";
import "./Articles.less";
type ArticlesProps = {
  newsList: any;
};

const Articles: React.FC<ArticlesProps> = ({ newsList }) => {
  return (
    <section className="articles-container">
      <ul className="articles-container__list">
        {newsList.map((news: any) => (
          <ArticleMedium article={news} key={news.id} />
        ))}
      </ul>
    </section>
  );
};

export default Articles;
