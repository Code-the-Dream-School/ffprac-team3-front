import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const URL = 'http://localhost:8000/api/v1/';

function App() {
  
  const [message, setMessage] = useState(''); 

  useEffect(() => {

    (async () => {
      const myData = await getAllData(URL)
      setMessage(myData.data);
    })();
      
    return () => {
      console.log('unmounting');
    }

  }, []);

  const LandingPage = () => {
    return (
      <>
        <div className='nav'>
          <h1>Pet Project</h1>
          <Link to='/mission'>
            Mission
          </Link>
          <Link to='/adopt'>
            Adopt
          </Link>
          <Link to='/faq'>
            FAQ
          </Link>
        </div>
        {message ? <h3>back end active</h3>
          : <h3 style={{ color: "red" }}>back end inactive</h3>}
      </>
    )
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/faq' element={<>
            <h1>Frequently Asked Questions</h1>
            <Link to='/'>
              <button>Back</button>
            </Link>
          </>}
          />
          <Route path='/mission' element={<>
            <h1>Our Mission</h1>
            <Link to='/'>
              <button>Back</button>
            </Link>
          </>}
          />
          <Route path='/adopt' element={<>
            <h1>Find a Pet</h1>
            <Link to='/'>
              <button>Back</button>
            </Link>
          </>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );

}

export default App
