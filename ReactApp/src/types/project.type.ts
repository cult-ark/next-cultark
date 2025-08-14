export type ProjectType = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  acf: {
    summary: string;
    large_image: string;
    thumbnail: string;
    tag: {
      term_id: number;
      name: string;
      slug: string;
      term_group: number;
      term_taxonomy_id: number;
      taxonomy: string;
      description: string;
      parent: number;
      count: number;
      filter: string;
    }[];
    content: string;
  };
};
