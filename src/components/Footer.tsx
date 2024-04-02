import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { PetLogoIcon } from "../img/PetLogoIcon";

export const Footer: React.FC = () => {

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                backgroundColor: "#506C60",
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
                        {`${new Date().getFullYear()} © PetPals | All Rights Reserved | Powered by petfinder.com |`}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}; 