import React, { Component } from 'react'
/* Third party imports */
import { shuffle, remove } from 'lodash'
import WebFont from 'webfontloader'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVolumeUp, faVolumeMute, faSpinner, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SweetAlert from 'sweetalert2-react'
import { isMobile, isTablet } from 'react-device-detect'
/* Components */
import Header from './components/Header'
import Score from './components/Score'
import Character from './components/Character'
import Input from './components/Input'
import Controls from './components/Controls'
import AudioPreload from './components/AudioPreload'
import './App.scss'
/* Character data */
import Hiragana from './data/Hiragana'
import Katakana from './data/Katakana'

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
    possibleAnswers: [],
    currentCharacter: '',
    currentAnswer: '',
    correctAnswers: 0,
    wrongAnswers: 0,
    lastAnswerWas: '',
    keyboardMode: isMobile || isTablet ? false : true,
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
  
  toggleInput = () => {
    this.setState(prevState => ({
      keyboardMode: !prevState.keyboardMode
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
    /* Get a new character */
    const shuffledCharacters = shuffle(Object.keys(this.state.characters)); // Shuffle the kana characters
    
    if(this.state.currentCharacter.length) { // If the currentCharacter isn't empty (e.g. it's the first answer) then delete it from the new set of character's that's being loaded so it doesn't appear twice in a row
      shuffledCharacters.splice(shuffledCharacters.indexOf(this.state.currentCharacter), 1)
    }

    const character = shuffledCharacters.shift(); // Grab the first one
    const answer = this.state.characters[character]; // Grab the answer
    const answerPrintable = Array.isArray(answer) ? answer.join(' or ') : answer; // Make answer printable, join with "or" if it's an array (multiple answers)

    /* Get wrong answers */
    const answerOptions = []
    shuffledCharacters.slice(0, 5).forEach( char => {
      answerOptions.push(this.state.characters[char]);
    });
    
    this.setState({
      currentCharacter: character,
      currentAnswer: answer,
      currentAnswerPrintable: answerPrintable,
      answerOptions: shuffle(answerOptions)
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
            answerOptions={ this.state.answerOptions }
            keyboardMode={ this.state.keyboardMode }
          />
          <Controls
            sound={ this.state.sound }
            toggleSound={ this.toggleSound }
            toggleInput={ this.toggleInput }
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
