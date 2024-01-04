import React, { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import Articles from "../../components/Articles/Articles";
import FeaturedSection from "../../components/FeaturedSection/FeaturedSection";
import ArticlesSidebar from "../../components/Articles/ArticlesSidebar/ArticlesSidebar";
import Footer from "../../components/Footer/Footer";
import {
  getAllArticles,
  getArticlesByCategory,
} from "../../services/articleAPI";
import "./Home.less";
import Filter from "../../components/UI/Filter/Filter";
import { Article } from "../../services/articleAPI";

const Home = () => {
  const articlesList: Array<Article> = useLoaderData() as Array<Article>;
  const {
    isAuthenticated,
    userData: { category },
  } = useContext(UserContext);
  const navigate = useNavigate();

  const onSelect = (option: { value: string; label: string }) => {
    navigate(`/${option.value}`);
  };

  return (
    <div className="homepage">
      {isAuthenticated ? "ZALOGOWANY" : "NIE ZALOGOWANY"}
      <main className="homepage__main">
        {isAuthenticated && <Filter onChange={onSelect} value={category} />}
        <FeaturedSection articlesList={articlesList} />
        <div className="homepage__main__articles">
          <Articles articlesList={articlesList} />
          <ArticlesSidebar articlesList={articlesList} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

// to tez nie działa
export const loader = async ({ params }: { params: { category?: any } }) => {
  if (params.category) {
    return await getArticlesByCategory(params.category);
  } else {
    return await getAllArticles();
  }
};

export default Home;
