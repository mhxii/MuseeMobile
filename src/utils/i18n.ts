import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Platform, NativeModules } from 'react-native';

// Traductions françaises
const fr = {
  common: {
    welcome: 'Bienvenue',
    scan: 'Scanner',
    search: 'Rechercher',
    settings: 'Paramètres',
    about: 'À propos',
    back: 'Retour',
    next: 'Suivant',
    save: 'Enregistrer',
    cancel: 'Annuler',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    share: 'Partager',
    favorite: 'Favori',
    home: 'Accueil',
    profile: 'Profil',
    history: 'Historique',
    close: 'Fermer',
    open: 'Ouvrir'
  },
  navigation: {
    home: 'Accueil',
    scan: 'Scanner',
    collections: 'Collections',
    hunt: 'Chasse au trésor',
    tickets: 'Billets',
    profile: 'Profil'
  },
  home: {
    title: 'Musée des Civilisations Noires',
    subtitle: 'Découvrez notre patrimoine africain',
    scanArtwork: 'Scanner une œuvre',
    virtualTour: 'Visite virtuelle',
    featuredExhibits: 'Œuvres vedettes',
    seeAll: 'Voir tout',
    startAdventure: 'Commencer l\'aventure',
    exploreCollections: 'Explorer les collections'
  },
  scanner: {
    title: 'Scanner QR Code',
    instruction: 'Pointez votre caméra vers le QR code de l\'œuvre',
    permission: 'Permission caméra requise',
    permissionMessage: 'Nous avons besoin d\'accéder à votre caméra pour scanner les codes QR.',
    scanning: 'Scan en cours...',
    scanSuccess: 'Code scanné avec succès!',
    scanError: 'Erreur de scan. Réessayez.',
    invalidCode: 'Code QR invalide',
    allowCamera: 'Autoriser la caméra'
  },
  artwork: {
    details: 'Détails de l\'œuvre',
    artist: 'Artiste',
    period: 'Période',
    collection: 'Collection',
    location: 'Localisation',
    dimensions: 'Dimensions',
    materials: 'Matériaux',
    description: 'Description',
    audioGuide: 'Audio-guide',
    play: 'Écouter',
    pause: 'Pause',
    stop: 'Arrêter',
    addToFavorites: 'Ajouter aux favoris',
    removeFromFavorites: 'Retirer des favoris',
    shareArtwork: 'Partager cette œuvre',
    relatedArtworks: 'Œuvres similaires'
  },
  hunt: {
    title: 'Chasse au trésor',
    subtitle: 'Parcours culturels gamifiés',
    startHunt: 'Commencer',
    difficulty: 'Difficulté',
    duration: 'Durée',
    points: 'Points',
    easy: 'Facile',
    medium: 'Moyen',
    hard: 'Difficile',
    currentRiddle: 'Énigme actuelle',
    yourAnswer: 'Votre réponse',
    submitAnswer: 'Valider',
    correctAnswer: 'Bonne réponse!',
    wrongAnswer: 'Mauvaise réponse, réessayez',
    huntCompleted: 'Chasse terminée!',
    badgeEarned: 'Badge gagné',
    progress: 'Progression',
    hint: 'Indice'
  },
  tickets: {
    title: 'Billetterie',
    buyTicket: 'Acheter un billet',
    selectDate: 'Sélectionner une date',
    selectTime: 'Choisir un créneau',
    selectTickets: 'Nombre de billets',
    total: 'Total',
    purchase: 'Acheter',
    myTickets: 'Mes billets',
    qrCode: 'Code QR',
    status: 'Statut',
    pending: 'En attente',
    confirmed: 'Confirmé',
    used: 'Utilisé',
    cancelled: 'Annulé'
  },
  profile: {
    title: 'Mon Profil',
    visitStats: 'Statistiques de visite',
    artworksViewed: 'Œuvres vues',
    timeSpent: 'Temps passé',
    huntsCompleted: 'Chasses complétées',
    badges: 'Badges',
    achievements: 'Réalisations',
    language: 'Langue',
    theme: 'Thème',
    notifications: 'Notifications',
    exportVisit: 'Exporter ma visite',
    shareProfile: 'Partager mon profil'
  },
  social: {
    shareMessage: 'Découvrez cette magnifique œuvre au Musée des Civilisations Noires!',
    hashtags: '#MCN2025 #CulturAfricaine #Patrimoine #Sénégal',
    copied: 'Lien copié!',
    shareVia: 'Partager via'
  },
  settings: {
    title: 'Paramètres',
    general: 'Général',
    audioGuide: 'Audio-guide',
    accessibility: 'Accessibilité',
    privacy: 'Confidentialité',
    about: 'À propos de l\'app'
  }
};

