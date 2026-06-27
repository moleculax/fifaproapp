import React, { useEffect, useState } from 'react';
import { useIonViewDidEnter } from '@ionic/react';
import { ContainerProps, PrimeraFaseDeGrupos } from './../models/ClasificadosMundial.models';
import axios from "axios";
import '../css/ExploreContainer.css';

const PrimeraFaseDeGrupo: React.FC<ContainerProps> = ({ name }) => {
    const [grupos, setGrupos] = useState<PrimeraFaseDeGrupos[]>([]);

    useIonViewDidEnter(() => {
        const cargarPrimerafase = async () => {
            try {
                const respuesta = await axios.get('/data/GruposPrimeraFase.json');
                setGrupos(respuesta.data);
            } catch (error) {
                console.log('Ocurrió un error cargando primera fase ', error);
            }
        };
        cargarPrimerafase();
    });

    useEffect(() => {
        console.log('Grupos cargados: ', grupos);
    }, [grupos]);

    return (
        <div className="container mt-5" style={{ paddingBottom: '30px' }}>
            <strong>{name}</strong>

            <div className="row">
                {grupos.map((grupo) => (
                    <div key={grupo.grupo} className="col-md-4 mb-4">
                        <div className="card shadow-sm">
                            <div className="card-header bg-primary text-white">
                                Grupo {grupo.grupo}
                            </div>
                            <div className="card-body">
                                {grupo.seleccion.map((team, index) => (
                                    <div key={team.fifa || index} className="mb-2">
                                        <span style={{ fontSize: '1.2rem' }}>{team.flag}</span>{" "}
                                        <strong>{team.pais}</strong> ({team.fifa})
                                        <br />
                                        <small className="text-muted">{team.confederation}</small>
                                        {team.note && (
                                            <div>
                                                <em>{team.note}</em>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PrimeraFaseDeGrupo;