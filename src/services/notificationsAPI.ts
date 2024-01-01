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
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

export interface Notification {
  content: string;
  date: string;
  id?: string;
  author: string;
  users: string[];
  articleId: string;
}

export const listenForNotifications = (
  userId: string,
  setHasNewNotification: Dispatch<SetStateAction<boolean>>,
  setNotifications: Dispatch<SetStateAction<Notification[]>>
) => {
  const notificationQuery = query(
    collection(firestoreDatabase, "notifications"),
    where("users", "array-contains", userId)
  );

  const unsubscribe = onSnapshot(notificationQuery, (querySnapshot) => {
    const newNotifications: Notification[] = [];
    querySnapshot.forEach((doc) => {
      newNotifications.push({
        ...doc.data(),
        id: doc.id,
      } as Notification);
    });
    setHasNewNotification(newNotifications.length > 0);
    setNotifications(newNotifications);
  });

  return unsubscribe;
};

export const addNotification = async (notificationData: Notification) => {
  const notificationRef = collection(firestoreDatabase, "notifications");
  await addDoc(notificationRef, notificationData);
};

export const deleteUserFromNotification = async (
  notificationId: string,
  userId: string
) => {
  if (!notificationId) return;
  const docRef = doc(firestoreDatabase, "notifications", notificationId);
  const docSnapshot = await getDoc(docRef);

  if (!docSnapshot.exists()) {
    return;
  }

  if (
    docSnapshot.data().users.filter((user: string) => user !== userId)
      .length === 0
  ) {
    await deleteDoc(docRef);
  } else {
    await updateDoc(docRef, {
      users: arrayRemove(userId),
    });
  }
};
