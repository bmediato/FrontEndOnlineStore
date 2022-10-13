import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import ResumoCompra from './ResumoCompra';

class ShoppingCart extends React.Component {
  state = {
    shoppingCart: [],
  };

  componentDidMount() {
    const { location: { state: { cartProducts } } } = this.props;
    localStorage.setItem('shoppingCart', JSON.stringify(cartProducts));
    this.getSingularItems();
  }

  getSingularItems = () => {
    const { location: { state: { cartProducts } } } = this.props;
    const result = [];
    cartProducts.forEach((item) => {
      if (!(result.find((element) => element.id === item.id))) result.push(item);
    });
    this.setState({ shoppingCart: result });
    result.forEach((item) => {
      this.setState({ [item.id]: 1 });
    });
  };

  subtractItem = (event) => {
    const { name } = event.target;
    const { state } = this;
    if (state[name] > 1) {
      this.setState((prev) => ({
        [name]: prev[name] - 1,
      }));
    }
  };

  addItem = (event) => {
    const { name } = event.target;
    this.setState((prev) => ({
      [name]: prev[name] + 1,
    }));
  };

  removeItem = (event) => {
    const { shoppingCart } = this.state;
    const { name } = event.target;
    const newCart = shoppingCart.filter((item) => item.id !== name);
    this.setState({ shoppingCart: newCart });
  };

  render() {
    const { shoppingCart } = this.state;
    const { state } = this;
    return (
      <div>
        {shoppingCart.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        )
          : shoppingCart.map((item, index) => (
            <div data-testid="product-add-to-cart" key={ index }>
              <h1 data-testid="shopping-cart-product-name">{item.title}</h1>
              <img src={ item.thumbnail } alt="Imagem do Produto" />
              <h2>{`R$${item.price}`}</h2>
              <button
                value="-"
                name={ item.id }
                onClick={ this.subtractItem }
                data-testid="product-decrease-quantity"
                type="button"
              >
                -
              </button>
              <p
                id={ item.id }
                data-testid="shopping-cart-product-quantity"
              >
                {state[item.id]}
              </p>
              <button
                value="+"
                name={ item.id }
                onClick={ this.addItem }
                data-testid="product-increase-quantity"
                type="button"
              >
                +
              </button>
              <button
                name={ item.id }
                onClick={ this.removeItem }
                data-testid="remove-product"
                type="button"
              >
                Remover
              </button>
            </div>
          ))}
        <div>
          <ResumoCompra />
        </div>
        <div>
          <Link
            to="/ResumoCompra"
            data-testid="checkout-products"
          >
            <button
              type="button"
            >
              Comprar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;

ShoppingCart.propTypes = {
  location: PropTypes.shape().isRequired,
  cartProducts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })),
};

ShoppingCart.defaultProps = {
  cartProducts: [],
};
