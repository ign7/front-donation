import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Cadastro from './components/user/Cadastro';
import Donation from './components/donation/Donation';
import CadastrarDonation from './components/donation/CadastrarDonation';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logoimg from './img/LogoDonation.jpeg'
import avatar from './img/default-avatar.png'
import MyDonation from './components/donation/MyDonation'
import SolicitacaoRecebida from './components/solicitacoes/SolicitacaoRecebida';
import SolicitacaoEnviada from './components/solicitacoes/SolicitacoesEnviadas';




function App() {
  return (
    <div className="App">

      <Router>
        <div className=''>
          <header className='title  rounded-b-md border-b border-white-300 font-serif'>
            <div className='logo-title flex items-center'>
              <img className='logo mr-3  rounded-full border border-gray-300' src={logoimg} alt="" />
              <h1 className="font-bold text-2xl sm:text-3xl">DonationMaterias</h1>
            </div>
            <nav>
              <ul className="font-sans">
                <Link to="/home" className="hover:text-green-500">HOME</Link>
                <li>SOBRE</li>
                <li>
                  <Link to="/" className="hover:text-green-500">LOGIN</Link>
                </li>
                <li>
                  <Link to="/cadastro" className="hover:text-green-500">CADASTRO</Link>
                </li>
              </ul>
            </nav>
          </header>
        </div>

        <div>
          <Footer />
        </div>
        <Routes>
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/teladoacao" element={<CadastrarDonation />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/minhasdoacoes" element={<MyDonation />} />
          <Route path="/solicitacoesRecebedidas" element={<SolicitacaoRecebida />} />
          <Route path="/solicitacoesEnviadas" element={<SolicitacaoEnviada />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
