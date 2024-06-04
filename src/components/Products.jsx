import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
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

  const handleDeleteProduct = async (id, userId) => {
    try {
      if (user && user.uid === userId) {
        await deleteDoc(doc(db, 'products', id));
      } else {
        console.error("User is not authorized to delete this product");
      }
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
            {user && user.uid === product.userId && (
              <button onClick={() => handleDeleteProduct(product.id, product.userId)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Products;
