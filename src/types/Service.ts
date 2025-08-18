type Service = {
    title: {
        rendered: string;
    };
    id: string;
    slug: string;
    acf: {
        service_items: string[];
        image: string;
        order: number;
        description?: string;
    };
};

export default Service;