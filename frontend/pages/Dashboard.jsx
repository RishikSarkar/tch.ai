import React, { useState, useEffect } from 'react';
import { FiPlay } from 'react-icons/fi';
import { AiOutlineMinus } from 'react-icons/ai';
import { user } from '../components/Navbar';

const Dashboard = () => {

    const [songList, setSongList] = useState([]);

    useEffect(() => {
        handleGetSong();
    }, []);

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
                alert(data.error);
            }
        } catch (error) {
            console.error(error);
            alert('An Error Occurred!');
        }
    };

    const handleRemoveSong = async (trackname, trackartists) => {
        console.log(JSON.stringify({ user, trackname, trackartists }));
        try {
            const response = await fetch('/api/removesongs', {
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
            alert('An Error Occurred!');
        }
    };

    const scrollbarStyle = {
        scrollbarWidth: 'thin',
        scrollbarColor: '#40E0D0 transparent',
    };

    return (
        <div id='dashboard' className='bg-gradient-to-br from-[#800080] to-[#40E0D0] font-roboto selection:text-black selection:bg-white/50 w-full h-screen text-center'>
            <div className='max-w-[1440px] w-full h-full mx-auto p-12 flex justify-center items-center'>
                <div className='-mb-20 mt-12 md:mt-0'>
                    <div className='bg-black/20 p-6'>
                        <div className='border-4 border-[#40E0D0] max-w-[400px] bg-black/5 md:max-w-none p-6'>
                            <div className='border-4 border-white/20 bg-black/5 p-6 max-h-[400px] overflow-y-scroll' style={{ ...scrollbarStyle }}>
                                <table className='font-light text-white'>
                                    <tbody>
                                        {(songList.length > 0) && songList.map((song, index) => (
                                            <tr key={index} className='border-2 border-white/20'>
                                                <td className='px-4 py-2'>
                                                    <button className={`p-4 hover:bg-white/10 ease-in duration-100 rounded-full hover:text-custom`}
                                                        style={{ '--border-color': `var(--bg-end)` }}>
                                                        <FiPlay size={20} />
                                                    </button>
                                                </td>
                                                <td className='px-4 py-2 hover:bg-white/10 ease-in duration-100 max-w-[150px] md:max-w-[350px]'>
                                                    <div className='font-medium text-sm md:text-lg truncate'>
                                                        {song.trackname}
                                                    </div>
                                                    <div className='font-light text-xs md:text-md truncate'>
                                                        {song.trackartists}
                                                    </div>
                                                </td>
                                                <td className='px-4 py-2'>
                                                    <button className={`p-4 hover:bg-white/10 ease-in duration-100 rounded-full hover:text-custom`} style={{ '--border-color': `var(--bg-end)` }}
                                                        onClick={async () => await handleRemoveSong(song.trackname, song.trackartists)}>
                                                        <AiOutlineMinus size={20} />
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
            </div>
        </div>
    )
}

export default Dashboard
