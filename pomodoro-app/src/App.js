import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class BreakTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interalBreakTime: 3,
      endBreakTime: 15,
    };
    this.handleIntervalSubmit = this.handleIntervalSubmit.bind(this);
    this.handleIntervalChange = this.handleIntervalChange.bind(this);
    this.handleEndSubmit = this.handleEndSubmit.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
  }

  // Handle change in dropdown menu.
  handleIntervalChange(e) {
    // Update breakTime state value to
    // what is selected in the dropdown.
    this.setState({ intervalBreakTime: e.target.value });
  }

  handleEndChange(e) {
    this.setState({ endBreakTime: e.target.value });
  }

  // Handle submit input.
  handleIntervalSubmit(e) {
    alert("Submitted interval break time: " + this.state.intervalBreakTime);
    e.preventDefault();
  }

  handleEndSubmit(e) {
    alert("Submitted end break time: " + this.state.endBreakTime);
    e.preventDefault();
  }

  render() {
    return (
      <div className="breakTimes">
        <form className="intervalBreakSelect" onSubmit={this.handleIntervalSubmit}>
          <label className="intervalBreakLabel">
            Break time:
          </label>
          <select className="intervalBreakTime" value={this.state.intervalBreakTime} onChange={this.handleIntervalChange}>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <input className="submit" type="submit" value="Submit" />
        </form>

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
          </select>
          <input className="submit" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
    };
    this.startTimer = this.startTimer.bind(this);
    this.endTimer = this.endTimer.bind(this);
  }

  // Start the timer.
  startTimer(e) {
    alert("Hello World");
  }

  // Signal to user that time as expired.
  endTimer(e) {
    alert("Timer has Expired");
  }

  render() {
    return (
      <button className="startButton" onClick={() => this.startTimer()}>
        Start
    </button>
    );
  }
}

// Timer component that will render a timer
// to count to 25 minutes and breaks(3-5 or 15-30).
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
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
        Time: {this.state.time}
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
        </header>
        <BreakTime></BreakTime> <br />
        <Start></Start>
        <Timer></Timer>
      </div>
    );
  }
}

export default App;
