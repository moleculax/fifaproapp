import React, { useState, useEffect } from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonText,
    IonIcon,
    IonRefresher,
    IonRefresherContent,
    IonSpinner,
} from '@ionic/react';
import { trophy } from 'ionicons/icons';
import axios from 'axios';

// ============================================================
// TIPOS
// ============================================================

interface Resultado {
    vs: string;
    goles: number | null;
    goles_contra: number | null;
}

interface Seleccion {
    pais: string;
    fifa: string;
    flag: string;
    confederation: string;
    resultados: Resultado[];
}

interface Grupo {
    grupo: string;
    seleccion: Seleccion[];
}

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

const WorldCupResults: React.FC = () => {
    const [data, setData] = useState<Grupo[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<string>('A');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // ============================================================
    // CARGAR DATOS DEL JSON
    // ============================================================

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/data/primeraFaseResultados.json');

                // ✅ VERIFICAR QUE LOS DATOS SEAN UN ARRAY
                if (Array.isArray(response.data)) {
                    setData(response.data);
                    setError(null);
                } else {
                    console.error('Los datos no son un array:', response.data);
                    setError('Formato de datos inválido');
                }
            } catch (err) {
                console.error('Error loading data:', err);
                setError('Error al cargar los datos del Mundial');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // ============================================================
    // HANDLERS
    // ============================================================

    const handleRefresh = async (event: CustomEvent) => {
        try {
            const response = await axios.get('/data/WorldCupResults.json');
            if (Array.isArray(response.data)) {
                setData(response.data);
                setError(null);
            } else {
                setError('Formato de datos inválido');
            }
        } catch (err) {
            console.error('Error refreshing data:', err);
            setError('Error al actualizar los datos');
        } finally {
            event.detail.complete();
        }
    };

    // ✅ VERIFICAR QUE DATA EXISTA Y SEA UN ARRAY
    const getGroupData = (group: string) => {
        if (!Array.isArray(data) || data.length === 0) {
            return undefined;
        }
        return data.find(g => g.grupo === group);
    };

    const getResultText = (goles: number | null, golesContra: number | null) => {
        if (goles === null || golesContra === null) {
            return { text: 'vs', color: 'medium' };
        }
        if (goles > golesContra) {
            return { text: `✅ ${goles}-${golesContra}`, color: 'success' };
        } else if (goles < golesContra) {
            return { text: `❌ ${goles}-${golesContra}`, color: 'danger' };
        } else {
            return { text: `⚪ ${goles}-${golesContra}`, color: 'warning' };
        }
    };

    const getPoints = (resultados: Resultado[]) => {
        let points = 0;
        resultados.forEach((r) => {
            if (r.goles !== null && r.goles_contra !== null) {
                if (r.goles > r.goles_contra) points += 3;
                else if (r.goles === r.goles_contra) points += 1;
            }
        });
        return points;
    };

    const getPlayed = (resultados: Resultado[]) => {
        return resultados.filter((r) => r.goles !== null && r.goles_contra !== null).length;
    };

    // ============================================================
    // RENDER - LOADING
    // ============================================================

    if (loading) {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>
                            <IonIcon icon={trophy} /> Mundial 2026
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding ion-text-center">
                    <div style={{ marginTop: '40px' }}>
                        <IonSpinner name="crescent" />
                        <p>Cargando resultados...</p>
                    </div>
                </IonContent>
            </IonPage>
        );
    }

    // ============================================================
    // RENDER - ERROR
    // ============================================================

    if (error || !Array.isArray(data) || data.length === 0) {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>
                            <IonIcon icon={trophy} /> Mundial 2026
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding ion-text-center">
                    <div style={{ marginTop: '40px' }}>
                        <IonText color="danger">
                            <p>{error || 'No hay datos disponibles'}</p>
                        </IonText>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>
                            Verifica que el archivo exista en: <br />
                            <code>public/data/WorldCupResults.json</code>
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            style={{
                                marginTop: '20px',
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
                </IonContent>
            </IonPage>
        );
    }

    const currentGroup = getGroupData(selectedGroup);

    // ============================================================
    // RENDER - CONTENIDO PRINCIPAL
    // ============================================================

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        <IonIcon icon={trophy} /> Mundial 2026
                    </IonTitle>
                </IonToolbar>
                <IonToolbar>
                    <IonSegment
                        value={selectedGroup}
                        onIonChange={(e) => setSelectedGroup(e.detail.value as string)}
                        scrollable
                    >
                        {Array.isArray(data) && data.map((grupo) => (
                            <IonSegmentButton key={grupo.grupo} value={grupo.grupo}>
                                Grupo {grupo.grupo}
                            </IonSegmentButton>
                        ))}
                    </IonSegment>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent />
                </IonRefresher>

                {currentGroup ? (
                    <div>
                        {/* TABLA DE POSICIONES */}
                        <IonCard>
                            <IonCardContent>
                                <IonGrid>
                                    <IonRow className="ion-text-center" style={{ fontWeight: 'bold', backgroundColor: '#f4f5f8' }}>
                                        <IonCol size="4">Equipo</IonCol>
                                        <IonCol size="1">PJ</IonCol>
                                        <IonCol size="1">G</IonCol>
                                        <IonCol size="1">E</IonCol>
                                        <IonCol size="1">P</IonCol>
                                        <IonCol size="1">GF</IonCol>
                                        <IonCol size="1">GC</IonCol>
                                        <IonCol size="1">PTS</IonCol>
                                    </IonRow>
                                    {currentGroup.seleccion
                                        .sort((a, b) => {
                                            const ptsA = getPoints(a.resultados);
                                            const ptsB = getPoints(b.resultados);
                                            const diffA = a.resultados.reduce((sum, r) => sum + (r.goles || 0) - (r.goles_contra || 0), 0);
                                            const diffB = b.resultados.reduce((sum, r) => sum + (r.goles || 0) - (r.goles_contra || 0), 0);
                                            return ptsB - ptsA || diffB - diffA;
                                        })
                                        .map((equipo) => {
                                            const points = getPoints(equipo.resultados);
                                            const played = getPlayed(equipo.resultados);
                                            const wins = equipo.resultados.filter(r => r.goles !== null && r.goles > r.goles_contra).length;
                                            const draws = equipo.resultados.filter(r => r.goles !== null && r.goles === r.goles_contra).length;
                                            const losses = equipo.resultados.filter(r => r.goles !== null && r.goles < r.goles_contra).length;
                                            const gf = equipo.resultados.reduce((sum, r) => sum + (r.goles || 0), 0);
                                            const gc = equipo.resultados.reduce((sum, r) => sum + (r.goles_contra || 0), 0);

                                            return (
                                                <IonRow key={equipo.pais} className="ion-align-items-center" style={{ borderBottom: '1px solid #eee' }}>
                                                    <IonCol size="4">
                                                        <span style={{ fontSize: '1.2rem' }}>{equipo.flag}</span> {equipo.pais}
                                                    </IonCol>
                                                    <IonCol size="1" className="ion-text-center">{played}</IonCol>
                                                    <IonCol size="1" className="ion-text-center">{wins}</IonCol>
                                                    <IonCol size="1" className="ion-text-center">{draws}</IonCol>
                                                    <IonCol size="1" className="ion-text-center">{losses}</IonCol>
                                                    <IonCol size="1" className="ion-text-center">{gf}</IonCol>
                                                    <IonCol size="1" className="ion-text-center">{gc}</IonCol>
                                                    <IonCol size="1" className="ion-text-center">
                                                        <IonBadge color="primary">{points}</IonBadge>
                                                    </IonCol>
                                                </IonRow>
                                            );
                                        })}
                                </IonGrid>
                            </IonCardContent>
                        </IonCard>

                        {/* RESULTADOS DE LOS PARTIDOS */}
                        <IonCard>
                            <IonCardContent>
                                <IonText color="medium">
                                    <h3 style={{ fontSize: '1rem', fontWeight: 'bold' }}>📋 Resultados</h3>
                                </IonText>
                                {currentGroup.seleccion.map((equipo) => (
                                    <div key={equipo.pais}>
                                        <IonItem lines="full">
                                            <IonLabel>
                                                <h3>
                                                    <span style={{ fontSize: '1.2rem' }}>{equipo.flag}</span> {equipo.pais}
                                                </h3>
                                                <IonList>
                                                    {equipo.resultados.map((resultado, idx) => {
                                                        const res = getResultText(resultado.goles, resultado.goles_contra);
                                                        return (
                                                            <IonItem key={idx} lines="none">
                                                                <IonLabel>
                                  <span style={{ fontSize: '0.9rem' }}>
                                    vs {resultado.vs}
                                      <IonBadge color={res.color as any} style={{ marginLeft: '8px' }}>
                                      {res.text}
                                    </IonBadge>
                                  </span>
                                                                </IonLabel>
                                                            </IonItem>
                                                        );
                                                    })}
                                                </IonList>
                                            </IonLabel>
                                        </IonItem>
                                    </div>
                                ))}
                            </IonCardContent>
                        </IonCard>
                    </div>
                ) : (
                    <div className="ion-padding ion-text-center">
                        <IonText color="medium">
                            <p>No se encontraron datos para el grupo {selectedGroup}</p>
                        </IonText>
                    </div>
                )}
            </IonContent>
        </IonPage>
    );
};

export default WorldCupResults;