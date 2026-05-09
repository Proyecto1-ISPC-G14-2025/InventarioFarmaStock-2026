export interface Usuario {
    id: number;
    username: string;
    email: string;
    rol: 'admin' | 'vendedor' | 'cliente';
    estaActivo: boolean;
}