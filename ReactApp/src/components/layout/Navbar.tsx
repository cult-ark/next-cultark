import { cx } from 'class-variance-authority';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa6';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import scrollToElement from 'scroll-to-element';
import { navLinks } from './navlinks';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <header className='fixed w-full font-archivo z-[100]'>
      <div className='hidden lg:flex justify-center w-full mt-10'>
        <div className='flex justify-between align-center bg-cultark-white/70 border-[1px] border-white w-fit max-w-[110rem] rounded-full p-3 pl-5 gap-14 backdrop-blur-sm shadow-lg'>

        <Link to={'/'} className='w-8 flex items-center'>
          <img
            className='aspect-square object-cover'
            src='images/cultark-logo.png'
            alt='Image'
          />
        </Link>
        <div className='flex items-center gap-10 text-width-max text-btn cursor-pointer '>
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                cx('hover:text-cultark-blue', isActive && 'text-cultark-blue')
              }
            >
              {link.title}
            </NavLink>
          ))}
        </div>
        <button
          className='bg-cultark-green py-2 px-5 rounded-full text-btn hover:bg-cultark-blue hover:text-cultark-white'
          onClick={() => {
            if (pathname === '/') {
              scrollToElement('#getInTouch', {
                offset: -50,
                ease: 'in-out-expo',
                duration: 1000,
              });
            } else {
              navigate('/?scrollTo=getInTouch');
            }
          }}
        >
          Get in Touch
        </button>
        </div>
      </div>
      <div className='lg:hidden flex justify-between px-8 py-8 relative'>
        <Link
          to={'/'}
          className='bg-white rounded-full w-16 h-16 p-4 flex justify-center items-center relative z-10'
        >
          <img src='images/cultark-logo.png' width={20} alt='' />
        </Link>
        <div
          className='bg-white rounded-full w-16 h-16 p-4 flex justify-center items-center text-cultark-blue z-10'
          onClick={() => setOpen(!open)}
        >
          <FaBars size={20} />
        </div>
        <div
          className={`${
            open ? '' : 'hidden'
          } inset-0 absolute w-full h-screen bg-white top-0 left-0 pt-24 px-10 flex flex-col items-center gap-6`}
        >
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                cx(
                  'text-lg font-medium text-gray-700',
                  isActive && 'text-cultark-blue'
                )
              }
              onClick={() => setOpen(false)}
            >
              {link.title}
            </NavLink>
          ))}
          <button
            className='mt-6 bg-cultark-green py-3 px-6 rounded-full text-lg font-medium hover:bg-cultark-blue hover:text-white'
            onClick={() => {
              setOpen(false);
              if (pathname === '/') {
                scrollToElement('#getInTouch', {
                  offset: 80,
                  ease: 'in-out-expo',
                  duration: 1000,
                });
              } else {
                navigate('/?scrollTo=getInTouch');
              }
            }}
          >
            Get in Touch
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
