import {
    IonContent, IonHeader, IonPage
    , IonTitle, IonToolbar, IonImg
    , IonButton, IonGrid
    , IonRow, IonCol, IonCard
    , IonCardHeader
    , IonCardTitle, IonCardContent, useIonRouter, IonIcon
} from '@ionic/react';

import "../css/Home.css";
import {logoIonic} from "ionicons/icons";


// HASTA AQUI LOS import
const Home: React.FC = () => {

    const router = useIonRouter();

    const handleNavigation = () => {
        router.push('/primerafase', 'forward'); // 'forward' es una dirección de animación opcional
    };

    return (
        <IonPage>
            {/* HEADER PRINCIPAL */}
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle className="ion-text-center font-bold text-white  tracking-wide">
                        FifaProApp 2026
                    </IonTitle>

                </IonToolbar>
            </IonHeader>

            {/* HEADER CONDENsE */}
            <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large" className="ion-text-center">
                        Estados Unidos · México · Canadá 2026
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="homepage-container ion-padding">
                {/* HERO */}
                <section className="hero-section">

                    {/* === FRANJA BLANCA === */}
                    <div className="franja-blanca">
                        <IonImg
                            src="/images/fifa2026.png"
                            alt="FIFA World Cup 2026 Logo"
                            className="hero-logo"
                            style={{ maxWidth: '180px', margin: '0 auto' }}
                        />
                    </div>
                    {/* ===================== */}

                    <h1 className="hero-title">Copa Mundial de la FIFA 2026™</h1>
                    <p className="hero-subtitle">
                        11 junio – 19 julio • 48 selecciones • 16 ciudades sede
                    </p>

                    <IonButton onClick={handleNavigation}
                               expand="block" shape="round"
                               color="secondary"
                               className="hero-button">
                        Ver Fase de Grupos
                    </IonButton>
                </section>

                {/* CARDS DESTACADOS */}
                <section className="destacados-section ion-margin-top">
                    <h2 className="section-title">Datos Rápidos</h2>

                    <IonGrid>
                        <IonRow>
                            <IonCol size="6" sizeMd="3">
                                <IonCard className="info-card">
                                    <IonCardHeader>
                                        <IonCardTitle>48 Equipos</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        Primera Copa del Mundo con formato expandido.
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>

                            <IonCol size="6" sizeMd="3">
                                <IonCard className="info-card">
                                    <IonCardHeader>
                                        <IonCardTitle>3 Países</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        EE.UU., México y Canadá como anfitriones.
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>

                            <IonCol size="6" sizeMd="3">
                                <IonCard className="info-card">
                                    <IonCardHeader>
                                        <IonCardTitle>16 Ciudades</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        Sedes distribuidas en toda Norteamérica.
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>

                            <IonCol size="6" sizeMd="3">
                                <IonCard className="info-card">
                                    <IonCardHeader>
                                        <IonCardTitle>104 Partidos</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        La edición más larga de la historia.
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </section>

                {/* SECCIÓN CIUDADES */}
                <section className="ciudades-section ion-padding-vertical">
                    <h2 className="section-title">Ciudades Anfitrionas</h2>

                    <IonGrid>
                        <IonRow className="city-grid-row">
                            {[
                                'Toronto', 'Vancouver', 'Guadalajara', 'Ciudad de México', 'Monterrey',
                                'Seattle', 'San Francisco', 'Los Ángeles', 'Kansas City', 'Dallas',
                                'Atlanta', 'Houston', 'Boston', 'Miami', 'Nueva York / Nueva Jersey', 'Filadelfia'
                            ].map((city) => (
                                <IonCol size="6" sizeMd="3" className="city-item" key={city}>
                                    <div className="city-card">{city}</div>
                                </IonCol>
                            ))}
                        </IonRow>
                    </IonGrid>
                </section>
            </IonContent>
        </IonPage>
    );
};

export default Home;
