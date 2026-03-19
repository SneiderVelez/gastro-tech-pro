export type mesa = {
    id: string;
    numero: number;
    capacidad: number;
    zona: string;
    estado: EstadoMesa;
}

export enum EstadoMesa {
    DISPONIBLE = 'disponible',
    OCUPADA = 'ocupada',
    RESERVADA = 'reservada',
    SUCIA = 'sucia'
}