import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import defaultUser from '../images/default-user.svg';
import '../styles/Header.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    const userData = await getUser();
    this.setState({
      userInfo: userData,
      isLoading: false,
    });
  };

  render() {
    const {
      userInfo: { name, image },
      isLoading,
    } = this.state;
    return (
      <header data-testid="header-component" className="Header wave-header">
        {isLoading ? (
          <h1>Carregando...</h1>
        ) : (
          <>
            <div className="User-Informations">
              <Link to="/profile" className="Link-Picture">
                <img
                  src={ image || defaultUser }
                  alt={ `User ${name}` }
                  className="Header-Pic"
                />
              </Link>
              <Link to="/profile" className="Link-Name">
                <p data-testid="header-user-name">{name}</p>
              </Link>
            </div>
            <nav>
              <ul className="Links">
                <Link
                  data-testid="link-to-search"
                  to="/search"
                  className="Link"
                >
                  <li>Busca</li>
                </Link>
                <Link
                  data-testid="link-to-favorites"
                  to="/favorites"
                  className="Link"
                >
                  <li>Curtidas</li>
                </Link>
                <Link
                  data-testid="link-to-profile"
                  to="/profile"
                  className="Link"
                >
                  <li>Perfil</li>
                </Link>
              </ul>
            </nav>
          </>
        )}
      </header>
    );
  }
}

export default Header;
