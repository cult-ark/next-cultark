export type PdfDoc = {
    slug: string;
    name: string;
    description: string;
    fileUrl: string; // Path under public/
};

// Update fileUrl paths to match files you place under `public/docs/`
export const pdfDocs: PdfDoc[] = [
    {
        slug: 'ai-report',
        name: 'AI Report',
        description: 'Comprehensive report on applied AI and use cases.',
        fileUrl: '/docs/AiReport.pdf',
    },
    {
        slug: 'auc',
        name: 'AUC Case study',
        description: 'Overview of CultArk services, team and portfolio.',
        fileUrl: '/docs/auc_case_study.pdf',
    },
    {
        slug: 'cfa',
        name: 'CFA Case Study',
        description: 'Go-to-market strategies and campaign frameworks.',
        fileUrl: '/docs/cfa_case_study.pdf',
    },
    {
        slug: 'zid',
        name: 'Zid Case Study',
        description: 'Selected case studies demonstrating results.',
        fileUrl: '/docs/zid_case_study.pdf'
    },
];