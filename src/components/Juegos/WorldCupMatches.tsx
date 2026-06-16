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
    IonChip,
    IonAvatar
} from '@ionic/react';
import axios from 'axios';

interface Referee {
    id: number;
    name: string;
    nationality?: string;
}

interface Match {
    id: number;
    utcDate?: string;
    status: string;
    matchday?: number;
    stage?: string;
    group?: string;
    homeTeam: {
        name: string;
        crest?: string;
    };
    awayTeam: {
        name: string;
        crest?: string;
    };
    score: {
        winner?: string;
        fullTime: {
            home: number | null;
            away: number | null;
        };
    };
    referees?: Referee[];
}

const WorldCupMatches: React.FC = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'live' | 'finished' | 'today'>('all');

    const getMatches = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('https://fifaproapp.vercel.app/api/matches');
            console.log(response.data);
            if (response.data?.matches && Array.isArray(response.data.matches)) {
                setMatches(response.data.matches);
            } else {
                setError('No se encontraron partidos');
            }
        } catch (error: any) {
            console.error('❌ Error:', error);
            setError('Error al cargar los partidos. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };


    // Obtener fecha actual formateada
    const getTodayDate = () => {
        const today = new Date();
        return today.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const todayDate = getTodayDate();


    const handleRefresh = async (event: CustomEvent) => {
        await getMatches();
        event.detail.complete();
    };

    useEffect(() => {
        getMatches();
    }, []);

    const filteredMatches = useMemo(() => {
        let result = [...matches];

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            result = result.filter(m =>
                m.homeTeam.name.toLowerCase().includes(term) ||
                m.awayTeam.name.toLowerCase().includes(term)
            );
        }

        if (selectedFilter === 'live') {
            result = result.filter(m => ['IN_PLAY', 'PAUSED', 'LIVE'].includes(m.status));
        } else if (selectedFilter === 'finished') {
            result = result.filter(m => m.status === 'FINISHED');
        } else if (selectedFilter === 'today') {
            const today = new Date().toISOString().split('T')[0];
            result = result.filter(m => m.utcDate?.startsWith(today));
        }

        return result.sort((a, b) =>
            new Date(a.utcDate || '').getTime() - new Date(b.utcDate || '').getTime()
        );
    }, [matches, searchTerm, selectedFilter]);

    const getStatusColor = (status: string) => {
        if (status === 'FINISHED') return 'success';
        if (['IN_PLAY', 'PAUSED', 'LIVE'].includes(status)) return 'danger';
        return 'primary';
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Fecha no disponible';
        return new Date(dateString).toLocaleDateString('es-ES', {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const mainReferee = (referees?: Referee[]) => {
        if (!referees || referees.length === 0) return null;
        return referees.find(r => r.name) || referees[0];
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>🏆 FIFA World Cup 2026 Juegos Para hoy {todayDate}</IonTitle>
                </IonToolbar>

                {/*<IonToolbar>*/}
                {/*    <IonSearchbar*/}
                {/*        value={searchTerm}*/}
                {/*        onIonInput={e => setSearchTerm(e.detail.value!)}*/}
                {/*        placeholder="Buscar equipo..."*/}
                {/*        debounce={300}*/}
                {/*    />*/}
                {/*</IonToolbar>*/}

                <IonToolbar>
                    <IonSegment value={selectedFilter} onIonChange={e => setSelectedFilter(e.detail.value as any)}>
                        <IonSegmentButton value="all"><IonLabel>Todos</IonLabel></IonSegmentButton>
                        <IonSegmentButton value="live"><IonLabel>En Vivo</IonLabel></IonSegmentButton>
                        <IonSegmentButton value="finished"><IonLabel>Finalizados</IonLabel></IonSegmentButton>
                        <IonSegmentButton value="today"><IonLabel>Hoy</IonLabel></IonSegmentButton>
                    </IonSegment>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent />
                </IonRefresher>

                {loading && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px' }}>
                        <IonSpinner name="crescent" />
                        <IonText style={{ marginLeft: '12px' }}>Cargando partidos...</IonText>
                    </div>
                )}

                {error && !loading && (
                    <div style={{ textAlign: 'center', margin: '40px 20px' }}>
                        <IonText color="danger"><p>⚠️ {error}</p></IonText>
                        <button onClick={getMatches} style={{ marginTop: '15px', padding: '12px 24px', background: '#3880ff', color: 'white', border: 'none', borderRadius: '8px' }}>
                            Reintentar
                        </button>
                    </div>
                )}

                {!loading && !error && (
                    <IonList>
                        {filteredMatches.length === 0 ? (
                            <IonItem>
                                <IonLabel className="ion-text-center">No se encontraron partidos</IonLabel>
                            </IonItem>
                        ) : (
                            filteredMatches.map((match) => {
                                const referee = mainReferee(match.referees);
                                return (
                                    <IonItem key={match.id} lines="full">
                                        <IonLabel>
                                            {/* Marcador con banderas */}
                                            <div style={{ display: 'flex', alignItems: 'center',
                                                justifyContent: 'space-between',
                                                marginBottom: '10px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                                                    {match.homeTeam.crest && (
                                                        <IonAvatar style={{ width: '30px', height: '30px' }}>
                                                            <img src={match.homeTeam.crest} alt={match.homeTeam.name} />
                                                        </IonAvatar>
                                                    )}
                                                    <strong>{match.homeTeam.name}</strong>
                                                </div>

                                                <strong style={{ fontSize: '1.35em', textAlign: 'center', minWidth: '70px' }}>
                                                    {match.score.fullTime.home} - {match.score.fullTime.away}
                                                </strong>

                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, justifyContent: 'flex-end' }}>
                                                    <strong>{match.awayTeam.name}</strong>
                                                    {match.awayTeam.crest && (
                                                        <IonAvatar style={{ width: '30px', height: '30px' }}>
                                                            <img src={match.awayTeam.crest} alt={match.awayTeam.name} />
                                                        </IonAvatar>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Fecha y Grupo */}
                                            <p style={{ margin: '6px 0', color: '#555', textTransform: 'uppercase'  }}>
                                                 {formatDate(match.utcDate)}
                                            </p>
                                            {match.group && (
                                                <p style={{ margin: '4px 0', fontSize: '0.9em', color: '#666' }}>
                                                    Grupo {match.group} • Jornada {match.matchday}
                                                </p>
                                            )}

                                            {/* Estado */}
                                            <IonChip color={getStatusColor(match.status)} style={{ marginTop: '6px' }}>
                                                {match.status === 'FINISHED' ? 'Finalizado' :
                                                    match.status === 'IN_PLAY' ? '🔴 En Vivo' : match.status}
                                            </IonChip>

                                            {/* Árbitro */}
                                            {referee && (
                                                <p style={{ marginTop: '10px', fontSize: '0.85em', color: '#888' }}>
                                                    ⚖️ Árbitro: <strong>{referee.name}</strong>
                                                    {referee.nationality && ` (${referee.nationality})`}
                                                </p>
                                            )}
                                        </IonLabel>
                                    </IonItem>
                                );
                            })
                        )}
                    </IonList>
                )}
            </IonContent>




        </IonPage>
    );
};

export default WorldCupMatches;