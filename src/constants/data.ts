// Données des œuvres du musée avec QR codes
export const MUSEUM_ARTWORKS = [
  {
    id: '1',
    qrCode: 'MCN_LIBERTE_001',
    title: {
      fr: 'Liberté Africaine',
      en: 'African Liberty', 
      wo: 'Yoon wi Afrik'
    },
    artist: 'Monsieur M\'Bida',
    period: 'XXIe siècle',
    collection: 'Peinture Contemporaine',
    description: {
      fr: 'Une œuvre puissante représentant la liberté africaine, mêlant tradition et modernité dans un style unique.',
      en: 'A powerful artwork representing African freedom, blending tradition and modernity in a unique style.',
      wo: 'Liggéey bu baax ba di wone yoon wi Afrik, ci njaxas yi gi ak ñuul yi ci fenn wu bees.'
    },
    audioFile: {
      fr: 'liberte_africaine_fr.mp3',
      en: 'liberte_africaine_en.mp3', 
      wo: 'liberte_africaine_wo.mp3'
    },
    imageUrl: 'https://picsum.photos/400/300?random=1',
    location: 'Salle 1 - Étage 1',
    dimensions: '120 x 80 cm',
    materials: 'Huile sur toile',
    acquisitionYear: 2023,
    isHighlight: true,
    tags: ['liberté', 'contemporain', 'politique', 'identité'],
    treasureHunt: {
      isPartOfHunt: true,
      huntId: 'route_or',
      riddle: {
        fr: 'Je brandis ma torche vers le ciel, symbole de liberté éternelle. Qui suis-je ?',
        en: 'I raise my torch to the sky, symbol of eternal freedom. Who am I?',
        wo: 'Dama yeg sama luus ci asama, du xel li ñu bëgg ca yoon. Lu may?'
      },
      answer: 'Liberté Africaine',
      points: 100
    }
  },
  {
    id: '2', 
    qrCode: 'MCN_MASQUE_002',
    title: {
      fr: 'Masque Rituél Dogon',
      en: 'Dogon Ritual Mask',
      wo: 'Maask Dogon'
    },
    artist: 'Artisan Dogon (Mali)',
    period: 'XVIe siècle',
    collection: 'Art Traditionnel',
    description: {
      fr: 'Masque cérémoniel utilisé lors des rites funéraires dogon, sculpté dans le bois d\'ébène avec des motifs géométriques sacrés.',
      en: 'Ceremonial mask used in Dogon funeral rites, carved from ebony wood with sacred geometric patterns.',
      wo: 'Maask bu njariñ ci riti yu Dogon yo, di jagg ci garab u ñuul ak nataal yi ñu sell.'
    },
    audioFile: {
      fr: 'masque_dogon_fr.mp3',
      en: 'masque_dogon_en.mp3',
      wo: 'masque_dogon_wo.mp3'
    },
    imageUrl: 'https://picsum.photos/400/300?random=2',
    location: 'Salle 3 - Étage 2', 
    dimensions: '45 x 30 x 25 cm',
    materials: 'Bois d\'ébène, pigments naturels',
    acquisitionYear: 1995,
    isHighlight: true,
    tags: ['masque', 'rituel', 'dogon', 'sacré', 'funéraire'],
    treasureHunt: {
      isPartOfHunt: true,
      huntId: 'masques_sacres',
      riddle: {
        fr: 'Je cache le visage mais révèle l\'âme, guide les défunts vers l\'au-delà. Que suis-je ?',
        en: 'I hide the face but reveal the soul, guide the deceased to the afterlife. What am I?',
        wo: 'Dama nëb kanam waaye wone rox, di ñu toll nekk yo di dem ku nekk. Lu may?'
      },
      answer: 'Masque Rituél',
      points: 150
    }
  },
  {
    id: '3',
    qrCode: 'MCN_TEXTILE_003', 
    title: {
      fr: 'Tissage Kente Royal',
      en: 'Royal Kente Weaving',
      wo: 'Rànd Kente bu Buur'
    },
    artist: 'Maître Tisserand Ashanti',
    period: 'XVIIIe siècle',
    collection: 'Textiles et Artisanat',
    description: {
      fr: 'Magnifique textile kente aux motifs complexes, traditionnellement porté par la royauté ghanéenne lors des cérémonies importantes.',
      en: 'Beautiful kente textile with complex patterns, traditionally worn by Ghanaian royalty during important ceremonies.',
      wo: 'Rànd Kente bu rafet ak motifs yu yàgg, ku ñu tolof di laac ko buur yi Ghana ci sérémonies yu mag yu.'
    },
    audioFile: {
      fr: 'kente_royal_fr.mp3',
      en: 'kente_royal_en.mp3',
      wo: 'kente_royal_wo.mp3'
    },
    imageUrl: 'https://picsum.photos/400/300?random=3',
    location: 'Salle 2 - Étage 1',
    dimensions: '200 x 150 cm',
    materials: 'Coton, soie, fils d\'or',
    acquisitionYear: 1987,
    isHighlight: false,
    tags: ['textile', 'kente', 'royal', 'ghana', 'cérémonie'],
    treasureHunt: {
      isPartOfHunt: true,
      huntId: 'artisanat_traditionnel',
      riddle: {
        fr: 'Tissé de fils d\'or et de couleurs vives, je pare les rois et raconte leur histoire. Que suis-je ?',
        en: 'Woven with golden threads and bright colors, I adorn kings and tell their story. What am I?',
        wo: 'Dama rang ak xar yu won ak melni yu bees, dama laac buur yi te wax seen tarix. Lu may?'
      },
      answer: 'Kente Royal',
      points: 120
    }
  }
];

