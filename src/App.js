import React, { Component } from 'react';
import logo from './logo.svg';
import LifeField from './Components/LifeField';
import startingFigure from './starting-figure';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Convay's game of life</h1>
        </header>
        <LifeField size={20} figure={startingFigure} />
      </div>
    );
  }
}

export default App;
