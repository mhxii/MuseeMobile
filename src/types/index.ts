export interface Artwork {
  id: string;
  qrCode: string;
  title: MultiLanguageText;
  artist: string;
  period: string;
  collection: string;
  description: MultiLanguageText;
  audioFile: MultiLanguageText;
  imageUrl: string;
  location: string;
  dimensions: string;
  materials: string;
  acquisitionYear: number;
  isHighlight: boolean;
  tags: string[];
  treasureHunt?: TreasureHuntData;
}

export interface MultiLanguageText {
  fr: string;
  en: string;
  wo: string;
}

export interface TreasureHuntData {
  isPartOfHunt: boolean;
  huntId: string;
  riddle: MultiLanguageText;
  answer: string;
  points: number;
}

export interface TreasureHunt {
  id: string;
  title: MultiLanguageText;
  description: MultiLanguageText;
  duration: number; // minutes
  difficulty: 'easy' | 'medium' | 'hard';
  artworkIds: string[];
  totalPoints: number;
  badge: string;
}

export interface TicketType {
  id: string;
  name: MultiLanguageText;
  price: number; // en CFA
  description: MultiLanguageText;
}

export interface User {
  id: string;
  name: string;
  email: string;
  language: 'fr' | 'en' | 'wo';
  visitHistory: VisitHistoryItem[];
  huntProgress: HuntProgress[];
  badges: string[];
  totalPoints: number;
}

export interface VisitHistoryItem {
  artworkId: string;
  viewedAt: Date;
  duration: number; // seconds
  audioPlayed: boolean;
  shared: boolean;
}

export interface HuntProgress {
  huntId: string;
  startedAt: Date;
  completedAt?: Date;
  currentStep: number;
  solvedRiddles: string[];
  earnedPoints: number;
  isCompleted: boolean;
}

export interface Ticket {
  id: string;
  type: string;
  userId: string;
  date: Date;
  timeSlot: string;
  quantity: number;
  totalPrice: number;
  qrCode: string;
  status: 'pending' | 'confirmed' | 'used' | 'cancelled';
}

export interface Collection {
  id: string;
  name: MultiLanguageText;
  icon: string;
  color: string;
  artworkCount?: number;
}

export interface VisitStatistics {
  totalArtworks: number;
  totalDuration: number; // minutes
  favoriteCollection: string;
  huntCompleted: number;
  badgesEarned: string[];
  shareCount: number;
}

export interface SocialShareData {
  artworkTitle: string;
  artworkImage: string;
  message: MultiLanguageText;
  hashtags: string[];
}

export interface AudioGuideSettings {
  volume: number;
  autoPlay: boolean;
  language: 'fr' | 'en' | 'wo';
  downloadOffline: boolean;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  language: 'fr' | 'en' | 'wo';
  notifications: boolean;
  analytics: boolean;
  offlineMode: boolean;
  audioGuide: AudioGuideSettings;
}

export interface AdminUser {
  id: string;
  username: string;
  role: 'admin' | 'moderator' | 'editor';
  permissions: string[];
}

export interface AnalyticsData {
  dailyVisitors: number;
  popularArtworks: string[];
  averageVisitDuration: number;
  qrScans: number;
  huntCompletions: number;
  ticketsSold: number;
  revenueGenerated: number;
}

// Types pour les notifications
export interface Notification {
  id: string;
  title: MultiLanguageText;
  message: MultiLanguageText;
  type: 'info' | 'promotion' | 'event' | 'reminder';
  createdAt: Date;
  expiresAt: Date;
  isRead: boolean;
  actionUrl?: string;
}

// Types pour la géolocalisation dans le musée
export interface MuseumLocation {
  id: string;
  name: MultiLanguageText;
  floor: number;
  coordinates: {
    x: number;
    y: number;
  };
  nearbyArtworks: string[];
}

// Types pour les expériences 3D
export interface Experience3D {
  id: string;
  artworkId: string;
  title: MultiLanguageText;
  description: MultiLanguageText;
  modelUrl: string;
  thumbnailUrl: string;
  duration: number; // seconds
  isInteractive: boolean;
  requiredLevel: 'beginner' | 'intermediate' | 'advanced';
}

export type Language = 'fr' | 'en' | 'wo';
export type Theme = 'light' | 'dark' | 'auto';
export type UserRole = 'visitor' | 'guide' | 'admin';