import React from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { LogOut } from 'lucide-react';


const Header = ({ title }) => {
  const history = useHistory();

  const handleLogout = async () => {
    await signOut(auth);
    history.push('/login');
  };

  return (
    <div className="bg-blue-500 p-4 text-white px-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <button onClick={handleLogout} className="border py-2 px-4 rounded-full flex items-center hover:border-red-600 hover:bg-red-600">
        <LogOut className='mr-2'/>
        Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
