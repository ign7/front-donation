import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Button, Modal, Datepicker } from 'flowbite-react';

import { HiOutlineExclamationCircle } from 'react-icons/hi';


import './Solicitacao.css'



function SolicitacaoRecebida() {
  const navigate = useNavigate();

  const [listaSolicitacao, setlistaSolicitacao] = useState([]);
  const [listaSolicitacaoRecebida, setlistaSolicitacaoRecebida] = useState([]);

  const [userData, setUserData] = useState(null);

  const [solicitacaoData, setsolicitacao] = useState(null);
  const [isdoacao, setisdoacao] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {

    const login = localStorage.getItem('login');
    axios.get(`http://localhost:8080/usuarios/login=${login}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('tokenjwt')}`,
      },
    })
      .then(response => {
        console.log(response.data.doacoes.length);
        if (response.data.doacoes.length >= 1) {
          setlistaSolicitacao(response.data.doacoes);
          setisdoacao(true);
        } else {
          setisdoacao(false);
          setlistaSolicitacaoRecebida(response.data.solicitacoesRecebidas);
        }
        setUserData(response.data); // Armazena os dados do usuário no estado local

      })
      .catch(error => {
        alert('NÃO AUTORIZADO.');
        console.log(error);

      });

  }, [])


  function confirmar() {
    const idsol = solicitacaoData.solicitacao.id;
    const iddonation = solicitacaoData.id_donation;
    const receptorid = solicitacaoData.id_receptor;
    const doador_id = solicitacaoData.id_doador;

    axios.patch(
      `http://localhost:8080/solicitacoes/acepptSolicitation/solicitacaoid=${idsol}/doadorid=${doador_id}/receptorid=${receptorid}/donationid=${iddonation}`,
      null, // Passando null como corpo da requisição
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('tokenjwt')}`,
        },
      }
    )
      .then(msg => {
        alert(msg.data);
        localStorage.setItem('id_usuario_vencedor', receptorid);
        localStorage.setItem('solicitacaoaceita', msg.data);
        setOpenModal(false);
      })
      .catch(error => {
        alert(error);
        setOpenModal(false);
        console.log(error);
      });
  }

  function recusar() {
    const idsol = solicitacaoData.solicitacao.id;

    axios.patch(
      `http://localhost:8080/solicitacoes/rejeitarSolicitation/id=${idsol}`,
      null, // Passando null como corpo da requisição
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('tokenjwt')}`,
        },
      }
    )
      .then(msg => {
        alert(msg.data);
        setOpenModal(false);
      })
      .catch(error => {
        alert(error);
        setOpenModal(false);
        console.log(error);
      });
  }

  function telaconfirmação(idsolicitacao) {
    console.log(idsolicitacao);
    axios.get('http://localhost:8080/solicitacoes/solicitacaoporid/byid=' + idsolicitacao, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('tokenjwt')}`,
      },
    })
      .then(msg => {
        setOpenModal(true)
        console.log(msg.data)
        setsolicitacao(msg.data);

      }).catch(error => {

        console.log(error);
      });
  }

  return (
    <div className="CadastrarDonation bg-green-300 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-2xl">
        <div className="container-donationView">
          <div className="container-conteudo-sol">

            <div className="title-donation text-center">
              <h1 className="text-4xl font-bold font-serif mb-4 transition-transform transform hover:scale-95">Solicitações Recebidas</h1>
              <p className="text-gray-600">Solicitações Recebidas de suas Doações</p>
            </div>


            <div>
              {isdoacao ? (
                listaSolicitacao.map((doacao) => (
                  <div key={doacao.id} className="card--sol transition-transform transform hover:scale-95 bg-gray-200 p-4 mb-4 rounded-md flex flex-col justify-center items-center">
                    <div className="border-b mb-4 pb-2">
                      <h1 className="font-bold text-xl mb-2">Doação: {doacao.nome}</h1>
                    </div>

                    {doacao.donationSolicitadas && doacao.donationSolicitadas.map((solicitacao) => (
                      <div key={solicitacao.id} className="conteudo text-center">
                        <p className="font-bold text-xl mb-2">Data: {solicitacao.dataSolicitacao}</p>
                        <div className="flex mb-2 justify-center">
                          <span className="inline-block bg-yellow-300 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2">{solicitacao.role}</span>
                        </div>
                        <div className="mb-4">
                          <label className="font-semibold">Descrição:</label>
                          <p className="text-gray-700">{solicitacao.observacao}</p>
                        </div>

                        <div className="flex justify-center items-center mt-4">
                          <button disabled className="btn-info">
                            <span className="material-symbols-outlined">settings</span>
                            <div>
                              <p>Configurações</p>
                            </div>
                          </button>
                          <button onClick={() => telaconfirmação(solicitacao.id)} className="bg-green-500 text-white py-2 px-4 rounded-md ml-2">Aceitar</button>
                          <button disabled className="bg-gray-500 text-white py-2 px-4 rounded-md ml-2">Disabled</button>
                        </div>
                      </div>
                    ))}
                  </div>

                ))
              ) : (
                listaSolicitacaoRecebida.map((solicitacao) => (
                  <div key={solicitacao.id} className="card--sol transition-transform transform hover:scale-95 bg-gray-200 p-4 mb-4 rounded-md">
                    <div className="">
                      <div className="border-b mb-4 pb-2">
                        <h1 className="font-bold text-xl mb-2">Solicitação Recebida: {solicitacao.id}</h1>
                      </div>

                      <div className="conteudo">
                        <p className="font-bold text-xl mb-2">Data: {solicitacao.dataSolicitacao}</p>
                        <div className="flex mb-2">
                          <span className="inline-block bg-yellow-300 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2">{solicitacao.role}</span>
                        </div>
                        <div className="mb-4">
                          <label className="font-semibold">Descrição:</label>
                          <p className="text-gray-700">{solicitacao.observacao}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <button disabled className="btn-info ">
                          <span className="material-symbols-outlined">settings</span>
                          <div>
                            <p>Configurações</p>
                          </div>
                        </button>
                        {/* Adicione mais lógica se necessário para as ações relacionadas à solicitação recebida */}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>



          </div>

        </div>
      </div>

      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-green-500 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-green-700 dark:text-gray-400">
              Sua solicitação será enviada para o doador, apos a confirmação !!
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="success" onClick={() => confirmar()}>
                {"Aceitar"}
              </Button>
              <Button color="gray" onClick={() => recusar()}>
                Recusar
              </Button>
            </div>
          </div>

        </Modal.Body>
      </Modal>
    </div>



  );
}

export default SolicitacaoRecebida;
