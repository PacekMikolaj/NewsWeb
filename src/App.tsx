import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import { firebaseStorage } from "../firebase";

import { UserProvider } from "./UserContext";
import Home, { loader as articleLoader } from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";
import AppLayout from "./pages/AppLayout/AppLayout";
import { AnimatePresence } from "framer-motion";
import SingleArticle, {
  loader as singleArticleLoader,
} from "./pages/SingleArticle/SingleArticle";
import AddArticle from "./pages/AddArticle/AddArticle";
//TODO
/*
  - style article details
  - think about routes structure
  - add router actions in forms
  - think about how to handle errors in pages
  - think about logo and text in header
  - article sidebar in article details?
  - think where to storage state
  - think about how to handle errors in forms
*/

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <NotFound />,
        loader: articleLoader,
      },
      {
        path: "/:category",
        element: <Home />,
        errorElement: <NotFound />,
        loader: articleLoader,
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
        path: "add-article",
        element: <AddArticle />,
      },
      {
        path: "addNotification",
        element: <Login />,
      },
      {
        path: "/article/:id",
        element: <SingleArticle />,
        loader: singleArticleLoader,
      },
    ],
  },
]);

export default function App() {
  return (
    <UserProvider>
      <AnimatePresence>
        <RouterProvider router={router} />
      </AnimatePresence>
    </UserProvider>
  );
}
