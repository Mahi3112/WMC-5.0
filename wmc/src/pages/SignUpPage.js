import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../images/background.jpeg'; // Ensure you have a background image in your project
import axios from 'axios';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(${backgroundImage}) no-repeat center center fixed;
  background-size: cover;
`;

const SignUpBox = styled.div`
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
  margin-bottom: 20px; /* Reduced margin to fit the dropdown */
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
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

  ${Input}:focus ~ &,
  ${Input}:valid ~ & {
    top: -20px;
    left: 0;
    color: #03e9f4;
    font-size: 12px;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px; /* Ensure there's enough space below the dropdown */

  option {
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
  }
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
  border: none;
  background: none;

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

const SignInLink = styled.div`
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

const SignUpPage = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    role: "select role"
  });

  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Include role in the data
    try {
      const url = "/user/signup";
      const { data: res } = await axios.post(url, data);
      navigate("/");
      console.log(res.message);
    } catch (error) {
      // Improved error handling
      if (error.response && error.response.data) {
        console.error('Signup error:', error.response.data);
        alert(`Error signing up: ${error.response.data.error || 'Unknown error'}`);
      } else {
        console.error('Signup error:', error.message);
        alert('Error signing up');
      }
    }
  };

  return (
    <Container>
      <SignUpBox>
        <Title>Sign Up</Title>
        <form onSubmit={handleSubmit}>
          <UserBox>
            <Input type="text" name="username" required value={data.username} onChange={handleChange} />
            <Label>Username</Label>
          </UserBox>
          <UserBox>
            <Input type="email" name="email" required value={data.email} onChange={handleChange} />
            <Label>Email</Label>
          </UserBox>
          <UserBox>
            <Input type="password" name="password" required value={data.password} onChange={handleChange} />
            <Label>Password</Label>
          </UserBox>
          <UserBox>
            <Select name="role" value={data.role} onChange={handleChange} required>
              <option value="select role" disabled>Select Role</option>
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </Select>
            <Label></Label>
          </UserBox>
          <Button type="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Sign Up
          </Button>
        </form>
        <SignInLink>
          Already have an account? <Link to="/">Login</Link>
        </SignInLink>
      </SignUpBox>
    </Container>
  );
};

export default SignUpPage;
