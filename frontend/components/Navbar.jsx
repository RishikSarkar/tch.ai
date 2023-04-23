import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import {AiOutlineMenu} from 'react-icons/ai';
import {RxCross1} from 'react-icons/rx'

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };



  return (
    <div className='bg-gradient-to-br from-bg-start to-bg-start md:bg-none font-roboto fixed w-full h-20 z-[100] select-none text-white'>
      <div className='flex justify-between items-center w-full h-full px-2 2xl:px-16'>
        <div className='ml-8 md:ml-0 flex items-center'>
          <h2 className='font-light ml-2 text-white'>vivaldi</h2>
        </div>
        <div>
          <ul className='font-medium hidden md:flex text-[#ecf0f3]'>

              <Link href='/'>
                <li className='ml-4 font-light text-lg uppercase px-6 p-3 rounded-full hover:bg-white bg-opacity-10 hover:bg-opacity-20 ease-in duration-100'>Login</li>
              </Link>

              <Link href='/'>
                <li className='ml-4 font-light text-lg uppercase px-6 p-3 rounded-full hover:bg-white bg-opacity-10 hover:bg-opacity-20 ease-in duration-100'>Sign Up</li>
              </Link>

          </ul>
          <div onClick={handleNav} className='md:hidden cursor-pointer'>
            <AiOutlineMenu className='mr-8 text-white' size = {25}/>
          </div>
        </div>
      </div>

      <div className={nav ? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/80' : ''}>
        <div className={nav ? 'bg-gradient-to-br from-bg-start to-bg-start fixed left-0 top-0 w-full sm:w-[60%] md:w-[45%] h-screen p-12 ease-in duration-100' : 'fixed left-[-100%] h-screen top-0 p-12 ease-in duration-100'}>
          <div>
            <div className='flex w-full items-center justify-end'>
              <div onClick={handleNav} className='text-xl text-white -mt-9 -mr-5 rounded-full hover:bg-white hover:bg-opacity-20 ease-in duration-100 p-4 cursor-pointer'>
                <RxCross1 />
              </div>
            </div>
          </div>
          <div className='font-roboto py-12 flex flex-col'>
            <ul className='uppercase'>

                <Link href='/'>
                  <li onClick={()=> setNav(false)} className='mb-4 p-6 px-10 font-light text-lg text-white rounded-full hover:bg-white bg-opacity-10 hover:bg-opacity-20 ease-in duration-100'>Login</li>
                </Link>

                <Link href='/'>
                  <li onClick={()=> setNav(false)} className='mb-4 p-6 px-10 font-light text-lg text-white rounded-full hover:bg-white bg-opacity-10 hover:bg-opacity-20 ease-in duration-100'>Sign Up</li>
                </Link>

            </ul>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Navbar
