const getMatches = async () => {
    setLoading(true);
    setError(null);

    try {
        console.log('📡 Llamando a Football API');

        const response = await axios.get('https://api.football-data.org/v4/matches', {
            headers: {
                'X-Auth-Token': 'e0d17f658b2749a1971bb281c1b8a58a'   // ← Pon tu token real
            }
        });

        console.log('✅ Respuesta recibida:', response.data);

        if (response.data?.matches) {
            setMatches(response.data.matches);
        } else {
            setError('Formato de respuesta inválido');
        }
    } catch (error) {
        console.error('❌ Error:', error);
        // ... manejo de errores igual que antes
    } finally {
        setLoading(false);
    }
};