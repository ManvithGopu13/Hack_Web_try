import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const [name, setName] = useState('');
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
    const payload = { name, email, password };
    // console.log(`${name}, ${email}, ${password}`)

    try {
      const response = await fetch('http://localhost:5000/api/authentication/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        setSuccessMessage('Account created successfully!');
        console.log('Account Created:', data);

        // Navigate to the App screen after a short delay
        setTimeout(() => navigate('/app'), 2000);
      } else {
        // Handle errors (e.g., user already exists, missing fields)
        setErrorMessage(data.message || 'Failed to register user');
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
        <h1>Create Account</h1>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <div>
          <label>Name:</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ padding: '5px', width: '100%', margin: '5px 0' }}
          />
        </div>
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
          Create Account
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
