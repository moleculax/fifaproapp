
export interface ClasificadosMundial {
    name: string;
    flag: string;
    crest: string;
    fifa: string;
}

export interface ContainerProps {
    name: string;
}


export interface Seleccion {
    pais: string;
    fifa: string;
    flag: string;
    confederation: string;
    note?: string;
}

export interface PrimeraFaseDeGrupos {
    grupo: string;
    seleccion: Seleccion[];
}

