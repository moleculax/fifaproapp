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

// Diccionario con las banderas de los equipos
const banderasEquipos: Record<string, string> = {
// Conmebol
    "ARG": "🇦🇷", "BRA": "🇧🇷", "URU": "🇺🇾", "COL": "🇨🇴", "ECU": "🇪🇨", "PAR": "🇵🇾", "CHI": "🇨🇱", "VEN": "🇻🇪", "PER": "🇵🇪", "BOL": "🇧🇴",

// Concacaf
    "USA": "🇺🇸", "MEX": "🇲🇽", "CAN": "🇨🇦", "CRC": "🇨🇷", "PAN": "🇵🇦", "JAM": "🇯🇲", "HON": "🇭🇳", "SLV": "🇸🇻",

// UEFA
    "GER": "🇩🇪", "SUI": "🇨🇭", "FRA": "🇫🇷", "ESP": "🇪🇸", "ENG": "🇬🇧", "ITA": "🇮🇹", "NED": "🇳🇱", "POR": "🇵🇹", "BEL": "🇧🇪", "CRO": "🇭🇷", "DEN": "🇩🇰", "TUR": "🇹🇷", "AUT": "🇦🇹", "UKR": "🇺🇦", "POL": "🇵🇱", "BIH": "🇧🇦",

// CAF (África)
    "MAR": "🇲🇦", "CIV": "🇨🇮", "SEN": "🇸🇳", "NGA": "🇳🇬", "EGY": "🇪🇬", "TUN": "🇹🇳", "ALG": "🇩🇿", "RSA": "🇿🇦", "CMR": "🇨🇲", "GHA": "🇬🇭",  "CPV": "🇨🇻",

// AFC (Asia) & OFC
    "JPN": "🇯🇵", "KOR": "🇰🇷", "AUS": "🇦🇺", "IRN": "🇮🇷", "KSA": "🇸🇦", "QAT": "🇶🇦", "IRQ": "🇮🇶", "NZL": "🇳🇿",

    // Marcadores de posición
    "3ABCDF": "🏳️", "1I": "🏳️", "3CDFGH": "🏳️", "1F": "🏳️",
    "2K": "🏳️", "2L": "🏳️", "1H": "🏳️", "2J": "🏳️",
    "3BEFIJ": "🏳️", "1G": "🏳️", "3AEHIJ": "🏳️", "2F": "🏳️",
    "2I": "🏳️", "3CEFHI": "🏳️", "1L": "🏳️", "3EHIJK": "🏳️",
    "2H": "🏳️", "2D": "🏳️", "2G": "🏳️", "3EFGIJ": "🏳️",
    "1K": "🏳️", "3DEIJL": "🏳️",

    // Ganadores
    "W73": "🏆", "W74": "🏆", "W75": "🏆", "W76": "🏆", "W77": "🏆", "W78": "🏆", "W79": "🏆", "W80": "🏆",
    "W81": "🏆", "W82": "🏆", "W83": "🏆", "W84": "🏆", "W85": "🏆", "W86": "🏆", "W87": "🏆", "W88": "🏆",
    "W89": "🏆", "W90": "🏆", "W91": "🏆", "W92": "🏆", "W93": "🏆", "W94": "🏆", "W95": "🏆", "W96": "🏆",
    "W97": "🏆", "W98": "🏆", "W99": "🏆", "W100": "🏆", "W101": "🏆", "W102": "🏆",
    "RU101": "🥈", "RU102": "🥈"
};

// Colores según clasificación
const coloresClasificacion: Record<string, string> = {
    "ARG": "#75AADB", "BRA": "#009739", "USA": "#3C3B6E", "MEX": "#006341",
    "GER": "#000000", "CAN": "#FF0000", "RSA": "#F7D117", "SUI": "#FF0000",
    "CIV": "#F77F00", "MAR": "#C1272D", "ESP": "#C60B1E", "ENG": "#012169",
    "FRA": "#002395", "ITA": "#008C45", "NED": "#FF6B00", "POR": "#006600",
    "BEL": "#FDDA24", "CRO": "#C8102E", "DEN": "#C8102E", "TUR": "#E30A17",
    "JPN": "#BC002D", "KOR": "#003478", "AUS": "#FCD116", "IRN": "#239F40",
    "SEN": "#00853F", "NGA": "#008751", "EGY": "#C8102E", "TUN": "#E70013",
    "ALG": "#006233", "CMR": "#007A5E", "GHA": "#006B3F", "URU": "#0038A8",
    "COL": "#FCD116", "ECU": "#FDE200", "PAR": "#0038A8", "CHI": "#0039A6",
    "VEN": "#CF091B", "PER": "#D91023", "BOL": "#0072C6", "CRC": "#001B48",
    "PAN": "#0055A4", "JAM": "#FDB927", "HON": "#0055A4", "SLV": "#0055A4",
    "AUT": "#ED2939", "UKR": "#0057B7", "POL": "#DC143C", "NZL": "#000000",
    "KSA": "#006C35", "QAT": "#8A1538", "IRQ": "#CE1126"
};

