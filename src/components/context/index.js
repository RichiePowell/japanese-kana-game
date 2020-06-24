import React, { Component } from 'react'

/* Third party imports */
import { shuffle } from 'lodash'
import { isMobile, isTablet } from 'react-device-detect'

/* Character data */
import Hiragana from './../../data/Hiragana'
import HiraganaDakuten from './../../data/HiraganaDakuten'
import HiraganaCombos from './../../data/HiraganaCombos'
import Katakana from './../../data/Katakana'
import KatakanaDakuten from './../../data/KatakanaDakuten'
import KatakanaCombos from './../../data/KatakanaCombos'

const GameData = React.createContext();

export class Provider extends Component {
  state = {
    darkMode: false,
    characters: {},
    answerOptions: [],
    gameStart: false,
    gameStartTime: '',
    gameFinishTime: '',
    currentCharacter: '',
    currentAnswer: '',
    currentAnswerPrintable: '',
    correctAnswers: {},
    correctAnswersTotal: 0,
    wrongAnswers: {},
    wrongAnswersTotal: 0,
    lastAnswerWas: '',
    keyboardMode: isMobile || isTablet ? false : true,
    sound: true,
    kana: ['Hiragana', 'HiraganaDakuten', 'Katakana', 'KatakanaDakuten'],
    kanaData: {
      'Hiragana' : {
        characters: Hiragana,
        group: 1
      },
      'HiraganaDakuten' : {
        characters: HiraganaDakuten,
        group: 2
      },
      'HiraganaCombos' : {
        characters: HiraganaCombos,
        group: 3
      },
      'Katakana' : {
        characters: Katakana,
        group: 1
      },
      'KatakanaDakuten' : {
        characters: KatakanaDakuten,
        group: 2
      },
      'KatakanaCombos' : {
        characters: KatakanaCombos,
        group: 3
      },
    },
    showWrongAnswerDialog: true,
    wrongAnswerDialogActive: false,
    showReport: false,
    // Answer timer
    answerTimer: 0,
    answerTimerKey: '',
    answerTimerTicking: true,
    // Game timer
    gameTimer: 0,
    gameTimerKey: 'gameKey',
    gameTimerTicking: true
  };

  // Set audio files
  audio = {
    'success' : new Audio('success.ogg'),
    'error' : new Audio('error.ogg'),
    'gameOver' : new Audio('gameOver.ogg'),
    'gameOverBad' : new Audio('gameOverBad.ogg')
  }

  checkAnswer = (answer) => {
    const currentAnswer = this.state.currentAnswer;
    const userAnswer = answer.toLowerCase().trim();

    // If the answer is blank, do nothing
    if(userAnswer === '') return false;

    // If answer is wrong
    if(
      (Array.isArray(currentAnswer) && !currentAnswer.includes(userAnswer))
      || (!Array.isArray(currentAnswer) && userAnswer !== currentAnswer)
    ) {
      this.playSound('error');
      this.setState(prev => ({
        wrongAnswerDialogActive: this.state.showWrongAnswerDialog ? true : false,
        wrongAnswersTotal: prev.wrongAnswersTotal + 1,
        lastAnswerWas: "wrong",
        wrongAnswers: { ...prev.wrongAnswers,
          [prev.currentCharacter] : parseInt(prev.wrongAnswers[prev.currentCharacter]) ? prev.wrongAnswers[prev.currentCharacter] + 1 : 1
        }
      }));
      
      if(!this.state.showWrongAnswerDialog) {
        this.loadNewCharacter();
      }

    } else { /* Else, if it's right*/
      this.playSound('success');
      this.setState(prev => ({
        correctAnswersTotal: prev.correctAnswersTotal + 1,
        lastAnswerWas: "correct",
        correctAnswers: { ...prev.correctAnswers,
          [prev.currentCharacter] : parseInt(prev.correctAnswers[prev.currentCharacter]) ? prev.correctAnswers[prev.currentCharacter] + 1 : 1
        }
      }));
      
      // Clear the answer text box if it's visible
      if(this.state.keyboardMode) document.querySelector('#answer-keyboard').value = '';

      // Load new character
      this.loadNewCharacter();
    }
  }

  playSound = (sound) => {
    if(this.state.sound) {
      this.audio[sound].volume = 0.5; // Set volume to half because we want subtle sounds
      this.audio[sound].currentTime = 0; // Reset to audio beginning if it's already playing
      this.audio[sound].play();
    }
  }

  startGame = () => {
    this.setState({
      gameStart: true,
      gameStartTime: new Date().getTime(),
      answerTimerTicking: true,
      gameTimerTicking: true
    }, this.loadNewCharacter) // Set gameStart state to true and load a new character
  }

