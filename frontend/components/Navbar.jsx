import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineMenu } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

export var user = null;

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const [showLogin, setShowLogin] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(!showLogin)
  };

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const [loginSuccess, setLoginSuccess] = useState(false);

  const [message, setMessage] = useState(null);

  const handleLogin = async () => {
    if (botStatus) {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
          console.log(data.message);
          setMessage(data.message);
          setLoginSuccess(true);
          user = username;

          setTimeout(() => {
            handleShowLogin();
          }, 1500);
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred');
      }
    }
    else {
      alert('Are you human?');
    }
  };

  const handleLogout = () => {
    setUsername(null);
    setPassword(null);
    user = null;
    setLoginSuccess(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleShowUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const [botStatus, setBotStatus] = useState(false);

  const humanVerification = (event) => {
    setBotStatus(event.target.checked);
    console.log(botStatus);
  };

  const [currPage, setCurrPage] = useState('main');

  return (
    <div className='bg-gradient-to-br from-bg-start to-bg-start md:bg-none font-roboto fixed w-full h-20 z-[100] select-none text-white'>
      <div className='flex justify-between items-center w-full h-full px-2 2xl:px-16'>
        <div className='ml-8 md:ml-0 flex items-center'>
          <Link href="/">
            <h2 className='font-light text-white'>tch.ai</h2>
          </Link>
        </div>
        <div>
          <div className='font-light hidden md:flex text-white'>

            <div className={loginSuccess ? 'hidden' : 'relative'}>
              <button onClick={handleShowLogin} className={showLogin ? 'font-light text-lg bg-white bg-opacity-30 px-6 py-2 uppercase' : 'font-light text-lg bg-white bg-opacity-10 hover:bg-opacity-20 ease-in duration-100 px-6 py-2 uppercase'}>
                Login
              </button>
            </div>

            <button onClick={handleShowUserMenu} className={loginSuccess ? `uppercase select-none font-light text-md px-6 py-2 bg-white ${showUserMenu ? 'bg-opacity-20' : 'bg-opacity-10 hover:bg-opacity-20'} ease-in duration-100` : 'hidden'}>
              {username}
            </button>

          </div>

          <div onClick={handleNav} className='md:hidden cursor-pointer'>
            <AiOutlineMenu className='mr-8 text-white' size={25} />
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
            <button onClick={() => { handleNav(); handleShowLogin(); }} className={loginSuccess ? 'uppercase pointer-events-none select-none cursor-pointer font-light text-2xl px-10 p-6 bg-white bg-opacity-10' : 'uppercase mb-4 p-6 px-10 font-light text-2xl text-white hover:bg-white bg-opacity-10 hover:bg-opacity-20 ease-in duration-100'}>
              {!loginSuccess && 'Login'}
              {loginSuccess && `${username}`}
            </button>
          </div>
        </div>
      </div>

      {showUserMenu && (
        <div className='absolute grid grid-cols-1 top-16 right-16 z-10 bg-white/10 mx-auto p-2 flex justify-center items-center'>
          <Link href='/Dashboard'>
            <button className={(currPage == 'main')? 'border-2 border-white/20 font-light text-sm uppercase px-4 py-2 mb-2 hover:bg-white bg-opacity-10 hover:bg-opacity-20 ease-in duration-100' : 'hidden'} onClick={() => {handleShowUserMenu(); setCurrPage('dashboard')}}>
              Saved Songs
            </button>
          </Link>
          <Link href='/'>
            <button className={(currPage == 'dashboard')? 'border-2 border-white/20 font-light text-sm uppercase px-4 py-2 hover:bg-white bg-opacity-10 hover:bg-opacity-20 ease-in duration-100' : 'hidden'} onClick={() => {handleShowUserMenu(); setCurrPage('main')}}>
              Home Page
            </button>
          </Link>
          <button className={(currPage == 'main')? 'border-2 border-white/20 font-light text-sm uppercase px-4 py-2 hover:bg-white bg-opacity-10 hover:bg-opacity-20 ease-in duration-100' : 'hidden'} onClick={() => {handleLogout(); handleShowUserMenu();}}>
            Logout
          </button>
        </div>
      )}

      {showLogin && (
        <div className={`absolute border-4 border-custom top-16 right-16 z-10 w-[300px] h-[300px] md:w-[300px] md:h-[340px] bg-black/20 mx-auto p-8 flex justify-center items-center`} style={{ '--border-color': `var(--bg-end)` }}>

          <div className='w-full h-full bg-white/10'>
            <div className='p-2 text-center bg-white/10'>
              <h2 className='font-light uppercase text-2xl'>
                Login
              </h2>
            </div>
            <div className='p-6 text-center grid grid-cols-1 gap-4'>
              <input className='p-2 text-sm font-light text-black' type='text' name='username' placeholder='username' onChange={e => setUsername(e.target.value)}></input>
              <input className='p-2 text-sm font-light text-black' type='password' name='password' placeholder='password' onChange={e => setPassword(e.target.value)} onKeyDown={handleKeyDown}></input>
              <button className={loginSuccess ? 'font-light text-white cursor-pointer text-md py-2 bg-white bg-opacity-20 select-none text-center truncate px-4'
                : 'flex items-center justify-center font-light text-white cursor-pointer text-md uppercase py-3 bg-white bg-opacity-20 hover:bg-opacity-30 ease-in duration-100 select-none text-center'}
                onClick={handleLogin}>
                {!loginSuccess && <HiOutlineArrowNarrowRight />}
                {loginSuccess && message == 'Successfully logged in!' && `Welcome back ${username}!`}
                {loginSuccess && message == 'Successfully registered!' && `Registered as ${username}!`}
              </button>
              <label className='flex items-center justify-center'>
                <input className='mr-2 w-4 h-4 cursor-pointer' id='verification' type='checkbox' onChange={humanVerification} />
                <span className='uppercase text-sm font-light animate-pulse-slow'>Not a Bot</span>
              </label>
            </div>
          </div>

        </div>
      )}

      {/* {showLogin && (
        <div className={`border-4 border-custom relative z-10 w-[350px] h-[550px] md:w-[450px] md:h-[550px] bg-gradient-to-br from-bg-start to-bg-start mx-auto p-12 flex justify-center items-center`} style={{ '--border-color': `var(--bg-end)` }}>

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
              <input className='p-3 text-black' type='text' name='username' placeholder='username' onChange={e => setUsername(e.target.value)}></input>
              <input className='p-3 text-black' type='password' name='password' placeholder='password' onChange={e => setPassword(e.target.value)} onKeyDown={handleKeyDown}></input>
              <button className={loginSuccess ? 'font-light text-white cursor-pointer text-md py-3 bg-white bg-opacity-10 select-none text-center'
                : 'flex items-center justify-center font-light text-white cursor-pointer text-md uppercase py-4 bg-white bg-opacity-10 hover:bg-opacity-20 ease-in duration-100 select-none text-center'}
                onClick={handleLogin}>
                {!loginSuccess && <HiOutlineArrowNarrowRight />}
                {loginSuccess && message == 'Successfully logged in!' && `Welcome back ${username}!`}
                {loginSuccess && message == 'Successfully registered!' && `Registered as ${username}!`}
              </button>
            </div>
          </div>

        </div>
      )} 
      <div className={showLogin ? 'z-0 fixed left-0 top-0 w-full h-screen bg-white/20' : ''}> </div> */}

    </div>
  )
}

export default Navbar
