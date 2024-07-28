import React, { useState, useEffect } from 'react';
import styled,{keyframes} from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BsCurrencyExchange } from 'react-icons/bs';
import gtaLogo from '../images/epsilon.png'; 

const DonationPage = () => {
    const [amount, setAmount] = useState('');
    const [virtualCurrency, setVirtualCurrency] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch initial virtual currency balance when the component mounts
        const fetchVirtualCurrency = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/user/getprofile', {
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

    const handleDonation = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8000/donation/donate', { amount }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage(response.data.message);
            setVirtualCurrency(response.data.virtualCurrency);
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred');
        }
    };

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

            <Container>
                <Title>Make a Donation</Title>
                <Form onSubmit={handleDonation}>
                    <Label>
                        Donation Amount:
                        <Input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            placeholder="Enter amount"
                        />
                    </Label>
                    <Button type="submit">Donate</Button>
                </Form>
                {message && <Message>{message}</Message>}
                {virtualCurrency !== null && (
                    <VirtualCurrency>
                        Remaining Virtual Currency: {virtualCurrency.toLocaleString()}
                    </VirtualCurrency>
                )}
            </Container>
            
  
        </PageBackground>
    );
};

const FooterSection = styled.footer`
   background: #461E46;
  padding: 50px 50px;
  color: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
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

const Navbar = styled.nav`
    font-family: "Roboto Condensed", sans-serif;
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    backdrop-filter: blur(15px);
    background: rgba(0, 0, 0, 0.7);
    z-index: 1000;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
    transition: background 0.3s ease;
`;

const CenteredNavLinks = styled.div`
    display: flex;
    justify-content: center;
    flex: 1;
`;

const NavLink = styled(Link)`
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    margin: 0 15px;
    text-decoration: none;
    transition: color 0.3s ease, transform 0.3s ease;
    font-family: 'Roboto Condensed', sans-serif;

    &:hover {
        color: #F6A2DE;
        transform: scale(1.05);
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
    width: 50px;
    height: 50px;
    border-radius: 50%;
    
    color: #fff;
    font-size: 24px;
    text-decoration: none;
    transition: background 0.3s, color 0.3s, transform 0.3s;
    margin-left: 10px;
    padding: 10px;

    &:hover {
        background: #F6A2DE;
        color: #fff;
        transform: scale(1.1);
    }

    div {
        color: #fff;
        margin-left: 5px;
        font-size: 16px;
    }
`;

const FlexContainer = styled.div`
    display: flex;
    align-items: center;
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

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    background: linear-gradient(145deg, #3E1A3A, #2C142C);
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.7);
    width: 90%;
    max-width: 500px;
    margin: 150px auto 20px;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 36px;
    color: #F6A2DE;
    margin-bottom: 20px;
    font-family: 'Roboto Condensed', sans-serif;
`;

const Form = styled.form`
    width: 100%;
`;

const Label = styled.label`
    display: block;
    color: #fff;
    margin-bottom: 10px;
    font-size: 18px;
`;

const Input = styled.input`
    width: calc(100% - 20px);
    padding: 10px;
    margin-top: 5px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    background: #F6A2DE;
    color: #150917;
    transition: background 0.3s ease;

    &:focus {
        outline: none;
        background: #F6A2DE;
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 15px;
    margin-top: 20px;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    background: #F6A2DE;
    color: #150917;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
        background: #e890c7;
    }

    &:focus {
        outline: none;
    }
`;

const Message = styled.p`
    color: #fff;
    margin-top: 20px;
`;

const VirtualCurrency = styled.div`
    color: #fff;
    margin-top: 20px;
    font-size: 20px;
`;

export default DonationPage;
