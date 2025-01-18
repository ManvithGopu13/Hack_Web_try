import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages
    setSuccessMessage(''); // Clear previous success messages

    // Payload to send to the API
    const payload = { email, password };

    try {
      const response = await fetch('http://localhost:5000/api/authentication/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        setSuccessMessage('Login successful!');
        console.log('Login Success:', data);

        // Navigate to the App screen after a short delay
        setTimeout(() => navigate('/app'), 2000);
      } else {
        // Handle errors (e.g., incorrect credentials)
        setErrorMessage(data.message || 'Failed to login');
      }
    } catch (error) {
      // Handle network or server errors
      setErrorMessage('An error occurred while connecting to the server');
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form
        onSubmit={handleSubmit}
        style={{ textAlign: 'center', border: '1px solid #ccc', padding: '20px', borderRadius: '10px' }}
      >
        <h1>Login</h1>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <div>
          <label>Email:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '5px', width: '100%', margin: '5px 0' }}
          />
        </div>
        <div>
          <label>Password:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '5px', width: '100%', margin: '5px 0' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px', marginTop: '10px' }}>
          Login
        </button>
        <br />
        <p style={{ marginTop: '10px' }}>
          Don't have an account? <button onClick={() => navigate('/')}>Sign Up</button>
        </p>
      </form>
    </div>
  );
};

export default Login;
