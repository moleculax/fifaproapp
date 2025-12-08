import React, { useState } from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonViewDidEnter,
    IonList
} from '@ionic/react';
import axios from 'axios';
import { ClasificadosMundial } from './../models/ClasificadosMundial.models';
import EquiposClasificados from '../components/EquiposClasificados';

const PageClasificadosMundial: React.FC = () => {
    const [teams, setTeams] = useState<ClasificadosMundial[]>([]);

    useIonViewDidEnter(() => {
        const cargarEquipos = async () => {
            try {
                const response = await axios.get('/data/EquiposClasificados.json');
                const data: ClasificadosMundial[] = response.data.map((item: any) => ({
                    name: item.name,
                    flag: item.flag,
                    crest: item.crest,
                    fifa: item.fifa
                }));
                setTeams(data);
            } catch (error) {
                console.error("Error cargando equipos:", error);
            }
        };

        cargarEquipos(); // <-- Llamamos a la función async aquí
    });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Equipos Clasificados</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {teams.map((team) => (
                        <EquiposClasificados key={team.fifa} equipo={team} />
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default PageClasificadosMundial;