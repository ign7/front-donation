import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';




function Home() {

const navigate = useNavigate();

function getAllDonations() {
    if (selectedOption === 'TODOS') {
        axios.get('http://localhost:8080/donations/todos').then(data => {
         console.log(data);
        }).catch(error => {
            console.log(error);
        });
    }
}

function getDonationByCategoria(option) {
    if (option!='TODOS') {
        axios.get('http://localhost:8080/donations/pesquisardoacao/categoriadoacao='+option).then(data => {
         console.log(data);
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
    if(option==='TODOS'){
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
                        <h1 className='educ'>EDUC. SUSTENTAVEL SYSTEM</h1>
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

                {/* <div className='corpo'>
                        <div className='doacoes-titulo'>
                            <div className='container-titulo'>
                                <h1>Doações Disponiveis</h1>
                                <span type='button' onClick={toggleDropdown} class="material-symbols-outlined" >
                                    expand_more
                                </span>
                            </div>
                            <div className='container-select'>
                                {isOpen && (
                                    <div id='selectopen' value={selectedOption} onChange={handleOptionChange}   className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">                                       
                                        <option id='nameoption' value="TODOS"    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                            TODOS
                                        </option>
                                        <option id='nameoption' value="ELETRONICO"    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                            ELETRONICO
                                        </option>
                                        <option id='nameoption' value="MATERIALESCOLAR" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                            MATERIAL ESCOLAR
                                        </option>
                                        <option id='nameoption' value="LIVRO" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                            LIVRO
                                        </option>
                                        <option id='nameoption' value="MOCHILA" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                            MOCHILA
                                        </option>
                                        <option id='nameoption' value="UNIFORME" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                            UNIFORME
                                        </option>
                                        <option id='nameoption' value="CADERNO" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                            CADERNO
                                        </option>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div> */}

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
                </div>
            </div>
        </div>
    </div>
);
}

export default Home;