// Traductions anglaises
const en = {
  common: {
    welcome: 'Welcome',
    scan: 'Scan',
    search: 'Search',
    settings: 'Settings',
    about: 'About',
    back: 'Back',
    next: 'Next',
    save: 'Save',
    cancel: 'Cancel',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    share: 'Share',
    favorite: 'Favorite',
    home: 'Home',
    profile: 'Profile',
    history: 'History',
    close: 'Close',
    open: 'Open'
  },
  navigation: {
    home: 'Home',
    scan: 'Scan',
    collections: 'Collections',
    hunt: 'Treasure Hunt',
    tickets: 'Tickets',
    profile: 'Profile'
  },
  home: {
    title: 'Museum of Black Civilizations',
    subtitle: 'Discover our African heritage',
    scanArtwork: 'Scan an artwork',
    virtualTour: 'Virtual tour',
    featuredExhibits: 'Featured exhibits',
    seeAll: 'See all',
    startAdventure: 'Start adventure',
    exploreCollections: 'Explore collections'
  },
  scanner: {
    title: 'Scan QR Code',
    instruction: 'Point your camera at the artwork\'s QR code',
    permission: 'Camera permission required',
    permissionMessage: 'We need access to your camera to scan QR codes.',
    scanning: 'Scanning...',
    scanSuccess: 'Code scanned successfully!',
    scanError: 'Scan error. Try again.',
    invalidCode: 'Invalid QR code',
    allowCamera: 'Allow camera'
  },
  artwork: {
    details: 'Artwork details',
    artist: 'Artist',
    period: 'Period',
    collection: 'Collection',
    location: 'Location',
    dimensions: 'Dimensions',
    materials: 'Materials',
    description: 'Description',
    audioGuide: 'Audio guide',
    play: 'Play',
    pause: 'Pause',
    stop: 'Stop',
    addToFavorites: 'Add to favorites',
    removeFromFavorites: 'Remove from favorites',
    shareArtwork: 'Share this artwork',
    relatedArtworks: 'Related artworks'
  },
  hunt: {
    title: 'Treasure Hunt',
    subtitle: 'Gamified cultural journeys',
    startHunt: 'Start',
    difficulty: 'Difficulty',
    duration: 'Duration',
    points: 'Points',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    currentRiddle: 'Current riddle',
    yourAnswer: 'Your answer',
    submitAnswer: 'Submit',
    correctAnswer: 'Correct answer!',
    wrongAnswer: 'Wrong answer, try again',
    huntCompleted: 'Hunt completed!',
    badgeEarned: 'Badge earned',
    progress: 'Progress',
    hint: 'Hint'
  },
  tickets: {
    title: 'Ticketing',
    buyTicket: 'Buy ticket',
    selectDate: 'Select date',
    selectTime: 'Choose time slot',
    selectTickets: 'Number of tickets',
    total: 'Total',
    purchase: 'Purchase',
    myTickets: 'My tickets',
    qrCode: 'QR Code',
    status: 'Status',
    pending: 'Pending',
    confirmed: 'Confirmed',
    used: 'Used',
    cancelled: 'Cancelled'
  },
  profile: {
    title: 'My Profile',
    visitStats: 'Visit statistics',
    artworksViewed: 'Artworks viewed',
    timeSpent: 'Time spent',
    huntsCompleted: 'Hunts completed',
    badges: 'Badges',
    achievements: 'Achievements',
    language: 'Language',
    theme: 'Theme',
    notifications: 'Notifications',
    exportVisit: 'Export my visit',
    shareProfile: 'Share my profile'
  },
  social: {
    shareMessage: 'Discover this magnificent artwork at the Museum of Black Civilizations!',
    hashtags: '#MCN2025 #AfricanCulture #Heritage #Senegal',
    copied: 'Link copied!',
    shareVia: 'Share via'
  },
  settings: {
    title: 'Settings',
    general: 'General',
    audioGuide: 'Audio guide',
    accessibility: 'Accessibility',
    privacy: 'Privacy',
    about: 'About the app'
  }
};

