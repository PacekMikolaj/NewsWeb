import { firestoreDatabase } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export const getNews = async () => {
  //  READ FIRESTORE
  const querySnapshot = await getDocs(collection(firestoreDatabase, "news"));
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};
