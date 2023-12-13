import { getNews } from "../../../API/news";
import React, { useEffect, useState } from "react";
import News from "../../components/News/News";
import Header from "../../components/Header/Header";
import design from '../../assets/design.png';import { firebaseAuth } from "../../../firebase";

const Home = () => {
  const [newsList, setNewsList] = useState<any>([]);
  const isAuthenticated = firebaseAuth.currentUser !== null;

  useEffect(() => {
    getNews().then((news: any) => {
      console.log("cls", news);
      setNewsList([...news]);
    });
  }, []);

  console.log(newsList);

  // return newsList.length === 0
  //   ? "LOADING"
  //   : newsList.map((news: any) => <News data={news} />);

  return (
    <div className="homepage">
      {isAuthenticated ? 'ZALOGOWANY' : 'NIE ZALOGOWANY'}
      <Header/>
      <main className="homepage__main">
        <img src={design} alt="some img"/>
        <section className="homepage__featured">
          {/* Featured news content */}
        </section>
        <section className="homepage__articles">
          {/* You could map over an array of article data here */}
          {newsList.map((news: any) => <News data={news} />)}
          {/* Repeat the article-preview block for each article */}
        </section>
      </main>
    </div>
  );
};

export default Home;
