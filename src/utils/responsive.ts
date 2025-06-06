export class ResponsiveManager {
  private static instance: ResponsiveManager;
  private breakpoints = {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
    large: 1200
  };

  static getInstance(): ResponsiveManager {
    if (!ResponsiveManager.instance) {
      ResponsiveManager.instance = new ResponsiveManager();
    }
    return ResponsiveManager.instance;
  }

  getCurrentBreakpoint(): string {
    const width = window.innerWidth;
    
    if (width <= this.breakpoints.mobile) return 'mobile';
    if (width <= this.breakpoints.tablet) return 'tablet';
    if (width <= this.breakpoints.desktop) return 'desktop';
    return 'large';
  }

  isMobile(): boolean {
    return window.innerWidth <= this.breakpoints.mobile;
  }

  isTablet(): boolean {
    return window.innerWidth <= this.breakpoints.tablet && window.innerWidth > this.breakpoints.mobile;
  }

  isDesktop(): boolean {
    return window.innerWidth > this.breakpoints.tablet;
  }

  onBreakpointChange(callback: (breakpoint: string) => void): void {
    let currentBreakpoint = this.getCurrentBreakpoint();
    
    window.addEventListener('resize', () => {
      const newBreakpoint = this.getCurrentBreakpoint();
      if (newBreakpoint !== currentBreakpoint) {
        currentBreakpoint = newBreakpoint;
        callback(newBreakpoint);
      }
    });
  }
}