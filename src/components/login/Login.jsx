import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';



function Login() {
  const navigate = useNavigate();

  const [loginstate, setlogin] = useState({ 
    'login': '',
    'password': ''
  });

function handle(user){
  setlogin({...loginstate,[user.target.name]:user.target.value})

}


function login() {
  axios.post('http://localhost:8080/usuarios/login',loginstate).then(token=>{
  console.log(token.data.login);
  const tokenjwt=token.data.token;
  navigate('/home');
  localStorage.setItem('tokenjwt',tokenjwt);
  localStorage.setItem('login',token.data.login);
}).catch(error=>{
  console.log(error);
  alert('Ocorreu um erro durante o login. Por favor, tente novamente.');
})

}


  return (
    <div className="Login">
        <div class="loginpage">
            <form method="POST" class="formLogin">
                <h1>Login</h1>
                <p>Digite os seus dados de acesso no campo abaixo.</p>
                <label for="login">Login</label>
                <input type="text"  name="login" value={loginstate.login} onChange={handle} placeholder="Digite seu e-mail" autofocus="true" />
                <label for="password">Senha</label>
                <input type="password" name="password" value={loginstate.password} onChange={handle} placeholder="Digite seu e-mail" />
                <a href="">Esqueci minha senha</a>
                <input type='button' onClick={login} value="Acessar" class="btn" />
            </form>
        </div>            
    </div>
  );
}

export default Login;
