import React, { Component } from 'react';
import '../styles/Loading.css';

class Loading extends Component {
  render() {
    return (
      <div className="Loading wave-bottom">
        <h2>Carregando...</h2>
      </div>
    );
  }
}

export default Loading;
