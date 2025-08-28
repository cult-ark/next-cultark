'use client';

import { cx } from 'class-variance-authority';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa6';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import scrollToElement from 'scroll-to-element';
import { navLinks } from './navlinks';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    return (
        <header className='fixed w-full font-archivo z-[100]'>
            <div className='hidden lg:flex justify-center w-full mt-10 px-4'>
                <div className='flex justify-between align-center bg-cultark-white/70 border-[1px] border-white w-fit max-w-[110rem] rounded-full p-3 pl-5 gap-14 backdrop-blur-sm shadow-lg'>
                    <Link href={'/'} className='w-8 flex items-center'>
                        <Image
                            className='aspect-square object-cover'
                            src='/images/cultark-logo.png'
                            alt='CultArk Logo'
                            width={32}
                            height={32}
                            priority
                        />
                    </Link>
                    <div className='flex items-center gap-10 text-width-max text-btn cursor-pointer '>
                        {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                href={link.path}
                                className={cx(
                                    'hover:text-cultark-blue',
                                    pathname === link.path && 'text-cultark-blue'
                                )}
                            >
                                {link.title}
                            </Link>
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
                                router.push('/?scrollTo=getInTouch');
                            }
                        }}
                    >
                        Get in Touch
                    </button>
                </div>
            </div>
            <div className='lg:hidden flex justify-between px-8 py-8 relative'>
                <Link
                    href={'/'}
                    className='bg-white rounded-full w-16 h-16 p-4 flex justify-center items-center relative z-10'
                >
                    <Image
                        src='/images/cultark-logo.png'
                        alt='CultArk Logo'
                        width={20}
                        height={20}
                        priority
                    />
                </Link>
                <div
                    className='bg-white rounded-full w-16 h-16 p-4 flex justify-center items-center text-cultark-blue z-10'
                    onClick={() => setOpen(!open)}
                >
                    <FaBars size={20} />
                </div>
                <div
                    className={`${open ? '' : 'hidden'
                        } inset-0 absolute w-full h-screen bg-white top-0 left-0 pt-24 px-10 flex flex-col items-center gap-6`}
                >
                    {navLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.path}
                            className={cx(
                                'text-lg font-medium text-gray-700',
                                pathname === link.path && 'text-cultark-blue'
                            )}
                            onClick={() => setOpen(false)}
                        >
                            {link.title}
                        </Link>
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
                                router.push('/?scrollTo=getInTouch');
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