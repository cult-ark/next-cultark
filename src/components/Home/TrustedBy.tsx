'use client'

// import { FolderOpen, Heart } from 'lucide-react';
import { Heart } from 'lucide-react';
const google_partner = 'images/assets/cultark-PremierPartner-RGB.png'
const meta_partner = '/images/assets/cultark-Meta-Badge.jpg';
const tiktok = '/images/assets/cultark-tiktok.jpg';
import { cx } from 'class-variance-authority';
import scrollToElement from 'scroll-to-element';
// import { Link } from 'react-router-dom';

const TrustedBy = () => {
    return (
        <div className='px-6 py-20 lg:pt-28 max-w-[110rem] mx-auto z-10 space-y-5'>

            <h2 className='text-h1-2 !text-center'>Trusted By</h2>
            <div className='w-full flex items-center justify-evenly gap-5 flex-wrap no-scrollbar pb-10'>
                {[google_partner, meta_partner, tiktok].map((partner, index) => (
                    <img
                        key={index}
                        src={partner}
                        alt=''
                        className={cx(
                            'flex-shrink h-28 lg:h-36',
                            partner == tiktok && 'border rounded-lg border-gray-600'
                        )}
                    />
                ))}
            </div>
            <div className='flex lg:flex-row flex-col items-center justify-center gap-5'>
                <button
                    className='bg-cultark-blue border hover:bg-cultark-blue/90 border-cultark-blue text-white flex w-full items-center justify-center gap-2 py-3 rounded-lg '
                    onClick={() =>
                        scrollToElement('#getInTouch', {
                            offset: -50,
                            ease: 'in-out-expo',
                            duration: 1000,
                        })
                    }
                >
                    <span>Let's Talk</span>
                    <Heart size={20} />
                </button>
                {/* <Link
          className='border flex w-full items-center justify-center gap-2 py-3 rounded-lg hover:bg-gray-200'
          to={'/portfolio'}
        >
          <span>View the Full Portfolio</span> <FolderOpen size={20} />
        </Link> */}
            </div>
        </div>
    );
};

export default TrustedBy;