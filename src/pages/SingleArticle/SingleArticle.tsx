import { useLoaderData } from "react-router-dom";
import ArticleDetails from "../../components/Articles/ArticleDetails/ArticleDetails";
import ArticlesSidebar from "../../components/Articles/ArticlesSidebar/ArticlesSidebar";
import "./SingleArticle.less";
import { getAllNews, getNews } from "../../services/newsAPI";

const SingleArticle = () => {
  const { article, articles }: any = useLoaderData();
  return (
    <div className="single-article">
      <ArticleDetails articleData={article} />
      <ArticlesSidebar articles={articles} />
    </div>
  );
};

export const loader = async ({ params }: any) => {
  const data = await Promise.all([getAllNews(), getNews(params.id)]);
  console.log(data);

  return { articles: data[0], article: data[1] };
};

export default SingleArticle;
