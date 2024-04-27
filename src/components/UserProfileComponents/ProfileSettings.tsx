import React, { useState, useRef } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  Container,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../util';

// Settings component for updating user profile data
export const ProfileSettings = ({ userProfileData }) => {
  const { userPhone } = userProfileData;
  let formatUserPhone = '';

  if (userPhone) {
    formatUserPhone = `(${userPhone.slice(0, 3)}) ${userPhone.slice(
      3,
      6
    )}-${userPhone.slice(6)}`;
  }

  const formRef = useRef<HTMLFormElement | null>(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: userProfileData.firstName || '',
    lastName: userProfileData.lastName || '',
    userEmail: userProfileData.userEmail || '',
    userPhone: formatUserPhone || '',
    userAddress: userProfileData.userAddress || '',
    userCity: userProfileData.userCity || '',
    userState: userProfileData.userState || '',
    userZip: userProfileData.userZip || '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    let phoneNumber = formProps.userPhone;
    let formattedPhone = phoneNumber.toString().replace(/\D/g, '');
    formProps.userPhone = formattedPhone;
    const response = await updateUser(formProps);

    if (formRef.current) {
      formRef.current.reset();
    }

    if (response && response.status === 200) {
      navigate('/profile#profile');
    } else {
      console.log(response);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ display: 'flex', flexDirection: 'column', minHeight: '85vh' }}
    >
      <Typography
        variant="h3"
        sx={{ fontWeight: 500, color: '#0E2728' }}
        gutterBottom
      >
        Profile Settings
      </Typography>
      <Box
        component="form"
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: '1.5rem' }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              name="userPhone"
              value={formData.userPhone}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="userAddress"
              value={formData.userAddress}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="City"
              name="userCity"
              value={formData.userCity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="State"
              name="userState"
              value={formData.userState}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Zip"
              name="userZip"
              value={formData.userZip}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: '#EE633E',
                py: '1rem',
                '&:hover': {
                  backgroundColor: '#df522d',
                },
              }}
            >
              Update Profile
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
