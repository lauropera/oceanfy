import React from 'react';
import { Switch } from 'react-router-dom';
import Routes from './Routes';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Routes />
      </Switch>
    );
  }
}

export default App;
