import { testFirebase } from "../firebaseTest";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import { firebaseStorage } from "../firebase";

import { AuthProvider } from "./AuthContext";
import Home, { loader as newsLoader } from "./pages/Home/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";
import ArticleDetails from "./pages/ArticleDetails/ArticleDetails";
import AppLayout from "./pages/AppLayout/AppLayout";

import { AnimatePresence } from "framer-motion";
//TODO
/*
  - add loader to images
  - style article details
  - think about routes structure
  - add router actions in forms
  - think about how to handle errors in pages
  - think about logo and text in header
  - article sidebar in article details?
  - think where to storage state
  - think about how to handle errors in forms
*/

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

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <NotFound />,
        loader: newsLoader,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "addNews",
        element: <Login />,
      },
      {
        path: "addNotification",
        element: <Login />,
      },
      {
        path: "/news/:id",
        element: <ArticleDetails />,
      },
    ],
  },
]);

export default function App() {
  // testFirebase();
  return (
    <AuthProvider>
      <AnimatePresence>
        <RouterProvider router={router} />
      </AnimatePresence>
    </AuthProvider>
  );
}
