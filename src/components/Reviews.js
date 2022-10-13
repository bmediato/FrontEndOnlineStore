import PropTypes from 'prop-types';
import React from 'react';

class Reviews extends React.Component {
  render() {
    const { comments } = this.props;
    return (
      comments.map((item, index) => (
        <div key={ index }>
          <h1 data-testid="review-card-email">{item.email}</h1>
          <h2 data-testid="review-card-evaluation">{item.text}</h2>
          <h2 data-testid="review-card-rating">{item.rating}</h2>
        </div>
      ))
    );
  }
}

export default Reviews;

Reviews.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string,
    text: PropTypes.string,
    rating: PropTypes.string,
  })),
};

Reviews.defaultProps = {
  comments: [],
};
