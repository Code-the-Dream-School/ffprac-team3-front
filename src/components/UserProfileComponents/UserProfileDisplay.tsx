import React from 'react';
import { Typography, CardContent, Stack, Icon } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// API - NEED USER DATA FROM THE REGISTRATION FORM
// UserProfileDisplay component to display user profile
export const UserProfileDisplay = ({ userProfileData }) => {
  const { userPhone } = userProfileData;

  let formatUserPhone = '';

  if (userPhone) {
    formatUserPhone = `(${userPhone.slice(0, 3)}) ${userPhone.slice(
      3,
      6
    )}-${userPhone.slice(6)}`;
  }

  return (
    <CardContent>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          color: '#EE633E',
          fontWeight: 600,
          pt: '2rem',
          letterSpacing: 1,
          display: 'flex',
        }}
      >
        {userProfileData.firstName} {userProfileData.lastName}
      </Typography>

      <Typography
        variant="h6"
        sx={{ color: '#0E2728', fontWeight: 400, pt: '1.5rem' }}
      >
        <Icon
          sx={{
            color: '#0E2728',
            justifySelf: 'center',
            pr: '.75rem',
          }}
        >
          <EmailIcon />
        </Icon>
        {userProfileData.userEmail}
      </Typography>

      <Typography
        variant="h6"
        sx={{ color: '#0E2728', fontWeight: 400, pt: '1.5rem' }}
      >
        <Icon
          sx={{
            color: '#0E2728',
            justifySelf: 'center',
            pr: '.75rem',
          }}
        >
          <PhoneIcon />
        </Icon>
        {formatUserPhone}
      </Typography>

      <Stack
        sx={{
          color: '#0E2728',
          pt: '1.5rem',
        }}
      >
        <Typography variant="subtitle1" component="h6">
          <LocationOnIcon /> Street: {userProfileData.userAddress}
        </Typography>
        <Typography variant="subtitle1" component="h6" sx={{ pl: '1.75rem' }}>
          City: {userProfileData.userCity}
        </Typography>
        <Typography variant="subtitle1" component="h6" sx={{ pl: '1.75rem' }}>
          State: {userProfileData.userState}
        </Typography>
        <Typography variant="subtitle1" component="h6" sx={{ pl: '1.75rem' }}>
          Zip: {userProfileData.userZip}
        </Typography>
      </Stack>
    </CardContent>
  );
};
