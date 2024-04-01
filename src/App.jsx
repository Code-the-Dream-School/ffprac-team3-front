import React, { useState, useEffect } from "react";
import { getAllData } from "./util/index";
import { Navbar } from "./components/Navbar/Navbar";
import { HeroBanner } from "./components/HeroBanner/HeroBanner";
import { Footer } from "./components/Footer";


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
      <Footer />

      {/* <h1>{message}</h1> */}
    </>
  );
}

export default App;
