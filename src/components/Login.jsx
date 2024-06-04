import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      history.push('/products')
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  }


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-6">Acesse sua conta!</h2>
      <h3 className="mb-6">Para acessar o TechHub, informe seus dados</h3>
      <form onSubmit={handleLogin} className="w-full max-w-sm">
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">Login</button>
      </form>
      <a href='/register' className=' mt-2 font-extralight text-gray-400 hover:text-blue-500'>Ainda não possui cadastro? Clique aqui para se cadastrar!</a>
    </div>
  );
}

export default Login;
