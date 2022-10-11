import React, { Component } from 'react';

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
  };

  setRating = (index) => {
    this.setState({ rating: index });
  };

  handleSubmit = () => {
    const inputEmail = document.querySelector('.email');
    const textarea = document.querySelector('#textarea');
    const { rating } = this.state;
    if (validaEmail.test(inputEmail) && rating > 0) {
      this.setState((prev) => ({
        comments: [...prev.comments, {
          email: inputEmail.value,
          text: textarea.value,
          rating: JSON.stringify(rating),
        }],
        isValid: true,
      }));
      const { comments } = this.state;
      localStorage.setItem('comments', JSON.stringify(comments));
      inputEmail.value = '';
      textarea.value = '';
      console.log(textarea.value);
    } else {
      this.setState({ isValid: false });
    }
  };

  render() {
    const { rating, isValid } = this.state;
    return (
      <div className="star-rating">
        <form>
          <input
            data-testid="product-detail-email"
            className="email"
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
            data-testid="product-detail-evaluation"
            placeholder="Escreva algo sobre o produto..."
            id="textarea"
          />
          {isValid ? <p data-testid="error-msg">Campos inválidos</p> : <p /> }
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.handleSubmit }
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
