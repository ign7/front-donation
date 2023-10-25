
import './Cadastro.css';


//login;password;idade;email;telefone;role;

function Cadastro() {
  return (
    <div className="Cadastro">
      <div class="page">
        <form method="POST" class="formCadastro">

          <h1>Cadastro</h1>
          <p>Digite os seus dados de cadastro no sistema.</p>
          
          <div className="container">
          <div className='container-inputs'>
            <label for="nome">Nome <input type="nome" placeholder="Insira seu nome" autofocus="true" /></label>
            
          </div>

          <div className='container-inputs'>
              <label for="login">Login <input type="login"placeholder="Insira seu login" autofocus="true" /></label>
              
          </div>
          <div className='container-inputs'>
              <label for="email">E-mail <input type="email" placeholder="Insira seu e-mail" autofocus="true" /></label>
              
          </div>
          <div className='container-inputs'>
              <label for="password">Senha <input type="password" placeholder="Insira seu e-mail" /></label>          
          </div>
          <div className='container-inputs'>
              <label for="telefone">Telefone <input type="telefone" placeholder="Insira seu telefone" autofocus="true" /></label>             
          </div>
            <input type="submit" value="salvar" class="btn" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
