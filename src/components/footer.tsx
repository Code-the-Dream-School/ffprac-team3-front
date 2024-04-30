import React from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";

import { CustomYellowContactIcon } from "../img/icons/YellowContactIcon";
import { CustomYellowDogIcon } from "../img/icons/CustomYellowDogIcon";
import HomeIcon from "@mui/icons-material/Home";

export const Footer: React.FC = () => {
  return (
    <Box
      position="relative"
      sx={{
        width: "100%",
        backgroundColor: "#506C60",
        ml: "-1rem",
        pr: "2rem",
        pb: "1.5rem",
        mb: "-1rem",
        marginTop: "auto",
      }}
    >
      <Grid container direction="column" alignItems="center">
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            pt: "1.5rem",
            pb: ".5rem",
          }}
        >
          <IconButton
            href="/"
            sx={{
              flexDirection: "column",
              color: "#F8AF3F",
              mr: ".25rem",
              "&:hover": {
                color: "#F4F2EA",
                cursor: "pointer",
              },
            }}
          >
            <HomeIcon
              sx={{
                width: "5rem",
                height: "2rem",
              }}
            />
            <Typography variant="overline" color="inherit">
              Home
            </Typography>
          </IconButton>

          <IconButton
            href="/search"
            sx={{
              flexDirection: "column",
              color: "#F8AF3F",
              ml: ".25rem",
              "&:hover": {
                color: "#F4F2EA",
                cursor: "pointer",
                "& svg": {
                  fill: "#F4F2EA",
                },
              },
            }}
          >
            <CustomYellowDogIcon
              color="inherit"
              sx={{
                width: "5rem",
                height: "2rem",
                transition: "color 0.3s",
              }}
            />
            <Typography variant="overline" color="inherit">
              View Pets
            </Typography>
          </IconButton>

          <IconButton
            href="/contactus"
            sx={{
              flexDirection: "column",
              color: "#F8AF3F",
              ml: ".25rem",
              "&:hover": {
                color: "#F4F2EA",
                cursor: "pointer",
                "& svg": {
                  fill: "#F4F2EA",
                },
              },
            }}
          >
            <CustomYellowContactIcon
              color="inherit"
              sx={{
                width: "5rem",
                height: "2rem",
                transition: "color 0.3s",
              }}
            />
            <Typography variant="overline" color="inherit">
              Contact
            </Typography>
          </IconButton>
        </Grid>

        <Grid item xs={12}>
          <Typography color="#F7F4F0" variant="overline" sx={{ mb: "1rem" }}>
            {` PetPals © ${new Date().getFullYear()} | Code the Dream FF Practicum Team 3 `}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
