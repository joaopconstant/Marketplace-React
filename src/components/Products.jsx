import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase';
import { collection, deleteDoc, getDoc, doc, onSnapshot, query, setDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import Header from './Header';
import { HandCoins, Phone, Plus, ShoppingCart } from 'lucide-react';
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

  const handleDeleteProduct = async (id, imageUrl) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  return (
    <>
      <Header title="Produtos" />
      <div className="px-20 py-5">
        <img src="src/assets/banner.png" alt="Banner" className="rounded-2xl mt-5" />
        <div className="flex justify-between items-center py-6">
          <h2 className="text-xl font-medium">Todos os anúncios</h2>
          <a href='/addproducts' className="bg-teal-500 text-white py-2 px-4 rounded-full flex gap-2"><Plus/> Anunciar</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} userId={user?.uid} onDelete={handleDeleteProduct} />
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

  const handleAddToCart = async () => {
    try {
      const cartRef = doc(db, 'carts', userId);
      const cartDoc = await getDoc(cartRef);

      if (cartDoc.exists()) {
        const cartData = cartDoc.data();
        const updatedCart = cartData.items ? [...cartData.items, product] : [product];
        await setDoc(cartRef, { items: updatedCart }, { merge: true });
      } else {
        await setDoc(cartRef, { items: [product] });
      }
    } catch (error) {
      console.error("Error adding to cart: ", error);
    }
  };

  return (
    <div className="border border-gray-300 rounded-3xl p-4 bg-white flex flex-col gap-2">
      {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="w-full h-80 object-cover rounded-2xl" />}
      <h3 className="text-xl font-bold">{product.name}</h3>
      <p className="text-gray-700 font-semibold">{product.description}</p>
      <p className="text-teal-500 flex gap-1 font-bold"><HandCoins /> Preço: R$ {product.price}</p>
      <p className="text-gray-700 flex gap-1 font-bold"><Phone /> Telefone: {userPhone}</p>
      <button
        onClick={handleAddToCart}
        className="flex justify-center gap-2 bg-green-500 text-white py-2 px-4 rounded-full mt-2 hover:bg-green-700"
      >
        <ShoppingCart strokeWidth={1.2}/>Adicionar ao Carrinho
      </button>
      {product.userId === userId && (
        <button
          onClick={() => onDelete(product.id, product.imageUrl)}
          className="border border-gray-700 text-gray-700 max-w-20 py-1 px-2 rounded mt-2 hover:bg-red-500 hover:border-red-500 hover:text-white"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default Products;
