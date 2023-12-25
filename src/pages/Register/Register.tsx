import React, { useState } from "react";
import { registerUser } from "../../API/userAPI";
import { Button } from "../../components/UI/Button/Button";
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
      <input
        type="text"
        value={userData.name}
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        placeholder="name"
        required
      />
      <input
        type="text"
        value={userData.surname}
        onChange={(e) => setUserData({ ...userData, surname: e.target.value })}
        placeholder="surname"
        required
      />
      <input
        type="email"
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        placeholder="email"
        required
      />
      <input
        type="password"
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        placeholder="password"
        required
      />
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
      <Button onClick={register}>Register</Button>
    </form>
  );
};

export default Register;
