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


function App() {
  return (
    <div className="App">
      
        <Router>
        <div className='container-principal'>
            <header className='title'>
              <div className='logo-title' >
                <img className='logo' src={logoimg} alt="" />
                <h1>    EDUC. SUSTENTAVEL SYSTEM</h1>
              </div>
              <nav>
                <ul>
                  <Link to="/home" class="hover:text-green-500">HOME</Link >
                  <li>SOBRE</li>
                  <li>
                    <Link to="/" class="hover:text-green-500">LOGIN</Link>
                  </li>
                  <li>
                    <Link to="/cadastro" class="hover:text-green-500">CADASTRO</Link>
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
          <Route path="/home" element={<Home/>} />
          <Route path="/teladoacao" element={<CadastrarDonation/>}/>
          <Route path="/donation" element={<Donation/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
