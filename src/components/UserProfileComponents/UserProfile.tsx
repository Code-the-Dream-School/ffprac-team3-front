import React, { useState, useEffect } from 'react';
import { Box, Card, Button, Breadcrumbs } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HomeIcon from '@mui/icons-material/Home';
import { UserProfileDisplay } from './UserProfileDisplay';
import { ProfileSettings } from './ProfileSettings';
import { getCurrentUser } from '../../util';

// UserProfile component
export const UserProfile: React.FC = () => {
  const [value, setValue] = useState(() => {
    // Initialize the value based on the URL hash
    const hash = window.location.hash.substr(1);
    return hash === 'settings' ? 'settings' : 'profile';
  });

  const [userProfileData, setUserProfileData] = useState({});

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    // Update the URL hash based on the selected tab
    window.location.hash = newValue;
  };

  const handleGetUser = async () => {
    try {
      const response = await getCurrentUser();

      if (response && response.status === 200) {
        setUserProfileData(response.data);
      }
    } catch (error) {
      console.log(error.msg);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: '#0E2728',
        width: '100vw',
        pt: '7rem',
        pb: '4rem',
        ml: '-8px',
        pr: '8px',
      }}
    >
      <Card
        sx={{
          mx: '4rem',
          p: { xs: '2rem', md: '4rem' },
          border: '1px solid #0E2728',
          borderRadius: '5px',
          backgroundColor: '#F4F2EA',
        }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            variant="text"
            href="/"
            sx={{
              color: '#0E2728',
              boxShadow: 'none',
              backgroundColor: 'transparent',
              fontSize: '1rem',
              '&:hover': {
                color: '#506C60',
                boxShadow: 'none',
                backgroundColor: 'transparent',
              },
            }}
            startIcon={<HomeIcon />}
          >
            Home
          </Button>
        </Breadcrumbs>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="profile tabs"
          sx={{
            pt: '1rem',
            '& .MuiTabs-indicator': {
              backgroundColor: '#EE633E',
              color: '#EE633E',
            },
            '& .MuiTab-root': {
              color: '#0E2728', // Default tab text color
            },
            '& .Mui-selected': {
              color: '#EE633E', // Selected tab text color
            },
          }}
        >
          <Tab
            value="profile"
            label="Profile"
            sx={{
              color: value === 'profile' ? '#EE633E' : '#0E2728',
            }}
          />
          <Tab
            value="settings"
            label="Settings"
            sx={{
              color: value === 'settings' ? '#EE633E' : '#0E2728',
            }}
          />
        </Tabs>
        {value === 'profile' ? (
          <UserProfileDisplay userProfileData={userProfileData} />
        ) : (
          <ProfileSettings userProfileData={userProfileData} />
        )}
      </Card>
    </Box>
  );
};
