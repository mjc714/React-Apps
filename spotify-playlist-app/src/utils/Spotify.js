let accessToken = '';
const CLIENT_ID = '59f67eb6238d402694b6adf262d2a8d8';
const REDIRECT_URI = 'http://localhost:3000/callback';

let Spotify = {
    getAccessToken() {
        if (accessToken !== '') {
            return accessToken;
        } else if (accessToken === '') {
            /**
             * Check to see if access token is in the URL.
             * If it isn't then redirect user to sign via Spotify.
             */
            if (window.location.href.match(/access_token=([^&]*)/) === null) {
                window.location.replace(`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`);
                return;
            }
            // Grab accessToken and expireTime from returned callback URL.
            accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
            let expireTime = window.location.href.match(/expires_in=([^&]*)/)[1];

            // Set accessToken to expire in 'expireTime'.
            window.setTimeout(() => accessToken = '', expireTime * 1000);

            // Clear the URL so the app doesn't try to use accessToken after it expires.
            window.history.pushState('Access Token', null, '/');
        }
    },

    async search(term) {
        try {
            let response = await fetch(`https://api.spotify.com/v1/search?q=${term}&type=track`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
            if (response.ok) {
                let jsonResponse = await response.json();
                // Check if any tracks were returned.
                if (Object.keys(jsonResponse.tracks.items).length > 0) {
                    return jsonResponse.tracks.items.map(track => {
                        return {
                            name: track.name,
                            artist: track.artists[0].name,
                            album: track.album.name,
                            id: track.id,
                            uri: track.uri

                        }
                    });
                } else {
                    return [];
                }
            }
        } catch (error) {
            console.log(error);
        }
    },

    async savePlaylist(playlistName, trackURIs) {
        if (playlistName === undefined && trackURIs === undefined) {
            return;
        }
        let access_token = accessToken;
        let userID;
        // let getUserIDjsonResponse;
        // let postNewPlaylistjsonResponse;
        // let postAddTracksjsonResponse;
        let playlistID;
        let jsonResponse;

        // GET a user's Spotify username.
        try {
            let res = await fetch('https://api.spotify.com/v1/me',
                {
                    headers: { 'Authorization': `Bearer ${access_token}` }
                })
            if (res.ok) {
                jsonResponse = await res.json();
                userID = jsonResponse.id;
            }
        } catch (error) {
            console.log(error);
        }

        // POST Create new playlist in userID's account.
        try {
            let savePlaylistRes = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
                {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: `${playlistName}` }),
                    method: 'POST'
                }
            )
            if (savePlaylistRes.ok) {
                jsonResponse = await savePlaylistRes.json();
                playlistID = jsonResponse.id;
            }
        } catch (error) {
            console.log(error);
        }

        // POST Add tracks to saved playlist.
        try {
            let addTrackRes = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
                {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 'uris': trackURIs }),
                    method: 'POST'
                },
            )
            if (addTrackRes.ok) {
                jsonResponse = await addTrackRes.json();
                // snapshot_id used to ID playlist version in future requests.
                playlistID = jsonResponse.snapshot_id;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default Spotify;