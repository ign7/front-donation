import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Donation.css';

import { HiEye, HiInformationCircle } from 'react-icons/hi';
import { Alert } from 'flowbite-react';



function MyDonation() {
    const navigate = useNavigate();

    var nomeMyDonation = localStorage.getItem('nomeDonationSelecionada');
    var idauteticateduser = localStorage.getItem('usuarioauteticado');


    const [listaMyDonations, setlistaMyDonation] = useState([]);

    const urlimg = require.context('../../img', true);
    const [isReceptor, setIsReceptor] = useState(false);
    const [msgrecebidaData, setmsgrecebidaData] = useState(null);

    function closeAlert() {
        setIsReceptor(false);
    }


    useEffect(() => {
        const login = localStorage.getItem('login');
        axios.get('http://localhost:8080/donations/pesquisardoacao/iduser=' + idauteticateduser, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('tokenjwt')}`,
            },
        }).then(response => {

            setlistaMyDonation(response.data)
            console.log(response.data);

            axios.get(`http://localhost:8080/usuarios/login=${login}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('tokenjwt')}`,
                },
            })
                .then(msg => {
                    console.log(msg.data);
                    if (msg.data.msgDoacaoConfirmada != null && msg.data.role === 'RECEPTOR') {
                        setIsReceptor(true);
                        setmsgrecebidaData(msg.data.msgDoacaoConfirmada);
                    }

                })
        }).catch(error => {
            console.log(error);
            alert('NOT DONATION.');
        })
    }, [])

    const [showMaterials, setShowMaterials] = useState({});

    const toggleMaterialsVisibility = (donationId) => {
        setShowMaterials((prevShowMaterials) => ({
            ...prevShowMaterials,
            [donationId]: !prevShowMaterials[donationId],
        }));
    };

    return (

        <div className="Cadastrar MyDonation">

            <div class=" MyDonationpage">
                <div className='container- MyDonationView '>

                    <div className='container-conteudo-sol'>
                        <div className='title-MyDonation'>
                            <h1 class="text-4xl font-bold font-serif pt-4 transition-transform transform hover:scale-95 ">Minhas Doaçoes</h1>
                            <p className=''>Informaçoes sobre a Doação.</p>
                        </div>

                        <div className='container-material'>
                            <div className='material'>

                                {listaMyDonations.map((MyDonation) => (
                                    <div key={MyDonation.id}>
                                        {/* Renderiza o cartão de doação */}
                                        <div className="card--soldonation transition-transform transform hover:scale-105">
                                            <div className='p-4'>
                                                {isReceptor && (
                                                    <Alert
                                                        color="info"
                                                        icon={HiInformationCircle}
                                                        onDismiss={() => closeAlert()}
                                                        rounded
                                                    >
                                                        <span className="font-medium">Parabens !</span> {msgrecebidaData}
                                                    </Alert>
                                                )}
                                            </div>
                                            <div className="">
                                                <hr />
                                                <div className="titulocard">
                                                    <h1 className="font-bold text-xl mb-2">{MyDonation.nome}</h1>
                                                    <hr />
                                                </div>
                                                <div className='conteudo'>
                                                    <p className="font-bold text-xl mb-2">
                                                        {MyDonation.dataDoacao}
                                                    </p>
                                                    <span className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">{MyDonation.status}</span>
                                                    <span className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white">{MyDonation.categoria}</span>
                                                </div>
                                            </div>
                                            <div className="div-btn">
                                                {/* Ícone para mostrar/ocultar materiais */}
                                                <button
                                                    className="btn-info"
                                                    onClick={() => toggleMaterialsVisibility(MyDonation.id)} // Função para alternar visibilidade
                                                >
                                                    <span className="material-symbols-outlined">
                                                        {showMaterials[MyDonation.id] ? 'expand_less' : 'expand_more'}
                                                    </span>
                                                    <div>
                                                        <p className='font-bold'>Materiais</p>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Renderiza os materiais relacionados à doação */}
                                        {showMaterials[MyDonation.id] && (
                                            <div className="card--material transition-transform transform hover:scale-95 ">
                                                {MyDonation.materiais.map((material, index) => (
                                                    <div key={index} className=" text-center mb-8  transition-transform transform hover:scale-95 hover:bg-green-200">
                                                        <div>
                                                            <img key={index} className="mx-auto" src={urlimg(`./${material.imagem}`)} alt={`Imagem do Material ${index + 1}`} />
                                                        </div>
                                                        <div className="mt-4">
                                                            <div className="titulocard">
                                                                <h1 className="font-bold text-xl mb-2">{material.nome}</h1>
                                                                <hr />
                                                            </div>
                                                            <div className='conteudo mb-4'>
                                                                <p className="font-bold text-xl mb-2">
                                                                    {material.dataDoacao}
                                                                </p>
                                                                <span className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">{material.qualidade}</span>
                                                                <span className="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">{material.quantidade}</span>
                                                            </div>
                                                            <div className="text-center mt-2">
                                                                <span className="inline-block   px-3 py-1 text-sm font-semibold ">{material.descricao}</span>
                                                            </div>
                                                            <div className="div-btn mt-4">
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

                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
}

export default MyDonation;