const coloresGanadores: Record<string, string> = {
    "W73": "#FFD700", "W74": "#FFD700", "W75": "#FFD700", "W76": "#FFD700",
    "W77": "#FFD700", "W78": "#FFD700", "W79": "#FFD700", "W80": "#FFD700",
    "W81": "#FFD700", "W82": "#FFD700", "W83": "#FFD700", "W84": "#FFD700",
    "W85": "#FFD700", "W86": "#FFD700", "W87": "#FFD700", "W88": "#FFD700",
    "W89": "#C0C0C0", "W90": "#C0C0C0", "W91": "#C0C0C0", "W92": "#C0C0C0",
    "W93": "#C0C0C0", "W94": "#C0C0C0", "W95": "#C0C0C0", "W96": "#C0C0C0",
    "W97": "#C0C0C0", "W98": "#C0C0C0", "W99": "#C0C0C0", "W100": "#C0C0C0",
    "W101": "#FFD700", "W102": "#FFD700",
    "RU101": "#C0C0C0", "RU102": "#C0C0C0"
};

const obtenerColorEquipo = (equipo: string): string => {
    if (coloresGanadores[equipo]) return coloresGanadores[equipo];
    return coloresClasificacion[equipo] || "#666666";
};

const datosTorneo: EstructuraTorneo = {
    ramaIzquierda: [
        {
            ronda: "Dieciseisavos de final",
            partidos: [
                { id: "P74", equipo1: "GER", equipo2: "3ABCDF", fecha: "29/06/2026 17:30" },
                { id: "P77", equipo1: "FRA", equipo2: "3CDFGH", fecha: "30/06/2026 18:00" },
                { id: "P73", equipo1: "RSA", equipo2: "CAN", fecha: "28/06/2026 16:00" },
                { id: "P75", equipo1: "NED", equipo2: "MAR", fecha: "29/06/2026 22:00" },
                { id: "P83", equipo1: "2K", equipo2: "2L", fecha: "02/07/2026 20:00" },
                { id: "P84", equipo1: "1H", equipo2: "2J", fecha: "02/07/2026 16:00" },
                { id: "P81", equipo1: "USA", equipo2: "BIH", fecha: "01/07/2026 21:00" },
                { id: "P82", equipo1: "1G", equipo2: "3AEHIJ", fecha: "01/07/2026 17:00" }
            ]
        },
        {
            ronda: "Octavos de final",
            partidos: [
                { id: "P89", equipo1: "W74", equipo2: "W77", fecha: "04/07/2026 18:00" },
                { id: "P90", equipo1: "W73", equipo2: "W75", fecha: "04/07/2026 14:00" },
                { id: "P93", equipo1: "W83", equipo2: "W84", fecha: "06/07/2026 16:00" },
                { id: "P94", equipo1: "W81", equipo2: "W82", fecha: "06/07/2026 21:00" }
            ]
        },
        {
            ronda: "Cuartos de final",
            partidos: [
                { id: "P97", equipo1: "W89", equipo2: "W90", fecha: "09/07/2026 17:00" },
                { id: "P98", equipo1: "W93", equipo2: "W94", fecha: "10/07/2026 16:00" }
            ]
        }
    ],
    centro: [
        {
            ronda: "Semifinal",
            partidos: [
                { id: "P101", equipo1: "W97", equipo2: "W98", fecha: "14/07/2026 16:00" }
            ]
        },
        {
            ronda: "Final / 3er Puesto",
            partidos: [
                { id: "P104", equipo1: "W101", equipo2: "W102", fecha: "19/07/2026 16:00", info: "Final" },
                { id: "P103", equipo1: "RU101", equipo2: "RU102", fecha: "18/07/2026 18:00", info: "Partido por el tercer puesto" }
            ]
        },
        {
            ronda: "Semifinal",
            partidos: [
                { id: "P102", equipo1: "W99", equipo2: "W100", fecha: "15/07/2026 16:00" }
            ]
        }
    ],
    ramaDerecha: [
        {
            ronda: "Cuartos de final",
            partidos: [
                { id: "P99", equipo1: "W91", equipo2: "W92", fecha: "11/07/2026 18:00" },
                { id: "P100", equipo1: "W95", equipo2: "W96", fecha: "11/07/2026 22:00" }
            ]
        },
        {
            ronda: "Octavos de final",
            partidos: [
                { id: "P91", equipo1: "W76", equipo2: "W78", fecha: "05/07/2026 17:00" },
                { id: "P92", equipo1: "W79", equipo2: "W80", fecha: "05/07/2026 21:00" },
                { id: "P95", equipo1: "W86", equipo2: "W88", fecha: "07/07/2026 13:00" },
                { id: "P96", equipo1: "W85", equipo2: "W87", fecha: "07/07/2026 17:00" }
            ]
        },
        {
            ronda: "Dieciseisavos de final",
            partidos: [
                { id: "P76", equipo1: "BRA", equipo2: "JPN", fecha: "05/07/2026 17:00" },
                { id: "P78", equipo1: "CIV", equipo2: "NOR", fecha: "30/06/2026 14:00" },
                { id: "P79", equipo1: "MEX", equipo2: "3CEFHI", fecha: "30/06/2026 22:00" },
                { id: "P80", equipo1: "1L", equipo2: "3EHIJK", fecha: "01/07/2026 13:00" },
                { id: "P86", equipo1: "ARG", equipo2: "CPV", fecha: "03/07/2026 19:00" },
                { id: "P88", equipo1: "2D", equipo2: "2G", fecha: "03/07/2026 15:00" },
                { id: "P85", equipo1: "SUI", equipo2: "3EFGIJ", fecha: "03/07/2026 00:00" },
                { id: "P87", equipo1: "1K", equipo2: "3DEIJL", fecha: "03/07/2026 22:30" }
            ]
        }
    ]
};

