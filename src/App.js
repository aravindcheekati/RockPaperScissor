import React from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {RiCloseLine} from 'react-icons/ri'

import ScoreCard from './components/ScoreCard'

import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class App extends React.Component {
  state = {
    score: 0,
    id: null,
    opponentId: null,
    showResult: false,
    result: null,
  }

  componentDidMount() {
    this.setOpponentId()
  }

  getResult = () => {
    const {id, opponentId} = this.state
    if (id === 'PAPER' && opponentId === 'ROCK') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        result: 'YOU WON',
      }))
    } else if (id === 'SCISSORS' && opponentId === 'ROCK') {
      this.setState(prevState => ({
        score: prevState.score - 1,
        result: 'YOU LOSE',
      }))
    } else if (id === 'ROCK' && opponentId === 'PAPER') {
      this.setState(prevState => ({
        score: prevState.score - 1,
        result: 'YOU LOSE',
      }))
    } else if (id === 'SCISSORS' && opponentId === 'PAPER') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        result: 'YOU WON',
      }))
    } else if (id === 'ROCK' && opponentId === 'SCISSORS') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        result: 'YOU WON',
      }))
    } else if (id === 'PAPER' && opponentId === 'SCISSORS') {
      this.setState(prevState => ({
        score: prevState.score - 1,
        result: 'YOU LOSE',
      }))
    } else if (id === opponentId) {
      this.setState({result: 'IT IS DRAW'})
    }
  }

  setOpponentId = () => {
    const randomNumber = Math.floor(Math.random() * 3)
    const opponentId = choicesList[randomNumber].id
    this.setState({opponentId})
  }

  setRock = () => {
    this.setState({id: 'ROCK', showResult: true}, () => this.getResult())
  }

  setScissor = () => {
    this.setState({id: 'SCISSORS', showResult: true}, () => this.getResult())
  }

  setPaper = () => {
    this.setState({id: 'PAPER', showResult: true}, () => this.getResult())
  }

  playAgain = () => {
    this.setState({showResult: false, id: null, result: null})
    this.setOpponentId()
  }

  renderGame = () => (
    <div className="game-container">
      <div className="rock-scissor">
        <button type="button" onClick={this.setRock} data-testid="rockButton">
          <img
            src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png"
            alt="ROCK"
          />
        </button>
        <button
          type="button"
          onClick={this.setScissor}
          data-testid="scissorsButton"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png"
            alt="SCISSORS"
          />
        </button>
      </div>
      <div className="paper">
        <button type="button" onClick={this.setPaper} data-testid="paperButton">
          <img
            src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png"
            alt="PAPER"
          />
        </button>
      </div>
    </div>
  )

  renderResult = () => {
    const {id, opponentId, result} = this.state
    const selectedImg = choicesList.find(item => item.id === id)
    const opponentImg = choicesList.find(item => item.id === opponentId)
    const {imageUrl} = selectedImg

    return (
      <div className="result-view">
        <div className="result-container">
          <div className="result-btn-container">
            <h1 className="result-heading">YOU</h1>
            <div className="result-img-container">
              <img src={imageUrl} alt="your choice" className="result-img" />
            </div>
          </div>
          <div className="result-btn-container">
            <h1 className="result-heading">OPPONENT</h1>
            <div className="result-img-container">
              <img
                src={opponentImg.imageUrl}
                alt="opponent choice"
                className="result-img"
              />
            </div>
          </div>
        </div>
        <div className="play-again-container">
          <p className="you-won-heading">{result}</p>
          <button
            type="button"
            className="play-again-btn"
            onClick={this.playAgain}
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {score, showResult} = this.state
    return (
      <div className="container">
        <div className="wrapper">
          <ScoreCard score={score} />
          {showResult ? this.renderResult() : this.renderGame()}
          <div className="rules-button-container">
            <Popup
              modal
              trigger={
                <button type="button" className="trigger-button">
                  RULES
                </button>
              }
            >
              {close => (
                <div className="popup">
                  <button
                    type="button"
                    className="trigger-button-close"
                    onClick={() => close()}
                  >
                    <RiCloseLine />
                  </button>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                    alt="rules"
                    className="rules-img"
                  />
                </div>
              )}
            </Popup>
          </div>
        </div>
      </div>
    )
  }
}

export default App
