import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';
import Cadastro from './components/user/Cadastro';
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import logoimg from './img/LogoDonation.jpeg'



function App() {
  return (
    <div className="App">
      {/* <Header/>  */}
      <Router>
        <div className='title'>
          <header>
            <div className='logo-title' >
              <img className='logo' src={logoimg} alt="" />
              <h1>Donation System</h1>
            </div>

            <nav>
              <ul>
                <li>HOME</li>
                <li>SOBRE</li>
                <li>
                  <Link to="/">LOGIN</Link>
                </li>
                <li>
                  <Link to="/cadastro">CADASTRO</Link>
                </li>
              </ul>
            </nav>
          </header>
        </div>
        <Routes>
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>




      <Footer />
    </div>
  );
}

export default App;
