import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Score = ( {correctAnswers, wrongAnswers, lastAnswerWas }) => {
  return (
    <div className="scores">
      <div
        className={ "correct" + (lastAnswerWas === 'correct' ? ' active' : '') }
      >
        <div class="title">Right</div>
        <span>{ correctAnswers }</span>
      </div>
      <div
        className={ "wrong" + (lastAnswerWas === 'wrong' ? ' active' : '') }
      >
        <div class="title">Wrong</div>
        <span>{ wrongAnswers }</span>
      </div>
    </div>
  );
}

export default Score;