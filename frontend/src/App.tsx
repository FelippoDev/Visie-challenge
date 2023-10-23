import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from './pages/Home/index'
import PersonUpdate from './pages/PersonUpdate/index';
import PersonCreate from './pages/PersonCreate/index';
import PersonItem from './pages/PersonItem/index';
import "./App.css"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/update/:person_id" element={<PersonUpdate/>} />
        <Route path="/detail/:person_id" element={<PersonItem/>} />
        <Route path="/create" element={<PersonCreate/>} />
      </Routes>
    </>
  )
}

export default App
