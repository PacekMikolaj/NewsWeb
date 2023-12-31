import { RouterProvider, createBrowserRouter } from "react-router-dom";

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
import AddArticle, {
  loader as addArticleLoader,
} from "./pages/AddArticle/AddArticle";
//TODO
/*
  - style article details
  - think about how to handle errors in pages
  - think about logo and text in header
  - think about how to handle errors in forms
  - block ability to go to the add-article page if user is not logged in
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
        loader: addArticleLoader,
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
