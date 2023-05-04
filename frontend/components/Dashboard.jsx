import React, { useState, useEffect } from 'react';
import { FiPlay } from 'react-icons/fi';
import { user } from './Navbar';

const Dashboard = () => {

    const [songList, setSongList] = useState(null);

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
            setSongList(data);

            if (response.ok) {
                console.log(data.message);
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        }
    };

    return (
        <div id='songs' className='font-roboto selection:text-black selection:bg-white/50 w-full h-screen bg-white text-center'>
            <div className='max-w-[1440px] w-full h-full mx-auto p-12 flex justify-center items-center'>
                <div className='-mb-20 mt-12 md:mt-0'>
                    <div className='max-w-[400px] md:max-w-none bg-white/5 p-4'>
                        <div className={`border-2 border-custom p-6`} style={{ '--border-color': `var(--bg-end)` }} >
                            <table className='font-light text-white'>
                                <tbody>
                                    {songList.map((song, index) => (
                                        <tr key={index} className='border-2 border-white/10'>
                                            <td className='px-4 py-2'>
                                                <button className={(predictionString == 'sad' || predictionString == 'angry' || predictionString == 'surprise') ? 'p-4 hover:bg-white/20 ease-in duration-100 rounded-full hover:text-white/80'
                                                    : `p-4 hover:bg-white/20 ease-in duration-100 rounded-full hover:text-custom`}
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
