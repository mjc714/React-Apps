import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class BreakTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalBreakTime: 3,
      endBreakTime: 15,
    };
    this.handleIntervalChange = this.handleIntervalChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
  }

  // Update intervalBreakTime state value to what is
  // selected in the dropdown.
  handleIntervalChange(e) {
    this.setState({ intervalBreakTime: e.target.value });
  }

  // Update endBreakTime state value to what is
  // selected in the dropdown.
  handleEndChange(e) {
    this.setState({ endBreakTime: e.target.value });
  }

  render() {
    return (
      <div className="breakTimes">
        <form className="intervalBreakSelect" onSubmit={this.handleIntervalSubmit}>
          <label className="intervalBreakLabel">
            Interval Break Time:
          </label>
          <select className="intervalBreakTime" value={this.state.intervalBreakTime} onChange={this.handleIntervalChange}>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select><br />
          {/* <input className="submit" type="submit" value="Submit" /> */}
        </form>
        <br />
        <form className="endBreakSelect" onSubmit={this.handleEndSubmit}>
          <label className="endBreakLabel">
            End Break Time:
          </label>
          <select className="endBreakTime" value={this.state.endBreakTime} onChange={this.handleEndChange}>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
          </select><br />
          {/* <input className="submit" type="submit" value="Submit" /> */}
        </form>
      </div>
    );
  }
}

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 25,
      seconds: 0,
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  formatTime(minutes, seconds) {
    if (seconds < 10 || seconds >= 0) {
      seconds = '0' + seconds;
    } else if (seconds < 0) {
      seconds = 59;
    }

    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    return minutes + ':' + seconds;
  }

  // Start the timer.
  startTimer() {
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  // Countdown time until 0, where alert will be played.
  countDown() {
    let minutes = this.state.minutes;
    let seconds = this.state.seconds - 1;
    if(seconds < 0){
      minutes = this.state.minutes - 1;
      seconds = 59;
    }
    this.setState({
      minutes: minutes,
      seconds: seconds,
    });
    if(minutes == 0){
      alert("Your timer has ended, take a break!");
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <div>
        <button className="startButton" onClick={() => this.startTimer()}>
          Start
          </button>
        <div className="timer">
          {this.formatTime(this.state.minutes, this.state.seconds)}
        </div>
      </div>
    );
  }
}

// Timer component that will count down from
// 25 minutes and breaks(3-5 or 15-30).
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 25,
      seconds: 59,
      interval: 0,
      interalBreak: 0,
      endBreak: 0,
    };
    this.tick = this.tick.bind(this);
  }

  tick() {
    this.setState(prevState => ({
      time: prevState.time + 1
    }));
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Pomodoro Timer</h1>
        </header> <br />
        <BreakTime></BreakTime> <br />
        <Start></Start>
        <Timer></Timer>
      </div>
    );
  }
}

export default App;
