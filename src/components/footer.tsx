import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { PetLogoIcon } from "../img/PetLogoIcon";

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
        <Grid item xs={12}>
          <Typography color="black" variant="h5">
            <PetLogoIcon
              sx={{
                pt: "2rem",
                width: "5rem",
                height: "2rem",
              }}
            />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color="#F7F4F0" variant="body2" sx={{ mb: "1rem" }}>
            {` PetPals © ${new Date().getFullYear()} | Code the Dream FF Practicum Team 3 `}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
