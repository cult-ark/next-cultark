export function generateOGImageUrl(params: {
    title: string;
    description?: string;
    type?: 'blog' | 'service' | 'project' | 'case-study' | 'default';
}): string {
    const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://cultark.com'
        : 'http://localhost:3000';

    const searchParams = new URLSearchParams({
        title: params.title,
        ...(params.description && { description: params.description }),
        ...(params.type && { type: params.type }),
    });

    return `${baseUrl}/api/og?${searchParams.toString()}`;
}

export function getStaticOGImage(type: 'home' | 'services' | 'portfolio' | 'blog' | 'careers' | 'report' | 'case-studies'): string {
    const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://cultark.com'
        : 'http://localhost:3000';

    return `${baseUrl}/images/og-${type}.jpg`;
}