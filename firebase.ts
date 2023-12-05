// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPnLvu5urAWfqSH38GWPBGRaT-VOMPz3Q",
  authDomain: "newsweb-f200b.firebaseapp.com",
  projectId: "newsweb-f200b",
  storageBucket: "newsweb-f200b.appspot.com",
  messagingSenderId: "259134039807",
  appId: "1:259134039807:web:f65abc35142929f2b64eca",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestoreDataBase = getFirestore(app);
