import React from 'react';
import {
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonText,
    IonItem,
    IonLabel
} from '@ionic/react';

interface Partido {
    id: string;
    equipo1: string;
    equipo2: string;
    fecha: string;
    info?: string;
}

interface Ronda {
    ronda: string;
    partidos: Partido[];
}

interface EstructuraTorneo {
    ramaIzquierda: Ronda[];
    centro: Ronda[];
    ramaDerecha: Ronda[];
}

// Emojis de banderas por país
const banderasEquipos: { [key: string]: string } = {
    'GER': '🇩🇪',
    'RSA': '🇿🇦',
    'CAN': '🇨🇦',
    'USA': '🇺🇸',
    'MEX': '🇲🇽',
    'BRA': '🇧🇷',
    'ARG': '🇦🇷',
    'SUI': '🇨🇭',
    'CIV': '🇨🇮',
    'MAR': '🇲🇦',
    '1I': '⚽',
    '3CDFGH': '⚽',
    '1F': '⚽',
    '2K': '⚽',
    '2L': '⚽',
    '1H': '⚽',
    '2J': '⚽',
    '3BEFIJ': '⚽',
    '1G': '⚽',
    '3AEHIJ': '⚽',
    '2F': '⚽',
    '2I': '⚽',
    '3CEFHI': '⚽',
    '1L': '⚽',
    '3EHIJK': '⚽',
    '2H': '⚽',
    '2D': '⚽',
    '2G': '⚽',
    '3EFGIJ': '⚽',
    '1K': '⚽',
    '3DEIJL': '⚽',
    'W74': '🏆',
    'W77': '🏆',
    'W73': '🏆',
    'W75': '🏆',
    'W83': '🏆',
    'W84': '🏆',
    'W81': '🏆',
    'W82': '🏆',
    'W89': '🏆',
    'W90': '🏆',
    'W93': '🏆',
    'W94': '🏆',
    'W91': '🏆',
    'W92': '🏆',
    'W95': '🏆',
    'W96': '🏆',
    'W97': '🏆',
    'W98': '🏆',
    'W99': '🏆',
    'W100': '🏆',
    'W101': '🏆',
    'W102': '🏆',
    'RU101': '🥈',
    'RU102': '🥈',
};

// Función para obtener el emoji de un equipo
const getEmojiEquipo = (equipo: string): string => {
    return banderasEquipos[equipo] || '⚽';
};

// Mapeo de equipos a colores según clasificación
const coloresEquipos: { [key: string]: string } = {
    'GER': '#000000',
    'RSA': '#F7D117',
    'CAN': '#FF0000',
    'USA': '#3C3B6E',
    'MEX': '#006341',
    'BRA': '#009739',
    'ARG': '#75AADB',
    'SUI': '#FF0000',
    'CIV': '#F77F00',
    'MAR': '#C1272D',
    'W74': '#FFD700',
    'W77': '#FFD700',
    'W73': '#FFD700',
    'W75': '#FFD700',
    'W83': '#FFD700',
    'W84': '#FFD700',
    'W81': '#FFD700',
    'W82': '#FFD700',
    'W89': '#C0C0C0',
    'W90': '#C0C0C0',
    'W93': '#C0C0C0',
    'W94': '#C0C0C0',
    'W91': '#C0C0C0',
    'W92': '#C0C0C0',
    'W95': '#C0C0C0',
    'W96': '#C0C0C0',
    'W101': '#FFD700',
    'W102': '#FFD700',
    'RU101': '#C0C0C0',
    'RU102': '#C0C0C0',
};

const getColorEquipo = (equipo: string): string => {
    return coloresEquipos[equipo] || '#333333';
};

