import { collection, addDoc, getDocs, snapshotEqual } from "firebase/firestore";
import { firestoreDatabase, realtimeDatabase } from "./firebase";
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
  //WRITE REALTIME
  // try {
  //   set(ref(realtimeDatabase, "test"), {
  //     jeden: 1,
  //     dwa: 2,
  //     slowo: "slowo",
  //     tab: [1, 2, 3],
  //     obiekt: {
  //       imie: "ala",
  //       wiek: 23,
  //     },
  //   });
  //   console.log("Saved to database: ");
  // } catch (e) {
  //   console.error("Error adding data: ", e);
  // }
  //READ REALTIME
  // try {
  //   const info = ref(realtimeDatabase, "test/obiekt");
  //   onValue(info, (snapshot) => {
  //     console.log(snapshot.val());
  //   });
  //   console.log(info);
  // } catch (e) {
  //   console.log("error: ", e);
  // }
};
