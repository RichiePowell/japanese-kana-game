const GameOverModalContent = (data) => {

  const wrongAnswers = ''

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
      <h3>Answers you got wrong - please practice!</h3>
      ${ wrongAnswers }
    </div>`
}

export default GameOverModalContent