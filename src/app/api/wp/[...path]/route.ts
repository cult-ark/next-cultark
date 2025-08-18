import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const { path } = await params;
        const searchParams = request.nextUrl.searchParams;

        // Construct the WordPress API URL
        const wpUrl = new URL(`https://cultark.com/wp-json/wp/v2/${path.join('/')}`);

        // Forward all query parameters
        searchParams.forEach((value, key) => {
            wpUrl.searchParams.append(key, value);
        });

        // Fetch from WordPress API
        const response = await fetch(wpUrl.toString(), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`WordPress API responded with status: ${response.status}`);
        }

        const data = await response.json();

        // Return the data with proper CORS headers
        return NextResponse.json(data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    } catch (error) {
        console.error('WordPress API proxy error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch from WordPress API' },
            {
                status: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                },
            }
        );
    }
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}