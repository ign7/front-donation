import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import logoimg from '../../img/LogoDonation.jpeg'
import './Home.css';

import '../../../src/index.css'





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

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Change this value according to your preference

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = listadonation.slice(indexOfFirstItem, indexOfLastItem);


    //separa minha lista de doaçoes em pagina
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(listadonation.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => (
        <button key={number} onClick={() => setCurrentPage(number)}>
            {number}
        </button>
    ));


    return (
        <div className="Home">
            <div class="homepage">

                <div className='nav-bar-home'>
                    <div class="">
                        <div className='atividades'>
                            <h1>Atividades do Sistema</h1>
                            <hr />
                            <h1 class="">Açoes </h1>
                            <hr />
                        </div>
                        <div class="" id='container-nav-actions'>
                            <ul>
                                <div className='label-navs'>
                                    <li class="mb-2">
                                        <p>Cadastrar Doaçoes</p>
                                        <Link to="/cadastrarDoacao">
                                            <span class="material-symbols-outlined">
                                                app_registration
                                            </span>
                                        </Link>
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
                            <h1 class="text-6xl font-bold text-white">EDUC. SUSTENTAVEL SYSTEM <span class="material-symbols-outlined">
                                park
                            </span></h1>
                            <span class='font-bold'>
                                Plataforma dedicada a conectar doadores com escolas e universidades a Pessoas necessitadas, facilitando a doação de materiais escolares essenciais de varias categorias.
                            </span>
                        </div>

                        <div className='barrapesquisa'>
                            <div class="divbarra">
                                <input type="text" id="search-input" placeholder="Pesquisar..." class="" />

                                <button id='btn-pesquisa' class="">
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
                                <h1 class="text-4xl font-bold text-white">Doações Disponíveis</h1>
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
                            {currentItems.map((donation) => (

                                <div key={donation.id} className="card-donation">
                                    <div>
                                        <img className="" src={logoimg} alt="Imagem do Card" />
                                    </div>

                                    <div className="">
                                        <hr />
                                        <div className="titulocard">
                                            <h1 class="font-bold text-xl mb-2" >{donation.nome}</h1>
                                            <hr />
                                        </div>
                                        <div className='conteudo'>
                                            <p className="font-bold text-xl mb-2">
                                                Postada: {donation.dataDoacao}.
                                            </p>
                                            <span className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">{donation.status}</span>
                                            <span className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white">{donation.categoria}</span>
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
                            ))}
                        </div>
                    </div>
                    
                    <div className='container-pag'>
                        <div className="pagination">
                            <span className="numberpag">
                                {renderPageNumbers}
                            </span>
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>
    );
}

export default Home;
