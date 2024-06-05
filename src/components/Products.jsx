import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, deleteDoc, getDoc, doc, onSnapshot, query } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Header from './Header';
import { HandCoins, Phone } from 'lucide-react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        const productsRef = collection(db, 'products');
        const q = query(productsRef);
        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          const productsData = [];
          snapshot.forEach((doc) => productsData.push({ ...doc.data(), id: doc.id }));
          setProducts(productsData);
        });
        return () => unsubscribeSnapshot();
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handleClick = () => {
    history.push('/addproducts')
  }

  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  return (
    <>
    <Header title="Products" />
    <div className="px-20 py-5">
      <div className='flex justify-between items-center py-5'>
        <h2 className='text-xl'>Todos os anúncios</h2>
        <button className="bg-blue-500 text-white max-w-20 py-1 px-2 rounded mt-2" onClick={handleClick}>Anunciar</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} userId={user.uid} onDelete={handleDeleteProduct} />
        ))}
      </div>
    </div>
    </>
  );
};

const ProductCard = ({ product, userId, onDelete }) => {
  const [userPhone, setUserPhone] = useState('');

  useEffect(() => {
    const fetchUserPhone = async () => {
      const userDoc = await getDoc(doc(db, 'users', product.userId));
      if (userDoc.exists()) {
        setUserPhone(userDoc.data().phone);
      }
    };
    fetchUserPhone();
  }, [product.userId]);

  return (
    <div className="border border-gray-300 rounded-3xl p-4 bg-white flex flex-col gap-2">
      <h3 className="text-xl font-bold">{product.name}</h3>
      <p className="text-gray-700 font-semibold">{product.description}</p>
      <p className="text-green-500 flex gap-1 font-bold"> <HandCoins/> Preço: R$ {product.price}</p>
      <p className="text-gray-700 flex gap-1 font-bold"> <Phone/> Telefone: {userPhone}</p>
      {product.userId === userId && <button onClick={() => onDelete(product.id)} className="bg-red-500 text-white max-w-20 py-1 px-2 rounded mt-2">Delete</button>}
    </div>
  );
};

export default Products;
