import { firebaseStorage } from "../../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Article } from "./articleAPI";

export const getImage = async (image: string): Promise<string> => {
  try {
    const url = await getDownloadURL(
      ref(firebaseStorage, `news_images/${image}`)
    );
    return url;
  } catch (err) {
    console.log(err);
    return "";
  }
};

// Function to add an image file to Firebase storage
export const uploadImage = async (url: string, file: File) => {
  const storageRef = ref(firebaseStorage, `news_images/${url}`);
  return uploadBytes(storageRef, file);
};
