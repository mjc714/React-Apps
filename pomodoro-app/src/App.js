import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import alertSound from './pup-alert.mp3';

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
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
          </select><br />
        </form>
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
    this.changeDisable = this.changeDisable.bind(this);
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

  changeDisable(e) {
    this.props.onDisableChange(e.target.value);
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
        <button className="startButton" disabled={this.props.disableFunc}
          onChange={this.changeDisable}
          onClick={() => this.props.onClick()}>
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
      minutes: 25,
      seconds: 0,
      // minutes: 0,
      // seconds: 3,
      interval: 0,
      restart: false,
      shortBreak: false,
      longBreak: false,
      disabled: false,
    };
    this.timer = 0;
    this.handleIntervalChange = this.handleIntervalChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleSecondChange = this.handleSecondChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
    this.handleIntervalCounterChange = this.handleIntervalCounterChange.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleCountDown = this.handleCountDown.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
    this.handleDisableChange = this.handleDisableChange.bind(this);
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

  handleDisableChange(disableFunc) {
    this.setState({ disabled: disableFunc });
  }

  // Fires off a sound and alert message
  // after timeout matching timer.
  renderAlert(message) {
    var audio = new Audio(alertSound);
    return (
      audio.play(),
      alert(message),
      this.setState({ disabled: false })
    );
  }

  // Countdown time until 0, where alert will be sound.
  handleCountDown() {
    var minutes = this.state.minutes;
    var seconds = this.state.seconds;
    seconds = seconds - 1;
    var shortBreak = this.state.shortBreak;
    var longBreak = this.state.longBreak;

    if (seconds < 0) {
      minutes = minutes - 1;
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
        minutes: 25,
        seconds: 0,
        // minutes: 0,
        // seconds: 3,
        restart: true,
        shortBreak: false,
      });
      this.renderAlert("Short break is over. Get back to work!");
      console.log('Finished a short break.');
      clearInterval(this.timer);
    } else if (minutes === 0 && seconds === 0 && longBreak === true) {
      // Finished longBreak, reset timer and interval.
      this.setState({
        minutes: 25,
        seconds: 0,
        // minutes: 0,
        // seconds: 3,
        interval: 0,
        restart: true,
        shortBreak: false,
        longBreak: false,
      });
      this.renderAlert("Long break is over. Get back to work!");
      console.log('Finished long break.');
      clearInterval(this.timer);
    }
    // First instance where timer runs out.
    // On rerender start a short break timer.
    else if (minutes === 0 && seconds === 0 && longBreak === false) {
      this.setState({
        minutes: this.state.intervalBreakTime,
        seconds: 0,
        // minutes: 0,
        // seconds: 5,
        interval: this.state.interval + 1,
        restart: false,
        shortBreak: true,
      });
      this.renderAlert("Your timer has ended, take a break!");
      console.log('Starting short break');
      clearInterval(this.timer);
    }

    // Finished 4 intervals of timers
    // and short breaks, start a long break.
    if (this.state.interval === 4) {
      this.setState({
        minutes: this.state.endBreakTime,
        seconds: 0,
        // minutes: 0,
        // seconds: 7,
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
    this.setState({ disabled: true });
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
    const disabled = this.state.disabled;

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
          disableFunc={disabled}
          onDisableChange={this.handleDisableChange}
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
