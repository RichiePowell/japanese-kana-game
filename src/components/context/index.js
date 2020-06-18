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
    gameStart: false,
    currentCharacter: '',
    currentAnswer: '',
    currentAnswerPrintable: '',
    correctAnswers: 0,
    wrongAnswers: 0,
    lastAnswerWas: '',
    keyboardMode: isMobile || isTablet ? false : true,
    sound: true,
    kana: ['Hiragana', 'Katakana'],
    kanaData: {
      'Hiragana' : Hiragana,
      'Katakana' : Katakana
    },
    allowKanaChange: true,
    timer: 5,
    timerKey: '',
    mode: 'unlimited',
    showWrongAnswerDialog: false
  };

  gameModes = {
    'unlimited' : {
      allowKanaChange: true
    },
    'timer' : {
      timer: 30,
      allowKanaChange: false
    },
    'timerForEachAnswer' : {
      timer: 5,
      allowKanaChange: false
    }
  }

  // Set audio files
  audio = {
    'success' : new Audio('success.ogg'),
    'error' : new Audio('error.ogg'),
    'gameOver' : new Audio('gameOver.ogg'),
    'gameOverBad' : new Audio('gameOverBad.ogg')
  }

  // Set volumes
  constructor(props) {
    super(props);
    this.audio.success.volume = 0.7;
    this.audio.error.volume = 0.7;
    this.audio.gameOver.volume = 0.7;
    this.audio.gameOverBad.volume = 0.3;
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
      if(this.state.sound) this.audio.error.play();
      
      this.setState(prev => ({
        showWrongAnswerDialog: true,
        wrongAnswers: prev.wrongAnswers + 1,
        lastAnswerWas: "wrong"
      }));
    } else { /* Else, if it's right*/

      // If sound is turned on, play the success audio
      if(this.state.sound) this.audio.success.play();

      this.setState(prev => ({
        correctAnswers: prev.correctAnswers + 1,
        lastAnswerWas: "correct"
      }));
      this.loadNewCharacter();
    }
  }

  startGame = () => this.setState({ gameStart: true }, this.loadNewCharacter) // Set gameStart state to true and load a new character
  endGame = () => {
    this.setState({
      gameStart: false,
      correctAnswers: 0,
      wrongAnswers: 0
    })
  }
  toggleSound = () => this.setState(prev => ({ sound: !prev.sound }))
  toggleInput = () => this.setState(prev => ({keyboardMode: !prev.keyboardMode}))
  setKana = (kana) => this.setState({ kana: kana === 'all' ? Object.keys(this.state.kanaData) : [kana] }, this.loadKana) // Handles the changeKana select box
  
  // Add or remove the passed kana set name to the kana array in the state
  toggleKana = (kana) => {
    let newKana = this.state.kana;
    if(!newKana.includes(kana)) {
      newKana.push(kana);
    } else if(newKana.length > 1) {
      newKana.splice(newKana.indexOf(kana), 1);
    }
    
    this.setState({ kana: newKana }, this.loadKana)
  }

  handleModeChange = (mode) => {
    this.setState({
      mode: mode,
      ...this.gameModes[mode]
    })
  }

  toggleWrongAnswerDialog = () => {
    this.setState({ showWrongAnswerDialog: false });
  }

  // Loads the kana based on the current kana state
  loadKana = () => {
    // Create an empty object for new character set
    let newCharacterSet = {};
    // Go through each selected kana and insert it into the new character set object
    this.state.kana.forEach((kana) => newCharacterSet = {...newCharacterSet, ...this.state.kanaData[kana]})
    // Insert the new character set into the state
    this.setState({ characters: newCharacterSet });
  }

  // Loads a new character
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
      answerOptions: shuffle(answerOptions),
      timerKey: this.state.mode === 'timerForEachAnswer' ? character : this.state.timerKey // Reset the timer depending on the game mode
    });

    return character;
  }

  componentDidMount() {
    this.loadKana();
  }

  render() {
    return (
      <GameData.Provider value={{
        characters: this.state.characters,
        answers: this.state.answers,
        answerOptions: this.state.answerOptions,
        gameStart: this.state.gameStart,
        currentCharacter: this.state.currentCharacter,
        currentAnswer: this.state.currentAnswer,
        currentAnswerPrintable: this.state.currentAnswerPrintable,
        correctAnswers: this.state.correctAnswers,
        wrongAnswers: this.state.wrongAnswers,
        lastAnswerWas: this.state.lastAnswerWas,
        keyboardMode: this.state.keyboardMode,
        sound: this.state.sound,
        kana: this.state.kana,
        allowKanaChange: this.state.allowKanaChange,
        timer: this.state.timer,
        timerKey: this.state.timerKey,
        mode: this.state.mode,
        showWrongAnswerDialog: this.state.showWrongAnswerDialog,
        actions: {
          loadKana: this.loadKana,
          loadNewCharacter: this.loadNewCharacter,
          setKana: this.setKana,
          toggleKana: this.toggleKana,
          handleModeChange: this.handleModeChange,
          toggleSound: this.toggleSound,
          toggleInput: this.toggleInput,
          startGame: this.startGame,
          endGame: this.endGame,
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