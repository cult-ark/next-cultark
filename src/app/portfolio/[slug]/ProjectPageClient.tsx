'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchProject } from '@/services/projects';
import { AxiosError } from 'axios';
import LoadingPage from '@/components/layout/LoadingPage';
import Tags from '@/components/Portfolio/Tags';
import Breadcrumb from '@/components/common/Breadcrumb';

interface ProjectPageClientProps {
    slug: string;
}

const ProjectPageClient = ({ slug }: ProjectPageClientProps) => {
    const {
        data: project,
        isLoading,
        error,
        isError,
    } = useQuery({
        queryKey: ['project', slug],
        queryFn: () => fetchProject(slug),
        enabled: !!slug,
        retry: 2,
        refetchOnWindowFocus: false,
    });

    if (isLoading || isError)
        return (
            <LoadingPage
                isError={isError}
                error={error as AxiosError}
                errorPrefix='Error fetching project: '
                loadingPrefix='Loading Project...'
            />
        );

    return (
        <div className='max-w-[110rem] px-10 pt-32 lg:pt-36 min-h-screen mx-auto space-y-5 mb-10'>
            <Breadcrumb
                items={[
                    { label: 'Home', url: '/' },
                    { label: 'Portfolio', url: '/portfolio' },
                    { label: project?.title.rendered ?? '', url: `` },
                ]}
            />
            <Tags tags={project?.acf.tag || []} className='!mt-1' />
            <h1 className='text-h1-2'>{project?.title.rendered}</h1>
            <div
                className='h-[35vh] overflow-hidden bg-no-repeat bg-cover bg-center rounded-xl'
                style={{ backgroundImage: `url(${project?.acf.large_image})` }}
            />
            <div
                dangerouslySetInnerHTML={{
                    __html: project?.acf.content ?? '',
                }}
                className='mx-5'
            />
        </div>
    );
};

export default ProjectPageClient;