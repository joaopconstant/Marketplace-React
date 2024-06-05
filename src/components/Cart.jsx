import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Header from './Header';
import { onAuthStateChanged } from 'firebase/auth';
import { Check, HandCoins, Minus } from 'lucide-react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        const fetchCart = async () => {
          const cartRef = doc(db, 'carts', user.uid);
          const cartDoc = await getDoc(cartRef);

          if (cartDoc.exists()) {
            setCartItems(cartDoc.data().items);
          }
        };
        fetchCart();
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handleRemoveFromCart = async (productId) => {
    try {
      const cartRef = doc(db, 'carts', user.uid);
      const cartDoc = await getDoc(cartRef);

      if (cartDoc.exists()) {
        const cartData = cartDoc.data();
        const updatedCart = cartData.items.filter(item => item.id !== productId);
        await updateDoc(cartRef, { items: updatedCart });
        setCartItems(updatedCart);
      }
    } catch (error) {
      console.error("Error removing from cart: ", error);
    }
  };

  const handleCheckout = async () => {
    if (user) {
      try {
        // Limpar o carrinho após finalizar a compra
        const cartRef = doc(db, 'carts', user.uid);
        await updateDoc(cartRef, { items: [] });
        setCartItems([]);
        alert("Compra finalizada com sucesso!");
      } catch (error) {
        console.error("Error during checkout: ", error);
      }
    }
  };

  return (
    <>
      <Header title="Carrinho" />
      <div className="px-20 py-5">
        <h2 className="text-xl font-medium py-6">Meu Carrinho</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-700">Seu carrinho está vazio.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
              {cartItems.map((item) => (
                <div key={item.id} className="border border-gray-300 rounded-3xl p-4 bg-white flex flex-col gap-2">
                  {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-full h-80 object-cover rounded-2xl" />}
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-gray-700 font-semibold">{item.description}</p>
                  <p className="text-teal-500 flex gap-1 font-bold"><HandCoins/> Preço: R$ {item.price}</p>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="border border-red-500 text-red-500 py-2 px-4 rounded-full mt-2 hover:bg-red-500 hover:text-white flex gap-2 justify-center"
                  >
                    <Minus strokeWidth={1.2}/>Remover do Carrinho
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white font-medium py-2 px-4 rounded-full mt-2 hover:bg-green-700 flex gap-2"
            >
              <Check/>Finalizar Compra
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
