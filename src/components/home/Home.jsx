import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import logoimg from '../../img/LogoDonation.jpeg'
import './Home.css';

import '../../../src/index.css'





function Home() {

    window.addEventListener('beforeunload', () => {
        localStorage.clear(); // Limpa todo o conteúdo do localStorage
      });

    const navigate = useNavigate();

    const [listadonation, setlistadonation] = useState([]);

    

    function getAllDonations() {
        if (selectedOption === 'TODOS') {
          axios.get('http://localhost:8080/donations/todos', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('tokenjwt')}`, // Inclua o token aqui
            },
          }).then(data => {
            console.log(data);
            console.log(localStorage.getItem('tokenjwt'));
            setlistadonation(data.data);
          }).catch(error => {
            alert('NÃO AUTORIZADO.');
            console.log(error);
          });
        }
      }

    function getDonationByCategoria(option) {
        if (option !== 'TODOS') {
          axios.get('http://localhost:8080/donations/pesquisardoacao/categoriadoacao=' + option, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('tokenjwt')}`, // Inclua o token aqui
            },
          }).then(data => {
            console.log(data);
            console.log(localStorage.getItem('tokenjwt'));
            setlistadonation(data.data);
          }).catch(error => {
            alert('NÃO AUTORIZADO.');
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
        aparecepaginacao();
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

    function aparecepaginacao() {
        let pag = document.querySelectorAll('.container-pag');
        pag.forEach(element => {
            element.style.display = 'block';
        });
    }


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
                                        <Link to="/cadastrarDoacao" class="hover:text-white">
                                            <span class="material-symbols-outlined">
                                                app_registration
                                            </span>
                                        </Link>
                                        <p>Cadastrar Doaçoes</p>
                                    </li>
                                </div>

                                <div className='label-navs'>
                                    <li class="mb-2">
                                        <a href="#" class="hover:text-white">
                                            <span class="material-symbols-outlined">
                                                volunteer_activism
                                            </span>
                                        </a>
                                        <p>Minhas Doaçoes</p>
                                    </li>
                                </div>

                                <div className='label-navs'>
                                    <li class="mb-2">
                                        <a href="#" class="hover:text-white">
                                            <span class="material-symbols-outlined">
                                                mark_email_read
                                            </span>
                                        </a>
                                        <p>Solicitaçoes Recebidas</p>
                                    </li>
                                </div>

                                <div className='label-navs'>
                                    <li class="mb-2">
                                        <a href="#" class="hover:text-white">
                                            <span class="material-symbols-outlined">
                                                schedule_send
                                            </span>
                                        </a>
                                        <p>Solicitaçoes Enviadas</p>
                                    </li>
                                </div>


                                <div className='label-navs'>
                                    <li class="mb-2">
                                        <a href="#" class="hover:text-white">
                                            <span class="material-symbols-outlined">
                                                manage_accounts
                                            </span>
                                        </a>
                                        <p>Dados Pessoais</p>
                                    </li>
                                </div>


                            </ul>
                        </div>
                    </div>
                </div>

                <div className='body-home'>
                    <div className='titulo-homepage'>
                        <div>
                            <h1 class="text-6xl font-bold text-white">Educ. Sustentável System <span class="material-symbols-outlined">
                                park
                            </span></h1>
                            <span class=''>
                            <h2>
                                Somos o "Projeto educação Sustentavel" acreditamos que a melhor forma de mudar as pessoas é através da bondade da leitura e do conhecimento. 
                                Gerenciamos as doações para que os materiais recebidos sejam destinados ao reúso ou a reciclagem de acordo com seu estado de conservação e classificação.
                                Realizamos a intermediação entre Doador e Receptor na triagem dos materiais.
                            </h2>
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
                    <hr />
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
                                                Postada {donation.dataDoacao}.
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

                    <div className='container-pag' style={{ display: 'none' }} >
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
