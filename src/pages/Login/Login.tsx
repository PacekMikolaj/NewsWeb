import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.less";
import { Button } from "../../components/UI/Button/Button";
import loginImage from "../../assets/log.svg";
import WelcomePanel from "../../components/WelcomePanel/WelcomePanel";
import Input from "../../components/UI/Input/Input";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const auth = getAuth();

  const handleLogin = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/");
        const user = userCredential.user;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <main className="login">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0, transition: { duration: 0.3 } }}
          exit={{ x: 0}}
          className="login-container"
          style={{transform: ''}}
        >
          <div className="login-container__inner">
            <form className="login__form">
              <h2>Welcome back!</h2>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<i className="fas fa-user" />}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<i className="fas fa-lock" />}
              />
              <Button className="login__form__btn" onClick={handleLogin}>
                Login
              </Button>
            </form>
          </div>
        </motion.div>
      </main>
      <WelcomePanel
        image={loginImage}
        title="Join Our Community!"
        content="Discover a world of knowledge and opportunity. Join us today and
        start exploring endless possibilities!"
        btnText="Sign up"
        path="/register"
        side="left"
      />
    </>
  );
};

export default Login;
