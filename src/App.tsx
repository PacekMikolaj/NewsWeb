import Footer from "./components/Footer";
import { testFirebase } from "../firebaseTest";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";

export default function App() {
  // testFirebase();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="addNews" element={<Login />} />
        <Route path="addNotification" element={<Login />} />
        <Route path="news" element={<Login />} >
          <Route path=":id" element={<Login />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
