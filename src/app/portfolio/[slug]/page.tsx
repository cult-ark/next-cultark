import { Metadata } from 'next';
import { fetchProject, fetchProjects } from '@/services/projects';
import ProjectPageClient from './ProjectPageClient';

// Generate static params for all portfolio projects
export async function generateStaticParams() {
    try {
        const projects = await fetchProjects();
        return projects.map((project) => ({
            slug: project.slug,
        }));
    } catch (error) {
        console.error('Error generating static params for portfolio projects:', error);
        return [];
    }
}

interface ProjectPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    try {
        const { slug } = await params;
        const project = await fetchProject(slug);

        if (!project) {
            return {
                title: 'Project Not Found - Portfolio - Cultark',
                description: 'The requested project could not be found in our portfolio.',
            };
        }

        return {
            title: `${project.title.rendered} - Portfolio - Cultark`,
            description: project.acf.summary || 'View this project in our portfolio showcasing our digital marketing and development expertise.',
            keywords: `${project.title.rendered}, portfolio, project, case study, ${project.acf.tag?.map(tag => tag.name).join(', ')}`,
            openGraph: {
                title: `${project.title.rendered} - Portfolio - Cultark`,
                description: project.acf.summary || 'View this project in our portfolio showcasing our digital marketing and development expertise.',
                type: 'article',
                url: `/portfolio/${slug}`,
                images: project.acf.large_image ? [
                    {
                        url: project.acf.large_image,
                        width: 1200,
                        height: 630,
                        alt: project.title.rendered,
                    }
                ] : undefined,
            },
            twitter: {
                card: 'summary_large_image',
                title: `${project.title.rendered} - Portfolio - Cultark`,
                description: project.acf.summary || 'View this project in our portfolio showcasing our digital marketing and development expertise.',
                images: project.acf.large_image ? [project.acf.large_image] : undefined,
            },
        };
    } catch (error) {
        return {
            title: 'Project - Portfolio - Cultark',
            description: 'View this project in our portfolio showcasing our digital marketing and development expertise.',
        };
    }
}

const ProjectPage = async ({ params }: ProjectPageProps) => {
    const { slug } = await params;
    return <ProjectPageClient slug={slug} />;
};

export default ProjectPage;