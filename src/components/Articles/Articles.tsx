import Article from "./Article/Article";
import './Articles.less';
type ArticlesProps = {
  newsList: any;
};

const Articles: React.FC<ArticlesProps> = ({ newsList }) => {
  return (
    <section className="articles-container">
      <ul className="articles-container__list">
        {/* You could map over an array of article data here */}
        {newsList.map((news: any) => (
          <>
          <Article data={news} />
          <Article data={news} />
          <Article data={news} />
          <Article data={news} />
          <Article data={news} />
          <Article data={news} />
          <Article data={news} />
          <Article data={news} />
          <Article data={news} />
          <Article data={news} />
          <Article data={news} />
          <Article data={news} />
          </>
        ))}
      </ul>
    </section>
  );
};

export default Articles;
