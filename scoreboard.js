import React, { Component } from 'react'

class Scoreboard extends Component {
  state = {
    total: 0,
    lastBowledText: '-'
  }

  score = () => {
    const scores = this.state.scores
    const total = scores.reduce((accumulator, currVal, currIdx, arraySrc ) => {
      let tally = 0
      const strike = currVal[0] === 10
      const spare = currVal[0] + currVal[1] === 10 && currVal[0] !== 10
      const remainingScores = [].concat.apply([], scores.slice(currIdx+1))
      if(strike && currIdx < 9) {
        tally += remainingScores[0]>>0
        tally += remainingScores[1]>>0
      } else if(spare) {
        tally += remainingScores[0]>>0
      }
      tally += currVal.reduce((a, b) => a + b, 0)
      return accumulator + tally
    }, 0)
    this.setState({total})
  }

  roll = () => {
    let { scores, bowled } = this.state
    let lastFrame = scores[scores.length-1]
    let lastBowledText = ''+bowled

    if ( (lastFrame.length === 1 && lastFrame[0] !== 10) || scores.length > 9) {
      lastFrame.push(bowled)
      var copyLast = lastFrame.slice()
      if (copyLast.pop() + copyLast.pop() === 10) { lastBowledText = '/' }
      else if (bowled === 10) { lastBowledText = 'X' }
    } else {
      scores.push([bowled])
      if (bowled === 10) lastBowledText = 'X'
    }
    this.setState(prevState => ({ scores, lastBowledText }) )
    this.score()
  }

  updateBowledValue = (evt) => {
    let bowled = evt.target.value>>0
    this.setState({
      bowled
    })
  }

  render() {
    const {total, lastBowledText: last} = this.state
    return (
      <div>
        <p>Last Ball Score: {last}</p>
        <p>Current score: {total}</p>
        <input value={this.state.bowled} onChange={evt => this.updateBowledValue(evt)} />
        <button onClick={this.roll}>Roll</button>
      </div>
    )
  }
}

export default Scoreboard
