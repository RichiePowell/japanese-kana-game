import React, { Component } from 'react';
/* Third party imports */
import 'typeface-kaushan-script';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'
import SweetAlert from 'sweetalert2-react';
/* Components */
import Header from './components/Header.js';
import Character from './components/Character.js';
import Input from './components/Input.js';
import Controls from './components/Controls.js';
import './App.scss';
/* Character data */
import Hiragana from './data/Hiragana.js';
import Katakana from './data/Katakana.js';

/* Add FontAwesome icons via library */
library.add(faVolumeUp, faVolumeMute);

class App extends Component {

  state = {
    characters: Object.assign(Hiragana, Katakana),
    currentCharacter: '',
    currentAnswer: '',
    sound: true
  };

  checkAnswer = (answer) => {
    const currentAnswer = this.state.currentAnswer;
    const currentCharacter = this.state.currentCharacter;
    const userAnswer = answer.toLowerCase().trim();

    /* If the user's answer is blank */
    if(userAnswer === '') {
      return false;
    }

    if(
      (Array.isArray(currentAnswer) && !currentAnswer.includes(userAnswer))
      || (!Array.isArray(currentAnswer) && userAnswer !== currentAnswer)
    ) {
      this.wrongAnswer(currentCharacter, currentAnswer);
    } else {
      this.rightAnswer();
    }
  }

  rightAnswer = () => {
    const successAudioFile = "success.mp3";

    if(this.state.sound) {
      const successAudio = new Audio(successAudioFile);
      successAudio.play();
    }

    this.loadNewCharacter();
  }

  wrongAnswer = (character, answer) => {
    const errorAudioFile = "error.mp3";

    this.setState(prevState => ({
      showWrongAnswerDialog: true
    }));

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
          <Header />
          <Character
            currentCharacter={ this.state.currentCharacter }
          />
          <Input
            loadNewCharacter={ this.loadNewCharacter }
            checkAnswer={ this.checkAnswer }
            sound={ this.state.sound }
            toggleSound={ this.toggleSound }
          />
          <Controls
            sound={ this.state.sound }
            toggleSound={ this.toggleSound }
            loadNewCharacter={ this.loadNewCharacter }
          />
          <SweetAlert
            show={this.state.showWrongAnswerDialog}
            title={this.state.currentCharacter + " is " +this.state.currentAnswer}
            type="error"
            onConfirm={() => {
                this.setState({ showWrongAnswerDialog: false});
                this.loadNewCharacter();
              }
            }
          />
        </div>
      </div>
    );
  }
}

export default App;
