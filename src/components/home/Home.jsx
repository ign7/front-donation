import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';



function Home() {
    const navigate = useNavigate();




    return (
        <div className="Home">
            <div class="homepage">
                <div className='nav-bar-home'>
                    <div class="flex h-screen bg-gray-200">
                        <div className='atividades'>
                            <h1>Atividades do Sistema</h1>
                            <hr />
                            <h1 class="text-2xl font-semibold mb-4">Açoes </h1>
                            <hr />
                        </div>
                        <div class="w-64 bg-gray-800 text-white p-6" id='container-nav-actions'>
                            <ul>
                                <div className='label-navs'>
                                    <li class="mb-2">
                                        <p>Cadastrar Doaçoes</p>
                                        <a href="#" class="hover:text-gray-300">
                                            <span class="material-symbols-outlined">
                                                app_registration
                                            </span>
                                        </a>
                                    </li>
                                </div>

                                <div className='label-navs'>
                                    <li class="mb-2">
                                        <p>Minhas Doaçoes</p>
                                        <a href="#" class="hover:text-gray-300">
                                            <span class="material-symbols-outlined">
                                                volunteer_activism
                                            </span>
                                        </a>
                                    </li>
                                </div>

                                <div className='label-navs'>
                                    <li class="mb-2">
                                        <p>Solicitaçoes Recebidas</p>
                                        <a href="#" class="hover:text-gray-300">
                                            <span class="material-symbols-outlined">
                                                mark_email_read
                                            </span>
                                        </a>
                                    </li>
                                </div>

                                <div className='label-navs'>
                                    <li class="mb-2">
                                        <p>Solicitaçoes Enviadas</p>
                                        <a href="#" class="hover:text-gray-300">
                                            <span class="material-symbols-outlined">
                                                schedule_send
                                            </span>
                                        </a>
                                    </li>
                                </div>


                                <div className='label-navs'>
                                    <li class="mb-2">
                                        <p>Dados Pessoais</p>
                                        <a href="#" class="hover:text-gray-300">
                                            <span class="material-symbols-outlined">
                                                manage_accounts
                                            </span>
                                        </a>
                                    </li>
                                </div>


                            </ul>
                        </div>
                    </div>
                </div>
                <div className='body-home'>
                    <div className='titulo-homepage'>
                        <h1 className='educ'>EDUC. SUSTENTAVEL SYSTEM</h1>
                        <span className='descricao'>
                            Plataforma dedicada a conectar doadores com escolas e universidades a Pessoas necessitadas, facilitando a doação de materiais escolares essenciais de varias categorias.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