// Traductions wolof
const wo = {
  common: {
    welcome: 'Dalal ak jam',
    scan: 'Fajji',
    search: 'Seet',
    settings: 'Jumtukaay',
    about: 'Ci mbir',
    back: 'Dellu',
    next: 'Bi ñëw',
    save: 'Saab',
    cancel: 'Neenal',
    loading: 'Yàqu na...',
    error: 'Njumte',
    success: 'Baax',
    share: 'Bokk',
    favorite: 'Bëgg',
    home: 'Kër',
    profile: 'Profil',
    history: 'Tarix',
    close: 'Tëj',
    open: 'Ubbi'
  },
  navigation: {
    home: 'Kër',
    scan: 'Fajji',
    collections: 'Njëkk yi',
    hunt: 'Ceet seen',
    tickets: 'Tikke yi',
    profile: 'Profil'
  },
  home: {
    title: 'Musée des Civilisations Noires',
    subtitle: 'Gis seen aadama Afrika',
    scanArtwork: 'Fajji benn liggéey',
    virtualTour: 'Génn gi virtual',
    featuredExhibits: 'Liggéey yu bees',
    seeAll: 'Gis lépp',
    startAdventure: 'Tambali aventure bi',
    exploreCollections: 'Seet njëkk yi'
  },
  scanner: {
    title: 'Fajji QR Code',
    instruction: 'Jaar sa kameraas ci QR code bu liggéey bi',
    permission: 'Jaar kamera moo soxla',
    permissionMessage: 'Danu soxla jaar sa kamera ngir fajji QR codes.',
    scanning: 'Dafay fajji...',
    scanSuccess: 'Code bi fajj na baax!',
    scanError: 'Njumte ci fajji. Ceetal.',
    invalidCode: 'QR code bu baax',
    allowCamera: 'Jaar kamera'
  },
  artwork: {
    details: 'Ci mbir liggéey bi',
    artist: 'Ku ko def',
    period: 'Jamono',
    collection: 'Njëkk',
    location: 'Fan la nekk',
    dimensions: 'Say yi',
    materials: 'Njariñ yi',
    description: 'Tektal',
    audioGuide: 'Guide bu dégg',
    play: 'Dégg',
    pause: 'Taxawal',
    stop: 'Taxaw',
    addToFavorites: 'Yokk ci yu ma bëgg',
    removeFromFavorites: 'Jëlee ci yu ma bëgg',
    shareArtwork: 'Bokk liggéey bii',
    relatedArtworks: 'Liggéey yu ni ci'
  },
  hunt: {
    title: 'Ceet Seen',
    subtitle: 'Yoon bu jëm ak cultura',
    startHunt: 'Tambali',
    difficulty: 'Naka nga goor',
    duration: 'Waxtu',
    points: 'Points',
    easy: 'Yomb',
    medium: 'Digante',
    hard: 'Goor',
    currentRiddle: 'Seen bi nekk',
    yourAnswer: 'Sa jaab',
    submitAnswer: 'Yonnee',
    correctAnswer: 'Jaab bu baax!',
    wrongAnswer: 'Jaab bu baax, ceetal',
    huntCompleted: 'Ceet bi jeex na!',
    badgeEarned: 'Badge amee',
    progress: 'Yoon',
    hint: 'Làkk'
  },
  tickets: {
    title: 'Tikke yi',
    buyTicket: 'Jënd tikke',
    selectDate: 'Tann benn bes',
    selectTime: 'Tann waxtu',
    selectTickets: 'Ñaata tikke',
    total: 'Lépp',
    purchase: 'Jënd',
    myTickets: 'Sama tikke yi',
    qrCode: 'QR Code',
    status: 'Waa kenn',
    pending: 'Dafay xaar',
    confirmed: 'Ni ko dëggal',
    used: 'Jëfandikoo',
    cancelled: 'Neenal'
  },
  profile: {
    title: 'Sama Profil',
    visitStats: 'Wone yu génn gi',
    artworksViewed: 'Liggéey yu gis',
    timeSpent: 'Waxtu yu jëfandikoo',
    huntsCompleted: 'Ceet yi jeex',
    badges: 'Badge yi',
    achievements: 'Yu am',
    language: 'Làkk',
    theme: 'Sax',
    notifications: 'Khabaar yi',
    exportVisit: 'Génn sama génn',
    shareProfile: 'Bokk sama profil'
  },
  social: {
    shareMessage: 'Gis liggéey bii bu rafet ci Musée des Civilisations Noires!',
    hashtags: '#MCN2025 #CulturAfrik #Aadama #Senegaal',
    copied: 'Lien kopee!',
    shareVia: 'Bokk ci'
  },
  settings: {
    title: 'Jumtukaay',
    general: 'Ci mbir lépp',
    audioGuide: 'Guide bu dégg',
    accessibility: 'Accessibility',
    privacy: 'Sutura',
    about: 'Ci mbir app bi'
  }
};

const resources = {
  fr: { translation: fr },
  en: { translation: en },
  wo: { translation: wo }
};

// Détection de langue simple sans expo-localization
const getDeviceLanguage = () => {
  if (Platform.OS === 'ios') {
    return NativeModules.SettingsManager?.settings?.AppleLocale ||
           NativeModules.SettingsManager?.settings?.AppleLanguages?.[0] ||
           'fr';
  } else if (Platform.OS === 'android') {
    return NativeModules.I18nManager?.localeIdentifier || 'fr';
  }
  return 'fr';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDeviceLanguage().substring(0, 2) || 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;