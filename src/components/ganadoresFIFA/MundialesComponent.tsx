import React, { useState, useEffect } from 'react';
import {
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonRefresher,
    IonRefresherContent,
    IonSpinner,
    IonList,
    IonItem,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonLabel,
    IonText,
    IonButton
} from '@ionic/react';
import { trophyOutline, locationOutline, closeCircleOutline, alertCircleOutline, refreshOutline, sadOutline } from 'ionicons/icons';
import axios from 'axios';

interface Mundial {
    id: number;
    ano: number;
    sede: string;
    primero: string;
    segundo: string;
    tercero: string;
    cuarto: string;
}

const MundialesComponent: React.FC = () => {
    const [mundiales, setMundiales] = useState<Mundial[]>([]);
    const [cargando, setCargando] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const cargarMundiales = async () => {
        setCargando(true);
        setError('');

        try {
            // ✅ CORREGIDO: El archivo se llama ganadoresCopaFIFA.json
            const response = await axios.get('/data/ganadoresCopaFIFA.json');

            let datos = response.data;

            if (!datos) {
                datos = [];
            }

            if (typeof datos === 'object' && !Array.isArray(datos)) {
                let encontrado = false;
                for (const key in datos) {
                    if (Array.isArray(datos[key])) {
                        datos = datos[key];
                        encontrado = true;
                        break;
                    }
                }
                if (!encontrado) {
                    datos = Object.values(datos);
                }
            }

            if (typeof datos === 'string') {
                try {
                    datos = JSON.parse(datos);
                    if (!Array.isArray(datos)) {
                        datos = [datos];
                    }
                } catch (e) {
                    datos = [];
                }
            }

            if (!Array.isArray(datos)) {
                datos = [];
            }

            setMundiales(datos);
            setCargando(false);
            console.log('✅ Mundiales cargados:', datos.length);

        } catch (err) {
            console.error('❌ Error:', err);
            setCargando(false);
            setError('Error al cargar los datos. Verifica el archivo JSON.');
        }
    };

    useEffect(() => {
        cargarMundiales();
    }, []);

    const doRefresh = async (event: CustomEvent) => {
        await cargarMundiales();
        event.detail.complete();
    };

    return (
        <>
            <IonHeader translucent={true}>
                <IonToolbar>
                    <IonTitle>
                        <IonIcon icon={trophyOutline} />
                        🏆 Mundiales de Fútbol
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen={true}>
                <style>{`
                    .mundial-card {
                        margin: 12px;
                        border-radius: 12px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        width: 100%;
                    }

                    .podium-item {
                        display: flex;
                        align-items: flex-start;
                        gap: 8px;
                        margin-bottom: 8px;
                    }

                    .podium-item ion-icon {
                        font-size: 20px;
                        margin-top: 2px;
                    }

                    .podium-item ion-label {
                        display: flex;
                        flex-direction: column;
                    }

                    .podium-text {
                        margin: 2px 0 0 0;
                        font-weight: 500;
                        font-size: 14px;
                    }

                    ion-card-title {
                        font-size: 18px;
                        font-weight: 700;
                    }

                    ion-card-subtitle {
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        font-size: 14px;
                    }

                    .loading-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        height: 100%;
                        gap: 16px;
                        padding: 20px;
                    }

                    .loading-container p {
                        color: var(--ion-color-medium);
                        font-size: 16px;
                    }

                    .error-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        height: 100%;
                        gap: 16px;
                        padding: 20px;
                        text-align: center;
                    }

                    .error-container ion-icon {
                        font-size: 64px;
                    }

                    .error-container p {
                        color: var(--ion-color-danger);
                        font-size: 16px;
                        max-width: 300px;
                    }

                    .empty-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        height: 100%;
                        gap: 16px;
                        padding: 20px;
                    }

                    .empty-container ion-icon {
                        font-size: 64px;
                        color: var(--ion-color-medium);
                    }

                    .empty-container p {
                        color: var(--ion-color-medium);
                        font-size: 16px;
                    }

                    ion-item {
                        --padding-start: 0;
                        --padding-end: 0;
                        --inner-padding-end: 0;
                    }
                `}</style>

                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent />
                </IonRefresher>

                {cargando && (
                    <div className="loading-container">
                        <IonSpinner name="crescent" />
                        <p>Cargando mundiales...</p>
                    </div>
                )}

                {error && (
                    <div className="error-container">
                        <IonIcon icon={alertCircleOutline} color="danger" />
                        <p>{error}</p>
                        <IonButton onClick={cargarMundiales}>
                            <IonIcon icon={refreshOutline} slot="start" />
                            Reintentar
                        </IonButton>
                    </div>
                )}

                {!cargando && !error && mundiales.length > 0 && (
                    <IonList>
                        {mundiales.map((mundial) => (
                            <IonItem key={mundial.id} lines="none">
                                <IonCard className="mundial-card">
                                    <IonCardHeader>
                                        <IonCardTitle>
                                            <IonText color="primary">
                                                Mundial {mundial.ano}
                                            </IonText>
                                        </IonCardTitle>
                                        <IonCardSubtitle>
                                            <IonIcon icon={locationOutline} />
                                            {mundial.sede}
                                        </IonCardSubtitle>
                                    </IonCardHeader>

                                    <IonCardContent>
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol size="6">
                                                    <div className="podium-item">
                                                        <IonIcon icon={trophyOutline} color="success" />
                                                        <IonLabel>
                                                            <strong>Campeón</strong>
                                                            <p className="podium-text">{mundial.primero}</p>
                                                        </IonLabel>
                                                    </div>
                                                </IonCol>
                                                <IonCol size="6">
                                                    <div className="podium-item">
                                                        <IonIcon icon={trophyOutline} color="warning" />
                                                        <IonLabel>
                                                            <strong>Subcampeón</strong>
                                                            <p className="podium-text">{mundial.segundo}</p>
                                                        </IonLabel>
                                                    </div>
                                                </IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol size="6">
                                                    <div className="podium-item">
                                                        <IonIcon icon={trophyOutline} color="tertiary" />
                                                        <IonLabel>
                                                            <strong>Tercer Lugar</strong>
                                                            <p className="podium-text">{mundial.tercero}</p>
                                                        </IonLabel>
                                                    </div>
                                                </IonCol>
                                                <IonCol size="6">
                                                    <div className="podium-item">
                                                        <IonIcon icon={closeCircleOutline} color="danger" />
                                                        <IonLabel>
                                                            <strong>Cuarto Lugar</strong>
                                                            <p className="podium-text">{mundial.cuarto}</p>
                                                        </IonLabel>
                                                    </div>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>
                                    </IonCardContent>
                                </IonCard>
                            </IonItem>
                        ))}
                    </IonList>
                )}

                {!cargando && !error && mundiales.length === 0 && (
                    <div className="empty-container">
                        <IonIcon icon={sadOutline} color="medium" />
                        <p>No se encontraron mundiales</p>
                    </div>
                )}
            </IonContent>
        </>
    );
};

export default MundialesComponent;