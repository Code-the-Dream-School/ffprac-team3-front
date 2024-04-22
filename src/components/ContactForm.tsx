import React from "react";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

export const ContactForm: React.FC = () => {
  return (
    <div className="contactform">
      <Typography gutterBottom variant="h3" align="center">
        Contact Us
      </Typography>
      <Grid container justifyContent="center" alignItems="center">
        <Card
          sx={{
            backgroundColor: "transparent",
            shadowOpacity: 0,
            boxShadow: "none",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5">
              Contact the PetPals team
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              gutterBottom
            >
              We're here to answer your questions. Let's talk!
            </Typography>
            <form
              action="https://formsubmit.co/petpalspracticum@gmail.com"
              method="POST"
            >
              <Grid container spacing={1}>
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
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};
