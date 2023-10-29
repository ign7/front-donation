import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoimg from '../../img/LogoDonation.jpeg'
import './Home.css';




function Home() {

    const navigate = useNavigate();

    const [listadonation, setlistadonation] = useState([]);

    function getAllDonations() {
        if (selectedOption === 'TODOS') {
            axios.get('http://localhost:8080/donations/todos').then(data => {
                console.log(data);
                setlistadonation(data.data);
            }).catch(error => {
                console.log(error);
            });
        }
    }

    function getDonationByCategoria(option) {
        if (option != 'TODOS') {
            axios.get('http://localhost:8080/donations/pesquisardoacao/categoriadoacao=' + option).then(data => {
                console.log(data);
                setlistadonation(data.data);
            }).catch(error => {
                console.log(error);
            });
        }
    }

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('TODOS');

    const options = [
        'TODOS',
        'ELETRONICO',
        'MATERIALESCOLAR',
        'LIVRO',
        'MOCHILA',
        'UNIFORME',
        'CADERNO'
    ];

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        console.log(option);
        setIsOpen(false);
        if (option === 'TODOS') {
            getAllDonations();
        }
        getDonationByCategoria(option);
    };


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
                        <div>
                            <h1 className='educ'>EDUC. SUSTENTAVEL SYSTEM <span class="material-symbols-outlined">
                                park
                            </span></h1>
                            <span className='descricao'>
                                Plataforma dedicada a conectar doadores com escolas e universidades a Pessoas necessitadas, facilitando a doação de materiais escolares essenciais de varias categorias.
                            </span>
                        </div>

                        <div className='barrapesquisa'>
                            <div class="flex mb-4">
                                <input type="text" id="search-input" placeholder="Pesquisar..."
                                    class="rounded-l-md p-2 border-t border-b border-l text-gray-800 border-gray-300 bg-white focus:outline-none focus:border-blue-500" />
                                <button id='btn-pesquisa' class="rounded-r-md bg-blue-500 text-white p-2 border border-blue-500 border-t border-b border-r cursor-pointer hover:bg-blue-700 focus:outline-none focus:border-blue-700">
                                    <span class="material-symbols-outlined">
                                        search
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='corpo'>
                        <div className='doacoes-titulo'>
                            <div className='container-titulo'>
                                <h1>Doações Disponíveis</h1>
                                <span
                                    type='button'
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="material-symbols-outlined"
                                >
                                    expand_more
                                </span>
                            </div>
                            <div className='container-dropdown'>
                                <div className='container-drop'>
                                    {isOpen && (
                                        <ul className='dropdown-list'>
                                            <h1 className='title-drop'>Categoria</h1>
                                            <hr />
                                            {options.map((option) => (
                                                <li
                                                    key={option}
                                                    className={`dropdown-item ${selectedOption === option ? 'selected' : ''
                                                        }`}
                                                    onClick={() => handleOptionClick(option)}
                                                >
                                                    {option}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>

                        
                        <div className='container-conteudo'>   
                        {listadonation.map((donation) => (                         
                                <div key={donation.id} className="card-donation">
                                    <img className="" src={logoimg} alt="Imagem do Card" />
                                    <div className="">
                                        <hr />
                                        <div className="titulocard">
                                            <h1>{donation.nome}</h1>
                                            <hr />
                                        </div>
                                        <div className='conteudo'>
                                            <p className="date-card">
                                                Postada Em:{donation.dataDoacao}.
                                            </p>
                                            <p className="date-card">
                                                status:{donation.status}
                                            </p>
                                            <p className="date-card">
                                                Categoria:{donation.categoria}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="div-btn">
                                        <button className="btn-info">
                                            <span class="material-symbols-outlined">
                                                visibility
                                            </span>
                                            <div>
                                                <p> Ver Informaçoes</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                             ))};                            
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
