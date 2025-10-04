// Palette de couleurs africaine inspirée du design du Musée des Civilisations Noires
export const Colors = {
  // Couleurs principales
  primary: '#E25822',      // Orange terre - couleur principale
  secondary: '#2E86AB',    // Bleu Sénégal - couleur secondaire
  accent: '#F5B041',       // Jaune soleil - accent
  earth: '#8B4513',        // Marron terre - tons chauds
  green: '#27AE60',        // Vert nature - touches naturelles
  background: '#FDF6E3',   // Beige sable - arrière-plan

  // Couleurs système
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    light: '#F5F5F5',
    medium: '#CCCCCC',
    dark: '#666666',
  },

  // États
  success: '#27AE60',
  warning: '#F5B041',
  error: '#E74C3C',
  info: '#2E86AB',

  // Texte
  text: {
    primary: '#2C3E50',
    secondary: '#7F8C8D',
    light: '#BDC3C7',
    inverse: '#FFFFFF',
  },

  // Ombres et transparences
  shadow: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  // Gradients africains
  gradients: {
    sunset: ['#E25822', '#F5B041'],
    ocean: ['#2E86AB', '#27AE60'],
    earth: ['#8B4513', '#E25822'],
    sand: ['#FDF6E3', '#F5B041'],
  }
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  round: 50,
};

export const Typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    title: 28,
    hero: 32,
  },
  weights: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  }
};

export const Shadows = {
  small: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};