import { firestoreDatabase, firebaseStorage } from "../../firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  addDoc,
  orderBy,
  limit,
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
  id?: string;
}

export const getAllArticles = async () => {
  const q = query(
    collection(firestoreDatabase, "news"),
    orderBy("date", "desc"),
    limit(20)
  );
  const querySnapshot = await getDocs(q);
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
  const q = query(
    collection(firestoreDatabase, "news"),
    where("categories", "array-contains", category),
    limit(20)
  );

  const querySnapshot = await getDocs(q);
  const articles: Article[] = querySnapshot.docs.map((doc) => ({
    ...(doc.data() as Article),
    id: doc.id,
  }));

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const uploadArticle = (article: Article) => {
  return addDoc(collection(firestoreDatabase, "news"), article);
};
