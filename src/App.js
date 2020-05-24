import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVolumeUp, faVolumeOff } from '@fortawesome/free-solid-svg-icons'
import Hiragana from './data/Hiragana.js';
import Katakana from './data/Katakana.js'; 
import Character from './components/Character.js';
import Input from './components/Input.js';
import './App.scss';

/* Add FontAwesome icons via library */
library.add(faVolumeUp, faVolumeOff);

class App extends Component {

  state = {
    characters: Object.assign(Hiragana, Katakana),
    currentCharacter: '',
    sound: true
  };

  checkAnswer = (answer) => {
    const currentAnswer = this.state.currentAnswer;
    const currentCharacter = this.state.currentCharacter;
    const userAnswer = answer.toLowerCase().trim();
    const successAudioFile = "success.mp3";

    if(userAnswer === '') {
      return false;
    }

    if(
      (Array.isArray(currentAnswer) && !currentAnswer.includes(userAnswer))
      || (!Array.isArray(currentAnswer) && userAnswer !== currentAnswer)
    ) {
      this.wrongAnswer(currentCharacter, currentAnswer);
    } else {

      if(this.state.sound) {
        const successAudio = new Audio(successAudioFile);
        successAudio.play();
      }
    }

    this.loadNewCharacter();
  }

  wrongAnswer = (character, answer) => {
    const errorAudioFile = "error.mp3";

    if(Array.isArray(answer)) {
      answer = answer.join(' or ');
    }

    if(this.state.sound) {
      const errorAudio = new Audio(errorAudioFile);
      errorAudio.play();
    }
  }
  
  toggleSound = () => {
    this.setState(prevState => ({
      sound: !prevState.sound
    }));
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
            sound={ this.state.sound }
            toggleSound={ this.toggleSound }
          />
        </div>
      </div>
    );
  }
}

export default App;
