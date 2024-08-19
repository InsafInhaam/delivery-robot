import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/user/register', { username, password });
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="container register-form">
    <h2 className="heading">Register</h2>
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
      <a className="" href="/login">
        Don't have an sccount 👉
      </a>
      <br /><br />
      <button className="button" type="submit">Register</button>
    </form>
  </div>
  );
};

export default Register;
