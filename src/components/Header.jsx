import React from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { LogOut, Search, ShoppingCart } from 'lucide-react';


const Header = ({ title }) => {
  const history = useHistory();

  const handleLogout = async () => {
    await signOut(auth);
    history.push('/login');
  };

  return (
    <div className="bg-zinc-800 p-4 text-white px-20">
      <div className="flex justify-between items-center">
        <div className='flex items-center'>
          <img src="src\assets\logox.png" className=' h-10' />
          <h1 className="text-3xl">{title}</h1>
        </div>
        <div className='flex items-center gap-5'>
          <a href=""><Search/></a>
          <a href=""><ShoppingCart/></a>
          <button onClick={handleLogout} className="border py-2 px-4 rounded-full flex items-center hover:border-red-500 hover:bg-red-500">
            <LogOut className='mr-2'/>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
