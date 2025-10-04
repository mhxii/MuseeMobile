// Service pour gérer les données du musée
import { MUSEUM_ARTWORKS, TREASURE_HUNTS, TICKET_TYPES } from '../constants/data';
import { Artwork, TreasureHunt, TicketType } from '../types';

export class MuseumService {
  // Récupérer toutes les œuvres
  static getAllArtworks(): Artwork[] {
    return MUSEUM_ARTWORKS;
  }

  // Récupérer une œuvre par ID
  static getArtworkById(id: string): Artwork | undefined {
    return MUSEUM_ARTWORKS.find(artwork => artwork.id === id);
  }

  // Récupérer une œuvre par QR Code
  static getArtworkByQRCode(qrCode: string): Artwork | undefined {
    return MUSEUM_ARTWORKS.find(artwork => artwork.qrCode === qrCode);
  }

  // Récupérer les œuvres vedettes
  static getFeaturedArtworks(): Artwork[] {
    return MUSEUM_ARTWORKS.filter(artwork => artwork.isHighlight);
  }

  // Récupérer les œuvres par collection
  static getArtworksByCollection(collectionName: string): Artwork[] {
    return MUSEUM_ARTWORKS.filter(artwork => artwork.collection === collectionName);
  }

  // Rechercher des œuvres
  static searchArtworks(query: string): Artwork[] {
    const lowerQuery = query.toLowerCase();
    return MUSEUM_ARTWORKS.filter(artwork => 
      artwork.title.fr.toLowerCase().includes(lowerQuery) ||
      artwork.title.en.toLowerCase().includes(lowerQuery) ||
      artwork.title.wo.toLowerCase().includes(lowerQuery) ||
      artwork.artist.toLowerCase().includes(lowerQuery) ||
      artwork.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  // Récupérer toutes les chasses au trésor
  static getAllTreasureHunts(): TreasureHunt[] {
    return TREASURE_HUNTS;
  }

  // Récupérer une chasse au trésor par ID
  static getTreasureHuntById(id: string): TreasureHunt | undefined {
    return TREASURE_HUNTS.find(hunt => hunt.id === id);
  }

  // Récupérer les types de billets
  static getTicketTypes(): TicketType[] {
    return TICKET_TYPES;
  }

  // Simuler la validation d'un QR code
  static validateQRCode(qrCode: string): { isValid: boolean; artwork?: Artwork } {
    const artwork = this.getArtworkByQRCode(qrCode);
    return {
      isValid: !!artwork,
      artwork
    };
  }
}

// Service pour l'historique des visites
export class VisitHistoryService {
  private static STORAGE_KEY = 'museum_visit_history';

  // Ajouter une œuvre à l'historique
  static async addToHistory(artworkId: string, duration: number = 0): Promise<void> {
    try {
      // En production, utiliser AsyncStorage
      const historyItem = {
        artworkId,
        viewedAt: new Date(),
        duration,
        audioPlayed: false,
        shared: false
      };
      
      // Simulation du stockage
      console.log('Adding to history:', historyItem);
    } catch (error) {
      console.error('Error adding to history:', error);
    }
  }

  // Récupérer l'historique
  static async getHistory(): Promise<any[]> {
    try {
      // En production, récupérer depuis AsyncStorage
      return [];
    } catch (error) {
      console.error('Error getting history:', error);
      return [];
    }
  }

  // Nettoyer l'historique
  static async clearHistory(): Promise<void> {
    try {
      // En production, nettoyer AsyncStorage
      console.log('History cleared');
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  }
}

// Service pour les chasses au trésor
export class TreasureHuntService {
  // Démarrer une chasse
  static startHunt(huntId: string): { success: boolean; message: string } {
    const hunt = MuseumService.getTreasureHuntById(huntId);
    if (!hunt) {
      return { success: false, message: 'Chasse au trésor introuvable' };
    }

    // Initialiser la progression
    const progress = {
      huntId,
      startedAt: new Date(),
      currentStep: 0,
      solvedRiddles: [],
      earnedPoints: 0,
      isCompleted: false
    };

    console.log('Starting hunt:', progress);
    return { success: true, message: 'Chasse au trésor démarrée!' };
  }

  // Résoudre une énigme
  static solveRiddle(huntId: string, artworkId: string, answer: string): { 
    correct: boolean; 
    points?: number; 
    message: string 
  } {
    const artwork = MuseumService.getArtworkById(artworkId);
    if (!artwork?.treasureHunt) {
      return { correct: false, message: 'Énigme introuvable' };
    }

    const correctAnswer = artwork.treasureHunt.answer.toLowerCase();
    const userAnswer = answer.toLowerCase().trim();

    if (correctAnswer === userAnswer) {
      return {
        correct: true,
        points: artwork.treasureHunt.points,
        message: `Bonne réponse! Vous gagnez ${artwork.treasureHunt.points} points.`
      };
    } else {
      return {
        correct: false,
        message: 'Réponse incorrecte. Essayez encore!'
      };
    }
  }
}

// Service pour la billetterie
export class TicketingService {
  // Calculer le prix total
  static calculateTotalPrice(tickets: { [key: string]: number }): number {
    let total = 0;
    Object.entries(tickets).forEach(([ticketId, quantity]) => {
      const ticketType = TICKET_TYPES.find(t => t.id === ticketId);
      if (ticketType) {
        total += ticketType.price * quantity;
      }
    });
    return total;
  }

  // Simuler l'achat d'un billet
  static async purchaseTickets(
    tickets: { [key: string]: number },
    selectedDate: Date,
    timeSlot: string
  ): Promise<{ success: boolean; ticketId?: string; message: string }> {
    try {
      // Validation
      if (Object.values(tickets).every(qty => qty === 0)) {
        return { success: false, message: 'Veuillez sélectionner au moins un billet' };
      }

      // Générer un ID de billet
      const ticketId = `TICKET_${Date.now()}`;
      
      // Simuler l'achat
      await new Promise(resolve => setTimeout(resolve, 2000));

      return {
        success: true,
        ticketId,
        message: 'Billet acheté avec succès!'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de l\'achat du billet'
      };
    }
  }

  // Générer un QR code pour le billet
  static generateTicketQR(ticketId: string): string {
    return `MCN_TICKET_${ticketId}`;
  }
}

// Service pour les fonctionnalités audio
export class AudioService {
  private static currentAudio: any = null;

  // Jouer un fichier audio
  static async playAudio(audioFile: string): Promise<void> {
    try {
      // En production, utiliser expo-av
      console.log('Playing audio:', audioFile);
      // const { sound } = await Audio.Sound.createAsync({ uri: audioFile });
      // await sound.playAsync();
      // this.currentAudio = sound;
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  }

  // Arrêter l'audio
  static async stopAudio(): Promise<void> {
    try {
      if (this.currentAudio) {
        // await this.currentAudio.stopAsync();
        // await this.currentAudio.unloadAsync();
        this.currentAudio = null;
      }
    } catch (error) {
      console.error('Error stopping audio:', error);
    }
  }

  // Mettre en pause l'audio
  static async pauseAudio(): Promise<void> {
    try {
      if (this.currentAudio) {
        // await this.currentAudio.pauseAsync();
      }
    } catch (error) {
      console.error('Error pausing audio:', error);
    }
  }
}

// Service pour le partage social
export class SocialService {
  // Partager une œuvre
  static async shareArtwork(artwork: Artwork, language: 'fr' | 'en' | 'wo' = 'fr'): Promise<void> {
    try {
      const message = `Découvrez "${artwork.title[language]}" de ${artwork.artist} au Musée des Civilisations Noires! #MCN2025 #CultureAfricaine`;
      
      // En production, utiliser expo-sharing
      console.log('Sharing artwork:', message);
      // await Sharing.shareAsync(artwork.imageUrl, {
      //   dialogTitle: 'Partager cette œuvre',
      //   mimeType: 'image/jpeg'
      // });
    } catch (error) {
      console.error('Error sharing artwork:', error);
    }
  }

  // Générer un récapitulatif de visite
  static generateVisitSummary(visitData: any): string {
    const { artworksViewed, timeSpent, huntsCompleted, badges } = visitData;
    
    return `
🏛️ Ma visite au Musée des Civilisations Noires

📊 Statistiques:
• ${artworksViewed} œuvres découvertes
• ${Math.round(timeSpent / 60)} minutes passées
• ${huntsCompleted} chasses au trésor complétées
• ${badges.length} badges gagnés

#MCN2025 #PatrimoineAfricain #MuseeDigital
    `.trim();
  }
}