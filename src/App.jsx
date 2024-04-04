import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner/HeroBanner';
import { PetSliderCarousel } from './components/PetSliderCarousel';
import { SignUp } from './components/SignUp/SignUp';
import { Login } from '@mui/icons-material';

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
    <>
      <Navbar />
      <SignUp />
      {/* <HeroBanner />
      <PetSliderCarousel />
       */}

      {/* <h1>{message}</h1> */}
    </>
  );
}

export default App;
