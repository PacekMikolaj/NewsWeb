import { collection, addDoc, getDocs, snapshotEqual } from "firebase/firestore";
import { firestoreDatabase } from "./firebase";
import { set, ref, onValue } from "firebase/database";

export const testFirebase = async () => {
  //WRITE FIRESTORE
  // try {
  //   const docRef = await addDoc(collection(firestoreDatabase, "users"), {
  //     first: "Alan",
  //     middle: "Mathison",
  //     last: "Turing",
  //     born: 1912,
  //   });
  //   console.log("Document written with ID: ", docRef.id);
  // } catch (e) {
  //   console.error("Error adding document: ", e);
  // }
  //READ FIRESTORE
  // const querySnapshot = await getDocs(collection(firestoreDatabase, "users"));
  // querySnapshot.forEach((doc) => {
  //   console.log(`${doc.id} => ${doc.data()}`);
  // });
};
