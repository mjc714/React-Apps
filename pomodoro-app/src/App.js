import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Receive input for interval break dropdown.
class IntervalBreakTimeInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleIntervalChange = this.handleIntervalChange.bind(this);
  }

  // Update intervalBreakTime state value to what is
  // selected in the dropdown.
  handleIntervalChange(e) {
    this.props.onIntervalChange(e.target.value);
  }

  render() {
    const intervalBreakTime = this.props.intervalBreakTime;
    return (
      <div className="breakTimes">
        <form className="intervalBreakSelect">
          <label className="intervalBreakLabel">
            Interval Break Time:
          </label>
          <select className="intervalBreakTime" value={intervalBreakTime} onChange={this.handleIntervalChange}>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select><br />
        </form>
      </div>
    );
  }
}

// Receive input for end break dropdown.
class EndBreakTimeInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleEndChange = this.handleEndChange.bind(this);
  }

  // Update endBreakTime state value to what is
  // selected in the dropdown.
  handleEndChange(e) {
    this.props.onEndChange(e.target.value);
  }

  render() {
    const endBreakTime = this.props.endBreakTime;
    return (
      <div className="breakTimes">
        <form className="endBreakSelect">
          <label className="endBreakLabel">
            End Break Time:
          </label>
          <select className="endBreakTime" value={endBreakTime} onChange={this.handleEndChange}>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
          </select><br />
        </form>
      </div>
    );
  }
}

// Start a respective timer.
class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 0,
      seconds: 5,
      interval: 0,
      restart: false,
      shortBreak: false,
      longBreak: false,
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  // Format the time displayed in mm:ss format.
  formatTime(minutes, seconds) {
    if (seconds < 10 && seconds >= 0) {
      seconds = '0' + seconds;
    } else if (seconds < 0 && minutes > 0) {
      seconds = 59;
    }

    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    return minutes + ':' + seconds;
  }

  // Start a timer.
  startTimer() {
    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
    if (this.state.restart === true) {
      this.timer = setInterval(this.countDown, 1000);
    }
    if (this.state.shortBreak === true) {
      alert("SHORT BREAK!");
      this.timer = setInterval(this.countDown, 1000);
    }
    if (this.state.longBreak === true) {
      alert("LONG BREAK!");
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  // Countdown time until 0, where alert will be sound.
  countDown() {
    let minutes = this.state.minutes;
    let seconds = this.state.seconds - 1;

    if (seconds < 0) {
      minutes = this.state.minutes - 1;
      seconds = 59;
    }

    this.setState({
      minutes: minutes,
      seconds: seconds,
    });

    if (minutes === 0 && seconds === 0) {
      this.setState({
        minutes: 0,
        seconds: 5,
        interval: this.state.interval + 1,
        restart: false,
        shortBreak: true,
      });
      alert("Your timer has ended, take a break!");
      clearInterval(this.timer);
    }

    if (this.state.interval === 4) {
      this.setState({
        interval: 0,
        restart: false,
        longBreak: true,
      });
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
        <br />
        <div className="interval">
          Interval: {this.state.interval}
        </div>
      </div>
    );
  }
}

// Timer parent to contain BreakTime
// and Start.
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalBreakTime: 3,
      endBreakTime: 15,
      minutes: 0,
      seconds: 0,
      interval: 0,
      restart: false,
      shortBreak: false,
      longBreak: false,
    };
    this.handleIntervalChange = this.handleIntervalChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
  }

  handleIntervalChange(time) {
    this.setState({ intervalBreakTime: time });
  }

  handleEndChange(time) {
    this.setState({ endBreakTime: time });
  }

  render() {
    const intervalBreakTime = this.state.intervalBreakTime;
    const endBreakTime = this.state.endBreakTime;

    return (
      <div className="timerChildren">
        <IntervalBreakTimeInput
          time={intervalBreakTime}
          onIntervalChange={this.handleIntervalChange} /><br />
        <EndBreakTimeInput
          time={endBreakTime}
          onEndChange={this.handleEndChange} /><br />
        <Start></Start>
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
        {/* <BreakTime></BreakTime> <br />
        <Start></Start>
        <Timer></Timer> */}
        <Timer></Timer>
      </div>
    );
  }
}

export default App;
