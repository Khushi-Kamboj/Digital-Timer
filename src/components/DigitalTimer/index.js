import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    isStarted: false,
    number: 25,
    timer: 25 * 60,
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  toggleTimer = () => {
    const {isStarted} = this.state
    if (isStarted) {
      clearInterval(this.intervalId)
    } else {
      this.intervalId = setInterval(this.tick, 1000)
    }
    this.setState(prevState => ({isStarted: !prevState.isStarted}))
  }

  tick = () => {
    const {timer} = this.state
    if (timer > 0) {
      this.setState(prevState => ({timer: prevState.timer - 1}))
    } else {
      clearInterval(this.intervalId)
      this.setState({isStarted: false})
    }
  }

  onIncrement = () => {
    this.setState(prevState => {
      const newNumber = prevState.number + 1
      return {
        number: newNumber,
        timer: newNumber * 60,
      }
    })
  }

  onDecrement = () => {
    this.setState(prevState => {
      if (prevState.number > 1) {
        const newNumber = prevState.number - 1
        return {
          number: newNumber,
          timer: newNumber * 60,
        }
      }
      return null
    })
  }

  onReset = () => {
    clearInterval(this.intervalId)
    this.setState({
      isStarted: false,
      number: 25,
      timer: 25 * 60,
    })
  }

  formatTime = () => {
    const {timer} = this.state
    const minutes = Math.floor(timer / 60)
    const seconds = timer % 60
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
    return `${formattedMinutes}:${formattedSeconds}`
  }

  render() {
    const {isStarted, number} = this.state
    return (
      <div className="container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="card-container">
          <div className="timer-container">
            <div className="inner-white-circle">
              <h1 className="time">{this.formatTime()}</h1>
              <p>{isStarted ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="right-container">
            <div className="contain-icon">
              <div className="eachItem">
                <button
                  type="button"
                  className="ButtonStyle label"
                  onClick={this.toggleTimer}
                >
                  <img
                    className="IconsStyling"
                    src={
                      isStarted
                        ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                    }
                    alt={isStarted ? 'pause icon' : 'play icon'}
                  />
                  {isStarted ? 'Pause' : 'Start'}
                </button>
              </div>
              <div className="eachItem">
                <button
                  type="button"
                  className="ButtonStyle label"
                  onClick={this.onReset}
                >
                  <img
                    className="IconsStyling"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                  Reset
                </button>
              </div>
            </div>
            <p className="para">Set Timer limit</p>
            <div className="horizontal">
              <button
                type="button"
                className="incDec"
                onClick={this.onDecrement}
                disabled={isStarted}
              >
                -
              </button>
              <div className="changeNum">
                <p className="num">{number}</p>
              </div>
              <button
                type="button"
                className="incDec"
                onClick={this.onIncrement}
                disabled={isStarted}
              >
                +{' '}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
