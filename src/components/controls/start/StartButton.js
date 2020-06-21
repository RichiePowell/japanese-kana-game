import React from 'react'

const StartButton = ({ actions }) =>
  <button className="button start" onClick={ actions.startGame }>Start Game</button>

export default StartButton