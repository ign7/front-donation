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


    return (

        <div className="Cadastrar MyDonation">
            {isReceptor && (
                        <Alert
                            color="warning"
                            icon={HiInformationCircle}
                            onDismiss={() => alert('Alert dismissed!')}
                            rounded
                        >
                            <span className="font-medium">Parabens !</span> {msgrecebidaData}
                        </Alert>
                    )}
            <div class=" MyDonationpage">
                <div className='container- MyDonationView '>

                    <div className='container-conteudo-sol'>
                        <div className='title- MyDonation'>
                            <h1 class="text-4xl font-bold font-serif pt-4 transition-transform transform hover:scale-95 ">{nomeMyDonation}</h1>
                            <p className=''>Informaçoes sobre a Doação.</p>
                        </div>

                        {listaMyDonations.map((MyDonation) => (
                            <div key={MyDonation.id} className="card--sol transition-transform transform hover:scale-105">
                                <div className="">
                                    <hr />
                                    <div className="titulocard">
                                        <h1 class="font-bold text-xl mb-2" >{MyDonation.nome}</h1>
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

                <div className='container-material'>

                    <div className='material'>
                        <h1 className='text-2xl font-bold  font-serif p-4 pl-6'>Materias Doação {nomeMyDonation}</h1>
                        {listaMyDonations.map((MyDonation) => (
                            <div key={MyDonation.id} className="card--material transition-transform transform hover:scale-105">
                                {MyDonation.materiais.map((material, index) => (
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
                                                {MyDonation.dataDoacao}
                                            </p>
                                            <span className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">{MyDonation.status}</span>
                                            <span className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white">{MyDonation.categoria}</span>
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
        </div>
    );
}

export default MyDonation;
