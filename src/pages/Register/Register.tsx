import React, { useState } from "react";
import "./Register.less";
import { Button } from "../../components/UI/Button/Button";
import { registerUser } from "../../API/userAPI";
import { useNavigate } from "react-router-dom";
import "./Register.less";
import Input from "../../components/UI/Input/Input";
import WelcomePanel from "../../components/WelcomePanel/WelcomePanel";
import registerImage from "../../assets/register.svg";
import { motion } from "framer-motion";

export type User = {
  email: string;
  password: string;
  name: string;
  surname: string;
  category: Array<string>;
};

const Register = () => {
  const [userData, setUserData] = useState<User>({
    email: "",
    password: "",
    name: "",
    surname: "",
    category: [],
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const register = async (event: React.FormEvent) => {
    event.preventDefault();
    registerUser(userData)
      .then((response) => {
        console.log(response);
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

  const handleProfesorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setUserData({
        ...userData,
        category: [...userData.category, "profesor"],
      });
    } else {
      setUserData({
        ...userData,
        category: userData.category.filter((item) => item !== "profesor"),
      });
    }
  };

  const handleStudentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setUserData({
        ...userData,
        category: [...userData.category, "student"],
      });
    } else {
      setUserData({
        ...userData,
        category: userData.category.filter((item) => item !== "student"),
      });
    }
  };

  return (
    <>
      <motion.main
        className="register"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: window.innerWidth }}
      >
        <div className="register-container">
          <div className="register-container__inner">
            <form className="register__form" onSubmit={register}>
              <h3>Create new account</h3>

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
                value={userData.password}
                className="register__input"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                placeholder="Password"
                required
              />
              <div className="register__form__checkboxes">
                <label htmlFor="student">
                  Student
                  <input
                    id="student"
                    type="checkbox"
                    name="student"
                    checked={userData.category.includes("student")}
                    onChange={handleStudentChange}
                  />
                </label>
                <label htmlFor="profesor">
                  Profesor
                  <input
                    id="profesor"
                    name="profesor"
                    type="checkbox"
                    checked={userData.category.includes("profesor")}
                    onChange={handleProfesorChange}
                  />
                </label>
              </div>
              <Button className="register__form__btn" type="submit">
                Register
              </Button>
              {errorMessage && <p>{errorMessage}</p>}
            </form>
          </div>
        </div>
      </motion.main>

      <WelcomePanel
        image={registerImage}
        title="Back to the Latest News!"
        content="Stay informed with the latest news! Return to our community for fresh insights and comprehensive analysis."
        btnText="Sign In"
        path="/login"
        side="right"
      />
    </>
  );
};

export default Register;
