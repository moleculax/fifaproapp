import React, { useEffect, useState } from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonSpinner,
    IonText,
    IonRefresher,
    IonRefresherContent
} from '@ionic/react';
import axios from 'axios';

interface Match {
    id: number;
    utcDate?: string;
    status?: string;
    homeTeam: { name: string };
    awayTeam: { name: string };
    score?: {
        fullTime?: {
            home: number | null;
            away: number | null;
        };
    };
}

const WorldCupMatches: React.FC = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getMatches = async () => {
        setLoading(true);
        setError(null);

        try {
            console.log('📡 Llamando al proxy en Vercel');

            const response = await axios.get('https://fifaproapp.vercel.app/api/matches');

            console.log('✅ Respuesta recibida:', response.data);

            if (response.data?.matches && Array.isArray(response.data.matches)) {
                setMatches(response.data.matches);
            } else {
                setError('No se encontraron partidos');
            }
        } catch (error: any) {
            console.error('❌ Error fetching matches:', error);

            if (axios.isAxiosError(error) && error.response) {
                const status = error.response.status;

                if (status === 429) {
                    setError('Límite de peticiones alcanzado. Intenta más tarde.');
                } else if (status === 401 || status === 403) {
                    setError('Error de autenticación con la API.');
                } else if (status >= 400 && status < 500) {
                    setError(`Error del cliente (${status})`);
                } else if (status >= 500) {
                    setError('Error interno del servidor. Intenta más tarde.');
                } else {
                    setError(`Error ${status}`);
                }
            } else {
                setError('Error de conexión. Revisa tu internet e intenta nuevamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async (event: CustomEvent) => {
        await getMatches();
        event.detail.complete();
    };

    useEffect(() => {
        getMatches();
    }, []);

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Fecha no disponible';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>🏆 World Cup Matches</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent />
                </IonRefresher>

                {loading && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                        <IonSpinner name="crescent" />
                        <IonText style={{ marginLeft: '10px' }}>Cargando partidos...</IonText>
                    </div>
                )}

                {error && !loading && (
                    <div style={{ textAlign: 'center', marginTop: '20px', padding: '16px' }}>
                        <IonText color="danger">
                            <p>⚠️ {error}</p>
                        </IonText>
                        <button
                            onClick={getMatches}
                            style={{
                                marginTop: '10px',
                                padding: '10px 20px',
                                backgroundColor: '#3880ff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }}
                        >
                            Reintentar
                        </button>
                    </div>
                )}

                {!loading && !error && (
                    <IonList>
                        {matches.length === 0 ? (
                            <IonItem>
                                <IonLabel className="ion-text-center">
                                    No hay partidos disponibles en este momento
                                </IonLabel>
                            </IonItem>
                        ) : (
                            matches.map((match) => (
                                <IonItem key={match.id}>
                                    <IonLabel>
                                        <h2 style={{ fontWeight: 'bold' }}>
                                            {match.homeTeam?.name || '?'} vs {match.awayTeam?.name || '?'}
                                        </h2>
                                        <p>
                                            {match.utcDate && <span>📅 {formatDate(match.utcDate)}</span>}
                                            {' - '}
                                            <strong>
                                                {match.score?.fullTime?.home ?? '?'} : {match.score?.fullTime?.away ?? '?'}
                                            </strong>
                                        </p>
                                        {match.status && (
                                            <p style={{ fontSize: '0.85rem', color: '#666' }}>
                                                Estado: {match.status}
                                            </p>
                                        )}
                                    </IonLabel>
                                </IonItem>
                            ))
                        )}
                    </IonList>
                )}
            </IonContent>
        </IonPage>
    );
};

export default WorldCupMatches;