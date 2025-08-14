import { useNavigate } from 'react-router-dom';

const GetInTouch = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className='fixed lg:sticky bottom-5 lg:bottom-auto lg:top-36 bg-cultark-green rounded-full flex items-center justify-center text-wrap ~text-lg/4xl right-0 mr-10 ml-auto aspect-square ~w-[6rem]/48 cursor-pointer z-[100] hover:scale-105 hover:border hover:border-green-500 transform transition-transform duration-300'

        onClick={() => navigate('/?scrollTo=getInTouch')}
      >
        Get in <br /> Touch
      </div>
    </>
  );
};

export default GetInTouch;
