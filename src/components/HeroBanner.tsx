import React from "react";
import { Box, TextField, Button } from "@mui/material";

export const HeroBanner = () => {
  return (
    <Box display="flex" alignItems={"center"} justifyContent={"center"}>
      <Box width={500}>
        <h1>Find Your Forever Friend</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus
          obcaecati blanditiis quisquam velit perferendis deserunt, nostrum at
          officia nisi reprehenderit animi ratione, praesentium ea vero modi
          repellendus iste illo. Fugit!
        </p>
        <Button variant="contained" style={{ backgroundColor: "#EE633E" }}>
          SEE ALL PETS
        </Button>
      </Box>
      <Box display="flex" flexDirection={"row"}>
        <TextField
          id="outlined-basic"
          label="Search by Keyword"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="Search by Location"
          variant="outlined"
        />
      </Box>
    </Box>
  );
};
