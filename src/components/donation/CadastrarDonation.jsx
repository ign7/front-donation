import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import axios from 'axios';
import './Donation.css';



function CadastrarDonation() {
  /* const navigate = useNavigate();

  const [CadastrarDonationstate, setCadastrarDonation] = useState({ 
    'CadastrarDonation': '',
    'password': ''
  });

function handle(user){
  setCadastrarDonation({...CadastrarDonationstate,[user.target.name]:user.target.value})

}


function CadastrarDonation() {
  axios.post('http://localhost:8080/usuarios/CadastrarDonation',CadastrarDonationstate).then(token=>{
  console.log(token.data.token);
  navigate('/home');
}).catch(error=>{
  console.log(error);
  alert('deu ruim');
})

}
 */

  return (
    <div className="CadastrarDonation">
        <div class="page">
            <form method="POST" class="formCadastrarDonation">
                <h1>CadastrarDonation</h1>
                <p>Digite os seus dados de acesso no campo abaixo.</p>
                <label for="CadastrarDonation">CadastrarDonation</label>
                <input type="text"  /* name="CadastrarDonation" value={CadastrarDonationstate.CadastrarDonation} onChange={handle} */ placeholder="Digite seu e-mail" autofocus="true" />
                <label for="password">Senha</label>
                <input type="password"/*  name="password" value={CadastrarDonationstate.password} onChange={handle} */ placeholder="Digite seu e-mail" />
                <a href="">Esqueci minha senha</a>
                <input type='button'/*  onClick={CadastrarDonation} */ value="Acessar" class="btn" />
            </form>
        </div>            
    </div>
  );
}

export default CadastrarDonation;
