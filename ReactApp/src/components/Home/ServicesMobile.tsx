import { Props } from './ServiceDesktop';
import { formatToTwoDigits } from '../../utils/functions';
import { FaArrowRight } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { truncate } from 'lodash';
import { cx } from 'class-variance-authority';
const ServicesMobile = ({
  services,
  isLoading,
  selectedService,
  setSelectedService,
  buttonsHeight,
}: Props) => {
  const navigate = useNavigate();
  return (
    <div className='lg:hidden my-5 mt-28 gap-5'>

      <div className='flex flex-col items-start gap-5 mb-5'>
        {isLoading ? (
          <div>Loading services...</div>
        ) : (
          <div className='flex flex-wrap gap-3'>
            {services &&
              selectedService &&
              services?.map((service, index) => (
                <button
                  className={cx(
                    'shrink-0 flex gap-5 text-xl font-archivo px-5 py-1 w-fit rounded-full items-center',
                    selectedService.slug === service.slug
                      ? 'bg-cultark-gray text-cultark-white'
                      : 'border border-[#DDDDDD] hover:shadow-md'
                  )}
                  onClick={() => setSelectedService(service)}
                  key={service.slug}
                >
                  <span
                    className={cx(
                      'font-extrabold',
                      selectedService.slug === service.slug
                        ? 'text-cultark-green'
                        : ''
                    )}
                  >
                    {formatToTwoDigits(index + 1)}
                  </span>
                  <span>{service.title.rendered}</span>
                </button>
              ))}
            <Link
              className={cx(
                'shrink-0 flex gap-5 text-xl font-archivo px-5 py-1 w-fit rounded-full items-center justify-between hover:shadow-md group',
                'bg-cultark-green text-cultark-gray hover:bg-cultark-blue hover:text-white'
              )}
              to={'/services'}
            >
              Explore all services
              <FaArrowRight className='' />
            </Link>
          </div>
        )}

      </div>
      {selectedService && (
        <div className={`lg:hidden block w-full max-h-[${buttonsHeight}]`}>
          <div
            className={`w-full rounded-[32px]  bg-no-repeat bg-center bg-cover overflow-clip group`}
            style={{
              backgroundImage: `url(${selectedService?.acf.image})`,
            }}
            onClick={() => navigate(`/services/${selectedService.slug}`)}
          >
            <div className='bg-black/70 w-full h-full text-white flex flex-col justify-between px-10 p-6 lg:p-12 cursor-pointer'>
              <div>
                <h2>{selectedService.title.rendered}</h2>
                <p className='text'>
                  {' '}
                  {truncate(selectedService.acf.description, {
                    length: 250,
                  })}
                </p>
              </div>
              <Link
                className='ml-auto flex items-center gap-3 group-hover:text-cultark-green border-b group-hover:border-cultark-green border-transparent mt-2'
                to={`/services/${selectedService.slug}`}
              >
                Learn more about {selectedService.title.rendered}{' '}
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesMobile;
