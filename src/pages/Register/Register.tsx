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

  const navigate = useNavigate();

  const register = async (event: React.FormEvent) => {
    event.preventDefault();
    registerUser(userData)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
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
      <main className="register">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0, transition: { duration: 0.3 } }}
          exit={{ x: 0 }}
          className="register-container"
        >
          <div className="register-container__inner">
            <form className="register__form" onSubmit={register}>
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
            </form>
          </div>
        </motion.div>
      </main>

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
