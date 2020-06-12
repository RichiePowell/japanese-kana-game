import React from 'react'
import { Consumer } from './context'
import Header from './Header'
import ChangeKana from './controls/ChangeKana'
import SelectMode from './controls/SelectMode'

export const StartScreen = () =>
  <Consumer>
    { ({ actions }) => {
      return (
        <div className="start-screen">
          <Header />
          <div className="start-block">
            <div>Kana to practice:</div>
            <div><ChangeKana /></div>
          </div>
          <div className="start-block">
            <div>Select mode:</div>
            <div><SelectMode /></div>
          </div>
          <div className="text-center">
            <button className="input-control alt" onClick={ actions.startGame }>Start Game</button>
          </div>
        </div>
      )
    }}
  </Consumer>

export default StartScreen
