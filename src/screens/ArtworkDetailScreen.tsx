import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
  PanResponder,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme';
import { MUSEUM_ARTWORKS } from '../constants/data';

const { width, height } = Dimensions.get('window');

interface ArtworkDetailScreenProps {
  navigation?: any;
  route?: {
    params?: {
      artworkId?: string;
    };
  };
}

const ArtworkDetailScreen: React.FC<ArtworkDetailScreenProps> = ({ navigation, route }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<'fr' | 'en' | 'wo'>('fr');
  const cardPosition = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(1)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;
  
  // Configuration des limites de déplacement
  const CARD_FULL_HEIGHT = height * 0.8; // Hauteur maximale de la carte (80%)
  const MIN_VISIBLE_HEIGHT = 80; // Hauteur minimale visible (juste titre + bouton audio)
  const MAX_CARD_POSITION = CARD_FULL_HEIGHT - MIN_VISIBLE_HEIGHT; // Distance maximale de déplacement
  
  // Récupération sécurisée de l'ID de l'œuvre
  const artworkId = route?.params?.artworkId || '1';
  const artwork = MUSEUM_ARTWORKS.find(art => art.id === artworkId) || MUSEUM_ARTWORKS[0];
  
  // Trouver les autres œuvres de la même collection
  const relatedArtworks = MUSEUM_ARTWORKS.filter(
    art => art.collection === artwork.collection && art.id !== artwork.id
  );
  
  if (!artwork) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Œuvre non trouvée</Text>
      </View>
    );
  }

  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying);
  };

  // Pan Responder pour déplacer la carte avec le doigt
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Activer le pan si déplacement vertical significatif
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {
        // Sauvegarder la position actuelle
        (cardPosition as any).setOffset((cardPosition as any)._value);
        cardPosition.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        // Permettre le déplacement dans les deux sens avec limites
        const newValue = gestureState.dy;
        
        // Limiter le déplacement entre 0 et MAX_CARD_POSITION
        if (newValue >= 0 && newValue <= MAX_CARD_POSITION) {
          cardPosition.setValue(newValue);
          
          // Ajuster l'opacité du gradient en fonction de la position
          const opacity = 1 - (newValue / MAX_CARD_POSITION);
          overlayOpacity.setValue(opacity);
        } else if (newValue < 0) {
          // Permettre un petit dépassement vers le haut avec résistance
          cardPosition.setValue(newValue * 0.3);
          overlayOpacity.setValue(1);
        } else if (newValue > MAX_CARD_POSITION) {
          // Permettre un petit dépassement vers le bas avec résistance
          const excess = newValue - MAX_CARD_POSITION;
          cardPosition.setValue(MAX_CARD_POSITION + excess * 0.3);
          overlayOpacity.setValue(0);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        (cardPosition as any).flattenOffset();
        
        const currentPosition = (cardPosition as any)._value;
        const velocity = gestureState.vy;
        
        // Si la vitesse est faible, garder la position actuelle
        if (Math.abs(velocity) < 0.5) {
          // Vitesse faible: maintenir la position où l'utilisateur a relâché
          let finalPosition = currentPosition;
          
          // S'assurer que la position est dans les limites
          if (finalPosition < 0) {
            finalPosition = 0;
          } else if (finalPosition > MAX_CARD_POSITION) {
            finalPosition = MAX_CARD_POSITION;
          }
          
          const finalOpacity = 1 - (finalPosition / MAX_CARD_POSITION);
          const shouldBeVisible = finalPosition < MAX_CARD_POSITION / 2;
          
          Animated.parallel([
            Animated.spring(cardPosition, {
              toValue: finalPosition,
              useNativeDriver: true,
              tension: 50,
              friction: 8,
            }),
            Animated.timing(overlayOpacity, {
              toValue: finalOpacity,
              duration: 200,
              useNativeDriver: true,
            })
          ]).start();
          
          setIsCardVisible(shouldBeVisible);
        } else {
          // Vitesse élevée: snap vers le haut ou le bas
          let toValue = 0;
          let opacityValue = 1;
          let shouldBeVisible = true;
          
          if (velocity > 0.5) {
            // Swipe rapide vers le bas: cacher complètement
            toValue = MAX_CARD_POSITION;
            opacityValue = 0;
            shouldBeVisible = false;
          } else if (velocity < -0.5) {
            // Swipe rapide vers le haut: montrer complètement
            toValue = 0;
            opacityValue = 1;
            shouldBeVisible = true;
          }
          
          Animated.parallel([
            Animated.spring(cardPosition, {
              toValue,
              useNativeDriver: true,
              tension: 50,
              friction: 8,
            }),
            Animated.timing(overlayOpacity, {
              toValue: opacityValue,
              duration: 300,
              useNativeDriver: true,
            })
          ]).start();
          
          setIsCardVisible(shouldBeVisible);
        }
      },
    })
  ).current;

  // Lancer automatiquement la rotation 360° au montage du composant
  React.useEffect(() => {
    const startRotation = () => {
      rotateValue.setValue(0);
      Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 8000, // 8 secondes pour une rotation complète lente
          useNativeDriver: true,
        })
      ).start();
    };
    
    startRotation();
  }, [artworkId]); // Relancer l'animation quand on change d'œuvre

  const toggleCardVisibility = () => {
    // Calculer la distance pour cacher la description et les œuvres liées
    // Garder visible: titre (50px) + meta (30px) + padding (40px) + espace = ~120px
    const collapsedHeight = height * 0.5 - 120; // Garde juste le titre et meta visibles
    const toValue = isCardVisible ? collapsedHeight : 0;
    const opacityValue = isCardVisible ? 0 : 1; // Cache le gradient quand la carte descend
    
    Animated.parallel([
      Animated.spring(cardPosition, {
        toValue,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }),
      Animated.timing(overlayOpacity, {
        toValue: opacityValue,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
    
    setIsCardVisible(!isCardVisible);
  };

  // Interpoler la rotation de 0 à 360 degrés
  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      
      <TouchableWithoutFeedback onPress={toggleCardVisibility}>
        <Animated.View
          style={[
            styles.backgroundImageContainer,
            { transform: [{ rotateY: rotateInterpolate }] }
          ]}
        >
          <ImageBackground
            source={{ uri: artwork.imageUrl }}
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            {/* Overlay gradient pour assombrir le bas - Animé */}
            <Animated.View 
              style={[
                styles.gradientOverlay,
                { opacity: overlayOpacity }
              ]} 
            />
          </ImageBackground>
        </Animated.View>
      </TouchableWithoutFeedback>

      {/* Header avec navigation - En dehors de la rotation */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('Search')}
          >
            <Ionicons name="search" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Carte d'information en bas - Animée et Draggable */}
      <Animated.View 
        style={[
          styles.bottomCard,
          {
            transform: [{ translateY: cardPosition }]
          }
        ]}
        {...panResponder.panHandlers}
      >
        {/* Handle visuel pour indiquer qu'on peut glisser */}
        <View style={styles.dragHandle}>
          <View style={styles.dragHandleBar} />
        </View>
        
        <ScrollView 
          style={styles.cardScrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.cardScrollContent}
        >
          <View style={styles.cardContent}>
            <Text style={styles.artworkTitle}>
              {selectedLanguage === 'fr' ? artwork.title.fr : selectedLanguage === 'en' ? artwork.title.en : artwork.title.wo}
            </Text>
            <Text style={styles.artworkMeta}>
              {artwork.period} • {artwork.location}
            </Text>
            
            {/* Onglets de langue */}
            <View style={styles.languageTabs}>
              <TouchableOpacity 
                style={[styles.languageTab, selectedLanguage === 'fr' && styles.languageTabActive]}
                onPress={() => setSelectedLanguage('fr')}
              >
                <Text style={[styles.languageTabText, selectedLanguage === 'fr' && styles.languageTabTextActive]}>
                  Français
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.languageTab, selectedLanguage === 'en' && styles.languageTabActive]}
                onPress={() => setSelectedLanguage('en')}
              >
                <Text style={[styles.languageTabText, selectedLanguage === 'en' && styles.languageTabTextActive]}>
                  English
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.languageTab, selectedLanguage === 'wo' && styles.languageTabActive]}
                onPress={() => setSelectedLanguage('wo')}
              >
                <Text style={[styles.languageTabText, selectedLanguage === 'wo' && styles.languageTabTextActive]}>
                  Wolof
                </Text>
              </TouchableOpacity>
            </View>

            {/* Description dans la langue sélectionnée */}
            <View style={styles.descriptionSection}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>
                {selectedLanguage === 'fr' ? artwork.description.fr : selectedLanguage === 'en' ? artwork.description.en : artwork.description.wo}
              </Text>
            </View>

            {/* Informations culturelles et historiques */}
            <View style={styles.culturalSection}>
              <Text style={styles.sectionTitle}>Informations culturelles</Text>
              <View style={styles.infoRow}>
                <Ionicons name="calendar-outline" size={18} color={Colors.primary} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Période</Text>
                  <Text style={styles.infoValue}>{artwork.period}</Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="location-outline" size={18} color={Colors.primary} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Origine</Text>
                  <Text style={styles.infoValue}>{artwork.location}</Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="hammer-outline" size={18} color={Colors.primary} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Matériaux</Text>
                  <Text style={styles.infoValue}>{artwork.materials}</Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="resize-outline" size={18} color={Colors.primary} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Dimensions</Text>
                  <Text style={styles.infoValue}>{artwork.dimensions}</Text>
                </View>
              </View>
              {artwork.acquisitionYear && (
                <View style={styles.infoRow}>
                  <Ionicons name="download-outline" size={18} color={Colors.primary} />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Année d'acquisition</Text>
                    <Text style={styles.infoValue}>{artwork.acquisitionYear}</Text>
                  </View>
                </View>
              )}
            </View>

            {/* Section des œuvres de la collection */}
            {relatedArtworks.length > 0 && (
              <View style={styles.relatedSection}>
                <View style={styles.relatedHeader}>
                  <Text style={styles.relatedTitle}>
                    Autres œuvres de la collection
                  </Text>
                  <Text style={styles.collectionName}>{artwork.collection}</Text>
                </View>
                
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.relatedScrollContent}
                >
                  {relatedArtworks.map((relatedArt) => (
                    <TouchableOpacity
                      key={relatedArt.id}
                      style={styles.relatedCard}
                      onPress={() => navigation.push('ArtworkDetail', { artworkId: relatedArt.id })}
                      activeOpacity={0.8}
                    >
                      <ImageBackground
                        source={{ uri: relatedArt.imageUrl }}
                        style={styles.relatedImage}
                        imageStyle={styles.relatedImageStyle}
                      >
                        <View style={styles.relatedOverlay}>
                          <View style={styles.relatedBadge}>
                            <Text style={styles.relatedBadgeText}>{relatedArt.period}</Text>
                          </View>
                          <View style={styles.relatedInfo}>
                            <Text style={styles.relatedCardTitle} numberOfLines={2}>
                              {relatedArt.title.fr}
                            </Text>
                            <Text style={styles.relatedArtist} numberOfLines={1}>
                              {relatedArt.artist}
                            </Text>
                          </View>
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Bouton audio flottant */}
        <TouchableOpacity 
          style={styles.audioButton}
          onPress={handlePlayAudio}
        >
          <Ionicons 
            name={isPlaying ? "pause-circle" : "headset"} 
            size={32} 
            color={Colors.primary} 
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  errorText: {
    fontSize: Typography.sizes.lg,
    color: Colors.text.secondary,
  },
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
  backgroundImageContainer: {
    flex: 1,
    width: width,
    height: height,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: 50,
    paddingBottom: Spacing.md,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: '#333',
    fontFamily: 'serif',
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  headerRight: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(42, 42, 42, 0.95)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: Spacing.md,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
    maxHeight: height * 0.8, // 80% de la hauteur pour afficher tout le contenu
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  dragHandle: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  dragHandleBar: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(200, 168, 130, 0.4)',
    borderRadius: 2,
  },
  cardScrollView: {
    flex: 1,
  },
  cardScrollContent: {
    paddingBottom: Spacing.lg,
  },
  cardContent: {
    paddingRight: 60, // Space for audio button
  },
  artworkTitle: {
    fontSize: Typography.sizes.xxl,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
    marginBottom: Spacing.sm,
    fontFamily: 'serif',
    lineHeight: Typography.sizes.xxl * 1.2,
  },
  artworkMeta: {
    fontSize: Typography.sizes.md,
    color: Colors.text.secondary,
    marginBottom: Spacing.lg,
    fontWeight: Typography.weights.medium,
  },
  languageTabs: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
    backgroundColor: 'rgba(58, 58, 58, 0.6)',
    borderRadius: BorderRadius.md,
    padding: 4,
  },
  languageTab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
  },
  languageTabActive: {
    backgroundColor: Colors.primary,
  },
  languageTabText: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
    fontWeight: Typography.weights.medium,
  },
  languageTabTextActive: {
    color: Colors.background,
    fontWeight: Typography.weights.bold,
  },
  descriptionSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
    marginBottom: Spacing.md,
    fontFamily: 'serif',
  },
  description: {
    fontSize: Typography.sizes.md,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: Typography.sizes.md * 1.6,
    textAlign: 'justify',
  },
  culturalSection: {
    marginBottom: Spacing.xl,
    backgroundColor: 'rgba(58, 58, 58, 0.4)',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  infoContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  infoLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: Typography.sizes.md,
    color: Colors.white,
    fontWeight: Typography.weights.medium,
  },
  relatedSection: {
    marginTop: Spacing.xl,
    paddingTop: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: 'rgba(200, 168, 130, 0.2)',
  },
  relatedHeader: {
    marginBottom: Spacing.lg,
  },
  relatedTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
    marginBottom: Spacing.xs,
    fontFamily: 'serif',
  },
  collectionName: {
    fontSize: Typography.sizes.sm,
    color: Colors.primary,
    fontWeight: Typography.weights.medium,
  },
  relatedScrollContent: {
    paddingRight: Spacing.xl,
  },
  relatedCard: {
    width: 160,
    height: 220,
    marginRight: Spacing.md,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  relatedImage: {
    flex: 1,
    justifyContent: 'space-between',
  },
  relatedImageStyle: {
    borderRadius: BorderRadius.lg,
  },
  relatedOverlay: {
    flex: 1,
    justifyContent: 'space-between',
    padding: Spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  relatedBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  relatedBadgeText: {
    fontSize: 7,
    color: Colors.background,
    fontWeight: Typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  relatedInfo: {
    gap: 4,
  },
  relatedCardTitle: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
    fontFamily: 'serif',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    lineHeight: 16,
  },
  relatedArtist: {
    fontSize: Typography.sizes.xs,
    color: Colors.white,
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  audioButton: {
    position: 'absolute',
    right: Spacing.xl,
    top: Spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(60, 60, 60, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(200, 168, 130, 0.3)',
  },
});

export default ArtworkDetailScreen;
