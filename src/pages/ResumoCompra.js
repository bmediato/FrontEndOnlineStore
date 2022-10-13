// import PropTypes from 'prop-types';
import React from 'react';

class ResumoCompra extends React.Component {
  constructor() {
    super();

    this.state = {
      nome: '',
      email: '',
      cpf: '',
      telefone: '',
      cep: '',
      endereco: '',
      pagamento: '',
    };
  }

  onImputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, this.verificaFormulario());
  };

  verificaFormulario = () => {
    const { nome, email, cpf, telefone, cep, endereco, pagamento } = this.state;
    const validarNome = nome.length >= 1;
    const validarEmail = email.length >= 1;
    const validaCpf = cpf.length >= 1;
    const validarTelefone = telefone.length >= 1;
    const validarCep = cep.length >= 1;
    const validarEndereco = endereco.length >= 1;
    const validarPagamento = pagamento.length >= 1;
    if (!validarNome || !validarEmail || !validaCpf
        || !validarTelefone || !validarCep || !validarEndereco || !validarPagamento) {
      <p data-testid="error-msg">
            Campos inválidos
      </p>;
    }
  };

  render() {
    // const { shoppingCart } = this.props;
    return (
      <div>
        <div>
          <h1>Resumo do Pedido</h1>
          <div><h2>Resumo Produtos</h2></div>
          {/* {shoppingCart.map((element, index) => (
            <div key={ index }>
              <h1>{element.title}</h1>
              <img src={ element.thumbnail } alt="Imagem do Produto" />
            </div>
          ))} */}
          <form>
            <label htmlFor="nome-completo">
              Nome Completo:
              <input
                data-testid="checkout-fullname"
                name="nome-completo"
                type="text"
                placeholder="digite seu nome completo"
                onChange={ this.onImputChange }
              />

            </label>
            <label htmlFor="email">
              Email:
              <input
                data-testid="checkout-email"
                name="email"
                type="text"
                placeholder="digite seu email"
                onChange={ this.onImputChange }
              />
            </label>
            <label htmlFor="cpf">
              CPF:
              <input
                data-testid="checkout-cpf"
                name="cpf"
                type="text"
                placeholder="digite seu CPF"
                onChange={ this.onImputChange }
              />
            </label>
            <label htmlFor="telefone">
              Telefone:
              <input
                data-testid="checkout-phone"
                name="telefone"
                type="text"
                placeholder="(DDD) 99999-9999"
                onChange={ this.onImputChange }
              />
            </label>
            <label htmlFor="cep">
              CEP:
              <input
                data-testid="checkout-cep"
                name="cep"
                type="text"
                placeholder="99999-999"
                onChange={ this.onImputChange }
              />
            </label>
            <label htmlFor="endereco">
              Endereço:
              <input
                data-testid="checkout-address"
                name="endereco"
                type="text"
                placeholder="Digite seu endereço"
                onChange={ this.onImputChange }
              />
            </label>
            <label htmlFor="metodo-pagamento">
              Boleto
              <input
                data-testid="ticket-payment"
                name="pagamento"
                type="radio"
                onChange={ this.onImputChange }
              />
            </label>
            <label htmlFor="metodo-pagamento">
              Visa
              <input
                data-testid="visa-payment"
                name="pagamento"
                type="radio"
                onChange={ this.onImputChange }
              />
            </label>
            <label htmlFor="metodo-pagamento">
              MasterCard
              <input
                data-testid="master-payment"
                name="pagamento"
                type="radio"
                onChange={ this.onImputChange }
              />
            </label>
            <label htmlFor="metodo-pagamento">
              Elo
              <input
                data-testid="elo-payment"
                name="pagamento"
                type="radio"
                onChange={ this.onImputChange }
              />
            </label>
          </form>
          <button
            type="button"
            data-testid="checkout-btn"
          >
            Submeter

          </button>
        </div>
      </div>
    );
  }
}

// ResumoCompra.propTypes = {
//   shoppingCart: PropTypes.arrayOf().isRequired,
// };

export default ResumoCompra;
