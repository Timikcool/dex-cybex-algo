import React, { useState } from 'react';
import './login.scss';
const Login = ({ authCallback }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="login-container">
      <form
        className="login"
        onSubmit={ev => {
          ev.preventDefault();
          authCallback(username, password);
        }}
      >
        <h5>Please log in</h5>
        <input
          type="text"
          placeholder="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <button
          className="submit"
          type="submit"
          disabled={!(username && password)}
        >
          Loging
        </button>
      </form>
    </div>
  );
};

export default Login;
