import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './../donation/Donation.css'



function SolicitacaoRecebida() {
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
                    setlistaSolicitacao(response.data.solicitacoesRecebidas);
                    setUserData(response.data); // Armazena os dados do usuário no estado local
                })
                .catch(error => {
                    alert('NÃO AUTORIZADO.');
                    console.log(error);
                    
                });

}, []) 

  return (
    <div className="CadastrarDonation">
            <div class="Donationpage">
                <div className='container-donationView '>

                    <div className='container-conteudo-sol'>
                        <div className='title-donation'>
                            <h1 class="text-4xl font-bold font-serif pt-4 transition-transform transform hover:scale-95 ">nomeDonation</h1>
                            <p className=''>Informaçoes sobre a Doação.</p>
                        </div>

                        {listaSolicitacao.map((donation) => (
                            <div key={donation.id} className="card--sol transition-transform transform hover:scale-105">
                                <div className="">
                                    <hr />
                                    <div className="titulocard">
                                        <h1 class="font-bold text-xl mb-2" >{donation.nome}</h1>
                                        <hr />
                                    </div>
                                    <div className='conteudo'>
                                        <p className="font-bold text-xl mb-2">
                                            {donation.dataDoacao}
                                        </p>
                                        <span className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">{donation.status}</span>
                                        <span className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white">{donation.categoria}</span>
                                    </div>
                                </div>

                                <div className="div-btn">
                                    <button disabled className="btn-info" >
                                        <span class="material-symbols-outlined">
                                            settings
                                        </span>
                                        <div>
                                            <p>Configuraçoes</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    
                </div>

                {/* <div className='container-material'>

                    <div className='material'>
                        <h1 className='text-2xl font-bold  font-serif p-4 pl-6'>Materias Doação nomeDonation</h1>
                        
                            <div  className="card--material transition-transform transform hover:scale-105">                               
                                    <div  className="">
                                        <hr />
                                        <div className="titulocard">
                                            <h1 className="font-bold text-xl mb-2">donation.nome</h1>
                                            <hr />
                                        </div>
                                        <div className='conteudo'>
                                            <p className="font-bold text-xl mb-2">
                                                donation.dataSolicitacao
                                            </p>
                                            <span className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">donation.status</span>
                                            <span className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white">donation.categoria</span>
                                        </div>
                                        <div className="div-btn">
                                            <button disabled className="btn-info" >
                                                <span className="material-symbols-outlined">
                                                    settings
                                                </span>
                                                <div>
                                                    <p>Configurações</p>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                               
                            </div>
                       
                    </div>
                </div> */}

            </div>
            <div >
            </div>

        </div>
  );
}

export default SolicitacaoRecebida;
