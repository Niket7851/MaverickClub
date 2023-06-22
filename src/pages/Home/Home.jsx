import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Intro from '../../components/intro/Intro';
import './home.css';
import Skills from '../../components/skills/Skills';
import { useLocation } from 'react-router-dom';
const Home = () => {
  const location = useLocation();
  const userDetails = location.state?.userDetails; 
  return (
    <div className='home'>
     <Navbar/>
     <Intro/>
     <h2>Skills Taught Here</h2>
     <Skills/>
    </div>
  )
}

export default Home
