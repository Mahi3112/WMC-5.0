import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  background-color: #150917;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
`;

const ProfileHeader = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
`;

const ProfileDetail = styled.div`
  margin-bottom: 10px;
`;

const ProfilePage = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (userId) {
        try {
          const response = await axios.get(`/user/getprofile/${userId}`);
          setUser(response.data);
        } catch (err) {
          setError('Error fetching user profile');
        } finally {
          setLoading(false);
        }
      } else {
        setError('User ID is missing');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <ProfileContainer>
      <ProfileHeader>{user.name}'s Profile</ProfileHeader>
      <ProfileDetail><strong>Email:</strong> {user.email}</ProfileDetail>
      <ProfileDetail><strong>Virtual Currency:</strong> {user.virtualCurrency}</ProfileDetail>
      {/* Add more user details as needed */}
    </ProfileContainer>
  );
};

export default ProfilePage;
