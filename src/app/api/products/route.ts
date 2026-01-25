import { NextResponse } from 'next/server';

const ALZA_API_URL = 'https://www.alza.cz/Services/RestService.svc/v2/products';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Headers to mimic Postman Runtime (which works)
        const headers = {
            'User-Agent': 'PostmanRuntime/7.29.0',
            'Accept': '*/*',
            'Cache-Control': 'no-cache',
            'Postman-Token': 'c9e83262-1234-4567-8901-abcdef123456',
            'Host': 'www.alza.cz',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Content-Type': 'application/json'
        };

        const response = await fetch(ALZA_API_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            console.error(`Upstream API failed: ${response.status} ${response.statusText}`);
            return NextResponse.json(
                { error: `Upstream API failed: ${response.status}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Proxy error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
