import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Mail, LockKeyhole, Phone } from 'lucide-react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Adicionar o número de telefone ao Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        phone: phone,
      });
    } catch (error) {
      console.error("Error registering: ", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-6">Crie sua conta!</h2>
      <h3 className='mb-6'>Informe os seus dados</h3>
      <form onSubmit={handleRegister} className="w-full max-w-sm">
        <div className="mb-4">
          <h3 className='mb-2 flex gap-1'> <Mail strokeWidth={1.2}/> E-mail</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seumelhor@email.com"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <h3 className='mb-2 flex gap-1'> <Phone strokeWidth={1.2}/> Celular</h3>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(00) 00000-0000"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <h3 className='mb-2 flex gap-1'> <LockKeyhole strokeWidth={1.2}/> Senha</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Uma senha forte"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">Concluir Cadastro</button>
      </form>
      <a href='/login' className=' mt-2 font-extralight text-gray-400 hover:text-blue-500'>Já possui cadastro? Acesse sua conta!</a>
    </div>
  );
}

export default Register;
