type BlogTag = {
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
};

type BlogACF = {
    summary: string;
    thumbnail: string;
    tag: BlogTag[];
    content: string;
};

type BlogPost = {
    id: number;
    slug: string;
    date: string;
    featured_image: string;
    title: {
        rendered: string;
    };
    acf: BlogACF;
};

export type { BlogPost, BlogACF, BlogTag };