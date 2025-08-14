import axios from 'axios';
import { ProjectType } from '../types/project.type';

const projectFormat =
  'acf_format=standard&_fields=id,title,slug,acf.summary,acf.content,acf.large_image,acf.thumbnail,acf.tag';

export const fetchProjects = async (query?: string): Promise<ProjectType[]> => {
  const res = await axios(
    `${
      import.meta.env.VITE_WORDPRESS_URL
    }/wp-json/wp/v2/projects?${projectFormat}&${
      query !== undefined && `search=${query}`
    }`
  );

  return res.data as ProjectType[];
};

export const fetchProject = async (slug?: string): Promise<ProjectType> => {
  const res = await axios(
    `${
      import.meta.env.VITE_WORDPRESS_URL
    }/wp-json/wp/v2/projects?slug=${slug}&${projectFormat}`
  );

  return res.data[0];
};
