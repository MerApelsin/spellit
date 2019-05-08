import React, { Component } from 'react';
import './App.css';
import GameContainer from './components/game/gameContainer.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <GameContainer/>
        </header>
      </div>
    );
  }
}

export default App;
