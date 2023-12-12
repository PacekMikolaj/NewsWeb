import { getNews } from "../../API/news";
import React, { useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { firestoreDatabase } from "../../firebase";

const Home = () => {
  const [snapshot, loading, error] = useCollection(
    //@ts-ignore
    firestoreDatabase.collection("news")
  );

  // useEffect(() => {
  //   getNews().then((news: any) => {
  //     console.log(news.data(), news.data().image);
  //   });
  // }, []);

  return <div>Home</div>;
};

export default Home;
