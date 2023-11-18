import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import logoimg from '../../img/LogoDonation.jpeg'
import './Home.css';

import '../../../src/index.css'




import { HiEye, HiInformationCircle } from 'react-icons/hi';
import { Alert } from 'flowbite-react';


import { Banner, Button, Label, TextInput } from 'flowbite-react';
import { HiX } from 'react-icons/hi';

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
        localStorage.setItem('DonationId', donation.id)
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

                setIsLoadingDonation(true)
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
    const itemsPerPage = 4; // Change this value according to your preference

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
    const [DonationData, setDonationData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [ispesquisa, setIspesquisa] = useState(null);
    const [IsLoadingDonation, setIsLoadingDonation] = useState(false);
    const [isDoador, setIsDoador] = useState(true);

    const [isReceptor, setIsReceptor] = useState(true);


    function closeAlert() {
        setIspesquisa(false);
    }

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
                    localStorage.setItem('usuarioauteticado', response.data.id);
                    console.log(response.data);
                    setUserData(response.data); // Armazena os dados do usuário no estado local
                    setIsLoading(false); // Indica que os dados do usuário foram carregados
                    if (response.data.role === 'DOADOR') {
                        setIsDoador(false);
                    } else {
                        setIsReceptor(false);
                    }
                })
                .catch(error => {
                    //alert('NÃO AUTORIZADO.');
                    console.log(error);
                    setIsLoading(true); // Indica que ocorreu um erro ao carregar os dados do usuário
                });
        }
    }, [isLoading, isDoador]);


    const [pesquisa, setPesquisa] = useState('');

    const handleInputChange = (event) => {
        setPesquisa(event.target.value);
    };

    const pesquisarpornome = () => {
        console.log('Valor da pesquisa:', pesquisa);
        axios.get('http://localhost:8080/donations/pesquisardoacao/nomedoacao=' + pesquisa, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('tokenjwt')}`,
            },
        }).then(response => {
            setIspesquisa(true);
            console.log(response.data)
            setDonationData(response.data)
        }).catch(error => {
            console.log(error);
            setIspesquisa(false);
            alert('Ocorreu um erro durante o Donation. Por favor, tente novamente.');
        })
    };

    function closeAlert() {
        setIspesquisa(false);
        setIsLoading(false);
        setIsLoadingDonation(false);
    }


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
                                    {!isDoador || !isReceptor && userData.doacoes.length > 0 ? (
                                        <li class="mb-2">
                                            <Link to="/minhasdoacoes" class="hover:text-white">
                                                <span class="material-symbols-outlined">
                                                    volunteer_activism
                                                </span>
                                            </Link>
                                            <div className="flex items-center justify-between">
                                                <p className="mr-2">Minhas Doações</p>
                                                <span className='labelindex rounded-full bg-red-500 text-white text-xs py-1 px-2 transition duration-300 ease-in-out hover:bg-red-600 hover:scale-105'>
                                                    {userData.doacoes.length}
                                                </span>
                                            </div>
                                        </li>
                                    ) : null}
                                </div>

                                <div className='label-navs'>
                                    <Link to="/solicitacoesRecebedidas" class="hover:text-green-500 ">
                                        {!isDoador && userData.solicitacoesRecebidas.length > 0 ? (
                                            <li class="mb-2">
                                                <span class="material-symbols-outlined">
                                                    schedule_send
                                                </span>
                                                <div className="flex items-center ">
                                                    <p className="mr-2">Solicitaçoes Recebidas</p>

                                                    <span className='rounded-full bg-red-500 text-white text-xs py-1 px-2 transition duration-300 ease-in-out hover:bg-red-600 hover:scale-105'>
                                                        {userData.solicitacoesRecebidas.length}
                                                    </span>
                                                </div>
                                            </li>
                                        ) : null}
                                    </Link>
                                </div>

                                <div className='label-navs'>
                                    <Link to="/solicitacoesEnviadas" class="hover:text-green-500 ">
                                        {!isDoador || !isReceptor && userData.solicitacoesEnviadas.length > 0 ? (
                                            <li class="mb-2">
                                                <a href="#" class="hover:text-white">
                                                    <span class="material-symbols-outlined">
                                                        mark_email_read
                                                    </span>
                                                </a>
                                                <div className="flex items-center ">
                                                    <p className="mr-2">Solicitaçoes Enviadas</p>

                                                    <span className='rounded-full bg-red-500 text-white text-xs py-1 px-2 transition duration-300 ease-in-out hover:bg-red-600 hover:scale-105'>
                                                        {userData.solicitacoesEnviadas.length}
                                                    </span>

                                                </div>
                                            </li>
                                        ) : null}
                                    </Link>
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
                    {isLoading && (
                        <Alert
                            color="failure"
                            icon={HiInformationCircle}
                            onDismiss={() => closeAlert()}
                            rounded
                        >
                            <span className="font-medium">Failure !</span> Não Auteticado, carregando dados do Usuario.... !!
                        </Alert>
                    )}

                    {ispesquisa && (
                        <Alert
                            color="success"
                            icon={HiInformationCircle}
                            onDismiss={() => closeAlert()}
                            rounded
                        >
                            <span className="font-medium">Sucesso ! </span>Item Encontrado... !!
                        </Alert>
                    )}
                    <div className='titulo-homepage transition-transform transform hover:scale-95'>
                        <div className='content-educ'>
                            <div className='title-educ'>
                                <h1 className="text-6xl font-bold ">
                                    DonationMaterais System {" "}
                                    <span className="material-symbols-outlined text-green-500">park</span>
                                </h1>

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
                            <div className="flex items-center border rounded-md overflow-hidden">
                                <input
                                    type="text"
                                    id="search-input"
                                    name="pesquisa"
                                    value={pesquisa}
                                    placeholder="Pesquisar..."
                                    onChange={handleInputChange}
                                    className="px-4 py-2 w-64 focus:outline-none"
                                />

                                <button onClick={pesquisarpornome} id="btn-pesquisa" className="bg-green-500 text-white px-4 py-2">
                                    <span className="material-symbols-outlined">search</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='corpo'>
                        <div className='doacoes-titulo transition-transform transform hover:scale-95'>
                            <div className='container-titulo'>
                                <h1 class="text-4xl font-bold ">Doações Disponíveis</h1>
                                <span
                                    type='button'
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="material-symbols-outlined "
                                >
                                    expand_more
                                </span>
                            </div>
                            {IsLoadingDonation && (
                                <Alert
                                    color="failure"
                                    icon={HiInformationCircle}
                                    onDismiss={() => closeAlert()}
                                    rounded
                                >
                                    <span className="font-medium">Failure !</span> Não Esta Autorizado a realizar esta ação .... !!
                                </Alert>
                            )}

                            <div className='container-dropdown'>
                                <div className='container-drop'>
                                    {isOpen && (
                                        <ul className='dropdown-list '>
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
                            {DonationData && ispesquisa ? (
                                <div>
                                    {DonationData.map((item, index) => (
                                        <div key={index} className="card-donationsearch transition-transform transform hover:scale-105">
                                            <div>
                                                <img
                                                    className=""
                                                    src={logoimg}
                                                    alt={`Imagem do Material 1`}
                                                />
                                            </div>
                                            <div>
                                                <hr />
                                                <div className="titulocard">
                                                    <h1 className="font-bold text-xl mb-2">{item.nome}</h1>
                                                    <hr />
                                                </div>
                                                <div className='conteudo'>
                                                    <p className="font-bold text-xl mb-2">
                                                        {item.dataDoacao}.
                                                    </p>
                                                    <span className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">{item.status}</span>
                                                    <span className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white">{item.categoria}</span>
                                                </div>
                                            </div>
                                            <div className="div-btn">
                                                <button className="btn-info" onClick={() => infoDonationRoute(item)}>
                                                    <span className="material-symbols-outlined">
                                                        visibility
                                                    </span>
                                                    <div>
                                                        <p> Ver Informações</p>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null}


                            {currentItems.map((donation) => (
                                <div key={donation.id} className="card-donation transition-transform transform hover:scale-105">
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
