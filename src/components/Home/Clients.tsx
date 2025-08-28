import Carousel from '@/components/common/Carousel';
import clientData from '../../../data/clients.json';

const Clients = () => {
    const clients = clientData.clientImages;

    return (
        <div className='w-full mx-auto mb-20 lg:mb-28 overflow-x-hidden'>
            <h2 className='text-h1-2 !text-center'>Our Clients</h2>
            <Carousel items={clients || []} />
        </div>
    );
};

export default Clients;