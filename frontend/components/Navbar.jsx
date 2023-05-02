import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import {AiOutlineMenu} from 'react-icons/ai';
import {RxCross1} from 'react-icons/rx';
import {HiOutlineArrowNarrowRight} from 'react-icons/hi';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const [showLogin, setShowLogin] = useState(false);
  
  const handleShowLogin = () => {
    setShowLogin(!showLogin)
  }

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='bg-gradient-to-br from-bg-start to-bg-start md:bg-none font-roboto fixed w-full h-20 z-[100] select-none text-white'>
      <div className='flex justify-between items-center w-full h-full px-2 2xl:px-16'>
        <div className='ml-8 md:ml-0 flex items-center'>
          <h2 className='font-light text-white'>tch.ai</h2>
        </div>
        <div>
          <div className='font-light hidden md:flex text-white'>

              <button onClick={handleShowLogin} className='font-light text-lg uppercase px-6 p-3 rounded-full hover:bg-white bg-opacity-10 hover:bg-opacity-20 ease-in duration-100'>
                Login
              </button>

          </div>
          <div onClick={handleNav} className='md:hidden cursor-pointer'>
            <AiOutlineMenu className='mr-8 text-white' size = {25}/>
          </div>
        </div>
      </div>

      <div className={nav? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/80' : ''}>
        <div className={nav ? 'bg-gradient-to-br from-bg-start to-bg-start fixed left-0 top-0 w-full sm:w-[60%] md:w-[45%] h-screen p-12 ease-in duration-100' : 'fixed left-[-100%] h-screen top-0 p-12 ease-in duration-100'}>
          <div>
            <div className='flex w-full items-center justify-end'>
              <div onClick={handleNav} className='text-xl text-white -mt-9 -mr-5 rounded-full hover:bg-white hover:bg-opacity-20 ease-in duration-100 p-4 cursor-pointer'>
                <RxCross1 />
              </div>
            </div>
          </div>
          <div className='font-roboto py-12 flex flex-col'>
            <button onClick={() => {handleNav(); handleShowLogin();}} className='uppercase mb-4 p-6 px-10 font-light text-2xl text-white hover:bg-white bg-opacity-10 hover:bg-opacity-20 ease-in duration-100'>
              Login
            </button>
          </div>
        </div>
      </div>
      
      {showLogin && (
          <div className={`border-4 border-custom relative z-10 w-[450px] h-[550px] bg-gradient-to-br from-bg-start to-bg-start mx-auto p-12 flex justify-center items-center`} style={{ '--border-color': `var(--bg-end)` }}>

            <div onClick={handleShowLogin} className='absolute top-1 right-1 text-xl text-white hover:bg-white hover:bg-opacity-20 ease-in duration-100 p-3 cursor-pointer'>
                <RxCross1 />
            </div>

            <div className='w-full h-full bg-white/10'>
              <div className='p-4 text-center bg-white/10'>
                <h2 className='font-light uppercase'>
                  Login
                </h2>
              </div>
              <div className='p-8 text-center grid grid-cols-1 gap-6'>
                <input className='p-2 text-black' type='text' name='username' placeholder='username' onChange={e => setUserName(e.target.value)}></input>
                <input className='p-2 text-black' type='password' name='password' placeholder='password' onChange={e => setPassword(e.target.value)}></input>
                <button className='flex items-center justify-center font-light text-white cursor-pointer text-md uppercase py-3 bg-white bg-opacity-10 hover:bg-opacity-20 ease-in duration-100 select-none text-center'>
                  <HiOutlineArrowNarrowRight />
                </button>
              </div>
            </div>

          </div>
        )}
      <div className={showLogin? 'z-0 fixed left-0 top-0 w-full h-screen bg-white/20' : ''}> </div>

    </div>
  )
}

export default Navbar
