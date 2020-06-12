
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
                  topSongs: [],
                  basicScore: 0,
  };
  }

  componentDidMount(){

    const { isUserAuthorized } = this.state;

    if (isUserAuthorized) {



      fetch('http://localhost:5000/history')
        .then(res => res.json())
        .then(data => {

          var i;
          var sum = 0;
          for(i=0;i<Object.keys(data).length; i++){
              sum += data[i].popularity;
                  }

          this.setState({
              basicScore: sum/Object.keys(data).length,
              topSongs: data,
                  })
          console.log(data)
        }
        )
          //this.setState({
            //topSongs: data,
          //});

        .catch(error => console.log(error));

    }

  }




  render() {
    const { isUserAuthorized, topSongs, basicScore } = this.state;
    const connectSpotify = isUserAuthorized ? (
  <p>Spotify connected! Your basic score is: </p>
) : (
  <a href="http://localhost:5000/login">connect to your spotify to see</a>
);

const ShowBasicScore = () => (
  <p>{basicScore}</p>
)
const TableItem = (item, index) => (
  <tr key={item.name}>
    <td>{index+1}</td>
    <td>{item.name}</td>
    <td>{item.popularity}</td>
  </tr>
);

const RecentlyPlayed = () => (
  <div className="recently-played">
    <h2>most listened to arists</h2>
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Artist</th>
          <th>Pop</th>
        </tr>
      </thead>
      <tbody>{topSongs.map((e, index) => TableItem(e, index))}</tbody>
    </table>
  </div>
);




    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">everyone's worst fear is being basic </h1>
          <h2 className="App-subtitle">are you basic? </h2>
          {connectSpotify}
          {topSongs.length !== 0 ? <ShowBasicScore /> : null}
          {topSongs.length !== 0 ? <RecentlyPlayed /> : null}
        </header>


      </div>
    );
  }
}

export default App;
