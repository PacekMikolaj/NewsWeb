import { firestoreDatabase } from "../../firebase";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

export const getAllNews = async () => {
  //  READ FIRESTORE
  const querySnapshot = await getDocs(collection(firestoreDatabase, "news"));
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

export const getNews = async (id: string) => {
  //  READ FIRESTORE
  const docSnapshot = await getDoc(doc(firestoreDatabase, "news", id));
  if (docSnapshot.exists()) {
    return { ...docSnapshot.data(), id: docSnapshot.id };
  } else {
    console.log("No such document!");
    return { error: "No such document!" };
  }
};
