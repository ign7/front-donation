import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';
import Cadastro from './components/user/Cadastro';



function App() {
  return (
    <div className="App">
       <Header/>     
           
          <Cadastro/>      
       <Footer/>
    </div>
  );
}

export default App;
