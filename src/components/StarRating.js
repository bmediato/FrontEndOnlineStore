import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Reviews from './Reviews';

const five = 5;
const validaEmail = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?$/i;

// estrela = () => {
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(0);
export default class StarRating extends Component {
  state = {
    rating: 0,
    comments: [],
    isValid: true,
    email: '',
    text: '',
  };

  componentDidMount() {
    this.getLocalComments();
  }

  getLocalComments = () => {
    const { product } = this.props;
    const savedComments = JSON.parse(localStorage.getItem(product));
    if (savedComments !== null) {
      savedComments.forEach((item) => {
        this.setState((prev) => ({
          comments: [...prev.comments, item],
        }));
      });
    }
  };

  setRating = (index) => {
    this.setState({ rating: index });
  };

  handleChange = (event) => {
    const { value, id } = event.target;
    if (id === 'email') {
      this.setState({ email: value });
    } else {
      this.setState({ text: value });
    }
  };

  attLocalStorage = () => {
    const { comments } = this.state;
    const { product } = this.props;
    localStorage.setItem(product, JSON.stringify(comments));
  };

  handleSubmit = () => {
    this.setState({ rating: 0 });
    const { rating, email, text } = this.state;
    if (validaEmail.test(email) && rating > 0) {
      this.setState((prev) => ({
        comments: [...prev.comments, {
          email,
          text,
          rating: JSON.stringify(rating),
        }],
        isValid: true,
        email: '',
        text: '',
      }), () => this.attLocalStorage());
    } else {
      this.setState({ isValid: false });
    }
  };

  render() {
    const { rating, isValid, comments, email, text } = this.state;
    return (
      <div className="star-rating">
        <form>
          <input
            value={ email }
            onChange={ this.handleChange }
            data-testid="product-detail-email"
            id="email"
            type="email"
            placeholder="Digite seu email"
          />

          {[...Array(five)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                data-testid={ `${index}-rating` }
                key={ index }
                className={ index <= rating ? 'on' : 'off' }
                onClick={ () => this.setRating(index) }
              >
                <span className="star">&#9733;</span>
              </button>
            );
          })}
          <textarea
            onChange={ this.handleChange }
            value={ text }
            data-testid="product-detail-evaluation"
            placeholder="Escreva algo sobre o produto..."
            id="textarea"
          />
          {isValid ? '' : <p data-testid="error-msg">Campos inválidos</p> }
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.handleSubmit }
          >
            Submit
          </button>
        </form>
        <Reviews comments={ comments } />
      </div>
    );
  }
}

StarRating.propTypes = {
  product: PropTypes.string.isRequired,
};
