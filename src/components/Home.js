import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <h1
        data-testid="home-initial-message"
      >
        Digite algum termo de pesquisa ou escolha uma categoria.
      </h1>
    );
  }
}

export default Home;
