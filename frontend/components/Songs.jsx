import React, { useState, useEffect } from 'react';

const Songs = ({predictionString}) => {

    

    return (
        <div id='home' className='font-roboto selection:text-[#00001F] selection:bg-[#F0FFFF] w-full h-screen text-center'>
            <div className='max-w-[1440px] w-full h-full mx-auto p-12 flex justify-center items-center'>
                <div>
                    <h1 className='text-5xl font-light py-3 text-[#F0FFFF] uppercase'>
                    {predictionString}
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Songs
