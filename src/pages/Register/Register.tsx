import React, { useState } from "react";
import "./Register.less";
import { Button } from "../../components/UI/Button/Button";
import { registerUser } from "../../services/userAPI";
import { useNavigate } from "react-router-dom";
import "./Register.less";
import Input from "../../components/UI/Input/Input";
import WelcomePanel from "../../components/WelcomePanel/WelcomePanel";
import registerImage from "../../assets/register.svg";
import { motion } from "framer-motion";
import { User } from "../../services/userAPI";

const Register = () => {
  const [userData, setUserData] = useState<User>({
    email: "",
    password: "",
    name: "",
    surname: "",
    category: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    registerUser(userData)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        let errorMessage;
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage =
              "The email address is already in use by another account.";
            break;
          case "auth/invalid-email":
            errorMessage = "The email address is not valid.";
            break;
          case "auth/operation-not-allowed":
            errorMessage = "Password sign-in is not enabled for this project.";
            break;
          case "auth/weak-password":
            errorMessage = "The password is too weak.";
            break;
          default:
            errorMessage = "An error occurred. Please try again.";
        }
        setErrorMessage(errorMessage);
        console.log(error);
      });
  };

  return (
    <>
      <main className="register">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0, transition: { duration: 0.3 } }}
          exit={{ x: 0 }}
          className="register-container"
        >
          <div className="register-container__inner">
            <form className="register__form" onSubmit={handleSubmit}>
              <h2>Create new account</h2>

              <Input
                type="text"
                value={userData.name}
                className="register__input"
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                placeholder="Name"
                required
              />

              <Input
                type="text"
                value={userData.surname}
                className="register__input"
                onChange={(e) =>
                  setUserData({ ...userData, surname: e.target.value })
                }
                placeholder="Surname"
                required
              />

              <Input
                type="text"
                value={userData.email}
                className="register__input"
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                placeholder="Email"
                required
              />

              <Input
                type="password"
                value={userData.password || ""}
                className="register__input"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                placeholder="Password"
                required
              />

              <div className="register__form__radio">
                <label htmlFor="student">
                  Student
                  <input
                    id="student"
                    type="radio"
                    name="category"
                    value="student"
                    checked={userData.category === "student"}
                    onChange={(e) =>
                      setUserData({ ...userData, category: e.target.value })
                    }
                  />
                </label>

                <label htmlFor="teacher">
                  Teacher
                  <input
                    id="teacher"
                    type="radio"
                    name="category"
                    value="teacher"
                    checked={userData.category === "teacher"}
                    onChange={(e) =>
                      setUserData({ ...userData, category: e.target.value })
                    }
                  />
                </label>
              </div>
              <Button className="register__form__btn" type="submit">
                Register
              </Button>
              {errorMessage && <p>{errorMessage}</p>}
            </form>
          </div>
        </motion.div>
      </main>

      <WelcomePanel
        image={registerImage}
        title="Back to the Latest News!"
        content="Stay informed with the latest news! Return to our community for fresh insights."
        btnText="Sign In"
        path="/login"
        side="right"
      />
    </>
  );
};

export default Register;
