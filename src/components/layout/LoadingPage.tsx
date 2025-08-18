import { AxiosError } from 'axios';
import { TriangleAlertIcon } from 'lucide-react';
import { FaSpinner } from 'react-icons/fa6';

const LoadingPage = ({
    isError,
    error,
    errorPrefix,
    loadingPrefix,
}: {
    isError: boolean;
    error: AxiosError | Error;
    errorPrefix: string;
    loadingPrefix: string;
}) => {
    return (
        <div className='max-w-[110rem] px-10  min-h-screen mx-auto space-y-3 mb-10 flex flex-col items-center justify-center text-gray-400'>
            {isError ? (
                <>
                    <TriangleAlertIcon size={60} className='' />
                    <p>
                        {errorPrefix} {error.message}
                    </p>
                </>
            ) : (
                <>
                    <FaSpinner
                        size={50}
                        className='animate-spin ease-in-out transition duration-700'
                    />
                    <p className=''>{loadingPrefix}</p>
                </>
            )}
        </div>
    );
};

export default LoadingPage;