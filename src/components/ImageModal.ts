export class ImageModal {
  private modal: HTMLElement | null;
  private modalImg: HTMLImageElement | null;
  private captionText: HTMLElement | null;
  private closeButton: HTMLElement | null;
  private images: NodeListOf<HTMLImageElement>;

  constructor() {
    this.modal = document.getElementById('myModal');
    this.modalImg = document.getElementById('img01') as HTMLImageElement;
    this.captionText = document.getElementById('caption');
    this.closeButton = document.querySelector('.close');
    this.images = document.querySelectorAll('.myImg');
    
    this.init();
  }

  private init(): void {
    this.setupImageClickHandlers();
    this.setupCloseHandlers();
    this.setupKeyboardNavigation();
  }

  private setupImageClickHandlers(): void {
    this.images.forEach((img) => {
      img.addEventListener('click', () => {
        this.openModal(img);
      });
    });
  }

  private setupCloseHandlers(): void {
    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => {
        this.closeModal();
      });
    }

    if (this.modal) {
      this.modal.addEventListener('click', (event: Event) => {
        if (event.target === this.modal) {
          this.closeModal();
        }
      });
    }
  }

  private setupKeyboardNavigation(): void {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape' && this.modal?.style.display === 'block') {
        this.closeModal();
      }
    });
  }

  private openModal(img: HTMLImageElement): void {
    if (!this.modal || !this.modalImg || !this.captionText) return;

    this.modal.style.display = 'block';
    this.modalImg.src = img.src;
    this.captionText.textContent = img.alt || '';
    
    // Add animation class
    this.modalImg.classList.remove('out');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  private closeModal(): void {
    if (!this.modal || !this.modalImg) return;

    this.modalImg.classList.add('out');
    
    setTimeout(() => {
      if (this.modal) {
        this.modal.style.display = 'none';
      }
      document.body.style.overflow = 'auto';
    }, 600);
  }
}