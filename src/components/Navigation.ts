import { NavigationItem } from '../types/index.js';

export class Navigation {
  private menuIcon: HTMLElement | null;
  private navbar: HTMLElement | null;
  private navLinks: NodeListOf<HTMLAnchorElement>;
  private sections: NodeListOf<HTMLElement>;

  constructor() {
    this.menuIcon = document.querySelector('#menu-icon');
    this.navbar = document.querySelector('.navbar');
    this.navLinks = document.querySelectorAll('header nav a');
    this.sections = document.querySelectorAll('section');
    
    this.init();
  }

  private init(): void {
    this.setupMobileMenu();
    this.setupScrollNavigation();
    this.setupStickyHeader();
  }

  private setupMobileMenu(): void {
    if (!this.menuIcon || !this.navbar) return;

    this.menuIcon.addEventListener('click', () => {
      this.menuIcon?.classList.toggle('bx-x');
      this.navbar?.classList.toggle('active');
    });
  }

  private setupScrollNavigation(): void {
    window.addEventListener('scroll', () => {
      this.updateActiveNavigation();
      this.updateStickyHeader();
      this.closeMobileMenu();
    });
  }

  private updateActiveNavigation(): void {
    this.sections.forEach((section) => {
      const top = window.scrollY;
      const offset = section.offsetTop - 100;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (top >= offset && top < offset + height && id) {
        this.navLinks.forEach((link) => {
          link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`header nav a[href*="${id}"]`);
        activeLink?.classList.add('active');
      }
    });
  }

  private setupStickyHeader(): void {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      header.classList.toggle('sticky', window.scrollY > 100);
    });
  }

  private updateStickyHeader(): void {
    const header = document.querySelector('header');
    if (header) {
      header.classList.toggle('sticky', window.scrollY > 100);
    }
  }

  private closeMobileMenu(): void {
    this.menuIcon?.classList.remove('bx-x');
    this.navbar?.classList.remove('active');
  }
}