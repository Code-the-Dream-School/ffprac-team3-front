import React, { useState, useEffect } from "react";
import { getData } from "./util/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HeroBanner } from "./components/HomePageComponents/HeroBanner";
import { PetSliderCarousel } from "./components/HomePageComponents/PetSliderCarousel";
import { SearchPets } from "./components/SearchComponents/SearchPets";
import { SignUpForm } from "./components/SignUpForm/SignUpForm";
import ResourcesPage from "./pages/ResourcesPage.tsx";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { Footer } from "./components/footer";
import { PetProfile } from "./components/PetProfileComponent/PetProfile";
import { ContactForm } from "./components/ContactForm";
import { ResourcesBanner } from "./components/HomePageComponents/ResourcesBanner.tsx";
import { UserProfile } from "./components/UserProfileComponents/UserProfile";
import { ProfileSettings } from "./components/UserProfileComponents/ProfileSettings";

const URL = "http://localhost:8000/api/v1/";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const myData = await getData(URL);
        if (myData) {
          setMessage(myData.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();

    return () => {
      console.log("unmounting");
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
          path="/pet-profile/:id/:type/:name"
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
          path="/logout"
          element={
            <>
              <Navbar />
              {/* Logout component */}
              <Footer />
            </>
          }
        />

        <Route path="/resources" element={<ResourcesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
