import React, { Component } from 'react';
/* Third party imports */
import WebFont from 'webfontloader';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVolumeUp, faVolumeMute, faSpinner, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SweetAlert from 'sweetalert2-react';
/* Components */
import Header from './components/Header.js';
import Score from './components/Score.js';
import Character from './components/Character.js';
import Input from './components/Input.js';
import Controls from './components/Controls.js';
import AudioPreload from './components/AudioPreload.js';
import './App.scss';
/* Character data */
import Hiragana from './data/Hiragana.js';
import Katakana from './data/Katakana.js';

/* Add FontAwesome icons via library */
library.add(faVolumeUp, faVolumeMute, faSpinner, faCheck, faTimes);

/* Add web fonts */
WebFont.load({
  google: {
    families: ['Kaushan Script', 'Source Sans Pro']
  }
});

class App extends Component {

  state = {
    characters: {},
    answers: {},
    currentCharacter: '',
    currentAnswer: '',
    correctAnswers: 0,
    wrongAnswers: 0,
    lastAnswerWas: '',
    sound: true,
    kana: 'both'
  };

  checkAnswer = (answer) => {
    const currentAnswer = this.state.currentAnswer;
    const userAnswer = answer.toLowerCase().trim();
    const successAudioFile = "success.ogg";
    const errorAudioFile = "error.ogg";
    const successAudio = new Audio(successAudioFile);
    const errorAudio = new Audio(errorAudioFile);

    /* If the answer is blank, do nothing */
    if(userAnswer === '') {
      return false;
    }

    /* If answer is wrong */
    if(
      (Array.isArray(currentAnswer) && !currentAnswer.includes(userAnswer))
      || (!Array.isArray(currentAnswer) && userAnswer !== currentAnswer)
    ) {
      if(this.state.sound) {
        errorAudio.play();
      }
      
      this.setState(prevState => ({
        showWrongAnswerDialog: true,
        wrongAnswers: prevState.wrongAnswers + 1,
        lastAnswerWas: "wrong"
      }));
    } else { /* Else, if it's right*/
      if(this.state.sound) {
        successAudio.play();
      }

      this.setState(prevState => ({
        correctAnswers: prevState.correctAnswers + 1,
        lastAnswerWas: "correct"
      }));
      this.loadNewCharacter();
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
          <Score
            key={ ( this.state.correctAnswers + this.state.wrongAnswers ) }
            lastAnswerWas={ this.state.lastAnswerWas }
            correctAnswers={ this.state.correctAnswers }
            wrongAnswers={ this.state.wrongAnswers }
          />
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
