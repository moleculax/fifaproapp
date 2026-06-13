import React, { useEffect, useState, useMemo } from 'react';
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
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonChip
} from '@ionic/react';
import axios from 'axios';

interface Match {
    id: number;
    utcDate?: string;
    status?: string;
    homeTeam: { name: string };
    awayTeam: { name: string };
    score?: {
        fullTime?: { home: number | null; away: number | null };
    };
    competition?: { name: string; code?: string };
}

const WorldCupMatches: React.FC = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'live' | 'today'>('all');

    const getMatches = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('https://fifaproapp.vercel.app/api/matches');

            if (response.data?.matches && Array.isArray(response.data.matches)) {
                setMatches(response.data.matches);
            } else {
                setError('No se encontraron partidos');
            }
        } catch (error: any) {
            console.error('❌ Error fetching matches:', error);
            setError('Error al cargar los partidos. Intenta nuevamente.');
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

    // Filtro y búsqueda
    const filteredMatches = useMemo(() => {
        let result = [...matches];

        // Filtro por búsqueda
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            result = result.filter(match =>
                match.homeTeam.name.toLowerCase().includes(term) ||
                match.awayTeam.name.toLowerCase().includes(term)
            );
        }

        // Filtro por estado
        if (selectedFilter === 'live') {
            result = result.filter(match =>
                match.status === 'IN_PLAY' || match.status === 'PAUSED' || match.status === 'LIVE'
            );
        } else if (selectedFilter === 'today') {
            const today = new Date().toISOString().split('T')[0];
            result = result.filter(match =>
                match.utcDate?.startsWith(today)
            );
        }

        // Ordenar por fecha
        return result.sort((a, b) =>
            new Date(a.utcDate || '').getTime() - new Date(b.utcDate || '').getTime()
        );
    }, [matches, searchTerm, selectedFilter]);

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Fecha no disponible';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
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

                <IonToolbar>
                    <IonSearchbar
                        value={searchTerm}
                        onIonInput={e => setSearchTerm(e.detail.value!)}
                        placeholder="Buscar equipo..."
                        debounce={300}
                    />
                </IonToolbar>

                <IonToolbar>
                    <IonSegment value={selectedFilter} onIonChange={e => setSelectedFilter(e.detail.value as any)}>
                        <IonSegmentButton value="all">
                            <IonLabel>Todos</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value="live">
                            <IonLabel>En Vivo</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value="today">
                            <IonLabel>Hoy</IonLabel>
                        </IonSegmentButton>
                    </IonSegment>
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
                    <div style={{ textAlign: 'center', marginTop: '40px', padding: '20px' }}>
                        <IonText color="danger"><p>⚠️ {error}</p></IonText>
                        <button
                            onClick={getMatches}
                            style={{
                                marginTop: '15px', padding: '12px 24px', backgroundColor: '#3880ff',
                                color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px'
                            }}
                        >
                            Reintentar
                        </button>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        {filteredMatches.length === 0 ? (
                            <IonItem>
                                <IonLabel className="ion-text-center">
                                    No se encontraron partidos con los filtros aplicados
                                </IonLabel>
                            </IonItem>
                        ) : (
                            <IonList>
                                {filteredMatches.map((match) => (
                                    <IonItem key={match.id} lines="full">
                                        <IonLabel>
                                            <h2 style={{ fontWeight: 'bold', marginBottom: '6px' }}>
                                                {match.homeTeam.name} <span style={{ color: '#666' }}>vs</span> {match.awayTeam.name}
                                            </h2>
                                            <p style={{ marginBottom: '4px' }}>
                                                📅 {formatDate(match.utcDate)}
                                            </p>
                                            <p>
                                                <strong style={{ fontSize: '1.1em' }}>
                                                    {match.score?.fullTime?.home ?? '?'} - {match.score?.fullTime?.away ?? '?'}
                                                </strong>
                                            </p>
                                            {match.status && (
                                                <IonChip color={match.status === 'FINISHED' ? 'success' :
                                                    match.status === 'IN_PLAY' ? 'danger' : 'primary'}>
                                                    {match.status.replace('_', ' ')}
                                                </IonChip>
                                            )}
                                        </IonLabel>
                                    </IonItem>
                                ))}
                            </IonList>
                        )}
                    </>
                )}
            </IonContent>
        </IonPage>
    );
};

export default WorldCupMatches;