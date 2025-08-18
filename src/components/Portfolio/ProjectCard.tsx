'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ProjectType } from '@/types/project.type';
import { truncate } from '@/utils/text';
import Tags from './Tags';

const ProjectCard = ({ project }: { project: ProjectType }) => {
    return (
        <div className='flex flex-col justify-between p-3 border rounded-2xl gap-5'>
            <div className='' key={project.slug}>
                <Link href={`/portfolio/${project.slug}`}>
                    <Image
                        src={project.acf.thumbnail}
                        className='rounded-lg aspect-square'
                        alt={project.title.rendered}
                        width={400}
                        height={400}
                        loading="lazy"
                    />
                </Link>
                <main className='px-5 flex flex-col min-h-[200px]'>
                    <h3 className='text-4xl font-semibold mb-6'>{project.title.rendered}</h3>
                    <Tags tags={project.acf.tag} className='mb-4' />
                    <p className='text-[1.2rem] line-clamp-3'>{truncate(project.acf.summary, { length: 250 })}</p>
                </main>
            </div>
            <Link
                href={`/portfolio/${project.slug}`}
                className='bg-cultark-blue text-white hover:text-cultark-blue-dark w-full py-3 mt-5 text-center rounded-lg'
            >
                Read More
            </Link>
        </div>
    );
};

export default ProjectCard;