import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { PetSliderCarousel } from './components/PetSliderCarousel';
import { SearchPets } from './components/SearchPets';
import { SignUpForm } from './components/SignUpForm/SignUpForm';
import ResourcesPage from './pages/ResourcesPage.tsx'
import { Box, Button } from '@mui/material';

const URL = 'http://localhost:8000/api/v1/';

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
      const myData = await getAllData(URL);
      setMessage(myData.data);
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
            </>
          }
        />

        <Route
          path="/search"
          element={
            <>
              <Navbar />
              <SearchPets />
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <>
              <Navbar />
            </>
          }
        />

        <Route
          path="/settings"
          element={
            <>
              <Navbar />
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <Navbar />
              /* <h1>{message}</h1> */
            </>
          }
        />

        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <SignUpForm />
            </>
          }
        />

        <Route
          path="/logout"
          element={
            <>
              <Navbar />
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