// Parcours de chasse au trésor
export const TREASURE_HUNTS = [
  {
    id: 'route_or',
    title: {
      fr: 'Route de l\'Or Royale',
      en: 'Royal Gold Route', 
      wo: 'Yoonu Wóor bu Buur'
    },
    description: {
      fr: 'Découvrez les trésors dorés des royaumes africains',
      en: 'Discover the golden treasures of African kingdoms',
      wo: 'Gis seen ñii gi wóor yu boole yu réew yi Afrika'
    },
    duration: 45, // minutes
    difficulty: 'medium' as const,
    artworkIds: ['1', '3'],
    totalPoints: 220,
    badge: 'gold_hunter'
  },
  {
    id: 'masques_sacres',
    title: {
      fr: 'Masques Sacrés',
      en: 'Sacred Masks',
      wo: 'Maask yi Seen'
    },
    description: {
      fr: 'Explorez les mystères des masques rituels africains',
      en: 'Explore the mysteries of African ritual masks',
      wo: 'Seet seen yi maask yu ñaari yi Afrika'
    },
    duration: 30,
    difficulty: 'easy' as const,
    artworkIds: ['2'],
    totalPoints: 150,
    badge: 'mask_explorer'
  },
  {
    id: 'artisanat_traditionnel',
    title: {
      fr: 'Artisanat Traditionnel',
      en: 'Traditional Crafts',
      wo: 'Liggéey bu Njëkk'
    },
    description: {
      fr: 'Plongez dans l\'art de l\'artisanat ancestral',
      en: 'Dive into the art of ancestral craftsmanship',
      wo: 'Dugg ci art bu liggéey yu ñi ñëw'
    },
    duration: 60,
    difficulty: 'hard' as const,
    artworkIds: ['2', '3'],
    totalPoints: 270,
    badge: 'craft_master'
  }
];

// Configuration ticketerie
export const TICKET_TYPES = [
  {
    id: 'adult',
    name: {
      fr: 'Adulte',
      en: 'Adult',
      wo: 'Mag yi'
    },
    price: 5000, // CFA
    description: {
      fr: 'Tarif standard pour les adultes',
      en: 'Standard rate for adults', 
      wo: 'Jayu normal bu mag yi'
    }
  },
  {
    id: 'student',
    name: {
      fr: 'Étudiant',
      en: 'Student',
      wo: 'Jàngatkat'
    },
    price: 2500,
    description: {
      fr: 'Tarif réduit pour les étudiants avec carte',
      en: 'Reduced rate for students with ID',
      wo: 'Jayu ndimbal bu jàngatkat yi ak karte'
    }
  },
  {
    id: 'child',
    name: {
      fr: 'Enfant (6-12 ans)',
      en: 'Child (6-12 years)',
      wo: 'Xale (6-12 at)'
    },
    price: 1500,
    description: {
      fr: 'Tarif enfant de 6 à 12 ans',
      en: 'Child rate from 6 to 12 years old',
      wo: 'Jayu xale ci 6 ba 12 at'
    }
  },
  {
    id: 'family',
    name: {
      fr: 'Famille (2 adultes + 2 enfants)',
      en: 'Family (2 adults + 2 children)',
      wo: 'Njaboot (2 mag + 2 xale)'
    },
    price: 12000,
    description: {
      fr: 'Forfait famille avantageux',
      en: 'Advantageous family package',
      wo: 'Paket njaboot bu gëm'
    }
  }
];

// Créneaux horaires
export const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', 
  '14:00', '15:00', '16:00', '17:00'
];

// Langues supportées
export const SUPPORTED_LANGUAGES = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'wo', name: 'Wolof', flag: '🇸🇳' }
];

// Collections du musée
export const MUSEUM_COLLECTIONS = [
  {
    id: 'contemporary',
    name: {
      fr: 'Peinture Contemporaine',
      en: 'Contemporary Painting',
      wo: 'Nataal bu Bii'
    },
    icon: '🎨',
    color: Colors.primary
  },
  {
    id: 'traditional',
    name: {
      fr: 'Art Traditionnel', 
      en: 'Traditional Art',
      wo: 'Art bu Njëkk'
    },
    icon: '🗿',
    color: Colors.earth
  },
  {
    id: 'textiles',
    name: {
      fr: 'Textiles et Artisanat',
      en: 'Textiles and Crafts',
      wo: 'Rànd ak Liggéey'
    },
    icon: '🧵',
    color: Colors.accent
  }
];

import { Colors } from './theme';