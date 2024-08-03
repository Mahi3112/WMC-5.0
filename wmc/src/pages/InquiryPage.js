// src/pages/InquiryPage.js
import React, { useState } from 'react';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';
import { AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #150917;
    color: #fff;
    font-family: 'Roboto Condensed', sans-serif;
  }
`;

const InquiryPageContainer = styled.div`
  max-width: 800px;
  margin: 100px auto;
  padding: 20px;
  background-color: #301531;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Textarea = styled.textarea`
  margin-bottom: 15px;
  padding: 15px;
  font-size: 18px;
  border-radius: 10px;
  border: none;
  background-color: #fff;
  color: #000;
`;

const Button = styled.button`
  padding: 15px;
  font-size: 18px;
  color: #fff;
  background-color: #F6A2DE;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #FF69B4;
  }
`;

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;
  backdrop-filter: blur(10px);
  z-index: 1000;
  background-color: rgba(21, 9, 23, 0.8);
`;

const NavBrand = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    margin-left: 10px;
  }
`;

const CenteredNavLinks = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
`;

const NavLink = styled(Link)`
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  margin: 0 15px;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #F6A2DE;
  }
`;

const NavButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const NavButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 40px;
  border-radius: 20px;
  background: transparent;
  color: #fff;
  font-size: 24px;
  text-decoration: none;
  transition: background 0.3s, color 0.3s;
  margin-left: 10px;
  padding: 0 10px;

  &:hover {
    background: #f0f0f0;
    color: #000;
  }
`;

const InquiryPage = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Adjust according to your auth setup
      const response = await axios.post(
        '/inquiry/',
        { query },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Inquiry submitted successfully!');
      setQuery('');
    } catch (error) {
      setError('Failed to submit inquiry');
    }
  };

  return (
    <>
      <GlobalStyle />
      <Navbar>
        <NavBrand>
          <span>Epsilon Program</span>
        </NavBrand>
        <CenteredNavLinks>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/stories">Member Stories</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/donate">Donation</NavLink>
          <NavLink to="/membership">Membership</NavLink>
          <NavLink to="/ask">Inquiry Form</NavLink>
        </CenteredNavLinks>
        <NavButtonsContainer>
          <NavButton to="/profile"><CgProfile /></NavButton>
        </NavButtonsContainer>
      </Navbar>

      <InquiryPageContainer>
        <h1>Submit an Inquiry</h1>
        <Form onSubmit={handleSubmit}>
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your inquiry here"
            required
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Button type="submit">Submit Inquiry</Button>
        </Form>
      </InquiryPageContainer>
    </>
  );
};

export default InquiryPage;
