
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    const urlParams = new URLSearchParams(window.location.search);
    const isUserAuthorized = urlParams.has('authorized') ? true : false;

    this.state = {
                  isUserAuthorized,
                  musicHistory: [],
  };
  }



  render() {
    const { isUserAuthorized, musicHistory } = this.state;
    const connectSpotify = isUserAuthorized ? (
  ''
) : (
  <a href="http://localhost:5000/login">connect to your spotify to see</a>
);
    const BasicScore = () => (
      <p>Spotify connected! Your basic score</p>
    );



    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">everyone's worst fear is being basic </h1>
          <h2 className="App-subtitle">are you basic? updated </h2>
          {connectSpotify}
          {musicHistory.length !== 0 ? <BasicScore /> : null}
        </header>


      </div>
    );
  }
}

export default App;
