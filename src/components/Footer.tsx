import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";


export const Footer = () => {

    return (
        <Box
            sx={{
                width: "100%",
                backgroundColor: "#506c60",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                position: "fixed",
                bottom: 0,
            }}
        >
            <Container maxWidth="lg">
                <Grid container direction="column" alignItems="center">
                    <Grid item xs={12}>
                        <Typography color="black" variant="h5">
                            PetPals App
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color="textSecondary" variant="subtitle1">
                            {`${new Date().getFullYear()} |© PetPals - All Rights Reserved.| Powered by petfinder.com|`}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
export default Footer; 