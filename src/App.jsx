import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { PetSliderCarousel } from './components/PetSliderCarousel';
import { SearchPets } from './components/SearchPets';

const URL = 'http://localhost:8000/api/v1/';

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
          path="/logout"
          element={
            <>
              <Navbar />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
