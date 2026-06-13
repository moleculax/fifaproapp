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
    homeTeam: {
        name: string;
    };
    awayTeam: {
        name: string;
    };
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
            console.log('📡 Llamando a Football Data API');

            const response = await axios.get('https://api.football-data.org/v4/matches', {
                headers: {
                    'X-Auth-Token': 'e0d17f658b2749a1971bb281c1b8a58a'
                }
            });

            console.log('✅ Respuesta recibida:', response.data);

            if (response.data?.matches && Array.isArray(response.data.matches)) {
                setMatches(response.data.matches);
            } else {
                setError('No se encontraron partidos');
            }
        } catch (error: any) {
            console.error('❌ Error fetching matches:', error);

            if (axios.isAxiosError(error)) {
                if (error.response?.status === 429) {
                    setError('Límite de peticiones alcanzado. Intenta más tarde.');
                } else if (error.response?.status === 401) {
                    setError('Error de autenticación. Token inválido.');
                } else if (error.response?.status === 403) {
                    setError('Acceso denegado. Verifica tu token.');
                } else {
                    setError(`Error ${error.response?.status || 'desconocido'}: ${error.message}`);
                }
            } else {
                setError('Error de conexión. Revisa tu internet.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Refrescar al hacer pull-to-refresh
    const handleRefresh = async (event: CustomEvent) => {
        await getMatches();
        event.detail.complete();
    };

    useEffect(() => {
        getMatches();
    }, []);

    // Formatear fecha
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
                {/* Pull to refresh */}
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent />
                </IonRefresher>

                {/* Estado de carga */}
                {loading && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                        <IonSpinner name="crescent" />
                        <IonText style={{ marginLeft: '10px' }}>Cargando partidos...</IonText>
                    </div>
                )}

                {/* Estado de error */}
                {error && !loading && (
                    <div style={{ textAlign: 'center', marginTop: '20px', padding: '16px' }}>
                        <IonText color="danger">
                            <p>⚠️ {error}</p>
                        </IonText>
                        <button
                            onClick={getMatches}
                            style={{
                                marginTop: '10px',
                                padding: '8px 16px',
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

                {/* Lista de partidos */}
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
                                            {match.utcDate && (
                                                <span>📅 {formatDate(match.utcDate)}</span>
                                            )}
                                            {' - '}
                                            <strong>
                                                {match.score?.fullTime?.home ?? '?'} : {match.score?.fullTime?.away ?? '?'}
                                            </strong>
                                        </p>
                                        {match.status && (
                                            <p style={{ fontSize: '0.8rem', color: '#666' }}>
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