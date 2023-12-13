import { getNews } from "../../../API/news";
import React, { useContext, useEffect, useState } from "react";
import News from "../../components/News/News";
import Header from "../../components/Header/Header";
import { firebaseAuth } from "../../../firebase";
import { AuthContext } from "../../AuthContext";

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
      <Header />
      <main className="homepage__main">
        <section className="homepage__featured">
          {/* Featured news content */}
        </section>
        <section className="homepage__articles">
          {/* You could map over an array of article data here */}
          {newsList.map((news: any) => (
            <News data={news} />
          ))}
          {/* Repeat the article-preview block for each article */}
        </section>
      </main>
    </div>
  );
};

export default Home;
