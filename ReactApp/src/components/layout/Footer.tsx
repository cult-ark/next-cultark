import { NavLink } from 'react-router-dom';
import { navLinks } from './navlinks';
import { SocialLinks } from './constants/social';

const Footer = () => {
  return (
    <footer className='bg-cultark-gray text-white p-5 '>
      <div className='lg:max-w-[110rem] lg:mx-auto flex flex-col md:flex-row justify-between items-center gap-6 pt-5'>
        <div className='flex flex-col items-center md:items-'>
          <img
            src='/images/logos/white-2048x396.png'
            alt='Cultark Logo'
            className='w-[60%] mx-auto'
          />
          <p className='text-[1rem] text-gray-300 mt-2 text-center md:text-left'>
            Empowering creativity and technology for a better future.
          </p>
        </div>
        {/* Navigation Links */}
        <div className='flex flex-col md:flex-row items-center gap-6'>
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className='text-nowrap text-gray-300 hover:text-white transition duration-300'
            >
              {link.title}
            </NavLink>
          ))}
        </div>
        {/* Social Media Icons */}
        <div className='flex items-center gap-2'>
          {SocialLinks.map((link, index) => {
            return (
              <a
                href={link.url}
                target='_blank'
                className='text-gray-300 hover:text-white'
                key={index}
              >
                {link.icon}
              </a>
            );
          })}
        </div>
      </div>
      <div className='border-t border-gray-700 mt-5 pt-4 text-center text-gray-400 text-[1.1rem]'>
        © {new Date().getFullYear()} Cultark. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
