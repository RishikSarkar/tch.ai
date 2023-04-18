import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import {AiOutlineMenu} from 'react-icons/ai';
import {RxCross1} from 'react-icons/rx'

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      }
      else {
        setShadow(false);
      }
    };
    window.addEventListener('scroll', handleShadow);
  }, []);

  return (
    <div className={shadow ? 'font-roboto fixed w-full h-20 shadow-xl z-[100] select-none text-[#F0FFFF]' :
    'font-roboto fixed w-full h-20 z-[100] select-none text-[#F0FFFF]'}>
      <div className='flex justify-between items-center w-full h-full px-2 2xl:px-16'>
        <div className='ml-8 md:ml-0 flex items-center'>
          <h2 className='font-light ml-2 text-[#F0FFFF]'>vivaldi</h2>
        </div>
        <div>
          <ul className='font-medium hidden md:flex text-[#ecf0f3]'>

              <Link href='/'>
                <li className='ml-4 font-light text-lg uppercase px-6 p-3 rounded-full hover:bg-[#BBEBE9] bg-opacity-10 hover:bg-opacity-30 ease-in duration-100'>Login</li>
              </Link>

              <Link href='/'>
                <li className='ml-4 font-light text-lg uppercase px-6 p-3 rounded-full hover:bg-[#BBEBE9] bg-opacity-10 hover:bg-opacity-30 ease-in duration-100'>Sign Up</li>
              </Link>

          </ul>
          <div onClick={handleNav} className='md:hidden cursor-pointer'>
            <AiOutlineMenu className='mr-8 text-[#ecf0f3] dark:text-[#012033] hover:text-[#BBEBE9] dark:hover:text-[#008080]' size = {25}/>
          </div>
        </div>
      </div>

      <div className={nav ? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/80' : ''}>
        <div className={nav ? 'fixed left-0 top-0 w-full sm:w-[60%] md:w-[45%] h-screen p-12 ease-in duration-500' : 'fixed left-[-100%] h-screen top-0 p-12 ease-in duration-500'}>
          <div>
            <div className='flex w-full items-center justify-end'>
              <div onClick={handleNav} className='text-xl text-[#ecf0f3] -mt-8 -mr-6 rounded-full hover:bg-[#BBEBE9] hover:bg-opacity-10 ease-in duration-100 p-4 cursor-pointer'>
                <RxCross1 />
              </div>
            </div>
          </div>
          <div className='font-roboto py-12 flex flex-col'>
            <ul className='uppercase'>

                <Link href='/'>
                  <li onClick={()=> setNav(false)} className='mb-4 p-6 px-10 text-md text-[#ecf0f3] rounded-full hover:bg-[#BBEBE9] bg-opacity-10 hover:bg-opacity-30 ease-in duration-100'>Login</li>
                </Link>

                <Link href='/'>
                  <li onClick={()=> setNav(false)} className='mb-4 p-6 px-10 text-md text-[#ecf0f3] rounded-full hover:bg-[#BBEBE9] bg-opacity-10 hover:bg-opacity-30 ease-in duration-100'>Sign Up</li>
                </Link>

            </ul>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Navbar