  endGame = () => {
    this.stopAnswerTimer();
    this.stopGameTimer();
    this.setState({ gameFinishTime : new Date().getTime() });

    if(this.state.correctAnswersTotal === 0 && this.state.wrongAnswersTotal === 0) {
      this.clearStats();
    } else {
      this.toggleReport();
      
      if(this.state.wrongAnswersTotal > this.state.correctAnswersTotal) {
        this.playSound('gameOverBad');
      } else {
        this.playSound('gameOver');
      }
    }
  }

  clearStats = () => 
    this.setState({
      gameStart: false,
      correctAnswers: {},
      correctAnswersTotal: 0,
      wrongAnswers: {},
      wrongAnswersTotal: 0,
      lastAnswerWas: ''
    })

  stopAnswerTimer = () => this.setState(({ answerTimerTicking: false }))
  startAnswerTimer = () => this.setState(({ answerTimerTicking: true }))
  stopGameTimer = () => this.setState(({ gameTimerTicking: false }))
  startGameTimer = () => this.setState(({ gameTimerTicking: true }))
  toggleSound = () => this.setState(prev => ({ sound: !prev.sound }))
  toggleInput = () => this.setState(prev => ({ keyboardMode: !prev.keyboardMode }))
  
  toggleDarkMode = () => {
    document.querySelector('body').classList.toggle('dark');
    this.setState( prev => ({ darkMode: !prev.darkMode }));
  }

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

  changeAnswerTimer = (seconds) => this.setState({ answerTimer: parseInt(seconds) })
  changeGameTimer = (seconds) => this.setState({ gameTimer: parseInt(seconds) })
  toggleWrongAnswerDialog = () => this.setState( prev => ({ showWrongAnswerDialog: !prev.showWrongAnswerDialog }))
  hideWrongAnswerDialog = () => this.setState({ wrongAnswerDialogActive: false })

  toggleReport = () => {
    this.setState( prev => ({
      showReport: !prev.showReport,
      wrongAnswerDialogActive: false
    }));
  }

  // Loads the kana based on the current kana state
  loadKana = () => {
    // Create an empty object for new character set
    let newCharacterSet = {};
    // Go through each selected kana and insert it into the new character set object
    this.state.kana.forEach((kana) => newCharacterSet = {...newCharacterSet, ...this.state.kanaData[kana].characters})
    // Insert the new character set into the state
    this.setState({ characters: newCharacterSet });
  }

  // Loads a new character
  loadNewCharacter = () => {
    /* Pick a random character set from the selected sets */
    const shuffledCharacterSets = shuffle(this.state.kana);
    const characterSet = shuffledCharacterSets.shift();

    /* Assign the characters from the chosen set */
    const characters = this.state.kanaData[characterSet].characters;
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
      answerTimerKey: character
    });

    return character;
  }

  componentDidMount() {
    this.loadKana();
  }

  render() {
    return (
      <GameData.Provider value={{
        darkMode: this.state.darkMode,
        characters: this.state.characters,
        answers: this.state.answers,
        answerOptions: this.state.answerOptions,
        gameStart: this.state.gameStart,
        gameStartTime: this.state.gameStartTime,
        gameFinishTime: this.state.gameFinishTime,
        currentCharacter: this.state.currentCharacter,
        currentAnswer: this.state.currentAnswer,
        currentAnswerPrintable: this.state.currentAnswerPrintable,
        correctAnswersTotal: this.state.correctAnswersTotal,
        wrongAnswers: this.state.wrongAnswers,
        wrongAnswersTotal: this.state.wrongAnswersTotal,
        lastAnswerWas: this.state.lastAnswerWas,
        keyboardMode: this.state.keyboardMode,
        sound: this.state.sound,
        kana: this.state.kana,
        answerTimer: this.state.answerTimer,
        answerTimerKey: this.state.answerTimerKey,
        answerTimerTicking: this.state.answerTimerTicking,
        gameTimer: this.state.gameTimer,
        gameTimerKey: this.state.gameTimerKey,
        gameTimerTicking: this.state.gameTimerTicking,
        showWrongAnswerDialog: this.state.showWrongAnswerDialog,
        wrongAnswerDialogActive: this.state.wrongAnswerDialogActive,
        showReport: this.state.showReport,
        actions: {
          loadKana: this.loadKana,
          loadNewCharacter: this.loadNewCharacter,
          toggleKana: this.toggleKana,
          toggleSound: this.toggleSound,
          toggleInput: this.toggleInput,
          toggleDarkMode: this.toggleDarkMode,
          startGame: this.startGame,
          endGame: this.endGame,
          clearStats: this.clearStats,
          hideWrongAnswerDialog: this.hideWrongAnswerDialog,
          toggleWrongAnswerDialog: this.toggleWrongAnswerDialog,
          toggleReport: this.toggleReport,
          checkAnswer: this.checkAnswer,
          changeAnswerTimer: this.changeAnswerTimer,
          changeGameTimer: this.changeGameTimer
        }
      }}>
        { this.props.children }
      </GameData.Provider>
    )
  }
}

export const Consumer = GameData.Consumer