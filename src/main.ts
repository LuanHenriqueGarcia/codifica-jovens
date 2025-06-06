import { Navigation } from './components/Navigation.js';
import { ProfessorCarousel } from './components/ProfessorCarousel.js';
import { ImageModal } from './components/ImageModal.js';
import { ResponsiveManager } from './utils/responsive.js';

class App {
  private navigation: Navigation;
  private professorCarousel: ProfessorCarousel | null = null;
  private imageModal: ImageModal | null = null;
  private responsiveManager: ResponsiveManager;

  constructor() {
    this.responsiveManager = ResponsiveManager.getInstance();
    this.navigation = new Navigation();
    
    this.init();
  }

  private init(): void {
    this.setupResponsiveHandling();
    this.initializePageSpecificComponents();
    this.setupFormHandling();
  }

  private setupResponsiveHandling(): void {
    this.responsiveManager.onBreakpointChange((breakpoint: string) => {
      console.log(`Breakpoint changed to: ${breakpoint}`);
      this.handleBreakpointChange(breakpoint);
    });
  }

  private handleBreakpointChange(breakpoint: string): void {
    // Handle responsive changes
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    const content = document.querySelector('.content') as HTMLElement;
    
    if (sidebar && content) {
      if (breakpoint === 'mobile') {
        sidebar.style.position = 'relative';
        sidebar.style.width = '100%';
        content.style.marginLeft = '0';
      } else {
        sidebar.style.position = 'fixed';
        sidebar.style.width = '250px';
        content.style.marginLeft = '260px';
      }
    }
  }

  private initializePageSpecificComponents(): void {
    // Initialize professor carousel on main page
    if (document.getElementById('professor-name')) {
      this.professorCarousel = new ProfessorCarousel();
    }

    // Initialize image modal on gallery pages
    if (document.getElementById('myModal')) {
      this.imageModal = new ImageModal();
    }
  }

  private setupFormHandling(): void {
    const contactForm = document.querySelector('#contact form') as HTMLFormElement;
    
    if (contactForm) {
      contactForm.addEventListener('submit', (event: Event) => {
        event.preventDefault();
        this.handleFormSubmit(contactForm);
      });
    }
  }

  private handleFormSubmit(form: HTMLFormElement): void {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    console.log('Form submitted:', data);
    
    // Show success message
    this.showNotification('Mensagem enviada com sucesso!', 'success');
    
    // Reset form
    form.reset();
  }

  private showNotification(message: string, type: 'success' | 'error' = 'success'): void {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      background: ${type === 'success' ? 'var(--main-color)' : '#ff4444'};
      color: ${type === 'success' ? 'var(--bg-color)' : 'white'};
      border-radius: 8px;
      z-index: 10000;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new App();
});

// Global function for video reveal (legacy support)
(window as any).revelarVideo = function(button: HTMLElement): void {
  const overlay = button.parentElement;
  if (overlay) {
    overlay.style.display = 'none';
  }
};