import { FaSpinner } from 'react-icons/fa6';

export default function Loading() {
    return (
        <div className='max-w-[110rem] px-10 min-h-screen mx-auto space-y-3 mb-10 flex flex-col items-center justify-center text-gray-400'>
            <FaSpinner
                size={50}
                className='animate-spin ease-in-out transition duration-700'
            />
            <p>Loading...</p>
        </div>
    );
}