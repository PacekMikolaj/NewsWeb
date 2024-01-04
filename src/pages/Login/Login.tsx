import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.less";
import { Button } from "../../components/UI/Button/Button";
import loginImage from "../../assets/log.svg";
import WelcomePanel from "../../components/WelcomePanel/WelcomePanel";
import Input from "../../components/UI/Input/Input";
import { motion } from "framer-motion";
import { loginUser } from "../../services/userAPI";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      <main className="login">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0, transition: { duration: 0.3 } }}
          exit={{ x: 0 }}
          className="login-container"
          style={{ transform: "" }}
        >
          <div className="login-container__inner">
            <form className="login__form" onSubmit={handleSubmit}>
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
              <Button type="submit" className="login__form__btn">
                Login
              </Button>
              {errorMessage && <p>{errorMessage}</p>}
            </form>
          </div>
        </motion.div>
      </main>
      <WelcomePanel
        image={loginImage}
        title="Join Our Community!"
        content="Join us today and
        start exploring endless possibilities!"
        btnText="Sign up"
        path="/register"
        side="left"
      />
    </>
  );
};

export default Login;
