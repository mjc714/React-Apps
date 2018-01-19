import React from 'react';
import TrackList from './TrackList/TrackList';

class Playlist extends React.Component {
    render() {
        return (
            <div class="Playlist">
                <input value="New Playlist" />
                <TrackList />
                <a class="Playlist-save">SAVE TO SPOTIFY</a>
            </div>
        );
    }
}