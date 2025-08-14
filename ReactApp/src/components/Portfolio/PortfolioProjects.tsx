/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { Search } from 'lucide-react';
import { fetchProjects } from '../../services/projects';
import { useState } from 'react';
import ProjectCard from './ProjectCard';
import SkeletonGenerator from '../layout/SkeletonGenerator';
import LoadingProjectCard from './LoadingProjectCard';
import { Link } from 'react-router-dom';

const PortfolioProjects = () => {
  const debounceSearch = debounce((value: string) => {
    setSearch(value);
  }, 500);
  const [search, setSearch] = useState('');
  const { data, isLoading } = useQuery(
    ['projects', search.length > 2 ? search : undefined],
    () => fetchProjects(search.length > 2 ? search : undefined),
    {
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );
  return (
    <div className='lg:pt-36 pt-20 px-8 md:px-10 max-w-[130rem] lg:mx-auto'>

      <h1 className='text-h3 md:text-h1-2 xl:text-7xl order-1 group-even:text-right w-full '>
        All Projects
      </h1>
      <div className='border rounded-md py-3 px-6 text-gray-500 my-5 flex items-center'>
        <Search size={18} />
        <input
          type='text'
          placeholder='Search for a project'
          className='bg-transparent border-none outline-none ml-3 w-full'
          onChange={(e) => debounceSearch(e.target.value)}
        />
      </div>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 pb-10'>
        {isLoading ? (
          <SkeletonGenerator skeleton={<LoadingProjectCard />} count={4} />
        ) : (
          data?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </div>
      <div className='text-center my-10 lg:w-1/2 w-[90%] flex lg:flex-row flex-col justify-between items-center mx-auto gap-5 lg:gap-0'>
        <div className='flex flex-col text-left'>
          <span>Not ready to be our partner?</span>
          <span className='text-h4'>No Problem!</span>
        </div>
        <div>
          <Link
            className='bg-gray-300 px-5 py-3 rounded-xl'
            to={'/?scrollTo=getInTouch'}
          >
            Learn Our Ways
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PortfolioProjects;
