import React from 'react'
import Link from 'next/link'
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';
import {FaLinkedinIn} from 'react-icons/fa';
import {FiTwitter, FiGithub, FiMail} from 'react-icons/fi';

const Main = () => {
  return (
      <div id='home' className='font-roboto selection:text-[#00001F] selection:bg-[#F0FFFF] w-full h-screen text-center'>
        <div className='max-w-[1440px] w-full h-full mx-auto p-12 flex justify-center items-center'>
            <div>
                <h1 className='font-medium py-3 text-[#F0FFFF]'>
                  Predict Your Mood
                </h1>

                <div className='max-w-[200px] m-auto -mb-24 py-4 select-none'>
                    <Link href=''>
                      <div className='font-medium text-[#F0FFFF] cursor-pointer text-sm uppercase px-6 p-3 rounded-full bg-[#BBEBE9] bg-opacity-10 hover:bg-opacity-20 ease-in duration-100'>
                        <h3>Upload Image!</h3>
                      </div>
                    </Link>
                </div>
            </div>
        </div>
      </div>
  )
}

export default Main
