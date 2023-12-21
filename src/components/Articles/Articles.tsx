import Article from "./Article/Article";
import "./Articles.less";
type ArticlesProps = {
  newsList: any;
};

const Articles: React.FC<ArticlesProps> = ({ newsList }) => {
  return (
    <section className="articles-container">
      <ul className="articles-container__list">
        {newsList.map((news: any) => (
          <Article data={news} key={news.id} />
        ))}
      </ul>
    </section>
  );
};

export default Articles;
