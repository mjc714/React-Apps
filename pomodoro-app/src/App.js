import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class BreakTime extends React.Component{
  constructor(props){
    super(props);
    this.state={
      breakTime: 3,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  // Handle change in dropdown menu.
  handleChange(e){
    // Update breakTime state value to
    // what is selected in the dropdown.
    this.setState({breakTime: e.target.value});
  }

  // Handle submit input.
  handleSubmit(e){
    alert("Submitted break time: " + this.state.breakTime);
    e.preventDefault();
  }

  render(){
    return(
      <form className = "breakSelect" onSubmit={this.handleSubmit}>
      <label className = "breakLabel">
        Break time:
        <select className="breakTime" value = {this.state.breakTime} onChange={this.handleChange}>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      <input type="submit" value="Submit" />
    </form>
    );
  }
}

class Start extends React.Component{
  constructor(props){
    super(props);
    this.state={
      time: 0,
    };
    this.startTimer = this.startTimer.bind(this);
    this.endTimer = this.endTimer.bind(this);
  }

  // Start the timer.
  startTimer(e){
    alert("Hello World");
  }
  
  // Signal to user that time as expired.
  endTimer(e){
    alert("Timer has Expired");
  }
  
  render(){
    return(
    <button className = "startButton" onClick={() => this.startTimer()}>
      Start
    </button>
    );
  }
}

// Timer component that will render a timer
// to count to 25 minutes and breaks(3-5 or 15-30).
class Timer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      time: 0,
    };
    this.tick = this.tick.bind(this);
  }

  tick(){
    this.setState(prevState =>({
      time: prevState.time + 1
    }));
  }

  render(){
    return(
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
        <BreakTime></BreakTime> <br/>
        <Start></Start>
        <Timer></Timer>
      </div>
    );
  }
}

export default App;
