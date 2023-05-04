import React, { useState, useEffect } from 'react';
import { FiPlay } from 'react-icons/fi';
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
            alert('An error occurred');
        }
    };

    return (
        <div id='dashboard' className='font-roboto selection:text-black selection:bg-white/50 w-full h-screen text-center'>
            <div className='max-w-[1440px] w-full h-full mx-auto p-12 flex justify-center items-center'>
                <div className='-mb-20 mt-12 md:mt-0'>
                    <div className='max-w-[400px] md:max-w-none bg-white/5 p-4'>
                        <div className={`border-2 border-custom p-6 max-h-[400px] overflow-y-scroll`} style={{ '--border-color': `var(--bg-end)` }} >
                            <table className='font-light text-white'>
                                <tbody>
                                    {(songList.length > 0) && songList.map((song, index) => (
                                        <tr key={index} className='border-2 border-white/10'>
                                            <td className='px-4 py-2'>
                                                <button className={`p-4 hover:bg-white/20 ease-in duration-100 rounded-full hover:text-custom`}
                                                    style={{ '--border-color': `var(--bg-end)` }}>
                                                    <FiPlay size={20} />
                                                </button>
                                            </td>
                                            <td className='px-4 py-2 hover:bg-white/20 ease-in duration-100 max-w-[150px] md:max-w-[350px]'>
                                                <div className='font-medium text-sm md:text-lg truncate'>
                                                    {song.trackname}
                                                </div>
                                                <div className='font-light text-xs md:text-md truncate'>
                                                    {song.trackartists}
                                                </div>
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
    )
}

export default Dashboard
