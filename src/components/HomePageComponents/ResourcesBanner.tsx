import React from "react";
import { PetIcon } from "../../img/icons/PetIcon";
import { Box, Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { DogIcon } from "../../img/icons/DogIcon";
import { CatIcon } from "../../img/icons/CatIcon";
import { ContactIcon } from "../../img/icons/ContactIcon";
import { ResourcesIcon } from "../../img/icons/ResourcesIcon";

import { useNavigate } from "react-router-dom";

export const ResourcesBanner = () => {
  const navigate = useNavigate();

  const handleDogClick = () => {
    navigate(`/search?keyword=dog`);
    window.scrollTo(0, 0);
  };

  const handleCatClick = () => {
    navigate(`/search?keyword=cat`);
    window.scrollTo(0, 0);
  };

  const handleContactClick = () => {
    navigate(`/contactus`);
    window.scrollTo(0, 0);
  };

  const handleResourcesClick = () => {
    navigate(`/resources`);
    window.scrollTo(0, 0);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#E6E4D6",
        width: "100vw",
        ml: "-8px",
        pr: "8px",
        pt: "4rem",
        pb: "2rem",
      }}
    >
      <Typography
        variant="h3"
        component="h2"
        color="#0F2117"
        textAlign="center"
        sx={{ fontWeight: 600 }}
      >
        Quick Links
      </Typography>
      <Grid
        container
        spacing={4}
        flexGrow={1}
        sx={{
          backgroundColor: "#E6E4D6",
          justifyContent: "center",
          py: "4rem",
          px: "4rem",
        }}
      >
        <Grid item xs={12} sm={6} sx={{ justifyContent: "center" }}>
          <Card
            onClick={handleDogClick}
            sx={{
              backgroundColor: "#E6E4D6",
              border: "2px solid #506C60",
              borderRadius: "5px",
              position: "relative",
              "&:hover": {
                border: "5px solid #EE633E",
                backgroundColor: "rgba(238, 99, 62, 0.09)",
                cursor: "pointer",
              },
            }}
          >
            <CardContent
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <DogIcon
                sx={{
                  fontSize: "8rem",
                }}
              />
            </CardContent>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 500, textAlign: "center", color: "#506C60" }}
            >
              Browse Dogs
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} sx={{ justifyContent: "center" }}>
          <Card
            onClick={handleCatClick}
            sx={{
              backgroundColor: "#E6E4D6",
              border: "2px solid #506C60",
              borderRadius: "5px",
              position: "relative",
              "&:hover": {
                border: "5px solid #EE633E",
                backgroundColor: "rgba(238, 99, 62, 0.09)",
                cursor: "pointer",
              },
            }}
          >
            <CardContent
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <CatIcon
                sx={{
                  fontSize: "8rem",
                }}
              />
            </CardContent>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 500, textAlign: "center", color: "#506C60" }}
            >
              Browse Cats
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} sx={{ justifyContent: "center" }}>
          <Card
            onClick={handleContactClick}
            sx={{
              backgroundColor: "#E6E4D6",
              border: "2px solid #506C60",
              borderRadius: "5px",
              position: "relative",
              "&:hover": {
                border: "5px solid #EE633E",
                backgroundColor: "rgba(238, 99, 62, 0.09)",
                cursor: "pointer",
              },
            }}
          >
            <CardContent
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <ContactIcon
                sx={{
                  fontSize: "8rem",
                }}
              />
            </CardContent>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 500, textAlign: "center", color: "#506C60" }}
            >
              Contact Us
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} sx={{ justifyContent: "center" }}>
          <Card
            onClick={handleResourcesClick}
            sx={{
              backgroundColor: "#E6E4D6",
              border: "2px solid #506C60",
              borderRadius: "5px",
              position: "relative",
              "&:hover": {
                border: "5px solid #EE633E",
                backgroundColor: "rgba(238, 99, 62, 0.09)",
                cursor: "pointer",
              },
            }}
          >
            <CardContent
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <ResourcesIcon
                aria-label="Resources"
                sx={{
                  fontSize: "8rem",
                }}
              />
            </CardContent>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 500, textAlign: "center", color: "#506C60" }}
            >
              Resources
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
