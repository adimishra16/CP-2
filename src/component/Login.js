import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedin, setIsLoggedin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/login', { username, password });
      const { success, message, username: loggedInUsername } = response.data;

      if (success) {
        console.log(message);
        setIsLoggedin(true); // Set login state to true
        // Optionally, you might want to store the loggedInUsername in a different state
        navigate('/', { state: { isLoggedin: true, username: loggedInUsername } }); // Pass state to next component
      } else {
        setError(message);
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err.message);
      if (err.response && err.response.data) {
        console.error(err.response.data);
      }
    }
  };

  return (
    <div className='body'>
      <div className="center">
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="txt_field">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <span></span>
            <label>Username</label>
          </div>
          <div className="txt_field">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span></span>
            <label>Password</label>
          </div>
          <div className="pass"></div>
          <input type="submit" value="Login" />
          <div className="signup_link">
            Not a member? <Link to="/signup">Signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
