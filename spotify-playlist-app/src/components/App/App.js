import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: 'Tiny Dancer',
          artist: 'Elton John',
          album: 'Madman Across The Water',
          id: '1',
          uri: ''
        },
        {
          name: 'I Miss You',
          artist: 'blink-182',
          album: 'blink-182',
          id: '2',
          uri: ''
        },
        {
          name: 'Wish You Were Here',
          artist: 'Pink Floyd',
          album: 'Wish You Were Here',
          id: '3',
          uri: ''
        }
      ],
      playlistName: 'New Playlist',
      playlistTracks: [
        {
          name: 'Tiny Dancer',
          artist: 'Elton John',
          album: 'Madman Across The Water',
          id: '1',
          uri: ''
        }
      ],
    }
    this.savePlaylist = this.savePlaylist.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.search = this.search.bind(this);
  }

  savePlaylist() {
    let trackURIs = [];
    this.state.playlistTracks.forEach(track => {
      trackURIs.push(track.uri);
    });
  }

  search(searchTerm) {
    console.log(searchTerm);
  }

  // Add a track by clicking the '+'.
  addTrack(track) {
    // Check if playlistTracks does not have track.id.
    if (this.state.playlistTracks.find(t => t.id === track.id) === undefined) {
      this.setState({
        /**
         * Convert track to an array, then concat that to the
         * original playlistTracks array of track objects so a new
         * array is returned which is needed in <TrackList/>'s .map call
         */
        playlistTracks: this.state.playlistTracks.concat([track])
      });
    } else {
      alert('Track already exists!.');
    }
  }

  // Remove track by clicking '-'.
  removeTrack(track) {
    this.setState({
      // Keep all tracks whose id does not match track.id parameter.
      playlistTracks: this.state.playlistTracks.filter(t => t.id !== track.id)
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>in</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
              onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              isRemoval={true}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
