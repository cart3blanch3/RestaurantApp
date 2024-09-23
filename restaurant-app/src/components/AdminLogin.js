import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './AdminLogin.module.css'; // Импорт CSS модуля

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5155/api/admin/login', { username, password });
      if (response.data) {
        localStorage.setItem('isAdminAuthenticated', 'true');
        navigate('/admin-panel');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Вход</h2>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Имя пользователя" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" required />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default AdminLogin;
