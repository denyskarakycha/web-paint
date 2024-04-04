import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    // Реализация логики входа
  };

  return (
    <div className="container">
      <div className="icon-container">
        <span className="mountain">🗻</span>
        <span className="globe">🌎</span>
        <span className="bridge">🌉</span>
        <span className="star">⭐️</span>
        <span className="star">🌟</span>
        <span className="rainbow">🌈</span>
      </div>
      <h1>Join us !</h1>
      <p>Register and draw whatever your heart desires !</p>
      <form id="registrationForm">
        <label htmlFor="username">Your Name</label>
        <input
          id="username"
          name="username"
          type="email"
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email addres</label>
        <input
          type="email"
          placeholder="Email addres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm password</label>
        <input
          type="password"
          placeholder="Confirm password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSignIn}>Log in</Button>
        <p className="text">
          <Link to="/register">Sign In !</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
