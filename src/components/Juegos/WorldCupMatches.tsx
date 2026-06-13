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
    IonRefresherContent,
    IonBadge
} from '@ionic/react';
import axios from 'axios';

// ✅ Mover credenciales a variables de entorno
const API_URL = import.meta.env.VITE_API_FOOTBALL_URL || 'https://api.football-data.org/v4/matches';
const API_TOKEN = import.meta.env.VITE_API_FOOTBALL_TOKEN;

// ✅ Headers fuera del componente
const headers = { 'X-Auth-Token': API_TOKEN };

interface Match {
    id: number;
    homeTeam: { name: string };
    awayTeam: { name: string };
    score: {
        fullTime: {
            home: number | null;
            away: number | null;
        }
    };
    status?: string;
    utcDate?: string;
}

const WorldCupMatches: React.FC = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getMatches = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(API_URL, { headers });

            // ✅ Validar estructura de respuesta
            if (response.data && Array.isArray(response.data.matches)) {
                setMatches(response.data.matches);
            } else {
                throw new Error('Formato de respuesta inválido');
            }

        } catch (error) {
            console.error('Error fetching matches:', error);
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 429) {
                    setError('Límite de peticiones alcanzado. Intenta más tarde.');
                } else if (error.response?.status === 401) {
                    setError('Error de autenticación. Token inválido.');
                } else {
                    setError('Error al cargar los partidos. Intenta nuevamente.');
                }
            } else {
                setError('Error desconocido. Intenta nuevamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    // ✅ Función para refrescar (pull-to-refresh)
    const handleRefresh = async (event: CustomEvent) => {
        await getMatches();
        event.detail.complete();
    };

    // ✅ Formatear fecha
    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    useEffect(() => {
        getMatches();
    }, []);

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
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
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
                        <button onClick={getMatches} style={{ marginTop: '10px' }}>
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
                                    No hay partidos disponibles
                                </IonLabel>
                            </IonItem>
                        ) : (
                            matches.map(match => (
                                <IonItem key={match.id}>
                                    <IonLabel>
                                        <h2>
                                            {match.homeTeam.name} vs {match.awayTeam.name}
                                        </h2>
                                        <p>
                                            {match.utcDate && (
                                                <span>📅 {formatDate(match.utcDate)}</span>
                                            )}
                                            {' - '}
                                            <strong>
                                                {match.score.fullTime.home ?? '?'} : {match.score.fullTime.away ?? '?'}
                                            </strong>
                                        </p>
                                        {match.status && (
                                            <IonBadge color="medium" style={{ marginTop: '5px' }}>
                                                {match.status}
                                            </IonBadge>
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