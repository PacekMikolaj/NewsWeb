import { useLoaderData } from "react-router-dom";
import { Params } from "react-router-dom";
import { Article } from "../../services/articleAPI";
import { getAllArticles, getArticle } from "../../services/articleAPI";
import ArticleDetails from "../../components/Articles/ArticleDetails/ArticleDetails";
import ArticlesSidebar from "../../components/Articles/ArticlesSidebar/ArticlesSidebar";

interface LoaderData {
  article: Article;
  articlesList: Article[];
}

const SingleArticle = () => {
  const { article, articlesList }: LoaderData = useLoaderData() as LoaderData;

  return (
    <div className="single-article">
      <ArticleDetails articleData={article} />
      <ArticlesSidebar articlesList={articlesList} />
    </div>
  );
};

export const loader = async ({ params }: { params: Params }) => {
  const data = await Promise.all([
    getAllArticles(),
    getArticle(params.id ?? ""),
  ]);
  console.log(data);

  return { articlesList: data[0], article: data[1] };
};

export default SingleArticle;
