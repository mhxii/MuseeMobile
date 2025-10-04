// Palette de couleurs africaine authentique inspirée du Musée des Civilisations Noires
export const Colors = {
  // Couleurs principales - design sombre élégant
  primary: '#D4AF37',      // Or doré - couleur principale
  secondary: '#8B4513',    // Bronze/Cuivre - couleur secondaire
  accent: '#FFD700',       // Or vif - accent
  earth: '#6B4423',        // Terre brûlée - tons naturels
  background: '#1A1A1A',   // Noir sophistiqué - arrière-plan principal
  surface: '#2C2C2C',      // Gris sombre - surfaces secondaires
  
  // Couleurs système
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    light: '#F5F5F5',
    medium: '#CCCCCC',
    dark: '#666666',
    darker: '#333333',
  },

  // États
  success: '#28A745',
  warning: '#FFC107',
  error: '#DC3545',
  info: '#17A2B8',

  // Texte - adapté au fond sombre
  text: {
    primary: '#FFFFFF',      // Blanc pour le texte principal
    secondary: '#CCCCCC',    // Gris clair pour le texte secondaire
    tertiary: '#999999',     // Gris moyen pour le texte tertiaire
    accent: '#D4AF37',       // Or pour les accents
    inverse: '#000000',      // Noir pour texte sur fond clair
  },

  // Ombres et transparences
  shadow: 'rgba(0, 0, 0, 0.3)',
  overlay: 'rgba(0, 0, 0, 0.7)',
  
  // Gradients africains élégants
  gradients: {
    gold: ['#D4AF37', '#FFD700'],
    bronze: ['#8B4513', '#D2691E'],
    elegant: ['#1A1A1A', '#2C2C2C'],
    sunset: ['#8B4513', '#D4AF37'],
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