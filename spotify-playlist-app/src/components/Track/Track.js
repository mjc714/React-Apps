import React from 'react';

class Track extends React.Component {
    render() {
        return (
            <div class="Track">
                <div class="Track-information">
                    <h3>{this.props.trackName}</h3>
                    <p>{this.props.trackArtist} | {this.props.trackAlbum}</p>
                </div>
                {/* + or - will go here */}
                <a class="Track-action">{this.props.trackAction}</a>
            </div>
        );
    }
}