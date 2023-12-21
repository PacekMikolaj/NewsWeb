import Footer from "./components/Footer/Footer";
import { testFirebase } from "../firebaseTest";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register";
import { AuthProvider } from "./AuthContext";
import { getDownloadURL, ref } from "firebase/storage";
import { firebaseStorage } from "../firebase";

export const fetchImage = async (article: any) => {
  try {
    const url = await getDownloadURL(
      ref(firebaseStorage, `news_images/${article.image}`)
    );
    return url;
  } catch (err) {
    console.log(err);
    return "";
  }
};

export default function App() {
  // testFirebase();
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="addNews" element={<Login />} />
          <Route path="addNotification" element={<Login />} />
          <Route path="news" element={<Login />}>
            <Route path=":id" element={<Login />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
