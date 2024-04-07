import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ResourcesPage from './pages/ResourcesPage.tsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/resources' element={<ResourcesPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
