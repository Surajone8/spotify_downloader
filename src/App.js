import React, { useState } from 'react';
import axios from 'axios';
import "./SpotifyDownloader.css"

function SpotifyDownloader() {
    const [songUrl, setSongUrl] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const [error, setError] = useState('');

    const getTrackIdFromUrl = (url) => {
        const match = url.match(/track\/([a-zA-Z0-9]+)/);
        return match ? match[1] : null;
    };

    const getSongUrl = async () => {
        const trackId = getTrackIdFromUrl(songUrl);
        if (!trackId) {
            setError('Invalid Spotify URL');
            return;
        }

        const options = {
            method: 'GET',
            url: 'https://spotify-downloader9.p.rapidapi.com/downloadSong',
            params: { songId: trackId },
            headers: {
                'x-rapidapi-key': '28f4f42ac0mshf495d17c202ee64p1ef067jsnf3939e2c9d3d',
                'x-rapidapi-host': 'spotify-downloader9.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setAudioUrl(response.data.data.downloadLink);
            setError('');
        } catch (error) {
            setError(error.response ? error.response.data : error.message);
        }
    };

    return (
        <>
            <div className='container'>
                <input
                    type="text"
                    value={songUrl}
                    onChange={(e) => setSongUrl(e.target.value)}
                    placeholder="Enter Spotify song URL"
                />
                <button onClick={getSongUrl}>Get Song</button>
                {audioUrl && (
                    <div>
                        <audio controls src={audioUrl}>
                            Your browser does not support the audio element.
                        </audio>
                        <a href={audioUrl} download>Download Song</a>
                    </div>
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </>

    );
}

export default SpotifyDownloader;
