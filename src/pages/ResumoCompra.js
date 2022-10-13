import PropTypes from 'prop-types';
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
      isValid: true,
    };
  }

  onImputChange = (event) => {
    const { name, type, checked } = event.target;
    const value = type === 'radio' ? checked : event.target.value;
    this.setState({
      [name]: value,
    });
  };

  verificaFormulario = () => {
    const { nome, email, cpf, telefone, cep, endereco, pagamento } = this.state;
    const validarNome = nome.length >= 1;
    const validarEmail = email.length >= 1;
    const validaCpf = cpf.length >= 1;
    const validarTelefone = telefone.length >= 1;
    const validarCep = cep.length >= 1;
    console.log(validarCep);
    const validarEndereco = endereco.length >= 1;
    const validarPagamento = pagamento;
    if (validarNome && validarEmail && validaCpf
        && validarTelefone && validarCep && validarEndereco && validarPagamento) {
      this.setState({ isValid: true });
    } else {
      this.setState({ isValid: false });
    }
  };

  finalizarCompra = () => {
    this.verificaFormulario();
    const { isValid } = this.state;
    const { history } = this.props;
    if (isValid) {
      localStorage.removeItem('shoppingCart');
    }
  };

  render() {
    const { location: { state: { shoppingCart } } } = this.props;
    const { isValid } = this.state;
    return (
      <div>
        <div>
          <h1>Resumo do Pedido</h1>
          <div><h2>Resumo Produtos</h2></div>
          {shoppingCart.map((element, index) => (
            <div key={ index }>
              <h1>{element.title}</h1>
            </div>
          ))}
          <form>
            <label htmlFor="nome-completo">
              Nome Completo:
              <input
                data-testid="checkout-fullname"
                name="nome"
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
            <label htmlFor="metodo-pagamento1">
              Boleto
              <input
                id="metodo-pagamento1"
                data-testid="ticket-payment"
                name="pagamento"
                type="radio"
                onChange={ this.onImputChange }
              />
            </label>
            <label htmlFor="metodo-pagamento2">
              Visa
              <input
                id="metodo-pagamento2"
                data-testid="visa-payment"
                name="pagamento"
                type="radio"
                onChange={ this.onIverificaFormulario }
              />
            </label>
            <label htmlFor="metodo-pagamento3">
              MasterCard
              <input
                id="metodo-pagamento3"
                data-testid="master-payment"
                name="pagamento"
                type="radio"
                onChange={ this.onImputChange }
              />
            </label>
            <label htmlFor="metodo-pagamento4">
              Elo
              <input
                id="metodo-pagamento4"
                data-testid="elo-payment"
                name="pagamento"
                type="radio"
                onChange={ this.onImputChange }
              />
            </label>
          </form>
          {isValid ? '' : (<p data-testid="error-msg">Campos inválidos</p>)}
          <button
            type="button"
            data-testid="checkout-btn"
            onClick={ this.finalizarCompra }
          >
            Finalizar Compra

          </button>
        </div>
      </div>
    );
  }
}

ResumoCompra.propTypes = {
  location: PropTypes.shape().isRequired,
  shoppingCart: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })),
};

ResumoCompra.defaultProps = {
  shoppingCart: [],
};

export default ResumoCompra;
