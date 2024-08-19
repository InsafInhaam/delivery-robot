import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/user/login', { username, password });
      localStorage.setItem('token', response.data.token);
      const userData = { username, token:response.data.token  }; // Mocked user data
      login(userData);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="container login-form">
    <h2 className="heading">Login</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input 
          className="input" 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <input 
          className="input" 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      <a className="" href="/register">
        Already have an sccount 👉
      </a>
      <br /><br />
      <button className="button" type="submit">Login</button>
    </form>
  </div>
  
  );
};

export default Login;
