
import './Login.css';

function Login() {
  return (
    <div className="Login">
        <div class="page">
            <form method="POST" class="formLogin">
                <h1>Login</h1>
                <p>Digite os seus dados de acesso no campo abaixo.</p>
                <label for="email">E-mail</label>
                <input type="email" placeholder="Digite seu e-mail" autofocus="true" />
                <label for="password">Senha</label>
                <input type="password" placeholder="Digite seu e-mail" />
                <a href="/">Esqueci minha senha</a>
                <input type="submit" value="Acessar" class="btn" />
                <input type="submit" value="Cadastre-se" class="btn" />
            </form>
        </div>            
    </div>
  );
}

export default Login;
