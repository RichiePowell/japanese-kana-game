import React, { Component } from 'react';
/* Third party imports */
import WebFont from 'webfontloader';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVolumeUp, faVolumeMute, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SweetAlert from 'sweetalert2-react';
/* Components */
import Header from './components/Header.js';
import Character from './components/Character.js';
import Input from './components/Input.js';
import Controls from './components/Controls.js';
import AudioPreload from './components/AudioPreload.js';
import './App.scss';
/* Character data */
import Hiragana from './data/Hiragana.js';
import Katakana from './data/Katakana.js';

/* Add FontAwesome icons via library */
library.add(faVolumeUp, faVolumeMute, faSpinner);

/* Add web fonts */
WebFont.load({
  google: {
    families: ['Kaushan Script', 'Source Sans Pro']
  }
});

class App extends Component {

  state = {
    characters: {},
    currentCharacter: '',
    currentAnswer: '',
    sound: true,
    kana: 'both'
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

  loadKana = () => {
    this.setState( prevState => ({
      characters:
        (prevState.kana === 'both' ? {...Hiragana, ...Katakana} :
        (prevState.kana === 'hiragana' ? Hiragana : Katakana))
    }), this.loadNewCharacter);
  }

  loadNewCharacter = () => {
    const keys = Object.keys(this.state.characters);
    const character = keys[keys.length * Math.random() << 0];
    const answer = this.state.characters[character];
    const answerPrintable = Array.isArray(answer) ? answer.join(' or ') : answer;
    
    this.setState({
      currentCharacter: character,
      currentAnswer: answer,
      currentAnswerPrintable: answerPrintable
    });

    return character;
  }

  handleKanaChange = (kana) => {
    this.setState({ kana: kana }, this.loadKana);
  }

  componentDidMount() {
    this.loadKana();
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
            loadKana={ this.loadKana }
            handleKanaChange={ this.handleKanaChange }
            loadNewCharacter={ this.loadNewCharacter }
          />
          <SweetAlert
            show={this.state.showWrongAnswerDialog}
            title={this.state.currentCharacter + " is " +this.state.currentAnswerPrintable}
            type="error"
            onConfirm={() => {
                this.setState({ showWrongAnswerDialog: false });
                this.loadNewCharacter();
              }
            }
          />
        </div>
        <FontAwesomeIcon icon="spinner" spin className="loading" />
        <AudioPreload />
      </div>
    );
  }
}

export default App;
