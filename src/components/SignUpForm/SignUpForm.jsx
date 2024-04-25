// sign up form styled by keri

import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import React, { useState, useRef } from "react";
import { registerUser } from "../../util";
import { DogIcon } from "../../img/icons/DogIcon";

export const SignUpForm = () => {
  const formRef = useRef(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password === confirmPassword) {
      const formData = new FormData(event.currentTarget);
      const formProps = Object.fromEntries(formData);
      formRef.current.reset();
      setPassword("");
      setConfirmPassword("");
      console.log(formProps);
      const response = await registerUser(formProps);
      if (response && response.status === 201) {
        console.log("Successfully registered");
      }
      console.log(response);
    } else {
      setError("Passwords do not match");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: "7rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{ fontWeight: 500, color: "#0E2728", letterSpacing: 1 }}
          gutterBottom
        >
          <DogIcon
            sx={{
              fontSize: "4rem",
              pr: ".5rem",
              justifySelf: "center",
            }}
          />
          Account Sign Up
        </Typography>
      </Box>

      <Box
        component="form"
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="zipCode"
              fullWidth
              id="zipCode"
              type="number"
              label="Zip Code (optional)"
              inputProps={{ maxLength: 5 }}
            />
            <Grid item>
              <Typography
                variant="caption"
                display="block"
                sx={{ mt: "1.5rem" }}
              >
                You will use your email to login
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!error}
              helperText={error}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: "2.5rem",
            mb: ".5rem",
            backgroundColor: "#EE633E",
            py: ".75rem",
            "&:hover": {
              backgroundColor: "#F8AF3F",
            },
          }}
        >
          Sign Up
        </Button>

        <Button
          variant="text"
          href="/login"
          fullWidth
          sx={{
            color: "#0E2728",
            backgroundColor: "transparent",
            mb: "2.5rem",
            "&:hover": { color: "#EE633E", backgroundColor: "transparent" },
          }}
        >
          Already have an account? Sign in
        </Button>
      </Box>
    </Container>
  );
};
