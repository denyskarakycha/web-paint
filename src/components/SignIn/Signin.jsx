import { useState } from 'react';
import { Link } from 'react-router-dom';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Реализация логики регистрации
  };

  return (
    <div>
      <h1>Регистрация</h1>
      <input
        type="text"
        placeholder="Имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Зарегистрироваться</button>
      <p>Уже есть аккаунт? <Link to="/login">Войдите</Link></p>
    </div>
  );
};

export default Signin;