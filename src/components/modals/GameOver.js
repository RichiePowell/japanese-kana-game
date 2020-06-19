const GameOverModalContent = (data) => {

  const wrongAnswers = Object.keys(data.wrongAnswers);
  let wrongAnswersOutput = [];

  wrongAnswers.forEach( (character) => {
    let correctAnswers = Array.isArray(data.characters[character]) ? data.characters[character].join(' or ') : data.characters[character];
    wrongAnswersOutput.push(`
    <div class="report-wrong-answers--item">
      <div class="report-wrong-answers--item--character">${character}</div>
      <div class="report-wrong-answers--item--answer">${correctAnswers}</div>
    </div>`)
  })
  
  wrongAnswersOutput = wrongAnswersOutput.join('');

  return `<div class="report-totals">
      <div class="report-totals--box time">
        <div class="report-totals--box--label">Time</div>
        <div class="report-totals--box--total">${ Math.floor((data.gameFinishTime - data.gameStartTime) / 1000) }s</div>
      </div>
      <div class="report-totals--box">
        <div class="report-totals--box--label">Correct</div>
        <div class="report-totals--box--total">${ data.correctAnswersTotal }</div>
      </div>
      <div class="report-totals--box">
        <div class="report-totals--box--label">Wrong</div>
        <div class="report-totals--box--total">${ data.wrongAnswersTotal }</div>
      </div>
    </div>
    <div class="report-wrong-answers">
      <h3>Answers you got wrong:</h3>
      ${ wrongAnswersOutput }
    </div>`
}

export default GameOverModalContent