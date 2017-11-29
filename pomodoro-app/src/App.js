import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Receive input for interval break dropdown.
class IntervalBreakTimeInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleIntervalChange = this.handleIntervalChange.bind(this);
  }

  // Update intervalBreakTime props value to what is
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

  // Update endBreakTime props value to what is
  // selected in the dropdown.
  handleEndChange(e) {
    this.props.onEndChange(e.target.value);
  }

  render() {
    const endBreakTime = this.props.endBreakTime;
    return (
      <div id="slidecontainer">
        <input type="range" min="15" max="30" value={endBreakTime} className="slider" id="myRange" onChange={this.handleEndChange} />
        <p>End Break Time: <span>{endBreakTime}</span></p>
      </div>
    );
  }
}

// Start a respective timer.
class StartTimer extends React.Component {
  constructor(props) {
    super(props);
    this.changeMinutes = this.changeMinutes.bind(this);
    this.changeSeconds = this.changeSeconds.bind(this);
  }

  changeMinutes(e) {
    this.props.onMinuteChange(e.target.value);
  }

  changeSeconds(e) {
    this.props.onSecondsChange(e.target.value);
  }

  changeInterval(e) {
    this.props.onIntervalChange(e.target.value);
  }

  // Format the minutes displayed in 'mm' format.
  formatMinutes(minutes) {
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    return minutes + ':';
  }

  // Format the seconds displayed in 'ss' format.
  formatSeconds(seconds) {
    if (seconds < 10 && seconds >= 0) {
      seconds = '0' + seconds;
    } else if (seconds < 0) {
      seconds = 59;
    }
    return seconds;
  }
  render() {
    return (
      <div>
        <button className="startButton" onClick={() => this.props.onClick()}>
          Start
          </button>
        <div className="timer">
          <span onChange={this.changeMinutes}>
            {this.formatMinutes(this.props.minutesFunc)}
          </span>
          <span onChange={this.changeSeconds}>
            {this.formatSeconds(this.props.secondsFunc)}
          </span>
        </div>
        <br />
        <div className="interval" onChange={this.changeInterval}>
          Interval: {this.props.intervalFunc}
        </div>
      </div>
    );
  }
}

// Timer parent to contain state for
// children components.
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalBreakTime: 3,
      endBreakTime: 15,
      minutes: 0,
      seconds: 2,
      interval: 0,
      restart: false,
      shortBreak: false,
      longBreak: false,
    };
    this.timer = 0;
    this.handleIntervalChange = this.handleIntervalChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleSecondChange = this.handleSecondChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
    this.handleIntervalCounterChange = this.handleIntervalCounterChange.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleCountDown = this.handleCountDown.bind(this);
  }

  handleIntervalChange(time) {
    this.setState({ intervalBreakTime: time });
  }

  handleEndChange(time) {
    this.setState({ endBreakTime: time });
  }

  handleSecondChange(secondsFunc) {
    this.setState({ seconds: secondsFunc });
  }

  handleMinuteChange(minutesFunc) {
    this.setState({ minute: minutesFunc });
  }

  handleIntervalCounterChange(intervalFunc) {
    this.setState({ interval: intervalFunc });
  }

  // Countdown time until 0, where alert will be sound.
  handleCountDown() {
    var minutes = this.state.minutes;
    var seconds = this.state.seconds - 1;
    var shortBreak = this.state.shortBreak;
    var longBreak = this.state.longBreak;

    if (seconds < 0) {
      minutes = this.setState({ minutes: minutes - 1 });
      seconds = 59;
    }

    // Update minutes/seconds state
    // in event above if statement occurs.
    this.setState({
      minutes: minutes,
      seconds: seconds,
    });

    if (minutes === 0 && seconds === 0 && shortBreak === true) {
      // Finished a short break, reset timer.
      this.setState({
        minute: 0,
        seconds: 2,
        restart: true,
        shortBreak: false,
      });
      alert("Short break is over. Get back to work!");
      console.log('Finished a short break.');
      clearInterval(this.timer);
    } else if (minutes === 0 && seconds === 0 && longBreak === true) {
      // Finished longBreak, reset timer and interval.
      this.setState({
        minute: 0,
        seconds: 2,
        interval: 0,
        restart: true,
        shortBreak: false,
        longBreak: false,
      });
      console.log('Finished long break.');
      clearInterval(this.timer);
    }
    // First instance where timer runs out.
    // On rerender start a short break timer.
    else if (minutes === 0 && seconds === 0 && longBreak === false) {
      this.setState({
        minutes: 0,
        seconds: this.state.intervalBreakTime,
        interval: this.state.interval + 1,
        restart: false,
        shortBreak: true,
      });
      alert("Your timer has ended, take a break!");
      console.log('Starting short break');
      clearInterval(this.timer);
    }

    // Finished 4 intervals of timers
    // and short breaks, start a long break.
    if (this.state.interval === 4) {
      this.setState({
        minutes: 0,
        seconds: this.state.endBreakTime,
        interval: 0,
        restart: false,
        shortBreak: false,
        longBreak: true,
      });
      console.log('Starting long break.');
      clearInterval(this.timer);
    }
  }

  // Call countdown in interval with button click
  // with respect to the state of the timer(on/not on break).
  handleStartClick() {
    // Start initial timer.
    if (this.timer === 0) {
      this.timer = setInterval(this.handleCountDown, 1000);
    } else if (this.state.restart === true) {
      this.timer = setInterval(this.handleCountDown, 1000);
    } else if (this.state.shortBreak === true) {
      this.timer = setInterval(this.handleCountDown, 1000);
    } else if (this.state.longBreak === true) {
      this.timer = setInterval(this.handleCountDown, 1000);
    }
  }

  render() {
    const intervalBreakTime = this.state.intervalBreakTime;
    const endBreakTime = this.state.endBreakTime;
    const seconds = this.state.seconds;
    const minutes = this.state.minutes;
    const interval = this.state.interval;

    return (
      <div className="timerChildren">
        <IntervalBreakTimeInput
          time={intervalBreakTime}
          onIntervalChange={this.handleIntervalChange} /><br />
        <EndBreakTimeInput
          time={endBreakTime}
          onEndChange={this.handleEndChange} /><br />
        <StartTimer
          secondsFunc={seconds}
          minutesFunc={minutes}
          intervalFunc={interval}
          onSecondsChange={this.handleSecondChange}
          onMinuteChange={this.handleMinuteChange}
          onIntervalChange={this.handleIntervalCounterChange}
          onClick={() => this.handleStartClick()} />
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
        <Timer></Timer>
      </div>
    );
  }
}

export default App;
