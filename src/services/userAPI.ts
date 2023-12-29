import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseAuth, firestoreDatabase } from "../../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

export type User = {
  id?: string;
  email: string;
  password?: string;
  name: string;
  surname: string;
  category: string;
};

export const registerUser = async (userData: User) => {
  if (!userData.email || !userData.password) {
    return;
  }
  const userCredential = await createUserWithEmailAndPassword(
    firebaseAuth,
    userData.email,
    userData.password
  );
  const user = userCredential.user;

  if (user) {
    const userDoc = doc(firestoreDatabase, "users", user.uid);
    await setDoc(userDoc, {
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      category: userData.category,
    });
  }
};

export const loginUser = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(firebaseAuth, email, password);
};

export const logoutUser = async () => {
  return await firebaseAuth.signOut();
};

export const getUserData = async (uid: string) => {
  const docSnapshot = await getDoc(doc(firestoreDatabase, "users", uid));
  if (docSnapshot.exists()) {
    return { ...docSnapshot.data(), id: docSnapshot.id };
  } else {
    console.log("User does not exist!");
    return { error: "User does not exist!" };
  }
};
