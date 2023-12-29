import { getNews } from "../../services/news";
import React, { useEffect, useState, useContext } from "react";
import Articles from "../../components/Articles/Articles";
import { AuthContext } from "../../AuthContext";
import FeaturedSection from "../../components/FeaturedSection/FeaturedSection";

import "./Home.less";
import ArticlesSidebar from "../../components/Articles/ArticlesSidebar/ArticlesSidebar";
import Footer from "../../components/Footer/Footer";
import { useLoaderData } from "react-router-dom";

const Home = () => {
  const newsList = useLoaderData();
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="homepage">
      {isAuthenticated ? "ZALOGOWANY" : "NIE ZALOGOWANY"}
      <main className="homepage__main">
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

export const loader = async () => {
  const newsList = await getNews();
  return newsList;
};

export default Home;
