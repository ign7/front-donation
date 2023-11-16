import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Donation.css';

import { Button, Modal, Datepicker } from 'flowbite-react';

import { HiOutlineExclamationCircle } from 'react-icons/hi';




function Donation() {
    const navigate = useNavigate();

    var nomeDonation = localStorage.getItem('nomeDonationSelecionada');

    const [cadastro, setcadastro] = useState({
        'dataSolicitacao': '',
        'observacao': ''
      });



      function handle(sol){
        setcadastro({...cadastro,[sol.target.name]:sol.target.value})
      }
      
        
      


    function solicitar(){
        const donoid=localStorage.getItem('donoDonationId');
        const donation_id=localStorage.getItem('DonationId');
        const receptor_id=localStorage.getItem('usuarioauteticado');

         axios.post(`http://localhost:8080/solicitacoes/realizarsolicitacao/doadorid=${donoid}/receptorid=${receptor_id}/donationid=${donation_id}`,cadastro).then(
            solicitacao=>{
                setOpenModal(false);
                console.log(solicitacao.data);
            }).catch(error=>{
                console.log(error);
                alert(error.response.data);
             }) 
        
    }


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

        axios.get('http://localhost:8080/donations/pesquisardoacao/getuserbynomeDonation='+nomeDonation).then(
            user=>{
                console.log(user.data);
                localStorage.setItem('donoDonationId',user.data.id);
            }
        )

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
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-green-500 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-green-700 dark:text-gray-400">
                            Sua solicitação será enviada para o doador, apos a confirmação !!
                        </h3>
                        <div className="my-6 mx-4 p-4  dark:bg-gray-800 rounded-lg">

                            <label htmlFor="descricaoSolicitacao" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4 mb-2">
                                Data Solicitação
                            </label>
                            <input   
                                                         
                                type="date"
                                id="dataSolicitacao"
                                name="dataSolicitacao" value={cadastro.dataSolicitacao} onChange={handle}  
                                className="w-full p-2 border border-gray-300 rounded-md cursor-not-allowed focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                            />

                            <label  htmlFor="descricaoSolicitacao" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4 mb-2">
                                Descrição
                            </label>
                            <textarea name="observacao" value={cadastro.observacao} onChange={handle}
                                className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 dark:bg-gray-700 dark:border-gray-600"
                                placeholder="Descreva porque voce quer esta doação, a descrição é uma parte muito importante, para o doador saber os motivos reais 
                                do porque voce esta solicitando estes materiais ..."
                            ></textarea>
                        </div>
                        <div className="flex justify-center gap-4">
                            <Button color="success" onClick={() => solicitar()}>
                                {"Enviar "}
                            </Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                Não enviar
                            </Button>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>

        </div>
    );
}

export default Donation;
