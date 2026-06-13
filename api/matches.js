import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const response = await fetch('https://api.football-data.org/v4/matches', {
            headers: {
                'X-Auth-Token': 'e0d17f658b2749a1971bb281c1b8a58a',
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `Football API error: ${response.status}` },
                { status: response.status }
            );
        }

        const data = await response.json();

        return NextResponse.json(data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Auth-Token, Content-Type',
            },
        });
    } catch (error) {
        console.error('Proxy error:', error);
        return NextResponse.json(
            { error: 'Error al obtener los partidos' },
            { status: 500 }
        );
    }
}

// Manejar preflight (OPTIONS)
export async function OPTIONS() {
    return NextResponse.json(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Auth-Token, Content-Type',
        },
    });
}