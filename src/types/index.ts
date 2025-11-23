export type Role = 'surdo' | 'voluntario';
export type Nivel = 'basico' | 'intermediario' | 'avancado';

export interface User {
  id: string;
  name: string;
  email: string;
  cep: string;
  cidade: string;
  role: Role;
  nivel?: Nivel; // Opcional, pois surdo não precisa preencher
  fotoPerfil?: string;
  telefone: string;
}

export interface Pedido {
  id: string;
  title: string;
  location: string;
  cidade: string;
  data_agendamento: string;
  nivel_necessario: Nivel;
  userId: string;
  status: 'aberto' | 'aceito';
}

export interface SenaiSinal {
  id: number;
  titulo: string;
  descricaoMovimento: string;
}

