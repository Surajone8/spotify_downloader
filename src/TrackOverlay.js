// TrackOverlay.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TrackOverlay.css';

function TrackOverlay({ track, onClose }) {
    const [audioUrl, setAudioUrl] = useState(null);
    const [error, setError] = useState(null);
    console.log(track.id)

    // Function to get the song download URL
    const getSongUrl = async () => {
        const options = {
            method: 'GET',
            url: 'https://spotify-downloader9.p.rapidapi.com/downloadSong',
            params: { songId: track.id },
            headers: {
                'x-rapidapi-key': '28f4f42ac0mshf495d17c202ee64p1ef067jsnf3939e2c9d3d',
                'x-rapidapi-host': 'spotify-downloader9.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log('Download Link:', response.data.data.downloadLink);
            setAudioUrl(response.data.data.downloadLink); // Set the audio URL for playback and download
        } catch (error) {
            setError(error.response ? error.response.data : error.message);
        }
    };

    // Fetch the song URL when the component mounts
    useEffect(() => {
        getSongUrl();
    }, []);

    return (
        <div className="overlay">
            <div className="overlay-content">
                <img className='overlay-img' src={track.albumOfTrack.coverArt.sources[2].url} alt="" />
                <>
                    <button className="close-button" onClick={onClose}>×</button>
                    <h2>{track.name}</h2>
                    <p>Artist: {track.artists.items.map(artist => artist.profile.name).join(', ')}</p>

                    {audioUrl ? (
                        <>
                            <audio controls src={audioUrl}>
                                Your browser does not support the audio element.
                            </audio>
                            <a href={audioUrl} download={`${track.name}.mp3`} className="download-button">
                                Download
                            </a>
                        </>
                    ) : (
                        <p>Loading audio...</p>
                    )}

                    {error && <p>Error: {error}</p>}
                </>
            </div>
        </div>
    );
}

export default TrackOverlay;
