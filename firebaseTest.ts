import { collection, addDoc, getDocs } from "firebase/firestore";
import { firestoreDataBase } from "./firebase";

export const testFirebase = async () => {
  try {
    const docRef = await addDoc(collection(firestoreDataBase, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  try {
    const docRef = await addDoc(collection(firestoreDataBase, "users"), {
      first: "Alan",
      middle: "Mathison",
      last: "Turing",
      born: 1912,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  const querySnapshot = await getDocs(collection(firestoreDataBase, "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
};
