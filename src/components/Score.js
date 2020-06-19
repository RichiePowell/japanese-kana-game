import React from 'react'
import { Consumer } from './context'

const Score = () =>
  <Consumer>
    { ({ lastAnswerWas, correctAnswersTotal, wrongAnswersTotal }) => (
      <div className="scores">
        <div className={ "correct" + (lastAnswerWas === 'correct' ? ' active' : '') }>
          <div className="title">Right</div>
          <span>{ correctAnswersTotal }</span>
        </div>
        <div className={ "wrong" + (lastAnswerWas === 'wrong' ? ' active' : '') }>
          <div className="title">Wrong</div>
          <span>{ wrongAnswersTotal }</span>
        </div>
      </div>
    )}
  </Consumer>

export default Score