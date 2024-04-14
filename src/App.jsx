import React, { useState, useEffect } from "react";
import { getAllData } from "./util/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HeroBanner } from "./components/HeroBanner";
import { PetSliderCarousel } from "./components/PetSliderCarousel";
import { SearchPets } from "./components/SearchComponents/SearchPets";
import { Footer } from "./components/footer";

const URL = "http://localhost:8000/api/v1/";

function App() {
  const [message, setMessage] = useState("");

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
              {/* Login component */}
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
