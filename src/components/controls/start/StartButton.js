import React from 'react'
import { Consumer } from '../../context'

const StartButton = () =>
  <Consumer>
    { ({ actions }) => (
      <div className="text-center">
        <button className="button" onClick={ actions.startGame }>Start Game</button>
      </div>
    )}
  </Consumer>

export default StartButton