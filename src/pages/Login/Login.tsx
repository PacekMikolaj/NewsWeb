import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.less";
import { Button } from "../../components/UI/Button/Button";
import loginImage from "../../assets/log.svg";
import WelcomePanel from "../../components/WelcomePanel/WelcomePanel";
import Input from "../../components/UI/Input/Input";
import { motion } from "framer-motion";
import { loginUser } from "../../API/userAPI";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    loginUser(email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        let errorMessage: string;
        switch (error.code) {
          case "auth/user-not-found":
            errorMessage = "No user found with this email.";
            break;
          case "auth/wrong-password":
            errorMessage = "Incorrect password.";
            break;
          case "auth/invalid-email":
            errorMessage = "Invalid email.";
            break;
          case "auth/invalid-credential":
            errorMessage = "Invalid credential.";
            break;
          case "auth/user-disabled":
            errorMessage = "This user account has been disabled.";
            break;
          default:
            errorMessage = "An error occurred. Please try again.";
        }
        setErrorMessage(errorMessage);
        console.log(error.code);
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
                required
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<i className="fas fa-user" />}
              />
              <Input
                required
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<i className="fas fa-lock" />}
              />
              <Button
                type="submit"
                className="login__form__btn"
                onClick={handleLogin}
              >
                Login
              </Button>
              {errorMessage && <p>{errorMessage}</p>}
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
