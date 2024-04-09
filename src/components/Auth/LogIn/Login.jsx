import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../Button/Button";
import "./Login.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase/config";
import { collection, addDoc } from "firebase/firestore"; 


const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [copyPassword, setCopyPassword] = useState("");
  const [error, setError] = useState('');

  const register = async (event) => {
    event.preventDefault()
    if (password !== copyPassword) {
      setError('Password not match!');
      return;
    }
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      await addDoc(collection(db, 'users'), { username, email, images: []});
      setError('');
      setEmail('');
      setPassword('');
      setUsername('');
      setCopyPassword('');
    } catch (error) {
      console.log(error);
      setError('Something get wrong!');
    }

  }

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
      <form id="registrationForm" onSubmit={register}>
        <label htmlFor="username">Your Name</label>
        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email addres</label>
        <input
          type="email"
          placeholder="Email addres"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={copyPassword}
          onChange={(e) => setCopyPassword(e.target.value)}
        />
        <Button>Log in</Button>
        <p className="text">
          <Link to="/register">Sign In !</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
