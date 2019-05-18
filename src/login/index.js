import React from 'react'
import './login.scss';
const Login = () => {
  return (
    <div className="login" >
    <h5>
        Login
    </h5>
      <input type="text" />
      <h5>
          Password
      </h5>
      <input type="password" />
      <button className="submit">Loging</button>
    </div>
  )
}

export default Login
