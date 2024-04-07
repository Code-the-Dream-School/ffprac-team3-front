import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

export const HeroBanner = () => {

    return (
        <Box display="flex" alignItems={"center"} justifyContent={"center"}>
            <Box width={500}>
                <Typography variant="h4">
                    Find Your Forever Friend
                </Typography>

                <Typography variant="body2" mt={2} mb={2}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus obcaecati blanditiis quisquam velit perferendis deserunt, nostrum at officia nisi reprehenderit animi ratione, praesentium ea vero modi repellendus iste illo. Fugit!
                </Typography>

                <Button
                    variant="contained"
                    style={{ backgroundColor: "#EE633E" }}>
                    SEE ALL PETS
                </Button>
            </Box>

            <Box
                display="flex"
                flexDirection={"row"}
            >
                <TextField id="outlined-basic" label="Search by Keyword" variant="outlined" />
                <TextField id="outlined-basic" label="Search by Location" variant="outlined" />
            </Box>
        </Box>
    )

}