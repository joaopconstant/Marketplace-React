import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      const unsubscribeSnapshot = onSnapshot(collection(db, 'products'), (snapshot) => {
        const productsData = [];
        snapshot.forEach((doc) => productsData.push({ ...doc.data(), id: doc.id }));
        setProducts(productsData);
      })
      return () => unsubscribeSnapshot();
    })

    return () => unsubscribeAuth();
  }, [])

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'products'), {
        name: productName,
        price: productPrice,
        description: productDescription,
        userId: user.uid,
      })
      setProductName('');
      setProductPrice('');
      setProductDescription('');
    } catch (error) {
      console.error('Error adding product: ', error);
    }
  }

  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (error) {
      console.error('Error deleting product: ', error);
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-6">Products</h2>
      <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
      <form onSubmit={handleAddProduct} className="my-6">
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
            className="border border-gray-300 rounded-md p-2"
            required
          />
          <input
            type="text"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder="Product Price"
            className="border border-gray-300 rounded-md p-2"
            required
          />
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Product Description"
            className="border border-gray-300 rounded-md p-2"
            required
          />
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Add Product</button>
        </div>
      </form>
      <ul>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} userId={user.uid} onDelete={handleDeleteProduct} />
        ))}
      </ul>
    </div>
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
    <li className="border rounded-md p-4 my-4">
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="mb-2">{product.description}</p>
      <p className="mb-2">Price: R$ {product.price}</p>
      <p className="mb-2">Seller's Phone: {userPhone}</p>
      {product.userId === userId && (
        <button onClick={() => onDelete(product.id)} className="bg-red-500 text-white py-2 px-4 rounded">Delete</button>
      )}
    </li>
  );
};

export default Products;
