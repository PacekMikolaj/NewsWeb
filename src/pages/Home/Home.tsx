import React, { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import Articles from "../../components/Articles/Articles";
import FeaturedSection from "../../components/FeaturedSection/FeaturedSection";
import ArticlesSidebar from "../../components/Articles/ArticlesSidebar/ArticlesSidebar";
import Footer from "../../components/Footer/Footer";
import { getAllNews, getNewsByCategory } from "../../services/newsAPI";
import "./Home.less";
import Filter from "../../components/UI/Filter/Filter";

const Home = () => {
  const newsList = useLoaderData();
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
        <Filter onChange={onSelect} value={category} />
        <FeaturedSection newsList={newsList} />
        <div className="homepage__main__articles">
          <Articles newsList={newsList} />
          <ArticlesSidebar articles={newsList} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const loader = async ({ params }: { params: { category?: any } }) => {
  if (params.category) {
    return await getNewsByCategory(params.category);
  } else {
    return await getAllNews();
  }
};

export default Home;
