import { func, shape } from 'prop-types';
import React, { Component } from 'react';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import '../styles/Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      isLoading: false,
      isLoginDisabled: true,
    };
  }

  handleChange = ({ target: { value } }) => {
    const MIN_CHAR_LENGTH = 3;
    this.setState({
      username: value,
      isLoginDisabled: value.length < MIN_CHAR_LENGTH,
    });
  };

  loadUserInfo = async (event) => {
    event.preventDefault();
    const { username } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: username });
    this.redirectToSearchPage();
  };

  redirectToSearchPage = () => {
    const { history: { push } } = this.props;
    push('/search');
  }

  render() {
    const { username, isLoginDisabled, isLoading } = this.state;
    return (
      <div data-testid="page-login" className="Login-Page wave-header">
        { isLoading ? <Loading /> : (
          <>
            <h1>Oceanfy</h1>
            <form className="Login-Form">
              <label htmlFor="name-input">
                {' '}
                <input
                  type="text"
                  id="name-input"
                  data-testid="login-name-input"
                  value={ username }
                  onChange={ this.handleChange }
                  placeholder="Nome de usuário"
                />
              </label>
              <div className="Button-Login">
                <button
                  type="submit"
                  data-testid="login-submit-button"
                  disabled={ isLoginDisabled }
                  onClick={ this.loadUserInfo }
                >
                  Entrar
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: shape({ push: func }).isRequired,
};

export default Login;
