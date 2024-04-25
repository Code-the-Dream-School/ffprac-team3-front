import React, { useState } from "react";
import {
  CardContent,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Settings component for updating user profile data
export const ProfileSettings = ({ updateProfile }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userEmail: "",
    userPhone: "",
    userAddress: "",
    userCity: "",
    userState: "",
    userZip: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Submit the form data to update user profile
    console.log("Form submitted:", formData);

    updateProfile(formData)
      .then(() => {
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <CardContent sx={{ mt: "2rem", mx: "2rem" }}>
      <Typography
        variant="h3"
        sx={{ fontWeight: 500, color: "#0E2728" }}
        gutterBottom
      >
        Profile Settings
      </Typography>

      <Stack spacing={2}>
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          label="Email"
          name="userEmail"
          value={formData.userEmail}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          label="Phone"
          name="userPhone"
          value={formData.userPhone}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          label="Address"
          name="userAddress"
          value={formData.userAddress}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          label="City"
          name="userCity"
          value={formData.userCity}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          label="State"
          name="userState"
          value={formData.userState}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          label="Zip"
          name="userZip"
          value={formData.userZip}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#EE633E",
            py: "1rem",
            "&:hover": {
              backgroundColor: "#df522d",
            },
          }}
        >
          Update Profile
        </Button>
      </Stack>
    </CardContent>
  );
};
