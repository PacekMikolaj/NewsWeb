import { getNews } from "../../../API/news";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { firestoreDatabase } from "../../../firebase";
import News from "../../components/News/News";
import Header from "../../components/Header/Header";

const Home = () => {
  //@ts-ignore
  // firestoreDatabase.collection("news")
  const [newsList, setNewsList] = useState<any>([]);

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
      <main className="homepage__main">
        <section className="homepage__featured">
          {/* Featured news content */}
        </section>
        <section className="homepage__articles">
          {/* You could map over an array of article data here */}
          <article className="article-preview">
            <img className="article-preview__image" src="#" alt="Thumbnail" />
            <div className="article-preview__content">
              <h3 className="article-preview__title">Article Title</h3>
              <p className="article-preview__summary">
                Summary of the article...
              </p>
              <a className="article-preview__read-more" href="#">
                Read More
              </a>
            </div>
          </article>
          {/* Repeat the article-preview block for each article */}
        </section>
      </main>
    </div>
  );
};

export default Home;
