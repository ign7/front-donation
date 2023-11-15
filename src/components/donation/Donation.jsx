import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Donation.css';

import { Button, Modal } from 'flowbite-react';

import { HiOutlineExclamationCircle } from 'react-icons/hi';




function Donation() {
    const navigate = useNavigate();

    var nomeDonation = localStorage.getItem('nomeDonationSelecionada');



    const [listadonations, setlistadonation] = useState([]);

    const urlimg = require.context('../../img', true);

    const [openModal, setOpenModal] = useState(false);


    useEffect(() => {

        axios.get('http://localhost:8080/donations/pesquisardoacao/nomedoacao=' + nomeDonation, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('tokenjwt')}`,
            },
        }).then(response => {
            setlistadonation(response.data)
        }).catch(error => {
            console.log(error);
            alert('Ocorreu um erro durante o Donation. Por favor, tente novamente.');
        })

    }, [])


    return (
        <div className="CadastrarDonation">
            <div class="Donationpage">
                <div className='container-donationView '>

                    <div className='container-conteudo-sol'>
                        <div className='title-donation'>
                            <h1 class="text-4xl font-bold font-serif pt-4 transition-transform transform hover:scale-95 ">{nomeDonation}</h1>
                            <p className=''>Informaçoes sobre a Doação.</p>
                        </div>

                        {listadonations.map((donation) => (
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

                    <div className='solicitacao'>
                        <div className="bg-green-400 rounded flex justify-between transition-transform transform hover:scale-105 hover:bg-green-500">
                            <h1 className="text-2xl font-bold font-serif p-4 pl-6">Solicite Sua Doação Agora</h1>
                            <div className="p-4 pl-6 hover:text-green-600 transition-transform transform hover:scale-105 hover:bg-gray-300">
                                <button
                                    class="popup-modal"
                                    data-modal-target="popup-modal"
                                    data-modal-toggle="popup-modal"
                                    onClick={() => setOpenModal(true)}
                                >
                                    <span className="material-symbols-outlined">swipe_up</span>
                                    <div>
                                        <p>Solicitar</p>
                                    </div>
                                </button>
                            </div>
                        </div>


                        <span className='block'>
                            <p className=' transition-transform transform hover:scale-105 '>
                                Você está precisando de ajuda ou suporte? Fazer a solicitação de uma doação é simples e rápido. Estamos aqui para ajudar e facilitar o processo para você.

                                Para começar, visite nossa plataforma online e encontre a seção de solicitação de doações. Preencha o formulário fornecendo as informações necessárias, detalhes sobre a sua situação ou necessidade.

                                Nosso objetivo é garantir que você receba a assistência de que precisa da maneira mais eficiente possível. Assim que receberem a sua solicitação, a pessoa dedicada irá analisar e processar o seu pedido com o máximo cuidado e confidencialidade.

                                Se tiver alguma dúvida durante o processo, não hesite em entrar em contato com nossa equipe de suporte. Estamos aqui para tornar o processo de solicitação fácil e acessível para todos.

                                Lembre-se, a sua solicitação de doação é importante para nós, e estamos comprometidos em oferecer apoio em momentos difíceis. Juntos, podemos fazer a diferença.

                                Agradecemos pela confiança em nossa organização.
                            </p>
                        </span>
                    </div>
                </div>

                <div className='container-material'>

                    <div className='material'>
                        <h1 className='text-2xl font-bold  font-serif p-4 pl-6'>Materias Doação {nomeDonation}</h1>
                        {listadonations.map((donation) => (
                            <div key={donation.id} className="card--material transition-transform transform hover:scale-105">
                                {donation.materiais.map((material, index) => (
                                    <div key={index} className="">
                                        <div>
                                            <img key={index} className="" src={urlimg(`./${material.imagem}`)} alt={`Imagem do Material ${index + 1}`} />
                                        </div>
                                        <hr />
                                        <div className="titulocard">
                                            <h1 className="font-bold text-xl mb-2">{material.nome}</h1>
                                            <hr />
                                        </div>
                                        <div className='conteudo'>
                                            <p className="font-bold text-xl mb-2">
                                                {donation.dataDoacao}
                                            </p>
                                            <span className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">{donation.status}</span>
                                            <span className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white">{donation.categoria}</span>
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
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <div >

            </div>


            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                            <Modal.Header />
                            <Modal.Body>
                                <div className="text-center">
                                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                      Voce tem certeza que deseja Realizar Solicitação Desta Doação?
                                    </h3>
                                    <div className="flex justify-center gap-4">
                                        <Button color="success" onClick={() => setOpenModal(false)}>
                                            {"Sim , Eu tenho !"}
                                        </Button>
                                        <Button color="gray" onClick={() => setOpenModal(false)}>
                                            Não
                                        </Button>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>

        </div>
    );
}

export default Donation;
