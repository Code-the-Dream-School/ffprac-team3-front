import React from "react";
import { Box, Button, Typography } from "@mui/material";
import wellReadDog from '../img/well-read-dog.jpg'
import { AspectRatio } from "@mui/joy";

const ResHeroBanner = () => {
    return (
        <Box
            display="flex"
            alignItems={"center"}
            justifyContent={"space-around"}
            my={4}
            width="60vw"
        >
            <Box width={500}>
                <Typography
                    variant="h1"
                    sx={{ letterSpacing: .5, fontWeight: 600 }}
                    gutterBottom
                >
                    Resources
                </Typography>

                <Typography variant="body2" sx={{ fontSize: 16 }}>
                    At PetPals, we believe that having an accessible portal to all available pets for adoption is so important. But equally important and sometimes overlooked in the excitement of bringing home a new Forever Friend, is how to properly care for them so that they stay a Friend, Forever. Here are additional resources to help you prepare to be a PetParent.
                </Typography>
            </Box>

            <AspectRatio
                ratio=".7"
                sx={{ width: 224, borderRadius: 20 }}
            >
                <img width="250" src={wellReadDog} />
            </AspectRatio>

        </Box>
    )
}

export default ResHeroBanner