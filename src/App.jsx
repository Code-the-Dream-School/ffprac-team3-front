
import React, { useState, useEffect } from "react";
import { getData } from './util/index';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HeroBanner } from "./components/HeroBanner";
import { PetSliderCarousel } from "./components/PetSliderCarousel";
import { SearchPets } from "./components/SearchComponents/SearchPets";
import { Footer } from "./components/footer";
import { SignUpForm } from './components/SignUpForm/SignUpForm';
import ResourcesPage from './pages/ResourcesPage.tsx'
import { Box, Button } from '@mui/material';
import { LoginForm } from './components/LoginForm/LoginForm';


const TempResourcesLink = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
    >
      <Button
        href="/resources"
        variant="contained"
        sx={{
          mt: 4,
          textTransform: "none",
          fontStyle: "italic",
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
  )
}

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const myData = await getAllData(URL);
        if (myData) {
          setMessage(myData.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();

    return () => {
      console.log('unmounting');
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HeroBanner />
              <TempResourcesLink />
              <PetSliderCarousel />
              <Footer />
            </>
          }
        />

        <Route
          path="/search"
          element={
            <>
              <Navbar />
              <SearchPets />
              <Footer />
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <>
              <Navbar />
              {/* Profile component */}
              <Footer />
            </>
          }
        />

        <Route
          path="/settings"
          element={
            <>
              <Navbar />
              {/* Settings component */}
              <Footer />
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <LoginForm />
            </>
          }
        />

        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <SignUpForm />
             <Footer />

            </>
          }
        />

        <Route
          path="/logout"
          element={
            <>
              <Navbar />
              {/* Logout component */}
              <Footer />
            </>
          }
        />

        <Route
          path="/resources"
          element={ <ResourcesPage /> }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
