import {
  getAuth,
  createUserWithEmailAndPassword,
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

  // createUserWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {

  //     const user = userCredential.user;
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //   });

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
      <motion.main 
      className="login" 
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth }}
      >
        <div className="login-container">
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
        </div>
      </motion.main>
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
