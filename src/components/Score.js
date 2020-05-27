import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Score = ( {correctAnswers, wrongAnswers, lastAnswerWas }) => {
  return (
    <div className="scores">
      <div
        className={ "correct" + (lastAnswerWas === 'correct' ? ' active' : '') }
      >
        {/* <FontAwesomeIcon icon="check" /> */}
        { correctAnswers }
      </div>
      <div
        className={ "wrong" + (lastAnswerWas === 'wrong' ? ' active' : '') }
      >
        {/* <FontAwesomeIcon icon="times" /> */}
        { wrongAnswers }
      </div>
    </div>
  );
}

export default Score;