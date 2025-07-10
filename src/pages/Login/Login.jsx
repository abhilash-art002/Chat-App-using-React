import React, { useState } from 'react';
import './Login.css';
import assets from '../../assets/assets';
import axios from 'axios';

const Login = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = currState === "Sign up"
      ? { username, email, password }
      : { email, password };

    const endpoint = currState === "Sign up"
      ? 'http://localhost:5000/api/auth/signup'
      : 'http://localhost:5000/api/auth/login';

    try {
      const res = await axios.post(endpoint, payload);
      alert(res.data.message);

      if (currState === "Login") {
        
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.location.href = "/chat";
      }

    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login">
      <img src={assets.logo_big} alt="" className="logo" />
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{currState}</h2>

        {currState === "Sign up" &&
          <input
            type="text"
            placeholder='Username'
            className="form-input"
            required
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        }

        <input
          type="email"
          placeholder='Email Address'
          className="form-input"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder='Password'
          className="form-input"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type='submit'>{currState === "Sign up" ? "Create Account" : "Login Now"}</button>

        <div className="login-term">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className="login-forgot">
          {currState === "Sign up"
            ? <p className="login-toggle">Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
            : <p className="login-toggle">Create an account <span onClick={() => setCurrState("Sign up")}>Click here</span></p>
          }
        </div>
      </form>
    </div>
  );
};

export default Login;
