import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

export default class ProductDetail extends Component {
  state = {
    product: {},
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getProductById(id);
    this.setState({ product: response });
  }

  addToCart = () => {
    const { history } = this.props;
    history.push('/shoppingcart');
  };

  render() {
    const { product } = this.state;
    return (
      <section className="Detail">
        <div>
          <h1 data-testid="product-detail-name">
            {product.title}
          </h1>
          <img
            data-testid="product-detail-image"
            src={ product.thumbnail }
            alt={ product.title }
          />
          <p data-testid="product-detail-price">
            {`R$: ${product.price}
            `}
          </p>
          <button
            type="button"
            data-testid="shopping-cart-button"
            onClick={ this.addToCart }
          >
            Add to Cart
          </button>
        </div>
      </section>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
