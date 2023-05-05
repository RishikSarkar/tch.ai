import React, { useState, useEffect, useRef } from 'react';
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';
import { FiPlay, FiRefreshCcw } from 'react-icons/fi';
import SpotifyWebApi from "spotify-web-api-js";
import axios from 'axios';
import env from '../env-config';
import { user } from './Navbar';

const Songs = ({ predictionString, recommendedSongs, setRecommendedSongs }) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const clientId = env.SPOTIFY_CLIENT_ID;
    const clientSecret = env.SPOTIFY_CLIENT_SECRET;

    // console.log('Client ID:', clientId);
    // console.log('Client Secret:', clientSecret);

    const basicAuthString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    // console.log('BasicAuthString:', basicAuthString);

    const getToken = async () => {
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');

        const response = await axios.post('https://accounts.spotify.com/api/token', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${basicAuthString}`
            }
        });

        return response.data.access_token;
    };

    const handlePlaySong = async (trackName, artistName) => {
        const spotifyApi = new SpotifyWebApi();
        const accessToken = await getToken();
        spotifyApi.setAccessToken(accessToken);

        const searchResults = await spotifyApi.search(`track:${trackName} artist:${artistName}`, ['track'], { limit: 1 });
        const trackUri = searchResults.tracks.items[0].uri;

        if (!isPlaying) {
            await spotifyApi.play({ uris: [trackUri] });
            setIsPlaying(true);
        } else {
            await spotifyApi.pause();
            setIsPlaying(false);
        }
    };

    const handleSongRecommendations = async (prediction) => {
        try {
            const res = await fetch('http://localhost:5000/recommend-songs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: prediction,
            });

            if (!res.ok) {
                throw new Error('Failed to get song recommendations!');
            }

            const songs = await res.json();
            console.log(songs);

            if (user != null) {
                handleGetSong();
            }

            setRecommendedSongs(songs);
        } catch (error) {
            console.error(error);
        }
    };

    const [songList, setSongList] = useState([]);

    const handleGetSong = async () => {
        console.log(JSON.stringify({ user }));
        try {
            const response = await fetch('/api/getsongs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user })
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data.message);
                setSongList(data.songs);
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error(error);
            alert('An Error Occurred!');
        }
    };

    const nameList = songList.map(song => song.trackname);
    const artistList = songList.map(song => song.trackartists);

    const handleAddSong = async (trackname, trackartists) => {
        console.log(JSON.stringify({ user, trackname, trackartists }));
        try {
            const response = await fetch('/api/addsongs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user, trackname, trackartists })
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data.message);
                handleGetSong();
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        }
    };

    return (
        <div id='songs' className={(predictionString == null) ? 'hidden font-roboto selection:text-black selection:bg-white/50 w-full h-screen text-center'
            : 'font-roboto selection:text-black selection:bg-white/50 w-full h-screen text-center'}>
            <div className='max-w-[1440px] w-full h-full mx-auto p-12 flex justify-center items-center'>
                <div className='-mb-20 mt-12 md:mt-0'>
                    <div className={(predictionString == 'sad' || predictionString == 'angry' || predictionString == 'surprise') ? 'max-w-[400px] md:max-w-none bg-white/5 p-4' : 'max-w-[400px] md:max-w-none bg-black/20 p-4'}>
                        <div className={`border-2 border-custom p-6`} style={{ '--border-color': `var(--bg-end)` }} >
                            <table className='font-light text-white'>
                                <tbody>
                                    {recommendedSongs.map((song, index) => (
                                        <tr key={index} className='border-2 border-white/10'>
                                            <td className='px-4 py-2'>
                                                <button className={(predictionString == 'sad' || predictionString == 'angry' || predictionString == 'surprise') ? 'p-4 hover:bg-white/20 ease-in duration-100 rounded-full hover:text-white/80'
                                                    : `p-4 hover:bg-white/20 ease-in duration-100 rounded-full hover:text-custom`}
                                                    style={{ '--border-color': `var(--bg-end)` }}
                                                    onClick={() => handlePlaySong(song.track_name, song.artists)}>
                                                    <FiPlay size={20} />
                                                </button>
                                            </td>
                                            <td className='px-4 py-2 hover:bg-white/20 ease-in duration-100 max-w-[150px] md:max-w-[350px]'>
                                                <div className='font-medium text-sm md:text-lg truncate'>
                                                    {song.track_name}
                                                </div>
                                                <div className='font-light text-xs md:text-md truncate'>
                                                    {song.artists.replace(/;/g, ', ')}
                                                </div>
                                            </td>
                                            <td className={(nameList.includes(song.track_name) && artistList.includes(song.artists.replace(/;/g, ', '))) ? 'px-4 py-2 pointer-events-none' : 'px-4 py-2'}>
                                                <button className={(predictionString == 'sad' || predictionString == 'angry' || predictionString == 'surprise') ? 'p-4 hover:bg-white/20 ease-in duration-100 rounded-full hover:text-white/80'
                                                    : `p-4 hover:bg-white/20 ease-in duration-100 rounded-full hover:text-custom`} style={{ '--border-color': `var(--bg-end)` }}
                                                    onClick={async () => await handleAddSong(song.track_name, song.artists.replace(/;/g, ', '))}>
                                                    {!(nameList.includes(song.track_name) && artistList.includes(song.artists.replace(/;/g, ', '))) && <AiOutlinePlus size={20} />}
                                                    {(nameList.includes(song.track_name) && artistList.includes(song.artists.replace(/;/g, ', '))) && <AiOutlineCheck size={20} />}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <button className={(predictionString == 'sad' || predictionString == 'angry' || predictionString == 'surprise') ? `hover:bg-white/20 rounded-full mt-8 md:mt-12 bg-white/5 text-white hover:text-white/80 hover:-rotate-180 ease-in duration-200 p-4 cursor-pointer`
                        : `hover:bg-black/5 rounded-full mt-8 md:mt-12 bg-black/20 text-white hover:text-custom hover:-rotate-180 ease-in duration-200 p-4 cursor-pointer`}
                        style={{ '--border-color': `var(--bg-end)` }}
                        onClick={() => handleSongRecommendations(predictionString)} >
                        <FiRefreshCcw size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Songs
