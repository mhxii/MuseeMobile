import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../constants/theme';
import { MUSEUM_ARTWORKS } from '../constants/data';

const { width } = Dimensions.get('window');

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
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Récupération sécurisée de l'ID de l'œuvre
  const artworkId = route?.params?.artworkId || 'mask-ceremonial';
  const artwork = MUSEUM_ARTWORKS.find(art => art.id === artworkId) || MUSEUM_ARTWORKS[0];
  
  if (!artwork) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Œuvre non trouvée</Text>
      </View>
    );
  }

  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying);
    // Ici on jouerait l'audio
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    // Ici on partagerait l'œuvre
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: artwork.imageUrl }}
          style={styles.artworkImage}
        />
        <View style={styles.imageOverlay}>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleToggleFavorite}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? Colors.error : Colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleShare}
          >
            <Ionicons name="share-outline" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{artwork.title.fr}</Text>
        <Text style={styles.artist}>{artwork.artist}</Text>
        <Text style={styles.period}>{artwork.period}</Text>
        
        <View style={styles.audioSection}>
          <TouchableOpacity
            style={styles.audioButton}
            onPress={handlePlayAudio}
          >
            <Ionicons
              name={isPlaying ? 'pause-circle' : 'play-circle'}
              size={48}
              color={Colors.primary}
            />
            <Text style={styles.audioText}>
              {isPlaying ? 'Pause audio-guide' : 'Écouter audio-guide'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Ionicons name="library-outline" size={20} color={Colors.text.secondary} />
            <Text style={styles.infoLabel}>Collection:</Text>
            <Text style={styles.infoValue}>{artwork.collection}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color={Colors.text.secondary} />
            <Text style={styles.infoLabel}>Localisation:</Text>
            <Text style={styles.infoValue}>{artwork.location}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="resize-outline" size={20} color={Colors.text.secondary} />
            <Text style={styles.infoLabel}>Dimensions:</Text>
            <Text style={styles.infoValue}>{artwork.dimensions}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="build-outline" size={20} color={Colors.text.secondary} />
            <Text style={styles.infoLabel}>Matériaux:</Text>
            <Text style={styles.infoValue}>{artwork.materials}</Text>
          </View>
        </View>
        
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{artwork.description.fr}</Text>
        </View>
        
        {artwork.treasureHunt && (
          <View style={styles.huntSection}>
            <Text style={styles.sectionTitle}>Chasse au trésor</Text>
            <View style={styles.riddleCard}>
              <Text style={styles.riddleText}>{artwork.treasureHunt.riddle.fr}</Text>
              <Text style={styles.pointsText}>{artwork.treasureHunt.points} points</Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
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
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  artworkImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: Spacing.lg,
  },
  title: {
    fontSize: Typography.sizes.title,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  artist: {
    fontSize: Typography.sizes.lg,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  period: {
    fontSize: Typography.sizes.md,
    color: Colors.text.secondary,
    marginBottom: Spacing.lg,
  },
  audioSection: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: 25,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  audioText: {
    fontSize: Typography.sizes.md,
    color: Colors.primary,
    fontWeight: Typography.weights.semiBold,
    marginLeft: Spacing.sm,
  },
  infoSection: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  infoLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
    marginLeft: Spacing.sm,
    marginRight: Spacing.sm,
    fontWeight: Typography.weights.medium,
  },
  infoValue: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.primary,
    flex: 1,
  },
  descriptionSection: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semiBold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: Typography.sizes.md,
    color: Colors.text.secondary,
    lineHeight: Typography.sizes.md * 1.5,
  },
  huntSection: {
    marginBottom: Spacing.lg,
  },
  riddleCard: {
    backgroundColor: Colors.accent,
    borderRadius: 12,
    padding: Spacing.lg,
  },
  riddleText: {
    fontSize: Typography.sizes.md,
    color: Colors.white,
    fontStyle: 'italic',
    marginBottom: Spacing.sm,
  },
  pointsText: {
    fontSize: Typography.sizes.sm,
    color: Colors.white,
    fontWeight: Typography.weights.semiBold,
    textAlign: 'right',
  },
});

export default ArtworkDetailScreen;