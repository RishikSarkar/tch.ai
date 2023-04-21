import React, { useState, useEffect, useRef } from 'react';
import {AiOutlinePlus} from 'react-icons/ai';
import {FiPlay} from 'react-icons/fi';

const Songs = ({predictionString, recommendedSongs}) => {

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
                                                                : `p-4 hover:bg-white/20 ease-in duration-100 rounded-full hover:text-custom`} style={{ '--border-color': `var(--bg-end)` }}>
                                                <FiPlay size={20} />
                                            </button>
                                        </td>
                                        <td className='px-4 py-2 hover:bg-white/20 ease-in duration-100 max-w-[350px]'>
                                            <div className='font-medium text-lg truncate'>
                                                {song.track_name}
                                            </div>
                                            <div className='font-light text-md truncate'>
                                                {song.artists}
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
