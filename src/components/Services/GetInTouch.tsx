'use client';

import { useRouter } from 'next/navigation';

const GetInTouch = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/?scrollTo=getInTouch');
    };

    return (
        <>
            <div
                className='fixed lg:sticky bottom-5 lg:bottom-auto lg:top-36 bg-cultark-green rounded-full flex items-center justify-center text-wrap ~text-lg/4xl right-5 aspect-square ~w-[6rem]/48 cursor-pointer z-[100] hover:scale-105 hover:border hover:border-green-500 transform transition-transform duration-300'
                onClick={handleClick}
            >
                Get in <br /> Touch
            </div>
        </>
    );
};

export default GetInTouch;