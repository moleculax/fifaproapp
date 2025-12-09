import React from 'react';
import {
    IonAccordion,
    IonAccordionGroup,
    IonContent,
    IonHeader,
    IonItem, IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";

function EstadisticasClasificados() {
    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Estadisticas</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Estadistica Clasificados</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonAccordionGroup>
                    <IonAccordion value="primero">
                        <IonItem slot="header" color="light">
                            <IonLabel>Europa</IonLabel>
                        </IonItem>
                        <div className="ion-padding text-black" slot="content">
                            Europa (UEFA) aporta el mayor número de clasificados: 16 equipos (un tercio del total).
                        <p>
                            Ya ocupadas por selecciones como Francia, Alemania, España, Inglaterra, Portugal, Países Bajos, Italia, Bélgica, Croacia, Polonia, Suiza, Austria, Dinamarca, Escocia, Hungría y Turquía.
                        </p>
                        </div>
                    </IonAccordion>
                    <IonAccordion value="segundo">
                        <IonItem slot="header" color="light">
                            <IonLabel>Africa</IonLabel>
                        </IonItem>
                        <div className="ion-padding text-black" slot="content">
                            África (CAF) tendrá 9 representantes, su mayor participación histórica.
                        <p>
                            Marruecos, Túnez, Egipto, Argelia, Ghana, Cabo Verde, Sudáfrica, Costa de Marfil y Senegal (9 equipos).

                        </p>
                        </div>
                    </IonAccordion>
                    <IonAccordion value="tercero">
                        <IonItem slot="header" color="light">
                            <IonLabel>Asia</IonLabel>
                        </IonItem>
                        <div className="ion-padding text-black" slot="content">
                            Asia (AFC) suma 8 selecciones, confirmando el crecimiento de la región.
                      <p>
                          Japón, Irán, Corea del Sur, Uzbekistán, Jordania, Australia, Qatar y Arabia Saudita (8 equipos).

                      </p>
                        </div>
                    </IonAccordion>

                    <IonAccordion value="cuarto">
                        <IonItem slot="header" color="light">
                            <IonLabel>America</IonLabel>
                        </IonItem>
                        <div className="ion-padding text-black" slot="content">
                           (CONMEBOL) mantiene 6 plazas directas, con Argentina como campeón vigente.
                       <p>
                           Argentina (campeón defensor), Brasil, Uruguay, Colombia, Ecuador y Chile ya clasificados. Hay un cupo de repechaje adicional.

                       </p>
                            <p>
                                CONCACAF (Norteamérica, Centroamérica y Caribe): Estados Unidos, México y Canadá (anfitriones), más tres clasificados vía eliminatorias. En total 6 plazas directas + 2 de repechaje.


                            </p>
                        </div>
                    </IonAccordion>
                    <IonAccordion value="quinto">
                        <IonItem slot="header" color="light">
                            <IonLabel>Oceania</IonLabel>
                        </IonItem>
                        <div className="ion-padding text-black" slot="content">
                            Oceanía (OFC) solo tendrá a Nueva Zelanda, como es habitual.
                        </div>
                    </IonAccordion>

                </IonAccordionGroup>

            {/*AQUI MAS CONTENIDO*/}

            {/*HASTA AQUI MAS CONTENIDO*/}
            </IonContent>
        </IonPage>
    );
}

export default EstadisticasClasificados;
