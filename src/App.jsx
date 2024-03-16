import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';

import Menu from '@mui/material/Menu';

import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { styled, alpha } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';



const URL = 'http://localhost:8000/api/v1/';

function App() {
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

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
        <Box sx={{ flexGrow: 1, }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                
                <MenuIcon color = "#2e7d32"/>
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
              
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                Pet Project
                <Link to='/mission'>
                  <Button variant="contained" color="success">Mission</Button>
               </Link>
               <Link to='/mission'>
                <Button variant="contained" color="success">Mission</Button>
                </Link>
                <Link to='/adopt'>
                <Button variant="contained" color="success">Adopt</Button>
                </Link>
                <Link to='/faq'>
                <Button variant="contained" color="success">FAQ</Button>
                </Link>
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Toolbar>
          </AppBar>
        </Box>
      
      
  
        <div className='nav'>
          <h1>Pet Project</h1>
          
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
