import { testFirebase } from "../firebaseTest";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";
import { AuthProvider } from "./AuthContext";
import { getDownloadURL, ref } from "firebase/storage";
import { firebaseStorage } from "../firebase";
import ArticleDetails from "./pages/ArticleDetails/ArticleDetails";
import AppLayout from "./pages/AppLayout/AppLayout";
//TODO
/*
  - style register and login components
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
      },
      {
        path: "profile",
        element: <Profile />,
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
        path: "news",
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
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
