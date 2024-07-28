import React from 'react';
import { Button, message } from 'antd';
import styled from 'styled-components';
import axios from 'axios';

const Card = styled.div`
  background: linear-gradient(145deg, #3E1A3A, #2C142C);
  color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const Description = styled.p`
  margin-bottom: 10px;
`;

const EventDate = styled.p`
  margin-bottom: 20px;
`;

const Location = styled.p`
  margin-bottom: 20px;
`;

const RegisterButton = styled(Button)`
  background-color: #e91e63;
  border-color: #e91e63;
  color: #fff;
  &:hover {
    background-color: #d81b60;
    border-color: #d81b60;
  }
`;

const EventCard = ({ event }) => {
  const handleRegister = async () => {
    try {
      const token = localStorage.getItem('token'); // or wherever you store your token
      const response = await axios.post(`/registerforevent/register/${event._id}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      message.success('Event registered successfully');
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message === 'You have already registered for this event') {
        message.info('You have already registered for this event');
      } else {
        console.error('Error registering for event:', error);
        message.error('Failed to register for the event');
      }
    }
  };

  return (
    <Card>
      <Title>Event: {event.title}</Title>
      <EventDate>Date: {new Date(event.date).toLocaleDateString()}</EventDate>
      <Description>Description: {event.description}</Description>
      <Location>Location: {event.location}</Location>
      <RegisterButton onClick={handleRegister}>Register</RegisterButton>
    </Card>
  );
};

export default EventCard;
