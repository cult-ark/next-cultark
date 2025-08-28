import axios from 'axios';
import { ProjectType } from '../types/project.type';

const projectFormat =
    'acf_format=standard&_fields=id,title,slug,acf.summary,acf.content,acf.large_image,acf.thumbnail,acf.tag';

const getProjectsApiUrl = () => {
    const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://backup.cultark.net';
    return `${baseUrl}/wp-json/wp/v2/projects?${projectFormat}`;
};

export const fetchProjects = async (query?: string): Promise<ProjectType[]> => {
    try {
        const url = getProjectsApiUrl() + (query ? `&search=${query}` : '');
        const res = await axios(url);

        if (!res.data || !Array.isArray(res.data)) {
            console.warn('Invalid projects response format');
            return [];
        }

        return res.data as ProjectType[];
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
};

export const fetchProject = async (slug?: string): Promise<ProjectType | null> => {
    try {
        if (!slug) {
            console.warn('No slug provided for project fetch');
            return null;
        }

        const url = getProjectsApiUrl() + `&slug=${slug}`;
        const res = await axios(url);

        if (!res.data || !Array.isArray(res.data) || res.data.length === 0) {
            console.warn(`Project not found for slug: ${slug}`);
            return null;
        }

        return res.data[0];
    } catch (error) {
        console.error('Error fetching project:', error);
        return null;
    }
};