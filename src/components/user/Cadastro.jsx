import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cadastro.css';



function Cadastro() {

  
  const navigate = useNavigate();
  const [cadastro, setcadastro] = useState({
    'nome': '',
    'login': '',
    'password': '',
    'email': '',
    'telefone': '',
    'role':''
  });


   function cadastrar() {
    axios.post('http://localhost:8080/usuarios/register',cadastro).then(data => {
    navigate('/');     
    }).catch(error=>{
       console.log(error);
       alert(error+"/ login ja existe")
    })

  } 

 
  function handleChangeusuario(event) {
    const { name, value, checked } = event.target;
  
    if (name === "DOADOR" && checked) {
      setcadastro(prevState => ({
        ...prevState,
        role: "DOADOR",
        [name]: value
      }));
    } else if (name === "RECEPTOR" && checked) {
      setcadastro(prevState => ({
        ...prevState,
        role: "RECEPTOR",
        [name]: value
      }));
    } else {
      setcadastro(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  }


 


  return (
    <div className="Cadastro">
      <div class="cadastropage">
        <form  class="formCadastro">

          <h1>Cadastro</h1>
          <p>Digite os seus dados de cadastro no sistema.</p>

          <div className="container">

            <div className='container-inputs'>
              <label for="nome">Nome <input type="text" name="nome" value={cadastro.nome} onChange={handleChangeusuario} placeholder="Insira seu nome"  /></label>
            </div>

            <div className='container-inputs'>
              <label for="login">Login <input type="text" name="login" value={cadastro.login} onChange={handleChangeusuario} placeholder="Insira seu login" /></label>
            </div>

            <div className='container-inputs'>
              <label for="email">Email <input type="text" name="email" value={cadastro.email} onChange={handleChangeusuario} placeholder="Insira seu e-mail"  /></label>
            </div>

            <div className='container-inputs'>
              <label for="password">Senha <input type="text"  name="password" value={cadastro.password} onChange={handleChangeusuario} placeholder="Insira seu e-mail" /></label>
            </div>

            <div className='container-inputs'>
              <label for="telefone">Phone <input type="text" name="telefone" value={cadastro.telefone} onChange={handleChangeusuario} placeholder="Insira seu telefone"  /></label>
            </div>



            <div className='check-universal'>

              <div className='doador-check'>
                <label htmlFor="doador">DOADOR</label>
                <input id='doadorcheck' type='checkbox'  name="DOADOR" value={cadastro.role} onChange={handleChangeusuario}></input>                
              </div>

              <div className='recptor-check'>
                <label htmlFor="recptor">RECEPTOR</label>
                <input id='receptorcheck' type='checkbox'  name="RECEPTOR" value={cadastro.role} onChange={handleChangeusuario}></input>  
              </div>

            </div>

            <div>
              <input type='button' onClick={cadastrar} value="salvar" class="btn-save"/>            
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
