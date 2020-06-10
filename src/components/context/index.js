import React, { Component } from 'react'

/* Third party imports */
import { shuffle } from 'lodash'
import { isMobile, isTablet } from 'react-device-detect'

/* Character data */
import Hiragana from './../../data/Hiragana'
import Katakana from './../../data/Katakana'

const GameData = React.createContext();

export class Provider extends Component {
  state = {
    characters: {},
    answers: {},
    answerOptions: [],
    currentCharacter: '',
    currentAnswer: '',
    currentAnswerPrintable: '',
    correctAnswers: 0,
    wrongAnswers: 0,
    lastAnswerWas: '',
    keyboardMode: isMobile || isTablet ? false : true,
    sound: true,
    kana: 'both',
    timer: 5,
    timerIsOn: false,
    mode: 'timerForEachAnswer',
    showWrongAnswerDialog: false
  };

  startTimer = () => {
    this.timerInterval = setInterval(() => this.timerTick(), 1000);
  }

  timerTick = () => {
    if(!this.state.timerIsOn) return false;

    if(this.state.timer > 0) {
      this.setState( prev => ({
        timer: prev.timer - 1
      }))
    } else {
      clearInterval(this.timerInterval);
    }

    if(this.state.timer === 0) {
      this.checkAnswer('wrong');
    }
  }

  resetTimer = () => {
    if(this.state.mode === 'timerForEachAnswer') {
      this.setState({ timer: 5 });
    }
  }

  checkAnswer = (answer) => {
    const currentAnswer = this.state.currentAnswer;
    const userAnswer = answer.toLowerCase().trim();
    const successAudioFile = "success.ogg";
    const errorAudioFile = "error.ogg";
    const successAudio = new Audio(successAudioFile);
    const errorAudio = new Audio(errorAudioFile);

    // If the answer is blank, do nothing
    if(userAnswer === '') return false;

    // If answer is wrong
    if(
      (Array.isArray(currentAnswer) && !currentAnswer.includes(userAnswer))
      || (!Array.isArray(currentAnswer) && userAnswer !== currentAnswer)
    ) {

      // If sound is turned on, play the error audio
      if(this.state.sound) errorAudio.play();
      
      this.setState(prevState => ({
        showWrongAnswerDialog: true,
        wrongAnswers: prevState.wrongAnswers + 1,
        lastAnswerWas: "wrong"
      }));
    } else { /* Else, if it's right*/

      // If sound is turned on, play the success audio
      if(this.state.sound) successAudio.play();

      this.setState(prevState => ({
        correctAnswers: prevState.correctAnswers + 1,
        lastAnswerWas: "correct"
      }));
      this.loadNewCharacter();
    }
  }

  toggleSound = () => {
    this.setState(prevState => ({ sound: !prevState.sound }));
  }
  
  toggleInput = () => {
    this.setState(prevState => ({
      keyboardMode: !prevState.keyboardMode
    }));
  }

  toggleWrongAnswerDialog = () => {
    this.setState({ showWrongAnswerDialog: false });
    this.resetTimer();
  }

  loadKana = () => {
    this.setState( prevState => ({
      characters:
        (prevState.kana === 'both' ? {...Hiragana, ...Katakana} :
        (prevState.kana === 'hiragana' ? Hiragana : Katakana))
    }), this.loadNewCharacter);
  }

  loadNewCharacter = () => {
    const characters = this.state.characters;
    const shuffledCharacters = shuffle(Object.keys(characters)); // Shuffle the kana characters
    
    // If the currentCharacter isn't empty (e.g. it's the first answer) then delete it from the new set of characters that's being loaded so it doesn't appear twice in a row
    if(this.state.currentCharacter.length) {
      shuffledCharacters.splice(shuffledCharacters.indexOf(this.state.currentCharacter), 1)
    }

    const character = shuffledCharacters.shift(); // Grab the first one
    const answer = characters[character]; // Grab the answer
    const answerPrintable = Array.isArray(answer) ? answer.join(' or ') : answer; // Make answer printable, join with "or" if it's an array (multiple answers)

    // Get answer options; one right answer and some wrong answers while preventing duplicates from similar answers
    const answerOptions = [answer]
    shuffledCharacters.slice(0, 10).forEach( char => {
      if(answerOptions.length < 5 && answer !== characters[char]) {
        answerOptions.push(characters[char]);
      }
    });
    
    // Update the state with new character's data
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
    this.startTimer();
  }

  render() {
    return (
      <GameData.Provider value={{
        characters: this.state.characters,
        answers: this.state.answers,
        answerOptions: this.state.answerOptions,
        currentCharacter: this.state.currentCharacter,
        currentAnswer: this.state.currentAnswer,
        currentAnswerPrintable: this.state.currentAnswerPrintable,
        correctAnswers: this.state.correctAnswers,
        wrongAnswers: this.state.wrongAnswers,
        lastAnswerWas: this.state.lastAnswerWas,
        keyboardMode: this.state.keyboardMode,
        sound: this.state.sound,
        kana: this.state.kana,
        timer: this.state.timer,
        showWrongAnswerDialog: this.state.showWrongAnswerDialog,
        actions: {
          loadKana: this.loadKana,
          loadNewCharacter: this.loadNewCharacter,
          handleKanaChange: this.handleKanaChange,
          toggleSound: this.toggleSound,
          toggleInput: this.toggleInput,
          toggleWrongAnswerDialog: this.toggleWrongAnswerDialog,
          checkAnswer: this.checkAnswer
        }
      }}>
        { this.props.children }
      </GameData.Provider>
    )
  }
}

export const Consumer = GameData.Consumer;