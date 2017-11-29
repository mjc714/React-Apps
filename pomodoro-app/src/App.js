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
    this.changeIntervalBreakTime = this.changeIntervalBreakTime.bind(this);
    this.changeEndBreakTime = this.changeEndBreakTime.bind(this);
    this.changeMinutes = this.changeMinutes.bind(this);
    this.changeSeconds = this.changeSeconds.bind(this);
    this.changeRestart = this.changeRestart.bind(this);
    this.changeShortBreak = this.changeShortBreak.bind(this);
    this.changeLongBreak = this.changeLongBreak.bind(this);
  }

  changeIntervalBreakTime(e) {
    this.props.onIntervalBreakTimeChange(e.target.value);
  }

  changeEndBreakTime(e) {
    this.props.onEndBreakTimeChange(e.target.value);
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

  changeRestart(e) {
    this.props.onRestartChange(e.target.value);
  }

  changeShortBreak(e) {
    this.props.onShortBreakChange(e.target.value);
  }

  changeLongBreak(e) {
    this.props.onLongBreakChange(e.target.value);
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
    const minutesFunc = this.props.minutes;
    const secondsFunc = this.props.seconds;
    const intervalFunc = this.props.interval;
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
    this.timer = 0;
    this.handleIntervalChange = this.handleIntervalChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleSecondChange = this.handleSecondChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
    this.handleRestartChange = this.handleRestartChange.bind(this);
    this.handleShortBreakChange = this.handleShortBreakChange.bind(this);
    this.handleLongBreakChange = this.handleLongBreakChange.bind(this);
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

  handleRestartChange(restartFunc) {
    this.setState({ restart: restartFunc });
  }

  handleShortBreakChange(shortBreakFunc) {
    this.setState({ shortBreak: shortBreakFunc });
  }

  handleLongBreakChange(longBreakFunc) {
    this.setState({ longBreak: longBreakFunc });
  }

  // Countdown time until 0, where alert will be sound.
  handleCountDown() {
    var minutes = this.state.minutes;
    var seconds = this.state.seconds - 1;
    var interval = this.state.interval;
    var restart = this.state.restart;
    var shortBreak = this.state.shortBreak;
    var longBreak = this.state.longBreak;

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

  handleStartClick() {
    if (this.timer === 0) {
      this.timer = setInterval(this.handleCountDown, 1000);
    }
    if (this.props.restart === true) {
      this.timer = setInterval(this.handleCountDown, 1000);
    }
    if (this.props.shortBreak === true) {
      alert("SHORT BREAK!");
      this.timer = setInterval(this.handleCountDown, 1000);
    }
    if (this.props.longBreak === true) {
      alert("LONG BREAK!");
      this.timer = setInterval(this.handleCountDown, 1000);
    }
  }

  render() {
    const intervalBreakTime = this.state.intervalBreakTime;
    const endBreakTime = this.state.endBreakTime;
    const seconds = this.state.seconds;
    const minutes = this.state.minutes;
    const interval = this.state.interval;
    const restart = this.state.restart;
    const shortBreak = this.state.shortBreak;
    const longBreak = this.state.longBreak;

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
          restartFunc={restart}
          shortBreakFunc={shortBreak}
          longBreakFunc={longBreak}
          intervalFunc={interval}
          onSecondsChange={this.handleSecondChange}
          onMinuteChange={this.handleMinuteChange}
          onRestartChange={this.handleRestartChange}
          onShortBreakChange={this.handleShortBreakChange}
          onLongBreakChange={this.handleLongBreakChange}
          onIntervalChange={this.handleIntervalCounterChangeChange}
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
