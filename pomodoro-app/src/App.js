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
class StartTimer extends React.Component {
  constructor(props) {
    super(props);
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    // this.changeIntervalBreakTime = this.changeIntervalBreakTime.bind(this);
    // this.changeEndBreakTime = this.changeEndBreakTime.bind(this);
    this.changeMinutes = this.changeMinutes.bind(this);
    this.changeSeconds = this.changeSeconds.bind(this);
    this.changeRestart = this.changeRestart.bind(this);
    this.changeShortBreak = this.changeShortBreak.bind(this);
    this.changeLongBreak = this.changeLongBreak.bind(this);
  }

  // changeIntervalBreakTime(e) {
  //   this.props.onIntervalBreakTimeChange(e.target.value);
  // }

  // changeEndBreakTime(e) {
  //   this.props.onEndBreakTimeChange(e.target.value);
  // }

  changeMinutes(e) {
    this.props.onMinuteChange(e.target.value);
  }

  changeSeconds(e) {
    this.props.onSecondsChange(e.target.value);
  }

  changeInterval(e) {
    this.props.onIntervalChange(e.target.value);
  }

  changeRestart(e) {
    this.props.onRestartChange(e.target.value);
  }

  changeShortBreak(e) {
    this.props.onShortBreakChange(e.target.value);
  }

  changeLongBreak(e) {
    this.props.onLongBreakChange(e.target.value);
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
    if (this.props.restart === true) {
      this.timer = setInterval(this.countDown, 1000);
    }
    if (this.props.shortBreak === true) {
      alert("SHORT BREAK!");
      this.timer = setInterval(this.countDown, 1000);
    }
    if (this.props.longBreak === true) {
      alert("LONG BREAK!");
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  // Countdown time until 0, where alert will be sound.
  countDown() {
    let minutes = this.props.minutes;
    let seconds = this.props.seconds - 1;
    let interval = this.props.interval;
    let restart = this.props.restart;
    let shortBreak = this.props.shortBreak;
    let longBreak = this.props.longBreak;

    if (seconds < 0) {
      minutes = this.props.minutes - 1;
      seconds = 59;
    }

    // this.props.minutes = minutes;
    // this.props.seconds = seconds;

    if (minutes === 0 && seconds === 0) {
      this.props.minutes = 0;
      this.props.seconds = 5;
      this.props.interval = this.props.interval + 1;
      this.props.restart = false;
      this.props.shortBreak = true;

      alert("Your timer has ended, take a break!");
      clearInterval(this.timer);
    }

    if (this.props.interval === 4) {
      this.props.interval = 0;
      this.props.restart = false;
      this.props.longBreak = true;

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
          {this.formatTime(this.props.minutes, this.props.seconds)}
        </div>
        <br />
        <div className="interval">
          Interval: {this.props.interval}
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
      seconds: 5,
      interval: 0,
      restart: false,
      shortBreak: false,
      longBreak: false,
    };
    this.handleIntervalChange = this.handleIntervalChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleSecondChange = this.handleSecondChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
    this.handleRestartChange = this.handleRestartChange.bind(this);
    this.handleShortBreakChange = this.handleShortBreakChange.bind(this);
    this.handleLongBreakChange = this.handleLongBreakChange.bind(this);
  }

  handleIntervalChange(time) {
    this.setState({ intervalBreakTime: time });
  }

  handleEndChange(time) {
    this.setState({ endBreakTime: time });
  }

  handleSecondChange(seconds) {
    this.setState({ seconds: seconds });
  }

  handleMinuteChange(minutes) {
    this.setState({ minute: minutes });
  }

  handleIntervalCounterChange(interval) {
    this.setState({ interval: interval });
  }
  handleRestartChange(restart) {
    this.setState({ restart: restart });
  }

  handleShortBreakChange(shortBreak) {
    this.setState({ shortBreak: shortBreak });
  }

  handleLongBreakChange(longBreak) {
    this.setState({ longBreak: longBreak });
  }

  render() {
    var intervalBreakTime = this.state.intervalBreakTime;
    var endBreakTime = this.state.endBreakTime;
    var seconds = this.state.seconds;
    var minutes = this.state.minutes;
    var interval = this.state.interval;
    var restart = this.state.restart;
    var shortBreak = this.state.shortBreak;
    var longBreak = this.state.longBreak;

    return (
      <div className="timerChildren">
        <IntervalBreakTimeInput
          time={intervalBreakTime}
          onIntervalChange={this.handleIntervalChange} /><br />
        <EndBreakTimeInput
          time={endBreakTime}
          onEndChange={this.handleEndChange} /><br />
        <StartTimer
          seconds={seconds}
          minutes={minutes}
          restart={restart}
          shortBreak={shortBreak}
          longBreak={longBreak}
          interval={interval}
          onSecondsChange={this.handleSecondChange}
          onMinuteChange={this.handleMinuteChange}
          onRestartChange={this.handleRestartChange}
          onShortBreakChange={this.handleShortBreakChange}
          onLongBreakChange={this.handleLongBreakChange}
          onIntervalChange={this.handleIntervalCounterChangeChange} />
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
