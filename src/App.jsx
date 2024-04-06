import React, { useState, useEffect } from "react";
import { getAllData } from "./util/index";
import { Navbar } from "./components/Navbar";
import { HeroBanner } from "./components/HeroBanner";
import { PetSliderCarousel } from "./components/PetSliderCarousel";
import { Button, Box } from "@mui/material";

const URL = "http://localhost:8000/api/v1/";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const myData = await getAllData(URL);
      setMessage(myData.data);
    })();

    return () => {
      console.log("unmounting");
    };
  }, []);

  return (
    <>
      <Navbar />
      <HeroBanner />

      <Box
        display={"flex"}
        justifyContent={"center"}
      >
        <Button
          href="/resources"
          variant="contained"
          sx={{
            mt: 2,
            textTransform:"none",
            fontStyle:"italic",
            color: "#F7F4F0",
            backgroundColor: "#EE633E",
            "&:hover": {
              backgroundColor: "#F8AF3F",
            }
          }}
        >
          Temporary shortcut to Resources page
        </Button>
      </Box>
      
      <PetSliderCarousel />

      {/* <h1>{message}</h1> */}
    </>
  );
}

export default App;
