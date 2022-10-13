import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import ResumoCompra from './pages/ResumoCompra';
import ShoppingCart from './pages/ShoppingCart';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/shoppingcart" component={ ShoppingCart } />
          <Route exact path="/product/:id" component={ ProductDetail } />
          <Route path="/resumocompra" component={ ResumoCompra } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
