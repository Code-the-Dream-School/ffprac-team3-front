import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Link,
} from "@mui/material";

import { useRef } from "react";
import { loginUser } from "../../util";
import { DogIcon } from "../../img/icons/DogIcon";

export const LoginForm = () => {
  const formRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formProps = Object.fromEntries(formData);
    const response = await loginUser(formProps);
    formRef.current.reset();

    if (response && response.status === 200) {
      const token = response.data.token;
      const name = response.data.user.name;
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userName", name);
    } else {
      console.log(response);
    }
  };

  const handleRegister = () => {
    navigate.push("/register");
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ display: "flex", flexDirection: "column", minHeight: "85vh" }}
    >
      <Box
        sx={{
          marginTop: "8rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#0E2728",
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            fontWeight: 500,
            color: "#0E2728",
            letterSpacing: 1,
            textAlign: "center",
          }}
          gutterBottom
        >
          <DogIcon
            sx={{
              fontSize: "4rem",
              pr: ".5rem",
              justifySelf: "center",
            }}
          />
          PetPals Login
        </Typography>
      </Box>
      <Box
        component="form"
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: "1.5rem" }}
      >
        <Grid container spacing={3}>
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
              autoComplete="password"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#EE633E",
            mt: "2.5rem",
            mb: "1rem",
            py: ".75rem",
            "&:hover": {
              backgroundColor: "#F8AF3F",
            },
          }}
        >
          Sign In
        </Button>
        <Grid container justifyContent="center">
          <Grid item>
            <Button
              variant="text"
              href="/register"
              sx={{
                color: "#0E2728",
                textDecoration: "none",
                pt: ".5rem",
                "&:hover": {
                  color: "#EE633E", // Change the hover color if needed
                  background: "transparent",
                },
              }}
            >
              Don't have an account? Sign up
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
