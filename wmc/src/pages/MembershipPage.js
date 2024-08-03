import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { BsCurrencyExchange } from 'react-icons/bs';

// Styled Components
const Navbar = styled.nav`
  font-family: "Roboto Condensed";
  position: fixed;
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

  div {
    color: yellow;
    margin-left: 5px;
    font-size: 16px;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

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
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background: linear-gradient(145deg, #3E1A3A, #2C142C);
    margin-top: 100px;
`;

const PricingSection = styled.section`
    width: 100%;
    max-width: 800px;
`;

const PricingTitle = styled.h2`
    text-align: center;
    margin-bottom: 20px;
    font-size: 2rem;
    color: #fff;
`;

const PricingTable = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
`;

const PricingCard = styled.div`
    background: #461E46;
    border-radius: 10px;
    padding: 20px;
    width: 300px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    color: #fff;
    position: relative;

    .current-membership {
        position: absolute;
        top: 10px;
        right: 10px;
        background: #F6A2DE;
        color: #000;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 14px;
    }

    button {
        margin-top: 10px;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        color: #fff;
        background: #F6A2DE;
        font-size: 16px;
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
            background: #E53F72;
        }
    }
`;

const Message = styled.p`
    font-size: 1rem;
    color: #d9534f;
    margin-top: 20px;
`;

const VirtualCurrency = styled.p`
    font-size: 1.2rem;
    color: #5bc0de;
    margin-top: 10px;
`;

const MembershipPage = () => {
    const [memberships, setMemberships] = useState([]);
    const [message, setMessage] = useState('');
    const [virtualCurrency, setVirtualCurrency] = useState(null);
    const [currentMembership, setCurrentMembership] = useState('');

    useEffect(() => {
        const fetchMemberships = async () => {
            try {
                const response = await axios.get('/usermembership/get-membership');
                setMemberships(response.data);
            } catch (error) {
                console.error('Error fetching memberships:', error);
            }
        };

        fetchMemberships();
    }, []);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/user/getprofile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setVirtualCurrency(response.data.virtualCurrency);
                setCurrentMembership(response.data.membershipStatus); // assuming membershipStatus is returned here
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const handlePurchase = async (membershipName) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/usermembership/purchase', { membershipName }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage(response.data.message);
            setVirtualCurrency(response.data.virtualCurrency);
            setCurrentMembership(membershipName);
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred');
        }
    };

    const handleCancel = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/usermembership/cancel', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage(response.data.message);
            setVirtualCurrency(prev => prev + 10); // Assuming a refund of 10 virtual currency units
            setCurrentMembership('');
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <PageBackground>
            <Container>
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
                        <NavButton>
                            <FlexContainer>
                                <BsCurrencyExchange className="icon" />
                                <div>{virtualCurrency}</div>
                            </FlexContainer>
                        </NavButton>
                    </NavButtonsContainer>
                </Navbar>

                <PricingSection>
                    <PricingTitle>Choose Your Plan</PricingTitle>
                    <PricingTable>
                        {memberships.map((membership) => (
                            <PricingCard
                                key={membership._id}
                                style={{
                                    color: membership.color,
                                    border: `1px solid ${membership.color}`,
                                    backgroundColor: '#BC79A6'
                                }}
                            >
                                {currentMembership === membership.name && <div className="current-membership">Current Membership</div>}
                                <h3>{membership.name} Plan</h3>
                                <div className="price">${membership.price} / Month</div>
                                <ul className="features">
                                    {membership.benefits.map((benefit, index) => (
                                        <li key={index}>{benefit}</li>
                                    ))}
                                </ul>
                                {currentMembership === membership.name ? (
                                    <button onClick={handleCancel}>Cancel Membership</button>
                                ) :(
                                    <button onClick={() => handlePurchase(membership.name)}>Purchase</button>
                                )}
                            </PricingCard>
                        ))}
                    </PricingTable>
                </PricingSection>

                {message && <Message>{message}</Message>}
                {virtualCurrency !== null && <VirtualCurrency>Your virtual currency: {virtualCurrency}</VirtualCurrency>}
            </Container>
        </PageBackground>
    );
};

export default MembershipPage;
