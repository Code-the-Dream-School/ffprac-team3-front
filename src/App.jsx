
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HomePageComponents/HeroBanner';
import { PetSliderCarousel } from './components/HomePageComponents/PetSliderCarousel';
import { SearchPets } from './components/SearchComponents/SearchPets';
import { SignUpForm } from './components/SignUpForm/SignUpForm';
import ResourcesPage from './pages/ResourcesPage.tsx';
import { LoginForm } from './components/LoginForm/LoginForm';
import { Footer } from './components/footer';
import { PetProfile } from './components/PetProfileComponent/PetProfile';
import { ContactForm } from './components/ContactForm';
import { ResourcesBanner } from './components/HomePageComponents/ResourcesBanner.tsx';
import { UserProfile } from './components/UserProfileComponents/UserProfile';
import { ProfileSettings } from './components/UserProfileComponents/ProfileSettings';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HeroBanner />
              <ResourcesBanner />
              {/* <TempResourcesLink /> */}
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

          path="/pet-profile/:_id/:type/:name"

          element={
            <>
              <Navbar />
              <PetProfile />

              <Footer />
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <>
              <Navbar />
              <UserProfile />
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
              <Footer />
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
          path="/contactus"
          element={
            <>
              <Navbar />
              <ContactForm />
              <Footer />
            </>
          }
        />

        <Route
          path="/resources"
          element={
            <>
              <Navbar />
              <ResourcesPage />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
