import React,{ useState, useEffect }  from 'react';
import styled from 'styled-components';
import gtaLogo from '../images/epsilon.png'; 
import backgroundImage from '../images/firstbackground.png'; 
import backgroundImage2 from '../images/midbackground.png';
import backgroundImage3 from '../images/background7.avif';
import { useHistory } from 'react-router-dom';


import member1 from '../images/logo2.webp'; 
import member2 from '../images/logo2.webp'; 
import member3 from '../images/logo2.webp'; 
import member4 from '../images/logo2.webp'; 
import member5 from '../images/logo2.webp'; 
import member6 from '../images/logo2.webp'; 
import event1 from '../images/logo2.webp'; 
import event2 from '../images/logo2.webp'; 
import event3 from '../images/logo2.webp';
import { Link } from 'react-router-dom';

import { createGlobalStyle } from 'styled-components';
import { AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BsCurrencyExchange } from 'react-icons/bs';
import { FaQuoteLeft } from "react-icons/fa";
import axios from 'axios';
import { keyframes } from 'styled-components';
import { FaRegCommentDots } from 'react-icons/fa';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto Condensed', sans-serif;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background:linear-gradient(135deg, #2C142C, #6A2C6A);
`;



const BackgroundSection = styled.div`
  width: 100%; 
  height: 800px;
  background: #150917;
  background-size: 80% auto; 
  background-position: center; 
  background-repeat: no-repeat; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 0px;
  
`;

const ContentSection = styled.div`
  padding: 80px 50px;
  background: #150917;
  font-family: 'Roboto Condensed'
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: 'Roboto Condensed'
  
`;

const Title = styled.h1`
  color: #fff;
  font-size: 48px;
  margin-bottom: 20px;
  font-family: 'Roboto Condensed'
`;

const Subtitle = styled.h2`
  color: #ccc;
  font-family: 'Roboto Condensed'
  font-size: 20px;
  margin-bottom: 40px;
  font-weight:250;
   @media (max-width: 768px) {
    font-size: 18px; /* Adjust font size for smaller screens */
    margin-bottom: 30px; /* Adjust margin for smaller screens */
  }
`;

const Highlighted = styled.span`
  color: #F7A2DD; /* Color for "Epsilon Program" */
  font-family: 'Roboto Condensed'
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 15px 30px;
  color: #F6A2DE;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  letter-spacing: 4px;
  transition: 0.5s;
  border: 2px solid #F6A2DE;
  border-radius: 5px;

  &:hover {
    background: #F6A2DE;
    color: #fff;
    box-shadow: 0 0 5px #F6A2DE, 0 0 25px #F6A2DE, 0 0 50px #F6A2DE, 0 0 100px #F6A2DE;
  }
`;

const InfoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 5px;
  background: linear-gradient(100deg, #150917, #4A204A);
  height:500px;
  font-family: 'Roboto Condensed'
`;

const InfoText = styled.div`
  max-width: 500px;
  margin-right: 300px;
  text-align: left;
  font-family: "Roboto Condensed";
  h1 {
    font-size: 48px;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    margin-bottom: 30px;
  }
`;

const GameLogo = styled.img`
  height: 350px;
  border: 5px ;  /* Thick border for a framed effect */
  border-radius: 20px;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.6); /* Inner shadow for a framed look */
  transition: transform 0.3s ease-in-out; /* Smooth transition for the transform property */

  &:hover {
    transform:  translateY(-50px)  /* Moves the logo up, to the right, and adds depth on hover */
  }

`;




const MemberSection = styled.div`
  background: #150917;
  padding: 8px 0;
  padding-bottom:50px;
  color: #fff;
  text-align: center;
  font-family: 'Roboto Condensed'
`;

// const MembersTitle = styled.h2`
//   font-size: 40px;
//   margin-bottom: 15px;
  
// `;

// const MembersGrid = styled.div`
//   display: flex;
//   justify-content: center;
//   flex-wrap: wrap;
// `;



