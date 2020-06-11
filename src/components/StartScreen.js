import React from 'react'
import { Consumer } from './context'
import Header from './Header'
import ChangeKana from './controls/ChangeKana'

export const StartScreen = () =>
  <Consumer>
    { ({ actions }) => {
      return (
        <div className="start-screen">
          <Header />
          <div>
            Kana you want to learn
            <ChangeKana />
          </div>
          <div>
            <button onClick={ actions.startGame }>Start Game</button>
          </div>
        </div>
      )
    }}
  </Consumer>

export default StartScreen
