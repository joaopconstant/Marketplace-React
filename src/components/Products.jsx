import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    const unsubscribeSnapshot = onSnapshot(collection(db, 'products'), (snapshot) => {
      const productsData = [];
      snapshot.forEach((doc) => productsData.push({ ...doc.data(), id: doc.id }));
      setProducts(productsData);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeSnapshot();
    };
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        await addDoc(collection(db, 'products'), {
          name: productName,
          userId: user.uid,
        });
        setProductName('');
      } else {
        console.error("User is not logged in");
      }
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product Name"
        />
        <button type="submit">Add Product</button>
      </form>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name}
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Products;
