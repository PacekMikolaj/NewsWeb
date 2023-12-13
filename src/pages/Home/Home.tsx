import { getNews } from "../../../API/news";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import design from '../../assets/design.png';import { firebaseAuth } from "../../../firebase";
import Articles from "../../components/Articles/Articles";
import "./Home.less";

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
      <Header/>
      {/* {isAuthenticated ? 'ZALOGOWANY' : 'NIE ZALOGOWANY'} */}
      <main className="homepage__main">
        <div className="homepage__main__top-article">
        <img className="homepage__main__top-article__img" src={design} alt="some img"/>
        <h3 className="homepage__main__top-article__title">Headline of the day</h3>
        </div>
        <section className="homepage__featured">
          {/* Featured news content */}
        </section>
        <Articles newsList={newsList}/>
      </main>
    </div>
  );
};

export default Home;
