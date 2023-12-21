import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.less";
import { Button } from "../../components/UI/Button/Button";

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
        navigate("/home");
        const user = userCredential.user;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main className="login">
      <Link to="/home">Home</Link>
      <form className="login__form">
        <h2>Login</h2>
        <div className="login__form_row">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login__form_row">
          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button onClick={handleLogin}>Zaloguj</Button>
      </form>
    </main>
  );
};

export default Login;
