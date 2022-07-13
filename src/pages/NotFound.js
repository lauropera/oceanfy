import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

class ProfileEdit extends Component {
  render() {
    return (
      <Link
        to="/trybetunes/search"
        data-testid="page-not-found"
        className="Link-Not-Found"
      >
        <div className="Not-Found">
          <h1>404</h1>
          <p>
            Página não encontrada.
            <br />
            Clique em qualquer lugar da tela para voltar ao início.
          </p>
        </div>
      </Link>
    );
  }
}

export default ProfileEdit;
