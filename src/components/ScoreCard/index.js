import {Score} from './styledComponent'

const ScoreCard = ({score}) => (
  <div className="score-board">
    <div>
      <h1 className="heading">ROCK PAPER SCISSORS</h1>
    </div>
    <div className="score-card">
      <p className="score-text">Score</p>
      <Score>{score}</Score>
    </div>
  </div>
)

export default ScoreCard
