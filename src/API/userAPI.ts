import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseAuth, firestoreDatabase } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { User } from "../pages/Register/Register";

export const registerUser = async (userData: User) => {
  const userCredential = await createUserWithEmailAndPassword(
    firebaseAuth,
    userData.email,
    userData.password
  );
  const user = userCredential.user;

  if (user) {
    const userDoc = doc(firestoreDatabase, "users", user.uid);
    await setDoc(userDoc, { ...userData });
  }
};

export const loginUser = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(firebaseAuth, email, password);
};

export const logoutUser = async () => {
  return await firebaseAuth.signOut();
};
