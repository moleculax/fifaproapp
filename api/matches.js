export default async function handler(req, res) {
    try {
        const response = await fetch('https://api.football-data.org/v4/matches', {
            headers: {
                'X-Auth-Token': 'e0d17f658b2749a1971bb281c1b8a58a',
            },
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: `API Error: ${response.status}` });
        }

        const data = await response.json();

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

        return res.status(200).json(data);
    } catch (error) {
        console.error('Proxy Error:', error);
        return res.status(500).json({ error: 'Error interno del proxy' });
    }
}