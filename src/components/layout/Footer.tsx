'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { navLinks } from './navlinks';
import { SocialLinks } from './constants/social';

const Footer = () => {
    const pathname = usePathname();

    return (
        <footer className='bg-cultark-gray text-white p-5'>
            <div className='lg:max-w-[80rem] lg:mx-auto flex flex-col md:flex-row justify-between items-center gap-6 pt-5'>
                <div className='flex flex-col items-center w-full md:w-auto'>
                    <div className='w-full flex justify-center md:justify-start'>
                        <Image
                            src='/images/logos/white-2048x396.png'
                            alt='Cultark Logo'
                            width={2048}
                            height={396}
                            className='w-[60%] md:w-[60%] h-auto'
                            priority={false}
                            loading="lazy"
                        />
                    </div>
                    <p className='text-[1rem] text-gray-300 mt-2 pt-2 text-left w-full md:text-left'>
                        Empowering creativity and technology for a better future.
                    </p>
                </div>
                {/* Navigation Links */}
                <div className='flex flex-col md:flex-row items-center gap-6'>
                    {navLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.path}
                            className={`text-nowrap text-gray-300 hover:text-white transition duration-300 ${pathname === link.path ? 'text-white' : ''
                                }`}
                        >
                            {link.title}
                        </Link>
                    ))}
                </div>
                {/* Social Media Icons */}
                <div className='flex items-center gap-2'>
                    {SocialLinks.map((link, index) => {
                        return (
                            <a
                                href={link.url}
                                target='_blank'
                                rel='noopener noreferrer'
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