import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import PrimeraFaseDeGrupo from '../components/PrimeraFaseDeGrupo';
// import '../pages/FaseUno.css';
import "../css/FaseUno.css"
const PrimeraFase: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Primera Fase de Grupos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Primera fase De Grupo</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PrimeraFaseDeGrupo name="Primera_Fase" />
      </IonContent>
    </IonPage>
  );
};

export default PrimeraFase;
