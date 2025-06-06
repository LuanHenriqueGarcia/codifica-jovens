import { Professor } from '../types/index.js';

export class ProfessorCarousel {
  private professors: Professor[] = [
    {
      id: 1,
      nome: "Eduarda",
      genero: "professora",
      materias: "Realidade virtual, Robótica e IA",
      foto: "img/image.png"
    },
    {
      id: 2,
      nome: "Cleber",
      genero: "professor",
      materias: "Word, Excel e Lógica de programação",
      foto: "img/image1.png"
    }
  ];

  private currentIndex: number = 0;
  private nextButton: HTMLElement | null;
  private professorGenero: HTMLElement | null;
  private professorName: HTMLElement | null;
  private contentText: HTMLElement | null;
  private contentImage: HTMLImageElement | null;

  constructor() {
    this.nextButton = document.getElementById('next-btn');
    this.professorGenero = document.getElementById('professor-genero');
    this.professorName = document.getElementById('professor-name');
    this.contentText = document.getElementById('content-text');
    this.contentImage = document.getElementById('content-image') as HTMLImageElement;
    
    this.init();
  }

  private init(): void {
    if (!this.nextButton) return;

    this.nextButton.addEventListener('click', (event: Event) => {
      event.preventDefault();
      this.nextProfessor();
    });

    // Auto-advance every 10 seconds
    setInterval(() => {
      this.nextProfessor();
    }, 10000);
  }

  private nextProfessor(): void {
    this.currentIndex = (this.currentIndex + 1) % this.professors.length;
    this.updateDisplay();
  }

  private updateDisplay(): void {
    const currentProfessor = this.professors[this.currentIndex];
    
    if (this.professorGenero) {
      this.professorGenero.textContent = currentProfessor.genero;
    }
    
    if (this.professorName) {
      this.professorName.textContent = currentProfessor.nome;
    }
    
    if (this.contentText) {
      this.contentText.textContent = currentProfessor.materias;
    }
    
    if (this.contentImage) {
      this.contentImage.src = currentProfessor.foto;
      this.contentImage.alt = `Foto do ${currentProfessor.genero} ${currentProfessor.nome}`;
    }
  }
}