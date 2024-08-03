import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BsCurrencyExchange } from 'react-icons/bs';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProfileContainer = styled.div`
  background: linear-gradient(135deg, #2C142C, #6A2C6A);
  padding: 20px;
  border-radius: 8px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 50px;
  width: 100%;
  background: linear-gradient(145deg, #301531, #1d0e2e);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Avatar = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 70%;
  margin-right: 50px;
`;

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Name = styled.h1`
  font-size: 2em;
  margin: 0;
  color: #FFFFFF;
`;

const Role = styled.h2`
  font-size: 1.2em;
  margin: 5px 0;
  color: #666;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2em;
  color: #007bff;
`;

const ProfileDetails = styled.div`
  background: linear-gradient(145deg, #301531, #1d0e2e);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-top: 20px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Label = styled.span`
  font-weight: bold;
  color: #FFFFFF;
`;

const Value = styled.span`
  color: #FFFFFF;
`;

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

const DonationDetails = styled.div`
  background: #301531;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  margin-top: 20px;
`;

const DateGroup = styled.div`
  margin-bottom: 15px;
`;

const DateLabel = styled.h3`
  color: #FFFFFF;
  margin-bottom: 10px;
`;

const DonationItem = styled.div`
  color: #FFFFFF;
  margin-bottom: 5px;
`;
const UploadButton = styled.label`
  background: #f6a2de;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  display: inline-block;
  margin-top: 20px;
  transition: background 0.3s ease;

  &:hover {
    background: #e891b5;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;


// const ProfilePage = ({ userId }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [donationsByDate, setDonationsByDate] = useState([]);
//   const [newAvatar, setNewAvatar] = useState(null);
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(`/user/getprofile/${userId}`);
//         setUser(response.data);
//       } catch (error) {
//         setError('Error fetching user profile');
//         console.error('Error fetching user profile:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

    

//     fetchUser();
//   }, [userId]);
//   const handleFileChange = (event) => {
//     setNewAvatar(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!newAvatar) return;

//     const formData = new FormData();
//     formData.append('avatar', newAvatar);

//     try {
//       await axios.put(`/user/update-avatar/${userId}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       // Re-fetch user data to update the avatar
//       const response = await axios.get(`/user/getprofile/${userId}`);
//       setUser(response.data);
//       setNewAvatar(null); // Clear the selected file
//     } catch (error) {
//       console.error('Error uploading profile image:', error);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <ProfileContainer>
//       <Navbar>
//         <NavBrand>
//           <span>Epsilon Program</span>
//         </NavBrand>
//         <CenteredNavLinks>
//           <NavLink to="/home">Home</NavLink>
//           <NavLink to="/stories">Member Stories</NavLink>
//           <NavLink to="/events">Events</NavLink>
//           <NavLink to="/donate">Donation</NavLink>
//           <NavLink to="/membership">Membership</NavLink>
//         </CenteredNavLinks>
//         <NavButtonsContainer>
//           <NavButton to="/profile"><CgProfile /></NavButton>
//           <NavButton>
//             <FlexContainer>
//               <BsCurrencyExchange className="icon" />
//               <div>{user.virtualCurrency.toLocaleString()}</div>
//             </FlexContainer>
//           </NavButton>
//           <NavButton to="/logout"><AiOutlineLogout /></NavButton>
//         </NavButtonsContainer>
//       </Navbar>
//       <ProfileHeader>
//         <Avatar src={user.avatar} alt={`${user.username}'s avatar`} />
//         <HeaderInfo>
//           <Name>{user.username}</Name>
//           <Role>{user.role}</Role>
//         </HeaderInfo>
//       </ProfileHeader>
//       <ProfileDetails>
//       <UploadButton>
//           <HiddenFileInput type="file" accept="image/*" onChange={handleFileChange} />
//           Upload New Profile Image
//         </UploadButton>
//         {newAvatar && <button onClick={handleUpload}>Upload</button>}
//         <DetailRow>
//           <Label>Email:</Label>
//           <Value>{user.email}</Value>
//         </DetailRow>
//         <DetailRow>
//           <Label>Membership Status:</Label>
//           <Value>{user.membershipStatus}</Value>
//         </DetailRow>
//         <DetailRow>
//           <Label>Registered Events:</Label>
//           <Value>
//             {user.registeredEvents && user.registeredEvents.length > 0 ? (
//               <ul>
//                 {user.registeredEvents.map(event => (
//                   <li key={event._id}>{event.title}</li>
//                 ))}
//               </ul>
//             ) : (
//               "No events registered"
//             )}
//           </Value>
//         </DetailRow>
//         <DetailRow>
//           <Label>Virtual Currency:</Label>
//           <Value>{user.virtualCurrency}</Value>
//         </DetailRow>
//         <DetailRow>
//           <Label>Total Donations:</Label>
//           <Value>{user.totalDonations}</Value>
//         </DetailRow>
        
//       </ProfileDetails>
     
//     </ProfileContainer>
//   );
// };


const ProfilePage = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newAvatar, setNewAvatar] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/user/getprofile/${userId}`);
        setUser(response.data);
      } catch (error) {
        setError('Error fetching user profile');
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleFileChange = (event) => {
    setNewAvatar(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!newAvatar) return;
  
    const formData = new FormData();
    formData.append('profileImage', newAvatar);
  
    // Log userId to ensure it's correct
    console.log('userId:', userId);
  
    // Convert userId to string if it's an object
    const userIdStr = typeof userId === 'object' ? userId.id : userId;
  
    try {
      const response = await axios.post(`/user/uploadprofileimage/${userIdStr}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Profile image uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading profile image:', error);
    }
  };
  
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  const profileImageUrl = user.profileImage ? `${user.profileImage}` : user.profileImage;


  return (
    <ProfileContainer>
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
        </CenteredNavLinks>
       
      </Navbar>
      <ProfileHeader>
        <Avatar src={profileImageUrl} alt={`${user.username}'s avatar`} />
        <HeaderInfo>
          <Name>{user.username}</Name>
          <Role>{user.role}</Role>
        </HeaderInfo>
      </ProfileHeader>
      <ProfileDetails>
        <UploadButton>
          <HiddenFileInput type="file" accept="image/*" onChange={handleFileChange} />
          Upload New Profile Image
        </UploadButton>
        {newAvatar && <button onClick={handleUpload}>Upload</button>}
        
        <DetailRow>
          <Label>Membership Status:</Label>
          <Value>{user.membershipStatus}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Registered Events:</Label>
          <Value>
            {user.registeredEvents && user.registeredEvents.length > 0 ? (
              <ul>
                {user.registeredEvents.map(event => (
                  <li key={event._id}>{event.title}</li>
                ))}
              </ul>
            ) : (
              "No events registered"
            )}
          </Value>
        </DetailRow>
        <DetailRow>
          <Label>Virtual Currency:</Label>
          <Value>{user.virtualCurrency}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Total Donations:</Label>
          <Value>{user.totalDonations}</Value>
        </DetailRow>
      </ProfileDetails>
    </ProfileContainer>
  );
};
export default ProfilePage;
