import React, { useState } from "react";
import "./Register.less";
import { Button } from "../../components/UI/Button/Button";
import { registerUser } from "../../API/userAPI";
import { useNavigate } from "react-router-dom";
import "./Register.less";
import Input from "../../components/UI/Input/Input";
import WelcomePanel from "../../components/WelcomePanel/WelcomePanel";
import registerImage from "../../assets/register.svg";

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

  return (
    <>
      <main className="register">
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
              <div>
              <label htmlFor="student">
                Student
                <input
                  type="checkbox"
                  name="student"
                  checked={userData.category.includes("student")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setUserData({
                        ...userData,
                        category: [...userData.category, "student"],
                      });
                    } else {
                      setUserData({
                        ...userData,
                        category: userData.category.filter(
                          (item) => item !== "student"
                        ),
                      });
                    }
                  }}
                />
              </label>
              <label htmlFor="profesor">
                Profesor
                <input
                  name="profesor"
                  type="checkbox"
                  checked={userData.category.includes("profesor")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setUserData({
                        ...userData,
                        category: [...userData.category, "profesor"],
                      });
                    } else {
                      setUserData({
                        ...userData,
                        category: userData.category.filter(
                          (item) => item !== "profesor"
                        ),
                      });
                    }
                  }}
                />
              </label>

              </div>
              <Button onClick={register} className="register__form__btn">
                Register
              </Button>
            </form>
          </div>
        </div>
      </main>

      <WelcomePanel
        image={registerImage}
        title="Back to the Latest News!"
        content="Stay updated and informed! Rejoin our news community to access the latest insights, breaking news, and in-depth analysis."
        btnText="Sign In"
        path="/login"
        side="right"
      />
    </>
  );
};

export default Register;
