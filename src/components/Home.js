import React from 'react';
import { getCategories } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      category: [],
    };
  }

  componentDidMount() {
    this.imputCategory();
  }

  onInputChange = (event) => {
    const { name, type, checked } = event.target;
    const value = type === 'radio' ? checked : event.target.value;
    this.setState({
      [name]: value,
    });
  };

  imputCategory = async () => {
    const searchCategory = await getCategories();
    console.log(searchCategory);
    this.setState({
      category: searchCategory,
    });
  };

  render() {
    const { category } = this.state;
    return (
      <div>
        <div>
          <h2>Categorias</h2>
          {category.map((element, index) => (
            <div
              key={ index }
            >
              <label htmlFor="categorias" data-testid="category">
                <input
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
        <div>

          <h1
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h1>
        </div>
      </div>
    );
  }
}

export default Home;