// const MemberCard = styled.div`
//   background: #2C142C;
//   border: 2px solid #F6A2DE;
//   border-radius:10px 50px 10px 50px;
//   margin: 30px;
//   padding: 30px;
//   width: 250px;
//   text-align: center;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//   transition: transform 0.2s;
//   position: relative;
  
 

//   &:hover {
//     transform: scale(1.05);
//   }

//   img {
//     border-radius: 0 30px 0 30px; /* Matches the card shape */
//     height: 200px;
//     width: 100%;
//     object-fit: cover;
//     margin-bottom: 15px;
//   }

//   h3 {
//     font-size: 20px;
//     margin-bottom: 10px;
//   }

//   p {
//     font-size: 14px;
//     color: #ccc;
//     margin-bottom: 15px;
//   }

//   button {
//     background: #F6A2DE;
//     border: none;
//     padding: 10px 20px;
//     color: #fff;
//     font-size: 14px;
//     border-radius: 5px; /* Rounded button */
//     cursor: pointer;
//     transition: background 0.3s ease;

//     &:hover {
//       background: #02a7d0;
//     }
//   }
// `;


const MemberCard = styled.div`
  background: #301531;
  padding: 20px;
  margin: 10px;
  position: relative;
  width: 300px;
  height: 200px;
  border: 2px solid #4EC598; /* Border color for the message box */
  border-radius: 10px;
  clip-path: polygon(10% 0, 100% 0, 100% 80%, 85% 100%, 0 100%, 0 20%);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;

  .icon-container {
    position: absolute;
    top: -20px;
    left: 20px;
    font-size: 30px;
    color: #4EC598;
    padding-top:50px;
  }

  h3 {
    font-size: 20px;
    margin: 60px 0 10px;
  }

  p {
    font-size: 14px;
    margin-bottom: 20px;
  }

  .read-more-btn {
    background: #4EC598;
    border: none;
    padding: 10px 20px;
    color: #fff;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .highlighted {
    border: 2px solid #4EC598;
  }

  .read-more-btn:hover {
    background: #3a9d78;
  }
`;

const MembersTitle = styled.h2`
  text-align: center;
  margin-bottom: 30px;
`;

const MembersGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const EventsSection = styled.div`
  background: #150917;
  padding: 50px 0;
  color: #fff;
  text-align: center;
  font-family: 'Roboto Condensed'
`;

const EventsTitle = styled.h2`
  font-size: 36px;
  margin-bottom: 30px;
`;

const EventsGrid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const EventCard = styled.div`
  background: #2C142C;
  border-radius: 10px;
  border-radius:10px 50px 10px 50px;
  margin: 30px;
  padding: 30px;
  width: 250px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  img {
    border-radius: 10px;
    height: 200px;
    width: 100%;
    object-fit: cover;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    color: #ccc;
    margin-bottom: 15px;
  }

  button {
    background: #F6A2DE;
    border: none;
    padding: 10px 20px;
    color: #fff;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: #02a7d0;
    }
  }
`;

const PricingSection = styled.div`
  background: #150917;
  padding: 50px 0;
  color: #fff;
  text-align: center;
  margin: 0;
  margin-bottom: 0px;
  font-family: 'Roboto Condensed'
`;

const PricingTitle = styled.h2`
  font-size: 36px;
  margin-bottom: 30px;
`;

const PricingTable = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;


