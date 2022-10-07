import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <Link to="/shoppingcart" data-testid="shopping-cart-button">
          <button type="button">
            Carrinho de compras
          </button>
        </Link>
      </div>
    );
  }
}

export default Home;
