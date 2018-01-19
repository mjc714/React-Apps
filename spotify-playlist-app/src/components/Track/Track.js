import React from 'react';
import './Track.css';

class Track extends React.Component {
    renderAction = () => {
        return <a className='Track-action'>-</a> ? isRemoval :
            <a className='Track-action'>+</a>;
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.trackName}</h3>
                    <p>{this.props.trackArtist} | {this.props.trackAlbum}</p>
                </div>
                {this.renderAction}
            </div>
        );
    }
}

export default Track;