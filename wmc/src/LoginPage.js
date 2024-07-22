import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from './background.jpeg'; // Ensure you have a background image in your project

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(${backgroundImage}) no-repeat center center fixed;
  background-size: cover;
`;

const LoginBox = styled.div`
  position: relative;
  width: 300px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 30px;
  color: #fff;
`;

const UserBox = styled.div`
  position: relative;
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;

  &:focus ~ label,
  &:valid ~ label {
    top: -20px;
    left: 0;
    color: #03e9f4;
    font-size: 12px;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
`;

const Button = styled.button`
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  margin-top: 40px;
  letter-spacing: 4px;
  transition: 0.5s;
  cursor: pointer;
  background: none;
  border: none;

  &:hover {
    background: #03e9f4;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4, 0 0 100px #03e9f4;
  }

  span {
    position: absolute;
    display: block;
  }

  span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #03e9f4);
    animation: btn-anim1 1s linear infinite;
  }

  span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #03e9f4);
    animation: btn-anim2 1s linear infinite;
    animation-delay: 0.25s;
  }

  span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #03e9f4);
    animation: btn-anim3 1s linear infinite;
    animation-delay: 0.5s;
  }

  span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #03e9f4);
    animation: btn-anim4 1s linear infinite;
    animation-delay: 0.75s;
  }

  @keyframes btn-anim1 {
    0% {
      left: -100%;
    }
    50%,
    100% {
      left: 100%;
    }
  }

  @keyframes btn-anim2 {
    0% {
      top: -100%;
    }
    50%,
    100% {
      top: 100%;
    }
  }

  @keyframes btn-anim3 {
    0% {
      right: -100%;
    }
    50%,
    100% {
      right: 100%;
    }
  }

  @keyframes btn-anim4 {
    0% {
      bottom: -100%;
    }
    50%,
    100% {
      bottom: 100%;
    }
  }
`;

const SignUpLink = styled.div`
  margin-top: 20px;
  color: #03e9f4;
  font-size: 14px;

  a {
    color: #03e9f4;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your authentication logic here
    // For demonstration, we'll assume login is always successful
    if (username && password) {
      // If authentication is successful, navigate to the homepage
      navigate('/homepage');
    } else {
      // Handle login failure (e.g., show an error message)
      alert('Please enter a valid username and password.');
    }
  };

  return (
    <Container>
      <LoginBox>
        <Title>Login</Title>
        <form onSubmit={handleSubmit}>
          <UserBox>
            <Input 
              type="text" 
              name="username" 
              required 
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
            />
            <Label>Username</Label>
          </UserBox>
          <UserBox>
            <Input 
              type="password" 
              name="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Label>Password</Label>
          </UserBox>
          <Button type="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Login
          </Button>
        </form>
        <SignUpLink>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </SignUpLink>
      </LoginBox>
    </Container>
  );
};

export default LoginPage;