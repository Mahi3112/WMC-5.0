import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PageBackground = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #150917 0%, #2C142C 100%);
  padding-top: 70px; /* Adjust for fixed navbar */
`;

const Container = styled.div`
  width: 80%;
  max-width: 1200px;
  margin-top: 20px;
  background-color: #1E1E2E;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  padding: 30px;
  color: #fff;
`;

const Title = styled.h2`
  text-align: center;
  color: #F6A2DE;
  margin-bottom: 20px;
  font-size: 2rem;
`;

const InquiryList = styled.ul`
  list-style: none;
  padding: 0;
`;

const InquiryItem = styled.li`
  background: #2C142C;
  border: 1px solid #F6A2DE;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

const InquiryUsername = styled.p`
  font-weight: bold;
  color: #F6A2DE;
`;

const InquiryQuery = styled.p`
  margin: 10px 0 0;
  color: #ddd;
`;

const Navbar = styled.nav`
  font-family: "Roboto Condensed";
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 50px;
  background-color: #1E1E2E;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

const NavBrand = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 5px;
  background: transparent;

  span {
    color: #F6A2DE;
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
  color: #F6A2DE;
  font-size: 20px;
  font-weight: 500;
  margin: 0 15px;
  text-decoration: none;
  transition: color 0.3s ease;
  font-family: 'Roboto Condensed', sans-serif;

  &:hover {
    color: #FFFFFF;
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
  color: #F6A2DE;
  font-size: 24px;
  text-decoration: none;
  transition: background 0.3s, color 0.3s;
  margin-left: 10px;
  padding: 0 10px;

  &:hover {
    background: #F6A2DE;
    color: #000;
  }

  div {
    color: yellow;
    margin-left: 5px;
    font-size: 16px;
  }
`;

const AdminInquiriesPage = () => {
  const [inquiries, setInquiries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get('/inquiry/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setInquiries(response.data);
      } catch (error) {
        setError('Error fetching inquiries');
        console.error(error);
      }
    };

    fetchInquiries();
  }, []);

  return (
    <PageBackground>
      <Navbar>
        <NavBrand>
          <span>Epsilon Program</span>
        </NavBrand>
        <CenteredNavLinks>
          <NavLink to="/admin">Add Events</NavLink>
          <NavLink to="/admininquiry">Inquiries</NavLink>
        </CenteredNavLinks>
        <NavButtonsContainer>
          {/* Add any additional nav buttons here */}
        </NavButtonsContainer>
      </Navbar>
      <Container>
        <Title>All Inquiries</Title>
        {error && <p>{error}</p>}
        <InquiryList>
          {inquiries.map((inquiry) => (
            <InquiryItem key={inquiry._id}>
              <InquiryUsername>{inquiry.username}</InquiryUsername>
              <InquiryQuery>{inquiry.query}</InquiryQuery>
            </InquiryItem>
          ))}
        </InquiryList>
      </Container>
    </PageBackground>
  );
};

export default AdminInquiriesPage;
