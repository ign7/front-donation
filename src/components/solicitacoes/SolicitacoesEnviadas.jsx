import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import './Solicitacao.css'



function SolicitacaoEnviada() {
    const navigate = useNavigate();

    const [listaSolicitacao, setlistaSolicitacao] = useState([]);

    const [userData, setUserData] = useState(null);

    useEffect(() => {

        const login = localStorage.getItem('login');
        axios.get(`http://localhost:8080/usuarios/login=${login}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('tokenjwt')}`,
            },
        })
            .then(response => {
                localStorage.setItem('usuarioauteticado', response.data.id);
                console.log(response.data.solicitacoesRecebidas);
                setlistaSolicitacao(response.data.solicitacoesEnviadas);
                setUserData(response.data); // Armazena os dados do usuário no estado local
            })
            .catch(error => {
                alert('NÃO AUTORIZADO.');
                console.log(error);

            });

    }, [])

    return (
        <div className="CadastrarDonation bg-green-300 min-h-screen flex justify-center items-center">
        <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-2xl">
      
          <div className="container-donationView">
      
            <div className="container-conteudo-sol">
      
              <div className="title-donation text-center">
                <h1 className="text-4xl font-bold font-serif mb-4 transition-transform transform hover:scale-95">Solicitações Enviadas</h1>
                <p className="text-gray-600">Solicitações Enviadas</p>
              </div>
      
              {listaSolicitacao.map((solicitacao) => (
                <div key={solicitacao.id} className="card--sol transition-transform transform hover:scale-105 bg-gray-200 p-4 mb-4 rounded-md">
                  <div className="border-b mb-4 pb-2">
                    <h1 className="font-bold text-xl mb-2">{solicitacao.nome}</h1>
                  </div>
                  <div className="conteudo">
                    <p className="font-bold text-xl mb-2">{solicitacao.dataSolicitacao}</p>
                    <div className="flex mb-2">
                      <span className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">{solicitacao.role}</span>
                      <span className="inline-block">{/* Espaço vazio entre spans */}</span>
                      <span className="inline-block">{/* Adicione estilos específicos para a descrição */}</span>
                    </div>
                    <div className="mb-4">
                      <label className="font-semibold">Descrição:</label>
                      <p className="text-gray-700">{solicitacao.observacao}</p>
                    </div>
                  </div>
      
                  <div className="flex justify-between items-center mt-4">
                    <button disabled className="btn-info ">
                      <span className="material-symbols-outlined">settings</span>
                      <div>
                        <p>Configurações</p>
                      </div>
                    </button>
      
                    <button className="bg-green-500 text-white py-2 px-4 rounded-md ml-2">Aceitar </button>
                    <button className="bg-red-500 text-white py-2 px-4 rounded-md ml-2">Recusar</button>
                  </div>
      
                </div>
              ))}
            </div>
      
          </div>
        </div>
      </div>
    );
}

export default SolicitacaoEnviada;
