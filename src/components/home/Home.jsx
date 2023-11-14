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

    const [selectedIdDonation, setSelectednomeDonation] = useState();


    function infoDonationRoute(donation) {
        console.log(donation);
        setSelectednomeDonation(donation.nome);
        localStorage.setItem('nomeDonationSelecionada', donation.nome);
        navigate('/donation') // Descomente esta linha se tiver uma função de navegação
    }

    function getAllDonations() {
        if (selectedOption === 'TODOS') {
            axios.get('http://localhost:8080/donations/todos', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('tokenjwt')}`, // Inclua o token aqui
                },
            }).then(data => {
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

    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDoador, setIsDoador] = useState(true);

    const urlimg = require.context('../../img', true);

    useEffect(() => {
        if (isLoading) {
            const login = localStorage.getItem('login');
            axios.get(`http://localhost:8080/usuarios/login=${login}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('tokenjwt')}`,
                },
            })
                .then(response => {
                    setUserData(response.data); // Armazena os dados do usuário no estado local
                    setIsLoading(false); // Indica que os dados do usuário foram carregados
                    if (response.data.role === 'DOADOR') {
                        setIsDoador(false);
                    }
                })
                .catch(error => {
                    alert('NÃO AUTORIZADO.');
                    console.log(error);
                    setIsLoading(false); // Indica que ocorreu um erro ao carregar os dados do usuário
                });
        }
    }, [isLoading, isDoador]);


    return (
        <div className="Home">
            <div class="homepage">
                <div className='nav-bar-home'>
                    <div className='label-navs-user'>
                        {isLoading ? (
                            <p>Carregando dados do usuário...</p>
                        ) : (
                            userData && <p className='hover:text-white'><span class="material-symbols-outlined">
                                person
                            </span>Olá,{userData.nome}!</p>
                        )}
                    </div>
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
                                    {isDoador ? (
                                        <p></p>
                                    ) : (
                                        <li class="mb-2">
                                            <Link to="/teladoacao" class="hover:text-white">
                                                <span class="material-symbols-outlined">
                                                    app_registration
                                                </span>
                                            </Link>
                                            <p>Cadastrar Doaçoes</p>
                                        </li>
                                    )}

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
                        <div className='content-educ'>
                            <div className='title-educ'>
                                <h1 class="text-6xl font-bold">Educação Sustentável System <span class="material-symbols-outlined">
                                    park
                                </span></h1>
                            </div>
                            <div className='desc-educ'>
                                <span class=''>
                                    <h2 className='h2-educ'>
                                        Somos o "Projeto Educação Sustentavel" acreditamos que a melhor forma de mudar as pessoas é através da bondade da leitura e do conhecimento.
                                        Gerenciamos as doações para que os materiais recebidos sejam destinados a novas pessoas que necessitam deste material afim de estudos.
                                        Realizamos a intermediação entre DOADOR e RECEPTOR na triagem dos materiais.
                                    </h2>
                                </span>
                            </div>
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
                                <h1 class="text-4xl font-bold">Doações Disponíveis</h1>
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
                                    {donation.materiais && donation.materiais.length > 0 && donation.materiais[0] && (
                                        <div>
                                            <img
                                                className=""
                                                src={urlimg(`./${donation.materiais[0].imagem}`)}
                                                alt={`Imagem do Material 1`}
                                            />
                                        </div>
                                    )}
                                    <div className="">
                                        <hr />
                                        <div className="titulocard">
                                            <h1 class="font-bold text-xl mb-2" >{donation.nome}</h1>
                                            <hr />
                                        </div>
                                        <div className='conteudo'>
                                            <p className="font-bold text-xl mb-2">
                                                {donation.dataDoacao}.
                                            </p>
                                            <span className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">{donation.status}</span>
                                            <span className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white">{donation.categoria}</span>
                                        </div>
                                    </div>

                                    <div className="div-btn">
                                        <button className="btn-info" onClick={() => infoDonationRoute(donation)}>
                                            <span class="material-symbols-outlined">
                                                visibility
                                            </span>
                                            <div>
                                                <p > Ver Informaçoes</p>
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
