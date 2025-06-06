export interface Professor {
  id: number;
  nome: string;
  genero: 'professor' | 'professora';
  materias: string;
  foto: string;
}

export interface Aluno {
  id: number;
  nome: string;
  foto: string;
  email: string;
  role?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  embedUrl: string;
}

export interface Modulo {
  id: string;
  title: string;
  videos: VideoItem[];
}

export interface NavigationItem {
  href: string;
  text: string;
  isActive?: boolean;
}