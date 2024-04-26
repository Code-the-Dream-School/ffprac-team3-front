import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"
import wellReadDog from '../img/well-read-dog.jpg'
import { AspectRatio } from "@mui/joy";

const ResHeroBanner = () => {
    return (
        <Grid
            container
            columnSpacing={{ xs: 6, md: 8, xl: 26 }}
            mt={15}
            mb={10}
            display="flex"
            justifyContent="center"
            alignItems="flex-end"
        >

            <Grid xs={7} md={7} xl={5}>
                <Typography
                    variant="h1"
                    sx={{ letterSpacing: .5, fontWeight: 600 }}
                    gutterBottom
                >
                    Resources
                </Typography>

                <Typography variant="body2" sx={{ fontSize: 16 }}>
                    At PetPals, we believe that having an accessible portal to all
                    available pets for adoption is so important. But equally important
                    and sometimes overlooked in the excitement of bringing home a new
                    Forever Friend, is how to properly care for them so that they
                    stay a Friend, Forever. Here are additional resources to help you
                    prepare to be a PetParent.
                </Typography>
            </Grid>

            <Grid xs={3.2} md={3.3} xl={3}>
                <AspectRatio ratio=".7" sx={{ borderRadius: 6 }}>
                    <img src={wellReadDog} />
                </AspectRatio>
            </Grid>

        </Grid>
    )
}

export default ResHeroBanner