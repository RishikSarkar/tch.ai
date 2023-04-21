import React, { useState, useEffect, useRef } from 'react';
import {AiOutlinePlus} from 'react-icons/ai';
import {FiPlay} from 'react-icons/fi';
import SpotifyWebApi from "spotify-web-api-js";
import axios from 'axios';
import env from '../env-config';

const Songs = ({predictionString, recommendedSongs}) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const clientId = env.SPOTIFY_CLIENT_ID;
    const clientSecret = env.SPOTIFY_CLIENT_SECRET;

    console.log('Client ID:', clientId);
    console.log('Client Secret:', clientSecret);

    const basicAuthString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    console.log('BasicAuthString:', basicAuthString);

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
            await spotifyApi.play({uris: [trackUri]});
            setIsPlaying(true);
        } else {
            await spotifyApi.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div id='songs' className={(predictionString == null)? 'hidden font-roboto selection:text-[#00001F] selection:bg-white w-full h-screen text-center' 
                                                            : 'font-roboto selection:text-[#00001F] selection:bg-white w-full h-screen text-center'}>
            <div className='max-w-[1440px] w-full h-full mx-auto p-12 flex justify-center items-center'>
                <div className={(predictionString == 'sad' || predictionString == 'angry' || predictionString == 'surprise')? 'bg-white/5 p-4' : 'bg-black/20 p-4'}>
                    <div className={`border-2 border-custom p-6`} style={{ '--border-color': `var(--bg-end)` }} >
                        <table className='font-light text-white'>
                            <tbody>
                                {recommendedSongs.map((song, index) => (
                                    <tr key={index} className='border-2 border-white/10'>
                                        <td className='px-4 py-2'>
                                            <button className={(predictionString == 'sad' || predictionString == 'angry' || predictionString == 'surprise')? 'p-4 hover:bg-white/20 ease-in duration-100 rounded-full hover:text-white/80'
                                                                : `p-4 hover:bg-white/20 ease-in duration-100 rounded-full hover:text-custom`} 
                                                                style={{ '--border-color': `var(--bg-end)` }}
                                                                onClick={() => handlePlaySong(song.track_name, song.artists)}>
                                                <FiPlay size={20} />
                                            </button>
                                        </td>
                                        <td className='px-4 py-2 hover:bg-white/20 ease-in duration-100 max-w-[350px]'>
                                            <div className='font-medium text-lg truncate'>
                                                {song.track_name}
                                            </div>
                                            <div className='font-light text-md truncate'>
                                                {song.artists.replace(/;/g, ', ')}
                                            </div>
                                        </td>
                                        <td className='px-4 py-2'>
                                            <button className={(predictionString == 'sad' || predictionString == 'angry' || predictionString == 'surprise')? 'p-4 hover:bg-white/20 ease-in duration-100 rounded-full hover:text-white/80'
                                                                : `p-4 hover:bg-white/20 ease-in duration-100 rounded-full hover:text-custom`} style={{ '--border-color': `var(--bg-end)` }}>
                                                <AiOutlinePlus size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Songs