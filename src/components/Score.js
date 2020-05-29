import React from 'react'
import { Consumer } from './context'

const Score = () => {
  return (
    <Consumer>
      { ({ lastAnswerWas, correctAnswers, wrongAnswers }) => (
        <div className="scores">
          <div
            className={ "correct" + (lastAnswerWas === 'correct' ? ' active' : '') }
          >
            <div className="title">Right</div>
            <span>{ correctAnswers }</span>
          </div>
          <div
            className={ "wrong" + (lastAnswerWas === 'wrong' ? ' active' : '') }
          >
            <div className="title">Wrong</div>
            <span>{ wrongAnswers }</span>
          </div>
        </div>
      )}
    </Consumer>
  );
}

export default Score