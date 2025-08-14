import { Link } from 'react-router-dom';
import { ProjectType } from '../../types/project.type';
import { truncate } from 'lodash';
import Tags from './Tags';

const ProjectCard = ({ project }: { project: ProjectType }) => {
  return (
    <div className='flex flex-col justify-between p-3 border rounded-2xl gap-5'>
      <div className='' key={project.slug}>
        <Link to={`/portfolio/${project.slug}`}>
          <img
            src={project.acf.thumbnail}
            className='rounded-lg aspect-square'
            alt=''
          />
        </Link>
        <main className='px-5 flex flex-col min-h-[200px]'>
          <h3 className='text-4xl font-semibold mb-6'>{project.title.rendered}</h3>
          <Tags tags={project.acf.tag} className='mb-4' />
          <p className='text-[1.2rem] line-clamp-3'>{truncate(project.acf.summary, { length: 250 })}</p>
        </main>
      </div>
      <Link
        to={`/portfolio/${project.slug}`}
        className='bg-cultark-blue text-white hover:text-cultark-blue-dark w-full py-3 mt-5 text-center rounded-lg'
        preventScrollReset={false}
      >
        Read More
      </Link>
    </div>
  );
};

export default ProjectCard;
