import { firestoreDatabase } from "../../firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  addDoc,
  arrayRemove,
  doc,
  updateDoc,
} from "firebase/firestore";

export interface Notification {
  content: string;
  date: string;
  id?: string;
  author: string;
  users: string[];
}

export const listenForNotifications = (userId: string) => {
  const notificationQuery = query(
    collection(firestoreDatabase, "notifications"),
    where("users", "array-contains", userId)
  );

  const unsubscribe = onSnapshot(notificationQuery, (querySnapshot) => {
    console.log(querySnapshot.docChanges());
    querySnapshot.docChanges().forEach(async (change) => {
      if (change.type === "added") {
        window.alert("You have a new notification!");
        const docRef = doc(firestoreDatabase, "notifications", change.doc.id);
        await updateDoc(docRef, {
          users: arrayRemove(userId),
        });
      }
    });
  });

  return unsubscribe;
};

export const addNotification = async (notificationData: Notification) => {
  const notificationRef = collection(firestoreDatabase, "notifications");
  await addDoc(notificationRef, notificationData);
};
