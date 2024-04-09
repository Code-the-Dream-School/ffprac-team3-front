import React, { useState, useEffect } from 'react';
import { getData } from './util/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { PetSliderCarousel } from './components/PetSliderCarousel';
import { SearchPets } from './components/SearchPets';
import { SignUpForm } from './components/SignUpForm/SignUpForm';
import { LoginForm } from './components/LoginForm/LoginForm';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      const myData = await getData();
      console.log(myData);
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
