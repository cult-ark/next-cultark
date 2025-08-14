import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa6';
import { Fragment } from 'react/jsx-runtime';

type Props = {
  items: {
    label: string;
    url: string;
  }[];
};

const Breadcrumb = ({ items }: Props) => {
  return (
    <div className='flex items-center text-gray-500 gap-1.5 pt-10'>
      {/* //breadcrumbs */}
      {items.slice(0, items.length - 1).map((item, index) => (
        <Fragment key={index}>
          <Link
            to={item.url}
            className='text-gray-500 hover:underline hover:text-cultark-blue'
          >
            {item.label}
          </Link>{' '}
          <FaAngleRight size={12} />
        </Fragment>
      ))}
      <span className='text-gray-500 whitespace-nowrap'>{items[items.length - 1].label}</span>
    </div>
  );
};

export default Breadcrumb;
