// src/components/Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signinReducer } from '../../redux/todoSlice';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const history = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  debugger;
  const handleLogin = () => {
    const user = dispatch(signinReducer({ email, password }));
    history('/add');
    console.log(user);
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