const PricingCard = styled.div`
  position: relative;
  background: #150917;
  margin: 15px;
  padding: 30px;
  width: 300px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
  
  border: 1px solid #BC79A6; /* Border color */
  border-radius: 10px 50px 10px 80px; /* Rounded corners */
  
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    right: -1px;
    width: 100px;
    height: 100px;
    background: #150917;
    clip-path: polygon( 0, 100% 0, 100% 100%);
  }

  &:hover {
    transform: scale(1.05);
  }

  .price {
    font-size: 36px;
    margin: 20px 0;
    color: #BC79A6; /* Color for price */
  }

  .features {
    text-align: left;
    margin: 20px 0;
    color: #BC79A6; /* Color for list items */
  }

  .features li {
    margin-bottom: 10px;
  }

  button {
    background: #BC79A6; /* Button background color */
    border: none;
    padding: 10px 20px;
    color: #000; /* Text color for button */
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: #a8598b; /* Adjust hover color if needed */
    }
  }
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
const KnowMoreButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background: #F6A2DE;
  color: #fff;
  font-size: 14px;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 20px;
  transition: background 0.3s ease;

  &:hover {
    background: #02a7d0;
  }
`;

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [virtualCurrency, setVirtualCurrency] = useState(0); // State to hold virtual currency
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser ? storedUser.id : null;

  useEffect(() => {
    // Fetch events from the API
    axios.get('/events/getevent')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);
  useEffect(() => {
    // Fetch user profile data when component mounts
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/user/getprofile/${userId}`); // Make sure this endpoint returns the user's profile with virtual currency
        setVirtualCurrency(response.data.virtualCurrency); // Update state with virtual currency
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  // const handleLogout = async () => {
  //   // Confirm logout action
  //   const confirmed = window.confirm("Are you sure you want to log out?");
    
  //   if (confirmed) {
  //     try {
  //       await axios.post('/user/logout'); // Adjust the URL as needed
  //       localStorage.removeItem('token'); // Remove token from localStorage
  //       alert('Logout successful'); // Show success message
  //       // Redirect to login or home page
  //       window.location.href = '/';
  //     } catch (error) {
  //       console.error('Error logging out:', error);
  //       alert('Logout failed'); // Show error message if needed
  //     }
  //   }
  // };

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
  
    if (confirmed) {
      try {
        localStorage.removeItem('user'); // Remove token from localStorage
        alert('Logout successful'); // Show success message
        window.location.href = '/'; // Redirect to home page
      } catch (error) {
        console.error('Error logging out:', error);
        alert('Logout failed: ' + (error.response?.data?.message || error.message)); // Show error message if needed
      }
    }
  };

  const displayedEvents = events.slice(0, 3);
  return (
   
    <Container>
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
      <NavButton onClick={handleLogout}><AiOutlineLogout /></NavButton>
      <NavButton to="/profile"><CgProfile /></NavButton>
      <NavButton>
      <FlexContainer>
        <BsCurrencyExchange className="icon" />
        <div>{virtualCurrency.toLocaleString()}</div> {/* Format if needed */}
      </FlexContainer>
      </NavButton>
    </NavButtonsContainer>
  </Navbar>

      
      <BackgroundSection style={{ backgroundImage: `url(${backgroundImage})` }}>
        <Content>
         
        </Content>
      </BackgroundSection>

      <ContentSection>
        <InfoSection>
          <InfoText>
          <Title>Welcome to <div><Highlighted>Epsilon Program</Highlighted></div> </Title>
          <Subtitle style={{fontSize:'20px'}}>Experience the full spectrum of the Epsilon Program by registering for exclusive events, making donations to support our cause, and selecting from a variety of membership tiers. Each tier offers unique benefits and privileges, ensuring a tailored and rewarding journey as you delve deeper into your path of enlightenment. </Subtitle>
          <Button to="/membership">Join Us Now</Button>
          </InfoText>
          <GameLogo src={gtaLogo} alt="GTA V Logo" />
        </InfoSection>
      </ContentSection>
      

<EventsSection>
        <EventsTitle>Upcoming Events</EventsTitle>
        <EventsGrid>
          {displayedEvents.map(event => (
            <EventCard key={event.id} style={{border:'2px solid #BC79A6'}}>
              
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <KnowMoreButton to='/events'>Know More</KnowMoreButton>
            </EventCard>
          ))}
        </EventsGrid>
      </EventsSection>
      <BackgroundSection style={{ backgroundImage: `url(${backgroundImage2})`,width:'100%',height:'750px' }}>
        
      </BackgroundSection>
      <MemberSection>
      <MembersTitle>Member Stories</MembersTitle>
      <MembersGrid>
        <MemberCard style={{border:'2px solid #BC79A6'}}>
          <div className="icon-container">
            <FaQuoteLeft style={{color:'#BC79A6'}}/>
          </div>
          <h3>John Doe</h3>
          <p>"Joining the Epsilon Program has changed my life."</p>
          <KnowMoreButton to='/stories' style={{
        background: '#BC79A6',
        border: 'none',
        padding: '10px 20px',
        color: 'black',
        fontSize: '14px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s ease'
      }}> Read More</KnowMoreButton>
        </MemberCard>

        <MemberCard className="highlighted">
          <div className="icon-container">
            <FaQuoteLeft />
          </div>
          <h3>Jane Smith</h3>
          <p>"A transformative experience like no other."</p>
          <KnowMoreButton to='/stories' style={{
        background: '#4EC598',
        border: 'none',
        padding: '10px 20px',
        color: 'black',
        fontSize: '14px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s ease'
      }}>Read More</KnowMoreButton>
        </MemberCard>

        <MemberCard className="highlighted" style={{border:'2px solid #FFC874'}}>
          <div className="icon-container">
            <FaQuoteLeft style={{color:'#FFC874'}} />
          </div>
          <h3>Emily Johnson</h3>
          <p>"I've found my true calling with the Epsilon Program."</p>
          <KnowMoreButton to='/stories' style={{
        background: '#FFC874',
        border: 'none',
        padding: '10px 20px',
        color: 'black',
        fontSize: '14px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s ease'
      }}>Read More</KnowMoreButton>
        </MemberCard>
      </MembersGrid>
    </MemberSection>
      <PricingSection>
        <PricingTitle>Choose Your Plan</PricingTitle>
        <PricingTable>
          <PricingCard style={{ color: '#BC79A6', border:'1px solid #BC79A6'}}>
            <h3>Basic Plan</h3>
            <div className="price">$1000 / Month</div>
            <ul className="features">
              <li>Access to Basic Content</li>
              <li>Community Support</li>
              <li>Cashback upto 30</li>
            </ul>
            <KnowMoreButton to='/membership'  style={{
        background: '#BC79A6',
        border: 'none',
        padding: '10px 20px',
        color: 'black',
        fontSize: '14px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s ease'
      }}>Get Started</KnowMoreButton>
          </PricingCard>
          <PricingCard style={{ color: '#63A7A3' , border:'1px solid #63A7A3'}}>
            <h3>Standard Plan</h3>
            <div className="price">$5000 / Month</div>
            <ul className="features">
             
              <li>Exclusive Content</li>
              <li>Discounts on Merchandise</li>
              <li>Cashback upto 250</li>
            </ul>
            <KnowMoreButton to='/membership' style={{
        background: '#63A7A3',
        border: 'none',
        padding: '10px 20px',
        color: 'black',
        fontSize: '14px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s ease'
      }}>Get Started</KnowMoreButton>
          </PricingCard>
          <PricingCard  style={{ color: '#C0955F', border:'1px solid #C0955F'  }}>
            <h3>Premium Plan</h3>
            <div className="price">$10000 / Month</div>
            <ul className="features">
             
              <li>VIP Access to Events</li>
              <li>Personalized Support</li>
              <li>Cashback upto 700</li>
            </ul>
            <KnowMoreButton to='/membership' style={{
        background: '#C0955F',
        border: 'none',
        padding: '10px 20px',
        color: 'black',
        fontSize: '14px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s ease'
      }}>Get Started</KnowMoreButton>
          </PricingCard>
        </PricingTable>
      </PricingSection>
      <FooterSection>
        <FooterLogo src={gtaLogo} alt="GTA Logo" />
        <FooterNav>
          {/* <FooterNavLink to="/about">About</FooterNavLink> */}
          <FooterNavLink to="/events">Events</FooterNavLink>
          <FooterNavLink to="/Members">Members</FooterNavLink>
          <FooterNavLink to="/donate">Donate Us</FooterNavLink>
          {/* <FooterNavLink to="/support">Support</FooterNavLink> */}
          <FooterNavLink to="/">Log Out</FooterNavLink>
        </FooterNav>
        <FooterSocial>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube"></i>
          </a>
        </FooterSocial>
        <FooterCopy>&copy; 2024 Gamers' Hub. All rights reserved.</FooterCopy>
      </FooterSection>
    </Container>
    
  );

};


export default HomePage;
