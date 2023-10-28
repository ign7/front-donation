import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';



function Home() {
  const navigate = useNavigate();

 


  return (
    <div className="Home">
        <div class="page">
       <h1>Bem vindo</h1>
    </div>
    </div>
  );
}

export default Home;
