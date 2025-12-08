import React from 'react';
import { IonItem, IonAvatar, IonLabel } from '@ionic/react';
import { ClasificadosMundial } from './../models/ClasificadosMundial.models';

const EquiposClasificados: React.FC<{ equipo: ClasificadosMundial }> = ({ equipo }) => {
    return (
        <IonItem>
            <IonAvatar slot="start">
                <img src={equipo.crest} alt={equipo.name} />
            </IonAvatar>

            <IonLabel>
                <h2>{equipo.name}</h2>
                <p>{equipo.flag} | {equipo.fifa}</p>
            </IonLabel>
        </IonItem>
    );
};

export default EquiposClasificados;



