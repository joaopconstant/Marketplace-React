import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import Header from './Header';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(db, 'products'), {
          name: productName,
          price: productPrice,
          description: productDescription,
          userId: user.uid,
        });
        setProductName('');
        setProductPrice('');
        setProductDescription('');
      }
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  return (
    <>
    <Header title={'Adicionar Anúncio'}/>
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-6">Criar novo anúncio</h2>
      <form onSubmit={handleAddProduct} className="w-full max-w-sm">
        <div className="mb-4">
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Nome do Produto"
            className="border border-gray-300 rounded-md p-2 w-full"
            required
            />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder="Valor do Produto"
            className="border border-gray-300 rounded-md p-2 w-full"
            required
            />
        </div>
        <div className="mb-4">
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Descrição do Produto"
            className="border border-gray-300 rounded-md p-2 w-full"
            required
            />
        </div>
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded w-full">Adicionar Anúncio</button>
      </form>
      <a href="/products" className='mt-2 font-extralight text-gray-400 hover:text-blue-500'>Clique aqui para voltar</a>
    </div>
    </>
  );
};

export default AddProduct;
