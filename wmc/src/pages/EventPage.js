import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import EventCard from './EventCard';
import { createGlobalStyle } from 'styled-components';
import { AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BsCurrencyExchange } from 'react-icons/bs';
import gtaLogo from '../images/epsilon.png'; 

import { keyframes } from 'styled-components';
import { FaRegCommentDots } from 'react-icons/fa';
import { FaQuoteLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';



const EventGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 36px;
  margin-bottom: 10px;
`;

const Navbar = styled.nav`
font-family: "Roboto Condensed";
  position:fixed;
  top: 0;
  width: 94%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;
  backdrop-filter: blur(10px);
  background: linear-gradient(135deg, #150917 0%, #2C142C 100%);
  z-index: 1000;
`;



const NavBrand = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 15px;
    border-radius: 5px;
    background: transparent;

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

// Style for NavLink elements
const NavLink = styled(Link)`
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  margin: 0 15px;
  text-decoration: none;
  transition: color 0.3s ease;
  font-family: 'Roboto Condensed', sans-serif;

  &:hover {
    color: #F6A2DE;
  }
`;

// Container for navigation icons, aligned to the right
const NavButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto; /* Pushes the container to the right */
`;

// Style for navigation icons
const NavButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px; /* Adjust width as needed */
  height: 40px;
  border-radius: 20px; /* Makes the button pill-shaped */
  background: transparent;
  color: #fff;
  font-size: 24px;
  text-decoration: none;
  transition: background 0.3s, color 0.3s;
  margin-left: 10px; /* Space between icons */
  padding: 0 10px; /* Space inside the button */
  
  &:hover {
    background: #f0f0f0; /* Background color on hover */
    color: #000; /* Icon color on hover */
  }

  div {
    color: yellow; /* Color of the text */
    margin-left: 5px; /* Space between icon and text */
    font-size: 16px; /* Adjust text size as needed */
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;
// Footer Section
const FooterSection = styled.footer`
   background: #461E46;
  padding: 50px 50px;
  color: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
`;

const FooterLogo = styled.img`
  height: 100px;
  margin-bottom: 20px;
`;

const FooterNav = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const FooterNavLink = styled(Link)`
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  margin: 0 15px;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #03e9f4;
  }
`;

const FooterSocial = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  a {
    color: #fff;
    font-size: 24px;
    margin: 0 10px;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #03e9f4;
    }
  }
`;

const FooterCopy = styled.p`
  color: #ccc;
  font-size: 14px;
`;
const PageBackground = styled.div`
    min-height: 100vh;
    margin-top:69px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(135deg, #150917 0%, #2C142C 100%);
    background-size: cover;
    background-attachment: fixed;

`;
const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [virtualCurrency, setVirtualCurrency] = useState(0);
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser ? storedUser.id : null;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/user/getprofile/${userId}`);
        setVirtualCurrency(response.data.virtualCurrency);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await axios.get('/events/getevent');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
    fetchEvents();
  }, [userId]);

  return (
    <PageBackground>
   
      <Navbar>
    <NavBrand>
      {/* <img src={logo} alt="Epsilon Program Logo" /> */}
      <span style={{border:'#fff'}}>Epsilon Program</span>
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
      {/* <NavButton onClick={handleLogout}><AiOutlineLogout /></NavButton> */}
      <NavButton to="/profile"><CgProfile /></NavButton>
      <NavButton>
      <FlexContainer>
        <BsCurrencyExchange className="icon" />
        <div>{virtualCurrency.toLocaleString()}</div> {/* Format if needed */}
      </FlexContainer>
      </NavButton>
    </NavButtonsContainer>
  </Navbar>

      {/* <Title>Upcoming Events</Title> */}
      <EventGrid>
        {events.map(event => (
          <EventCard
            key={event._id}
            event={event}
          />
        ))}
      </EventGrid>

    
    </PageBackground>
  );
};

export default EventPage;
