import { useLoaderData } from "react-router-dom";
import ArticleDetails from "../../components/Articles/ArticleDetails/ArticleDetails";
import ArticlesSidebar from "../../components/Articles/ArticlesSidebar/ArticlesSidebar";
import "./SingleArticle.less";

const SingleArticle = () => {
  const articles = useLoaderData();
  return (
    <div className="single-article">
      <ArticleDetails />
      <ArticlesSidebar articles={articles}/>
    </div>
  )
}

export default SingleArticle