const BracketTorneo: React.FC = () => {
    const columnasVisuales: Ronda[] = [
        ...datosTorneo.ramaIzquierda,
        ...datosTorneo.centro,
        ...datosTorneo.ramaDerecha
    ];

    const obtenerBandera = (nombreEquipo: string): string => {
        return banderasEquipos[nombreEquipo] || "🏳️";
    };

    const obtenerColor = (nombreEquipo: string): string => {
        return obtenerColorEquipo(nombreEquipo);
    };

    return (
        <div style={{
            overflowX: 'auto',
            overflowY: 'auto',
            padding: '20px',
            backgroundColor: '#f4f5f7',
            height: '100vh',
            maxHeight: '100vh',
            width: '100%'
        }}>
            <div style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
                minWidth: 'max-content',
                height: '100%',
                paddingBottom: '20px'
            }}>
                {columnasVisuales.map((columna: Ronda, indexColumna: number) => (
                    <div
                        key={indexColumna}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            minWidth: '160px',
                            maxWidth: '180px',
                            flex: '1',
                            height: '100%',
                            padding: '0 5px',
                            gap: '4px'
                        }}
                    >
                        <div style={{ textAlign: 'center', marginBottom: '8px', position: 'sticky', top: 0, backgroundColor: '#f4f5f7', zIndex: 1, padding: '4px 0' }}>
                            <h3 style={{ margin: 0, fontSize: '0.7rem', fontWeight: '600', color: '#333' }}>
                                {columna.ronda}
                            </h3>
                        </div>

                        {columna.partidos.map((partido: Partido) => (
                            <div
                                key={partido.id}
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '6px',
                                    padding: '6px 8px',
                                    margin: '2px 0',
                                    border: '1px solid #e0e0e0',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                                    flexShrink: 0
                                }}
                            >
                                {partido.info && (
                                    <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '0.6rem', color: '#3880ff', marginBottom: '2px' }}>
                                        {partido.info}
                                    </div>
                                )}

                                <div style={{ textAlign: 'center', fontSize: '0.55rem', color: '#999', marginBottom: '3px' }}>
                                    {partido.fecha}
                                </div>

                                <div style={{
                                    padding: '2px 4px',
                                    fontWeight: '500',
                                    fontSize: '0.7rem',
                                    color: '#000',
                                    borderLeft: `3px solid ${obtenerColor(partido.equipo1)}`,
                                    backgroundColor: `${obtenerColor(partido.equipo1)}15`,
                                    borderRadius: '3px',
                                    marginBottom: '2px'
                                }}>
                                    <span style={{ marginRight: '4px', fontSize: '0.6rem' }}>{obtenerBandera(partido.equipo1)}</span>
                                    {partido.equipo1}
                                </div>

                                <div style={{
                                    padding: '2px 4px',
                                    fontWeight: '500',
                                    fontSize: '0.7rem',
                                    color: '#000',
                                    borderLeft: `3px solid ${obtenerColor(partido.equipo2)}`,
                                    backgroundColor: `${obtenerColor(partido.equipo2)}15`,
                                    borderRadius: '3px'
                                }}>
                                    <span style={{ marginRight: '4px', fontSize: '0.6rem' }}>{obtenerBandera(partido.equipo2)}</span>
                                    {partido.equipo2}
                                </div>

                                <div style={{ textAlign: 'left', fontSize: '0.55rem', color: '#666', marginTop: '2px', borderTop: '1px solid #f0f0f0', paddingTop: '2px', fontWeight: '600' }}>
                                    {partido.id}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div style={{height: 500}}></div>
        </div>
    );
};

export default BracketTorneo;