const datosTorneo: EstructuraTorneo = {
    ramaIzquierda: [
        {
            ronda: "Octavos",
            partidos: [
                { id: "P74", equipo1: "GER", equipo2: "3ABCDF", fecha: "04/07/2026 18:00" },
                { id: "P77", equipo1: "1I", equipo2: "3CDFGH", fecha: "30/06/2026 18:00" },
                { id: "P73", equipo1: "RSA", equipo2: "CAN", fecha: "28/06/2026 16:00" },
                { id: "P75", equipo1: "1F", equipo2: "MAR", fecha: "29/06/2026 22:00" },
                { id: "P83", equipo1: "2K", equipo2: "2L", fecha: "02/07/2026 20:00" },
                { id: "P84", equipo1: "1H", equipo2: "2J", fecha: "02/07/2026 16:00" },
                { id: "P81", equipo1: "USA", equipo2: "3BEFIJ", fecha: "01/07/2026 21:00" },
                { id: "P82", equipo1: "1G", equipo2: "3AEHIJ", fecha: "01/07/2026 17:00" }
            ]
        },
        {
            ronda: "Cuartos",
            partidos: [
                { id: "P89", equipo1: "W74", equipo2: "W77", fecha: "04/07/2026 18:00" },
                { id: "P90", equipo1: "W73", equipo2: "W75", fecha: "04/07/2026 14:00" },
                { id: "P93", equipo1: "W83", equipo2: "W84", fecha: "06/07/2026 16:00" },
                { id: "P94", equipo1: "W81", equipo2: "W82", fecha: "06/07/2026 21:00" }
            ]
        },
        {
            ronda: "Semifinal",
            partidos: [
                { id: "P97", equipo1: "W89", equipo2: "W90", fecha: "09/07/2026 17:00" },
                { id: "P98", equipo1: "W93", equipo2: "W94", fecha: "10/07/2026 16:00" }
            ]
        }
    ],
    centro: [
        {
            ronda: "Final / 3er Puesto",
            partidos: [
                { id: "P104", equipo1: "W101", equipo2: "W102", fecha: "19/07/2026 16:00", info: "Final" },
                { id: "P103", equipo1: "RU101", equipo2: "RU102", fecha: "18/07/2026 18:00", info: "Tercer Puesto" }
            ]
        }
    ],
    ramaDerecha: [
        {
            ronda: "Semifinal",
            partidos: [
                { id: "P99", equipo1: "W91", equipo2: "W92", fecha: "11/07/2026 18:00" },
                { id: "P100", equipo1: "W95", equipo2: "W96", fecha: "11/07/2026 22:00" }
            ]
        },
        {
            ronda: "Cuartos",
            partidos: [
                { id: "P91", equipo1: "W76", equipo2: "W78", fecha: "05/07/2026 17:00" },
                { id: "P92", equipo1: "W79", equipo2: "W80", fecha: "05/07/2026 21:00" },
                { id: "P95", equipo1: "W86", equipo2: "W88", fecha: "07/07/2026 13:00" },
                { id: "P96", equipo1: "W85", equipo2: "W87", fecha: "07/07/2026 17:00" }
            ]
        },
        {
            ronda: "Octavos",
            partidos: [
                { id: "P76", equipo1: "BRA", equipo2: "2F", fecha: "05/07/2026 17:00" },
                { id: "P78", equipo1: "CIV", equipo2: "2I", fecha: "30/06/2026 14:00" },
                { id: "P79", equipo1: "MEX", equipo2: "3CEFHI", fecha: "30/06/2026 22:00" },
                { id: "P80", equipo1: "1L", equipo2: "3EHIJK", fecha: "01/07/2026 13:00" },
                { id: "P86", equipo1: "ARG", equipo2: "2H", fecha: "03/07/2026 19:00" },
                { id: "P88", equipo1: "2D", equipo2: "2G", fecha: "03/07/2026 15:00" },
                { id: "P85", equipo1: "SUI", equipo2: "3EFGIJ", fecha: "03/07/2026 00:00" },
                { id: "P87", equipo1: "1K", equipo2: "3DEIJL", fecha: "03/07/2026 22:30" }
            ]
        }
    ]
};

const BracketTorneo: React.FC = () => {
    const todasLasRondas: Ronda[] = [
        ...datosTorneo.ramaIzquierda,
        ...datosTorneo.centro,
        ...datosTorneo.ramaDerecha
    ];

    return (
        <div style={{
            overflowX: 'auto',
            overflowY: 'auto',
            padding: '20px',
            paddingBottom: '80px',
            backgroundColor: '#f4f5f7',
            height: '100vh',
            maxHeight: '100vh'
        }}>
            <div style={{
                display: 'flex',
                gap: '20px',
                alignItems: 'stretch',
                minWidth: 'max-content',
                height: '100%'
            }}>
                {todasLasRondas.map((rondaData: Ronda, indexRonda: number) => (
                    <div
                        key={indexRonda}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            minWidth: '200px',
                            maxWidth: '220px',
                            flex: '1',
                            height: '100%'
                        }}
                    >
                        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                            <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#333' }}>
                                {rondaData.ronda}
                            </h3>
                        </div>

                        {rondaData.partidos.map((partido: Partido) => (
                            <div
                                key={partido.id}
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                    padding: '10px',
                                    margin: '6px 0',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                                    border: '1px solid #e0e0e0'
                                }}
                            >
                                {partido.info && (
                                    <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '0.7rem', color: '#3880ff', marginBottom: '4px' }}>
                                        {partido.info}
                                    </div>
                                )}

                                <div style={{ textAlign: 'center', fontSize: '0.65rem', color: '#666', marginBottom: '6px' }}>
                                    {partido.fecha}
                                </div>

                                <div
                                    style={{
                                        padding: '2px 0',
                                        fontWeight: '500',
                                        fontSize: '0.85rem',
                                        color: '#222',
                                        borderLeft: `4px solid ${getColorEquipo(partido.equipo1)}`,
                                        paddingLeft: '8px'
                                    }}
                                >
                                    {getEmojiEquipo(partido.equipo1)} {partido.equipo1}
                                </div>

                                <div
                                    style={{
                                        padding: '2px 0',
                                        fontWeight: '500',
                                        fontSize: '0.85rem',
                                        color: '#222',
                                        borderTop: '1px solid #f0f0f0',
                                        borderLeft: `4px solid ${getColorEquipo(partido.equipo2)}`,
                                        paddingLeft: '8px'
                                    }}
                                >
                                    {getEmojiEquipo(partido.equipo2)} {partido.equipo2}
                                </div>

                                <div style={{ textAlign: 'right', fontSize: '0.6rem', color: '#999', marginTop: '4px', borderTop: '1px dotted #e0e0e0', paddingTop: '4px' }}>
                                    <span style={{ fontWeight: 'bold' }}>{partido.id}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div style={{ height: 500 }}>


            </div>
        </div>
    );
};

export default BracketTorneo;