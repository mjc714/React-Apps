import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Timer extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      time: 0,

    }
  }
  render(){
    return(
      <div>
        <p>Hello World!</p>
      </div>
    );
  }
}

class App extends Component {
  render() {
    // Start the timer.
    function startTimer(e){
      
    }
    // Signal to user that time as expired.
    // function endTimer(e){
    //   alert("Timer has Expired");
    // }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Pomodoro Timer</h1>
        </header>
        <form className = "breakSelect">
          <label className = "breakLabel">
            Break time:
            <select className="breakTime">
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <button className = "startButton" onClick={() => startTimer()}>
          Start
        </button>
        <br/>
        <Timer></Timer>
      </div>
    );
  }
}

export default App;
