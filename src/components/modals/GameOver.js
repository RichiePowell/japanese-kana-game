const GameOverModalContent = (data) => {

  const wrongAnswers = Object.keys(data.wrongAnswers);
  let wrongAnswersOutput = [];

  wrongAnswers.forEach( (character) => {
    let correctAnswers = Array.isArray(data.characters[character]) ? data.characters[character].join(' or ') : data.characters[character];
    wrongAnswersOutput.push(`
    <div class="report-wrong-answers__item">
      <div class="report-wrong-answers__item__character">${character}</div>
      <div class="report-wrong-answers__item__answer">${correctAnswers}</div>
    </div>`)
  })
  
  wrongAnswersOutput = wrongAnswers.length > 0 ? `
  <div class="report-wrong-answers">
    <h3>Answers you got wrong:</h3>
    ${ wrongAnswersOutput.join('') }
  </div>` : '';

  return `<div class="report-totals">
      <div class="report-totals__box time">
        <div class="report-totals__box__label">Time</div>
        <div class="report-totals__box__total">${ Math.floor((data.gameFinishTime - data.gameStartTime) / 1000) }s</div>
      </div>
      <div class="report-totals__box">
        <div class="report-totals__box__label">Correct</div>
        <div class="report-totals__box__total">${ data.correctAnswersTotal }</div>
      </div>
      <div class="report-totals__box">
        <div class="report-totals__box__label">Wrong</div>
        <div class="report-totals__box__total">${ data.wrongAnswersTotal }</div>
      </div>
    </div>
    ${ wrongAnswersOutput }`
}

export default GameOverModalContent