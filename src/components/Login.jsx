import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { Mail, LockKeyhole } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');  // Limpa a mensagem de erro antes de tentar o login
    try {
      await signInWithEmailAndPassword(auth, email, password);
      history.push('/products');
    } catch (error) {
      console.error("Error logging in: ", error);
      setError('Falha no login. Verifique suas credenciais e tente novamente.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="src/assets/logoy.png" alt="Logo E-Tech" />
      <h2 className="text-3xl font-bold mb-6">Acesse sua conta!</h2>
      <h3 className="mb-6">Para acessar o seu marketplace, informe seus dados</h3>
      {error && <div className="bg-red-200 text-red-700 p-2 rounded mb-4">{error}</div>}
      <form onSubmit={handleLogin} className="w-full max-w-sm">
        <div className="mb-4">
          <h3 className='mb-2 flex gap-1'> <Mail strokeWidth={1.2}/> E-mail</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <h3 className='mb-2 flex gap-1'> <LockKeyhole strokeWidth={1.2}/> Senha</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-teal-500 text-white py-2 px-4 rounded-full w-full">Login</button>
      </form>
      <a href='/register' className=' mt-2 font-extralight text-gray-400 hover:text-teal-500'>Ainda não possui cadastro? Clique aqui para se cadastrar!</a>
    </div>
  );
};

export default Login;
