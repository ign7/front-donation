import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './Donation.css';



function CadastrarDonation() {
  const navigate = useNavigate();

  const [mostrarFormularioMateriais, setMostrarFormularioMateriais] = useState(false);
  const [msgmaterial, setmsgmaterial] = useState(false);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [doacaoSucesso, setdoacaoSucesso] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [material, setmaterial] = useState({
    'nome': '',
    'qualidade': '',
    'quantidade': 0,
    'descricao': '',
  });

  const handleImagemChange = (event) => {
    const file = event.target.files[0];
    setImagemSelecionada(file);
  };

  const exibirMensagemSucesso = () => {
    setmsgmaterial(true);


    setTimeout(() => {
      setmsgmaterial(false);
    }, 10000);
  };

  const exibirMensagemSucessoDoacao = () => {
    setdoacaoSucesso(true);
    setTimeout(() => {
      setdoacaoSucesso(false);
    }, 5000);
  };


  function salvar(event) {
    event.preventDefault();
  
    const token = localStorage.getItem('tokenjwt');
    const iddonation = localStorage.getItem('iddonation');
    const formData = new FormData();
    formData.append('material', JSON.stringify(material));
    if (imagemSelecionada) {
      formData.append('imagem', imagemSelecionada);
    }
    axios.post(`http://localhost:8080/materiais/cadastrarmaterial/donationid=${iddonation}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    })
      .then(result => {
        // Resetar os campos do formulário após o envio bem-sucedido
        setmaterial({
          nome: '',
          qualidade: '',
          quantidade: '',
          descricao: ''
        });
        setImagemSelecionada(null);
        exibirMensagemSucesso();
      })
      .catch(error => {
        console.error(error);
      });
  }
  



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setmaterial({ ...material, [name]: value });
  };

  const qualidadeOpcoes = [
    'PERFEITO',
    'BOMESTADO',
    'USADO',
    'RUIM'
  ];

  const [CadastrarDonationstate, setCadastrarDonation] = useState({
    'nome': '',
    'dataDoacao': '',
    'categoria': ''
  });

  const [donations, setlistadonation] = useState([]);


  const options = [
    'ELETRONICO',
    'MATERIALESCOLAR',
    'LIVRO',
    'MOCHILA',
    'UNIFORME',
    'CADERNO'
  ];


  function handle(event) {
    const { name, value } = event.target;
    setCadastrarDonation({ ...CadastrarDonationstate, [name]: value });
  }


  function Cadastrardonation(event) {
    event.preventDefault();
    const login = localStorage.getItem('login');
    const token = localStorage.getItem('tokenjwt');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    axios.post(`http://localhost:8080/donations/cadastrardonation/${login}`, CadastrarDonationstate, config)
      .then(response => {
        setlistadonation(response.data)
        const iddonation = response.data.id;
        localStorage.setItem('iddonation', iddonation);
        exibirMensagemSucessoDoacao();
        setMostrarFormularioMateriais(true);
        setIsDisabled(true);
      })
      .catch(error => {
        console.log(error);
        alert('Algo deu errado ao cadastrar a doação');
      });
  }

  function btnsair(){
    navigate('/home');     
  }

  return (
    <div className="CadastrarDonation">
      <div class="Donationpage">
        <div className='container-donation'>

          <div className='form-container'>
            <form className="bg-white p-8 rounded shadow-md w-96 hover:bg-gray-100" >
              <h2 className="text-2xl mb-6 font-semibold text-gray-800">Formulário de Doação</h2>
              <div className="mb-4 flex gap-4">
                <div className="flex-1">
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-600">Nome:</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={CadastrarDonationstate.nome}
                    disabled={isDisabled}
                    onChange={handle}
                    className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="dataDoacao" className="block text-sm font-medium text-gray-600">Data de Doação:</label>
                  <input
                    type="date"
                    id="dataDoacao"
                    name="dataDoacao"
                    value={CadastrarDonationstate.dataDoacao}
                    disabled={isDisabled}
                    onChange={handle}
                    className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="categoria" className="block text-sm font-medium text-gray-600">Categoria:</label>
                <select id="categoria" name="categoria" value={CadastrarDonationstate.categoria} disabled={isDisabled}  onChange={handle}
                  className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="">Selecione uma categoria</option>
                  {options.map((categoria) => (
                    <option key={categoria.value} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </select>
              </div>
              <button onClick={Cadastrardonation} disabled={isDisabled} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                Registrar
              </button>
            </form>
          </div>
          <div className='conteudo-doaçao'>

            <div className='title-donation'>
              <h1 class="text-5xl font-bold p ">Realizar cadastro de Doaçao</h1>
            </div>
            <p >A doação de materiais escolares desempenha um papel crucial em nossa sociedade, ajudando a construir um futuro melhor para as gerações vindouras. Ao contribuir com materiais escolares, você está investindo no acesso à educação e no desenvolvimento de habilidades fundamentais para pessoas necessitadas e jovens. ao doar materiais escolares, você está não apenas fornecendo recursos tangíveis, mas também investindo no potencial humano.
              Sua generosidade cria um impacto positivo nas vidas das pessoas, capacitando-as a sonhar alto, alcançar seus objetivos e, eventualmente, contribuir significativamente para a sociedade. Cada doação conta e ajuda a construir um futuro mais brilhante e educado para todos.</p>
          </div>
        </div>
        <hr />
        <div className='container-material-donation'>
          {mostrarFormularioMateriais && (
            <div className='conteudo-material'>
              <div className='info-material'>
                <h1 class="text-4xl font-bold p ">Agora vamos realizar o cadastro dos Materiais da Doação</h1>
              </div>
              <p>Ao terminar de cadastrar a Doação temos que cadastrar os materiais vinculados a mesma !!</p>
              {msgmaterial && (
                <div className='view-msg-material'>
                  <span className='fixed top-0 right-0 p-4 bg-green-500 text-white rounded shadow'>
                    material cadastrado com sucesso, caso queira cadastrar outro preencha o form novamente !!
                  </span>

                </div>
              )}

              <div className='btn-sair'>
                <button onClick={btnsair} className="w-500 bg-red-500 text-white p-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300" >Sair</button>
              </div>
            </div>
          )}

          <div className="container-material">
            {mostrarFormularioMateriais && (
              <div className="bg-white p-8 rounded shadow-md w-96 mx-auto mt-8">
                <h2 className="text-2xl mb-6 font-semibold text-gray-800">Cadastro de Materiais</h2>
                <form>
                  <div className="mb-4 flex gap-4">
                    <div className="flex-1">
                      <label htmlFor="nome" className="block text-sm font-medium text-gray-600">Nome:</label>
                      <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={material.nome}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="qualidade" className="block text-sm font-medium text-gray-600">Qualidade:</label>
                      <select
                        id="qualidade"
                        name="qualidade"
                        value={material.qualidade}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
                      >
                        <option value="">Selecione a qualidade</option>
                        {qualidadeOpcoes.map((opcao, index) => (
                          <option key={index} value={opcao}>
                            {opcao}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="imagem" className="block text-sm font-medium text-gray-600">Imagem:</label>
                    <input
                      type="file"
                      id="imagem"
                      name="imagem"
                      onChange={handleImagemChange}
                      className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="quantidade" className="block text-sm font-medium text-gray-600">Quantidade:</label>
                    <input
                      type="number"
                      id="quantidade"
                      name="quantidade"
                      value={material.quantidade}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="descricao" className="block text-sm font-medium text-gray-600">Descrição:</label>
                    <textarea
                      id="descricao"
                      name="descricao"
                      value={material.descricao}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                  <button
                    onClick={salvar}
                    className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    Cadastrar Material
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      {doacaoSucesso && (
        <div className='fixed top-0 right-0 p-4 bg-blue-500 text-white rounded shadow'>
          <p>Cadastro de Doação Realizado com sucesso !!</p>
        </div>)}
    </div>
  );
}

export default CadastrarDonation;
