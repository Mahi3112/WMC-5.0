import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaQuoteLeft } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import gtaLogo from '../images/epsilon.png'; 
import { AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BsCurrencyExchange } from 'react-icons/bs';

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
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #150917;
  padding: 10px 0;
  margin-top: 60px;
  background: linear-gradient(135deg, #150917 0%, #2C142C 100%);
`;

const EventGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px; /* space between cards */
`;

const StoryItem = styled.div`
  flex: 1 1 calc(50% - 20px);
  margin-bottom: 20px;
  padding: 20px;
  border: none;
  border-radius: 20px;
  background: linear-gradient(145deg, #301531, #1d0e2e);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.6);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
  }
`;

const StoryTitle = styled.h2`
  font-size: 1.8em;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  color: #BC79A6;

  svg {
    margin-right: 10px;
    font-size: 1.8em;
  }
`;

const StoryText = styled.p`
  font-size: 1.2em;
  line-height: 1.6;
`;

const StoryAuthor = styled.div`
  margin-top: 15px;
  font-size: 1.1em;
  color: #f5f5f5;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
    font-size: 1.4em;
  }
`;

const AddButton = styled.button`
  background-color: #BC79A6;
  color: #150917;
  border: none;
  border-radius: 50%;
  padding: 15px;
  font-size: 1.5em;
  position: fixed;
  bottom: 30px;
  right: 30px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);

  &:hover {
    background-color: #02b2c2;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #150917;
  color: #fff;
  padding: 20px;
  border-radius: 12px;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: ${props => (props.show ? 'block' : 'none')};
`;

const ModalHeader = styled.h2`
  font-size: 1.8em;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #fff;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
`;

const TextArea = styled.textarea`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #fff;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  
`;

const ModalButton = styled.button`
  background-color: #BC79A6;
  color: #150917;
  border: none;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  font-size: 1em;
  margin-right: 10px;

  &:hover {
    background-color: #02b2c2;
  }
`;
const StoryHeader = styled.h1`
  font-size: 3em;
  margin-bottom: 30px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  position: relative;
  color: #03e9f4;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -10px;
    transform: translateX(-50%);
    width: 80px;
    height: 5px;
    background: #03e9f4;
    border-radius: 2px;
  }
    `;
const PageBackground = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(135deg, #150917 0%, #2C142C 100%);
    background-size: cover;
    background-attachment: fixed;

`;


const StoryPage = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newStory, setNewStory] = useState({ name: '', story: '' });
  const [virtualCurrency, setVirtualCurrency] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch initial virtual currency balance when the component mounts
    const fetchVirtualCurrency = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/user/getprofile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setVirtualCurrency(response.data.virtualCurrency);
        } catch (error) {
            setMessage('Error fetching virtual currency balance');
        }
    };
    fetchVirtualCurrency();
}, []);


  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get('/feedback/stories');
        setStories(response.data);
      } catch (err) {
        setError('Error fetching stories');
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const handleAddStory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/feedback/stories', newStory);
      setStories([...stories, response.data]);
      setNewStory({ name: '', story: '' });
      setModalVisible(false);
    } catch (err) {
      setError('Error adding story');
    }
  };

  const handleChange = (e) => {
    setNewStory({ ...newStory, [e.target.name]: e.target.value });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!stories.length) return <div>No stories available</div>;

  return (
    <>
    <PageBackground>
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
      {/* <NavButton onClick={handleLogout}><AiOutlineLogout /></NavButton> */}
      <NavButton to="/profile"><CgProfile /></NavButton>
      <NavButton>
      <FlexContainer>
        <BsCurrencyExchange className="icon" />
        <div>{virtualCurrency}</div> {/* Format if needed */}
      </FlexContainer>
      </NavButton>
    </NavButtonsContainer>
  </Navbar>

        <StoryHeader style={{color:'#fff'}}>Member Stories</StoryHeader>
        <EventGrid>
          {stories.map((story) => (
            <StoryItem key={story._id}>
              <StoryTitle>
                <FaQuoteLeft />
                {story.name}
              </StoryTitle>
              <StoryText style={{color:'#fff'}}>{story.story}</StoryText>
              <StoryAuthor>
                {story.author}
              </StoryAuthor>
            </StoryItem>
          ))}
        </EventGrid>

      </Container>
      </PageBackground>

      <AddButton onClick={() => setModalVisible(true)}>
        <FiPlus />
      </AddButton>

      <Modal show={modalVisible}>
        <ModalHeader>Add Your Story</ModalHeader>
        <Form onSubmit={handleAddStory}>
          <Input
            type="text"
            name="name"
            value={newStory.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
          <TextArea
            name="story"
            value={newStory.story}
            onChange={handleChange}
            placeholder="Your Story"
            rows="5"
            required
          />
          <ModalButton type="submit">Submit</ModalButton>
          <ModalButton type="button" onClick={() => setModalVisible(false)}>
            Cancel
          </ModalButton>
        </Form>
      </Modal>
    </>
  );
};

export default StoryPage;
