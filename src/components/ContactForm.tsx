import React from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

export const ContactForm: React.FC = () => {
  return (
    <Box
      className="contactform"
      sx={{
        backgroundColor: "#0E2728",
        py: "8rem",
        ml: "-8px",
        mr: "8px",
        pl: "8px",
        width: "100vw",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ px: "1.5rem" }}
      >
        <Card
          sx={{
            backgroundColor: "#F4F2EA",
            boxShadow: "none",
            borderRadius: "5px",
            px: "2rem",
            py: "3rem",
          }}
        >
          <Typography
            gutterBottom
            variant="h2"
            component="h1"
            align="center"
            sx={{ color: "#0E2728", fontWeight: 600 }}
          >
            Contact PetPals
          </Typography>
          <CardContent>
            <Typography variant="body1" gutterBottom sx={{ color: "#506C60" }}>
              The PetPals team is here to answer your questions. Let's talk!
            </Typography>

            <form
              action="https://formsubmit.co/petpalspracticum@gmail.com"
              method="POST"
            >
              <Grid container spacing={2}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    placeholder="Enter first name"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    required
                    name="FirstName"
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    placeholder="Enter last name"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    required
                    name="LastName"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    placeholder="Enter email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                    name="Email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    placeholder="Enter phone number"
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    required
                    name="Phone"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Message"
                    multiline
                    rows={4}
                    placeholder="Type your message here"
                    variant="outlined"
                    fullWidth
                    required
                    name="Message"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      mt: "1.5rem",
                      py: ".65rem",
                      backgroundColor: "#EE633E",
                      "&:hover": {
                        backgroundColor: "#F8AF3F",
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
};
