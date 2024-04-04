import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./Signin.css";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Реализация логики регистрации
  };

  return (
    <div className="container">
      <span className="emoji">👋</span>
      <h1>Welcome Back !</h1>
      <p>Let’s draw somethins majestic</p>
      <form id="registrationForm">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email addres"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Sign in</Button>
        <p className="text">
          Don’t have an account? <Link to="/login">Log in!</Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
