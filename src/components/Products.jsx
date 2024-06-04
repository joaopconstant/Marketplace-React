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
      });
      return () => unsubscribeSnapshot();
    });

    return () => unsubscribeAuth();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'products'), {
        name: productName,
        price: productPrice,
        description: productDescription,
        userId: user.uid,
      });
      setProductName('');
      setProductPrice('');
      setProductDescription('');
    } catch (error) {
      console.error('Error adding product: ', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (error) {
      console.error('Error deleting product: ', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <button onClick={handleLogout}>Logout</button>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product Name"
          required
        />
        <input
          type="text"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          placeholder="Product Price"
          required
        />
        <textarea
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          placeholder="Product Description"
          required
        />
        <button type="submit">Add Product</button>
      </form>
      <ul>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} userId={user && user.uid} onDelete={handleDeleteProduct} />
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
        setUserPhone(userDoc.data().phone)
      }
    }
    fetchUserPhone();
  }, [product.userId])

  return (
    <li>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Telefone do Vendedor: {userPhone}</p>
      {product.userId === userId && <button onClick={() => onDelete(product.id)}>Delete</button>}
    </li>
  );
};

export default Products;
