import React, { useState } from "react";
import "./Register.less";
import { Button } from "../../components/UI/Button/Button";
import { registerUser } from "../../API/userAPI";
import { useNavigate } from "react-router-dom";
import "./Register.less";

export type user = {
  email: string;
  password: string;
  name: string;
  surname: string;
  category: Array<string>;
};

const Register = () => {
  const [userData, setUserData] = useState<user>({
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
    <form className="form" onSubmit={register}>
      <h3>Create new account</h3>
      <label htmlFor="name" className="register__label">
        Name:{" "}
      </label>
      <input
        type="text"
        value={userData.name}
        className="register__input"
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        placeholder="name"
        required
      />
      <label htmlFor="surname" className="register__label">
        Surname:{" "}
      </label>
      <input
        type="text"
        value={userData.surname}
        className="register__input"
        onChange={(e) => setUserData({ ...userData, surname: e.target.value })}
        placeholder="surname"
        required
      />
      <label htmlFor="email" className="register__label">
        Email:{" "}
      </label>
      <input
        type="email"
        value={userData.email}
        className="register__input"
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        placeholder="email"
        required
      />
      <label htmlFor="password" className="register__label">
        Password:
      </label>
      <input
        type="password"
        value={userData.password}
        className="register__input"
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        placeholder="password"
        required
      />
      <label htmlFor="category" className="register__label">
        Category:
      </label>
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
      <Button onClick={register} className="register__button">
        Register
      </Button>
    </form>
  );
};

export default Register;
