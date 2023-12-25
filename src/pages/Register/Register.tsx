import React, { useState } from "react";
import "./Register.less";
import { Button } from "../../components/UI/Button/Button";

const Register = () => {
  const [userData, setUserData] = useState<any>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle the registration logic here
    console.log(userData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="register">
      <h3>Create new account</h3>
      <div className="register__field">
        <label htmlFor="username" className="register__label">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={userData.username}
          onChange={handleChange}
          className="register__input"
        />
      </div>
      <div className="register__field">
        <label htmlFor="email" className="register__label">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          className="register__input"
        />
      </div>
      <div className="register__field">
        <label htmlFor="password" className="register__label">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          className="register__input"
        />
      </div>
      <Button type="submit" className="register__button">Register</Button>
    </form>
  );
};

export default Register;
