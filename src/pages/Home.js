import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import './Home.css';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      listProducts: false,
      request: [],
      category: [],
      selectedCategory: false,
      checked: '',
      cartProducts: [],
    };
  }

  componentDidMount() {
    this.inputCategory();
  }

  onSearch = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  handleButton = async () => {
    const { checked } = this.state;
    const { inputValue } = this.state;
    if (checked !== '') {
      const radioCleaner = document.querySelector(`#${checked}`);
      radioCleaner.checked = false;
    }
    const request = await getProductsFromCategoryAndQuery(null, inputValue);
    this.setState({
      request,
      selectedCategory: false,
      listProducts: true,
    });
  };

  onInputChange = async (event) => {
    const { id } = event.target;
    const request = await getProductsFromCategoryAndQuery(id, undefined);
    this.setState({
      checked: id,
      listProducts: false,
      selectedCategory: true,
      request: request.results,
    });
  };

  handleCartButton = (item) => {
    this.setState((prev) => ({
      cartProducts: [...prev.cartProducts, item],
    }));
  };

  inputCategory = async () => {
    const searchCategory = await getCategories();
    this.setState({
      category: searchCategory,
    });
  };

  render() {
    const { request,
      listProducts, category, selectedCategory, cartProducts } = this.state;
    return (
      <div>
        <header>
          <h1
            data-testid="home-initial-message"
          >
            Frontend Online Store
          </h1>
          <input
            data-testid="query-input"
            onChange={ this.onSearch }
            placeholder="Digite algum termo de pesquisa ou escolha uma categoria."
          />
          <button type="button" onClick={ this.handleButton } data-testid="query-button">
            Buscar
          </button>
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
        </header>
        <div className="categorias">
          <h2 id="categoria-titulo">Categorias</h2>
          {category.map((element, index) => (
            <div
              className="lista-categoria"
              key={ index }
            >
              <label htmlFor={ element.id } data-testid="category">
                <input
                  id={ element.id }
                  name="category"
                  type="radio"
                  value={ element.name }
                  onChange={ this.onInputChange }
                />
                {' '}
                {element.name}
              </label>
            </div>
          ))}
        </div>
        <div className="produtos">
          {!listProducts ? <p />
            : (
              <ProductCard
                data={ request }
                cartProducts={ cartProducts }
                handleCartButton={ this.handleCartButton }
              />)}

          {!selectedCategory ? <p />
            : (
              <ProductCard
                data={ request }
                cartProducts={ cartProducts }
                handleCartButton={ this.handleCartButton }
              />)}
        </div>
      </div>
    );
  }
}

export default Home;
