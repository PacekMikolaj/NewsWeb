import { getNews } from "../../API/news";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { firestoreDatabase } from "../../firebase";
import News from "../components/News";

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

  return newsList.length === 0
    ? "LOADING"
    : newsList.map((news: any) => <News data={news} />);
};

export default Home;
