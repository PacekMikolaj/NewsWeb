import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firestoreDatabase } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { User } from '../pages/Register/Register';

export async function registerUser(userData: User) {
  const userCredential = await createUserWithEmailAndPassword(firebaseAuth, userData.email, userData.password);
  const user = userCredential.user;

  if (user) {
    const userDoc = doc(firestoreDatabase, "users", user.uid);
    await setDoc(userDoc, {...userData});
  }
}