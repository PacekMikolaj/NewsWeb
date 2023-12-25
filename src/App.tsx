import Footer from "./components/Footer/Footer";
import { testFirebase } from "../firebaseTest";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";
import { AuthProvider } from "./AuthContext";

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
