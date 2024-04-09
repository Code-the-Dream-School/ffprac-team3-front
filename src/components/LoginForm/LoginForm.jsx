import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Link,
} from '@mui/material';

import { useRef } from 'react';

import { loginUser } from '../../util';

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
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('userName', name);
    } else {
      console.log(response);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
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
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container justifyContent="center">
          <Grid item>
            <Link href="#" variant="body2">
              Don't have an account? Sign up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
