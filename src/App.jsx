import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/Products';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { auth } from './firebase';
import './App.css';
import AddProduct from './components/AddProduct';

function App() {
  const [user, setUser] = useState(null);

  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  })

  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          {/* Proteja as rotas se o usuário não estiver logado */}
          <Route path='/addproducts' render={() => (
            user ? <AddProduct /> : <Login />
          )} />
          <Route path='/products' render={() => (
            user ? <Products /> : <Login />
          )} />
          <Route path='/' exact component={Login} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
