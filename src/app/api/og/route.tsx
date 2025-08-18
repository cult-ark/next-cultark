import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const title = searchParams.get('title') || 'CULTARK';
        const description = searchParams.get('description') || 'Performance Marketing Agency';
        const type = searchParams.get('type') || 'default';

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#0F19D3',
                        backgroundImage: 'linear-gradient(135deg, #0F19D3 0%, #A5F269 100%)',
                        fontSize: 32,
                        fontWeight: 600,
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            borderRadius: '20px',
                            padding: '60px',
                            margin: '40px',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                            maxWidth: '1000px',
                            textAlign: 'center',
                        }}
                    >
                        <div
                            style={{
                                fontSize: 72,
                                fontWeight: 800,
                                color: '#0F19D3',
                                marginBottom: '20px',
                                letterSpacing: '-2px',
                            }}
                        >
                            CULTARK
                        </div>
                        <div
                            style={{
                                fontSize: 48,
                                fontWeight: 600,
                                color: '#2B2B2B',
                                marginBottom: '20px',
                                lineHeight: 1.2,
                                maxWidth: '800px',
                            }}
                        >
                            {title}
                        </div>
                        {description && (
                            <div
                                style={{
                                    fontSize: 28,
                                    color: '#666',
                                    lineHeight: 1.4,
                                    maxWidth: '700px',
                                }}
                            >
                                {description}
                            </div>
                        )}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: '40px',
                                fontSize: 24,
                                color: '#A5F269',
                                fontWeight: 600,
                            }}
                        >
                            Performance Marketing Agency
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}