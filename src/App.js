import React, { Component } from 'react';
import Hiragana from './data/Hiragana.js';
import Katakana from './data/Katakana.js'; 
import Character from './components/Character.js';
import Input from './components/Input.js';
import './App.scss';

class App extends Component {

  state = {
    characters: Object.assign(Hiragana, Katakana),
    currentCharacter: '',
    currentAnswer: ''
  };

  checkAnswer = (answer) => {
    if(answer.toLowerCase() !== this.state.currentAnswer) {
      alert("Oops! The correct answer for " + this.state.currentCharacter + " is \"" + this.state.currentAnswer + "\".");
    }

    this.loadNewCharacter();
  }

  loadNewCharacter = () => {
    const keys = Object.keys(this.state.characters);
    const randomKey = keys[keys.length * Math.random() << 0];

    this.setState({
      currentCharacter: randomKey,
      currentAnswer: this.state.characters[randomKey]
    });

    return randomKey;
  }

  componentDidMount = () => {
    this.loadNewCharacter();
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <header className="header">
            <h1>
              Japanese
              <span>Kana Practice</span>
            </h1>
            {/* <a
              className="author"
              href="https://richpowell.co.uk/"
            >
              By Rich Powell
            </a> */}
          </header>
          <Character
            currentCharacter={ this.state.currentCharacter }
          />
          <Input
            loadNewCharacter={ this.loadNewCharacter }
            checkAnswer={ this.checkAnswer }
          />
        </div>
      </div>
    );
  }
}

export default App;
