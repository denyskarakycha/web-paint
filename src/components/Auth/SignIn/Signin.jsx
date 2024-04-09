import { useState } from "react";
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";
import Button from "../../Button/Button";
import "./Signin.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../../firebase/config'



const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const signIn = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/gallery');
      setError('');
      setEmail('');
      setPassword('');
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        setError("Invalid credential!");
      } else {
        setError("Server error!");
      }
    }
  }

  return (
    <div className="container">
      <span className="emoji">👋</span>
      <h1>Welcome Back !</h1>
      <p>Let’s draw somethins majestic</p>
      <form id="registrationForm" onSubmit={signIn}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email addres"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
