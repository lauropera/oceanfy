import React, { Component } from 'react';
import { func, shape } from 'prop-types';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';
import defaultUser from '../images/default-user.svg';
import '../styles/ProfileEdit.css';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      userInformations: {},
      isLoading: false,
      isSaveButtonDisabled: true,
    };
  }

  componentDidMount() {
    this.fetchUser();
    this.validateNewInfo();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState(
      ({ userInformations }) => ({
        userInformations: { ...userInformations, [name]: value },
      }),
      () => this.validateNewInfo(),
    );
  };

  fetchUser = async () => {
    this.setState({ isLoading: true });
    const user = await getUser();
    this.setState({
      userInformations: { ...user },
      isLoading: false,
    });
  };

  updateProfileInfo = async (event) => {
    event.preventDefault();
    const { userInformations } = this.state;
    this.setState({ isLoading: true });
    await updateUser(userInformations);
    this.redirectToProfile();
  };

  redirectToProfile = () => {
    const {
      history: { push },
    } = this.props;
    push('/trybetunes/profile');
  };

  validateNewInfo = () => {
    const { userInformations } = this.state;
    const informations = Object.values(userInformations);
    const validate = informations.every((info) => info.length > 0);
    this.setState({ isSaveButtonDisabled: !validate });
  };

  render() {
    const { userInformations, isLoading, isSaveButtonDisabled } = this.state;
    const { name, email, description, image } = userInformations;
    return (
      <>
        <Header />
        <section
          data-testid="page-profile-edit"
          className="Profile-Container wave-bottom"
        >
          <div className="Category-Header"><h2>Editar perfil</h2></div>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="Profile">
              <div className="Profile-Pic">
                <img src={ image || defaultUser } alt={ `User ${name}` } />
              </div>
              <form className="Profile-Edit-Form">
                <label htmlFor="edit-name">
                  Nome
                  <input
                    id="edit-name"
                    name="name"
                    type="text"
                    placeholder="Nome"
                    maxLength="32"
                    value={ name }
                    onChange={ this.handleChange }
                    data-testid="edit-input-name"
                  />
                </label>
                <label htmlFor="edit-image">
                  Imagem
                  <input
                    id="edit-image"
                    name="image"
                    type="type"
                    placeholder="URL da imagem"
                    value={ image }
                    onChange={ this.handleChange }
                    data-testid="edit-input-image"
                  />
                </label>
                <label htmlFor="edit-email">
                  Email
                  <input
                    id="edit-email"
                    name="email"
                    type="text"
                    maxLength="64"
                    placeholder="usuario@usuario.com"
                    value={ email }
                    onChange={ this.handleChange }
                    data-testid="edit-input-email"
                  />
                </label>
                <label htmlFor="edit-description">
                  Descrição
                  <input
                    id="edit-description"
                    name="description"
                    type="text"
                    placeholder="Sobre mim"
                    maxLength="120"
                    value={ description }
                    onChange={ this.handleChange }
                    data-testid="edit-input-description"
                  />
                </label>
                <button
                  type="button"
                  disabled={ isSaveButtonDisabled }
                  onClick={ this.updateProfileInfo }
                  data-testid="edit-button-save"
                >
                  Salvar
                </button>
              </form>
            </div>
          )}
        </section>
      </>
    );
  }
}

ProfileEdit.propTypes = {
  history: shape({ push: func }).isRequired,
};

export default ProfileEdit;
