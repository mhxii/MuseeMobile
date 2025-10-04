// Configuration simple de localisation sans expo-localization
export const currentLanguage = 'fr';

export const translations = {
  fr: {
    common: {
      loading: 'Chargement...',
      error: 'Erreur',
      retry: 'Réessayer',
      back: 'Retour',
      next: 'Suivant',
      previous: 'Précédent',
      start: 'Commencer',
      close: 'Fermer',
      share: 'Partager',
    },
    onboarding: {
      welcome: 'Bienvenue au\nMusée des Civilisations Noires',
      scan: 'Scannez et\nExplorez',
      hunt: 'Chasse au Trésor\nCulturelle',
      languages: 'Multilingue\nFR • EN • WO',
    },
    navigation: {
      home: 'Accueil',
      scanner: 'Scanner',
      collections: 'Collections',
      hunt: 'Chasse',
      tickets: 'Billets',
      profile: 'Profil',
    },
  },
  en: {
    common: {
      loading: 'Loading...',
      error: 'Error',
      retry: 'Retry',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      start: 'Start',
      close: 'Close',
      share: 'Share',
    },
    onboarding: {
      welcome: 'Welcome to\nMuseum of Black Civilizations',
      scan: 'Scan and\nExplore',
      hunt: 'Cultural\nTreasure Hunt',
      languages: 'Multilingual\nFR • EN • WO',
    },
    navigation: {
      home: 'Home',
      scanner: 'Scanner',
      collections: 'Collections',
      hunt: 'Hunt',
      tickets: 'Tickets',
      profile: 'Profile',
    },
  },
  wo: {
    common: {
      loading: 'Daj nala...',
      error: 'Njub',
      retry: 'Jéema',
      back: 'Dellu',
      next: 'Ci gannaaw',
      previous: 'Ci ginnaaw',
      start: 'Tambali',
      close: 'Tëj',
      share: 'Weccee',
    },
    onboarding: {
      welcome: 'Dalal ak jam\nGaleri Sivilisaasioŋ ñu Nit ku Ñuul',
      scan: 'Saane te\nSeetal',
      hunt: 'Ceet seen\nAsamaan',
      languages: 'Làkk yi\nFR • EN • WO',
    },
    navigation: {
      home: 'Kër',
      scanner: 'Saane',
      collections: 'Bokk',
      hunt: 'Ceet',
      tickets: 'Biye',
      profile: 'Profil',
    },
  },
};

export const t = (key: string, lang: 'fr' | 'en' | 'wo' = currentLanguage as any) => {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};