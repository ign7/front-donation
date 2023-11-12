import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Donation.css';



function Donation() {
    const navigate = useNavigate();

    const [Donationstate, setDonation] = useState({
        'Donation': '',
        'password': ''
    });

    function handle(user) {
        setDonation({ ...Donationstate, [user.target.name]: user.target.value })

    }


  /*   function Donation() {
        axios.post('http://localhost:8080/usuarios/Donation', Donationstate).then(token => {
            console.log(token.data.Donation);
            const tokenjwt = token.data.token;
            navigate('/home');
            localStorage.setItem('tokenjwt', tokenjwt);
            localStorage.setItem('Donation', token.data.Donation);
        }).catch(error => {
            console.log(error);
            alert('Ocorreu um erro durante o Donation. Por favor, tente novamente.');
        })

    }
 */

    return (
        <div className="Donation">
            <div class="Donationpage">
                <form method="POST" class="formDonation">
                    <h1>Donation</h1>
                    <p>Digite os seus dados de acesso no campo abaixo.</p>
                    <label for="Donation">Donation</label>
                    <input type="text" name="" value="" onChange="" placeholder="Digite seu e-mail" autofocus="true" />
                    <label for="password">Senha</label>
                    <input type="password" name="password" value="" onChange="" placeholder="Digite seu e-mail" />
                    <a href="">Esqueci minha senha</a>
                    <input type='button' onClick="" value="Acessar" class="btn" />
                </form>
            </div>
        </div>
    );
}

export default Donation;
