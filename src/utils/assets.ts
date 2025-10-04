// Assets manager pour l'application Musée des Civilisations Noires

// Images placeholder pour les œuvres
export const Images = {
  placeholder: null, // Placeholder pour les images manquantes
  logo: null, // Logo du musée
  splash: null, // Image de splash screen
};

// Sons et audio guides
export const AudioFiles = {
  // Audio guides en français
  fr: {
    liberte_africaine: null,
    masque_dogon: null,
    kente_royal: null,
  },
  // Audio guides en anglais
  en: {
    liberte_africaine: null,
    masque_dogon: null,
    kente_royal: null,
  },
  // Audio guides en wolof
  wo: {
    liberte_africaine: null,
    masque_dogon: null,
    kente_royal: null,
  },
  // Sons d'interface
  ui: {
    scan_success: null,
    scan_error: null,
    hunt_complete: null,
    button_press: null,
  },
};

// Icônes personnalisées
export const CustomIcons = {
  qr_scanner: null,
  african_mask: null,
  treasure_chest: null,
  audio_guide: null,
};

// Fonction pour obtenir l'URL d'une image d'œuvre
export const getArtworkImageUrl = (artworkId: string): string => {
  // En production, retourner l'URL réelle depuis le serveur
  // Pour la démo, retourner une URL placeholder
  return `https://picsum.photos/400/300?random=${artworkId}`;
};

// Fonction pour obtenir l'URL d'un fichier audio
export const getAudioFileUrl = (filename: string, language: 'fr' | 'en' | 'wo' = 'fr'): string => {
  // En production, retourner l'URL réelle depuis le serveur
  return `https://example.com/audio/${language}/${filename}`;
};

// Configuration des couleurs pour les motifs africains
export const AfricanPatterns = {
  // Motifs géométriques inspirés des tissus wax
  kente: {
    colors: ['#E25822', '#F5B041', '#2E86AB', '#27AE60'],
    pattern: 'diagonal-stripes',
  },
  mudcloth: {
    colors: ['#8B4513', '#FDF6E3', '#000000'],
    pattern: 'geometric-shapes',
  },
  adinkra: {
    colors: ['#000000', '#FDF6E3'],
    pattern: 'symbolic-shapes',
  },
};

// Animations prédéfinies pour l'interface
export const Animations = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    duration: 300,
  },
  slideUp: {
    from: { transform: [{ translateY: 50 }], opacity: 0 },
    to: { transform: [{ translateY: 0 }], opacity: 1 },
    duration: 400,
  },
  bounce: {
    from: { transform: [{ scale: 0.8 }] },
    to: { transform: [{ scale: 1 }] },
    duration: 300,
    easing: 'bounce',
  },
  scan: {
    from: { transform: [{ scale: 1 }], opacity: 0.7 },
    to: { transform: [{ scale: 1.1 }], opacity: 1 },
    duration: 1000,
    repeat: true,
  },
};