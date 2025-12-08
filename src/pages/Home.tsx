import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg } from '@ionic/react';
import PrimeraFaseDeGrupo from '../components/PrimeraFaseDeGrupo';
import './Home.css';

const Home: React.FC = () => {
    return (
        <IonPage>

            {/* Header fijo */}
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle className="ion-text-center">
                        <strong>Mundial 2026</strong>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large" className="ion-text-center">
                        Estados Unidos · México · Canadá 2026
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="ion-padding">

                {/* Solo UNA imagen oficial, tamaño perfecto y centrada */}
                <div className="hero-simple">
                    {/*<IonImg*/}
                    {/*    src="images/fifa2026.png"*/}
                    {/*    alt="Logo Oficial FIFA World Cup 2026"*/}
                    {/*    className="logo-principal"*/}
                    {/*/>*/}

                    <h1 className="titulo-principal">Copa Mundial de la FIFA 2026™</h1>
                    <p className="subtitulo-principal">
                        11 junio – 19 julio • 48 selecciones • 3 países anfitriones
                    </p>
                </div>

                {/* Fase de grupos */}
                {/*<div className="ion-text-center ion-padding-top">*/}
                {/*    <h2>Fase de Grupos</h2>*/}
                {/*</div>*/}

                {/*<PrimeraFaseDeGrupo />*/}

            </IonContent>
        </IonPage>
    );
};

export default Home;