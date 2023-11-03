import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './Donation.css';



function CadastrarDonation() {
  const navigate = useNavigate();

  const [CadastrarDonationstate, setCadastrarDonation] = useState({
    'nome': '',
    'dataDoacao': '',
    'categoria': ''
  });

  function handle(event) {
    const { name, value } = event.target;
    setCadastrarDonation({
      ...CadastrarDonationstate,
      [name]: value
    });
  }


  function cadastrarDoacao() {
    axios
      .post('http://localhost:8080/donations/cadastrardonation/{usuario_id}', CadastrarDonationstate)
      .then((response) => {
        console.log(response.data.token);
        navigate('/home');
      })
      .catch((error) => {
        console.error(error);
        alert('Erro ao cadastrar a doação');
      });
  }


  return (
    <div className="CadastrarDoacao">
      <div className="DoacaoPage">
        <form className="formCadastro">
          <h1>Cadastro de Doações</h1>
          <p>Digite os dados da doação.</p>



          <div className="container-inputs">
            <div className="input-group">
              <div className="container-inputs">
                <label htmlFor="nome">Material</label>
                <input
                  className="input-text"
                  type="text"
                  name="nome"
                  value={CadastrarDonationstate.nome}
                  onChange={handle}
                  placeholder="Caderno"
                />
              </div>
              <div className="input-group-item">
                <label htmlFor="status">Status</label>
                <select
                  className="input-text"
                  name="status"
                  value={CadastrarDonationstate.status}
                  onChange={handle}
                >
                  <option value="Novo">Novo</option>
                  <option value="Usado">Usado</option>
                </select>
              </div>
              <div className="input-group-item">
                <label htmlFor="dataDoacao">Data da Doação</label>
                <input
                  className="input-text"
                  type="date"
                  name="dataDoacao"
                  value={CadastrarDonationstate.dataDoacao}
                  onChange={handle}
                />
              </div>
              <div className="container-inputs">
                <label htmlFor="categoria">Categoria</label>
                <select
                  className="input-text"
                  name="categoria"
                  value={CadastrarDonationstate.categoria}
                  onChange={handle}
                >
                  <option value="">Selecione a categoria</option>
                  <option value="Categoria 1">#</option>
                  <option value="Categoria 2">#</option>
                </select>
              </div>
            </div>
          </div>



          <button type="button" onClick={cadastrarDoacao} className="btn-save">
            Cadastrar Doação
          </button>
        </form>
      </div>
    </div>
  );
}
export default CadastrarDonation;
