import { firestoreDatabase, firebaseStorage } from "../../firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

export interface Article {
  author: string;
  categories: string[];
  content: string;
  date: string;
  entry: string;
  image: string;
  title: string;
  id: string;
}

export const getAllArticles = async () => {
  const querySnapshot = await getDocs(collection(firestoreDatabase, "news"));
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

export const getArticle = async (id: string) => {
  const docSnapshot = await getDoc(doc(firestoreDatabase, "news", id));
  if (docSnapshot.exists()) {
    return { ...docSnapshot.data(), id: docSnapshot.id };
  } else {
    console.log("No such document!");
    return { error: "No such document!" };
  }
};

export const getArticlesByCategory = async (category: string) => {
  const newsRef = collection(firestoreDatabase, "news");
  const q = query(newsRef, where("categories", "array-contains", category));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};
