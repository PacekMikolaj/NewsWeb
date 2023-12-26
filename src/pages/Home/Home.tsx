import { getNews } from "../../API/news";
import React, { useEffect, useState, useContext } from "react";
import Articles from "../../components/Articles/Articles";
import { AuthContext } from "../../AuthContext";
import FeaturedSection from "../../components/FeaturedSection/FeaturedSection";

import "./Home.less";
import ArticlesSidebar from "../../components/Articles/ArticlesSidebar/ArticlesSidebar";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  const [newsList, setNewsList] = useState<any>([]);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    getNews().then((news: any) => {
      console.log("cls", news);
      setNewsList([...news]);
    });
  }, []);

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

export default Home;
