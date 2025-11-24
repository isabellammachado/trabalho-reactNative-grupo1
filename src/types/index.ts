export type Role = 'surdo' | 'voluntario';
export type Nivel = 'basico' | 'intermediario' | 'avancado';

export interface User {
  id: string;
  name: string;
  email: string;
  cep: string;
  cidade: string;
  role: Role;
  nivel?: Nivel; 
  fotoPerfil?: string;
  telefone: string;
}
export interface Pedido {
  id: string;
  title: string;
  location: string;
  data_agendamento: string;
  nivel_necessario: Nivel;
  status: 'aberto' | 'aceito';
  userId: string;
  cidade: string; 

  voluntarioId?: string; 
 
  video_url?: string | null;
}

export interface SenaiSinal {
  id: number;
  titulo: string;
  descricaoMovimento: string;
}

