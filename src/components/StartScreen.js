import React from 'react'
import { Consumer } from './context'
import Header from './Header'
import ChangeKana from './controls/start/ChangeKana'
import SelectMode from './controls/start/SelectMode'

export const StartScreen = () =>
  <Consumer>
    { ({ actions }) => {
      return (
        <div className="start-screen">
          <Header />
          <ChangeKana />
          <SelectMode />
          <div className="text-center">
            <button className="button" onClick={ actions.startGame }>Start Game</button>
          </div>
        </div>
      )
    }}
  </Consumer>

export default StartScreen
