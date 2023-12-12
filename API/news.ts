import { firestoreDatabase } from "../firebase";
import { collection, addDoc, getDocs, snapshotEqual } from "firebase/firestore";

export const getNews = async () => {
  //  READ FIRESTORE
  const querySnapshot = await getDocs(collection(firestoreDatabase, "news"));
  //   querySnapshot.forEach((news) => {
  //     // console.log(news);
  //     return news;
  //   });
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};
