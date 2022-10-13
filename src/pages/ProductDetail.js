import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import StarRating from '../components/StarRating';

export default class ProductDetail extends Component {
  state = {
    response: {},
    cartProducts: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const { location: { state: { cartProducts } } } = this.props;
    const response = await getProductById(id);
    this.setState({ response, cartProducts });
  }

  handleCartButton = (item) => {
    this.setState((prev) => ({
      cartProducts: [...prev.cartProducts, item],
    }));
  };

  render() {
    const { match: { params: { id } } } = this.props;
    const { response, cartProducts } = this.state;
    return (
      <>
        <Link
          to={ {
            pathname: '/shoppingcart',
            state: { cartProducts },
          } }
        >
          <button data-testid="shopping-cart-button" type="button">
            Carrinho de compras!
          </button>
        </Link>
        <div>
          <h1 data-testid="product-detail-name">
            {response.title}
          </h1>
          <img
            data-testid="product-detail-image"
            src={ response.thumbnail }
            alt={ response.id }
          />
          <h2 data-testid="product-detail-price">
            {`R$: ${response.price}`}
          </h2>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => this.handleCartButton(response) }
          >
            Add to Cart
          </button>
        </div>
        <StarRating product={ id } />
      </>
    );
  }
}

ProductDetail.propTypes = {
  location: PropTypes.shape().isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  cartProducts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })),
};

ProductDetail.defaultProps = {
  cartProducts: [],
};
