import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme';
import { MUSEUM_ARTWORKS } from '../constants/data';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - (Spacing.lg * 2);

interface FavoritesScreenProps {
  navigation: any;
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ navigation }) => {
  // Simuler des favoris (dans une vraie app, ce serait depuis un état global ou AsyncStorage)
  const [favorites, setFavorites] = useState<string[]>([
    MUSEUM_ARTWORKS[0].id,
    MUSEUM_ARTWORKS[1].id,
    MUSEUM_ARTWORKS[4].id,
    MUSEUM_ARTWORKS[7].id,
    MUSEUM_ARTWORKS[9].id,
  ]);

  const favoriteArtworks = MUSEUM_ARTWORKS.filter(artwork => 
    favorites.includes(artwork.id)
  );

  const toggleFavorite = (artworkId: string) => {
    setFavorites(prev => 
      prev.includes(artworkId) 
        ? prev.filter(id => id !== artworkId)
        : [...prev, artworkId]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={Colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mes Favoris</Text>
        <View style={styles.placeholder} />
      </View>

      {favoriteArtworks.length === 0 ? (
        // État vide
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <Ionicons name="heart-outline" size={80} color={Colors.text.tertiary} />
          </View>
          <Text style={styles.emptyTitle}>Aucun favori</Text>
          <Text style={styles.emptySubtitle}>
            Explorez les collections et ajoutez vos œuvres préférées ici
          </Text>
          <TouchableOpacity 
            style={styles.exploreButton}
            onPress={() => navigation.navigate('Collections')}
          >
            <Text style={styles.exploreButtonText}>Explorer les collections</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Liste des favoris
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.statsContainer}>
            <Ionicons name="heart" size={20} color={Colors.primary} />
            <Text style={styles.statsText}>
              {favoriteArtworks.length} œuvre{favoriteArtworks.length > 1 ? 's' : ''} favorite{favoriteArtworks.length > 1 ? 's' : ''}
            </Text>
          </View>

          <View style={styles.artworksContainer}>
            {favoriteArtworks.map((artwork) => (
              <TouchableOpacity
                key={artwork.id}
                style={styles.artworkCard}
                onPress={() => navigation.navigate('ArtworkDetail', { artworkId: artwork.id })}
              >
                <ImageBackground
                  source={{ uri: artwork.imageUrl }}
                  style={styles.artworkImage}
                  imageStyle={styles.artworkImageStyle}
                >
                  <View style={styles.imageOverlay}>
                    <TouchableOpacity
                      style={styles.favoriteButton}
                      onPress={() => toggleFavorite(artwork.id)}
                    >
                      <Ionicons 
                        name="heart" 
                        size={24} 
                        color={Colors.primary}
                      />
                    </TouchableOpacity>
                  </View>
                </ImageBackground>

                <View style={styles.artworkInfo}>
                  <Text style={styles.artworkTitle} numberOfLines={2}>
                    {artwork.title.fr}
                  </Text>
                  <Text style={styles.artworkArtist} numberOfLines={1}>
                    {artwork.artist}
                  </Text>
                  <View style={styles.artworkMeta}>
                    <View style={styles.metaItem}>
                      <Ionicons name="calendar-outline" size={14} color={Colors.text.tertiary} />
                      <Text style={styles.metaText}>{artwork.period}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="location-outline" size={14} color={Colors.text.tertiary} />
                      <Text style={styles.metaText}>{artwork.location}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Bouton pour explorer plus */}
          <View style={styles.bottomSection}>
            <Text style={styles.bottomTitle}>Découvrez plus d'œuvres</Text>
            <TouchableOpacity 
              style={styles.seeAllButton}
              onPress={() => navigation.navigate('Collections')}
            >
              <Text style={styles.seeAllButtonText}>Voir toutes les collections</Text>
              <Ionicons name="arrow-forward" size={20} color={Colors.background} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: 50,
    paddingBottom: Spacing.lg,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surface,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
    fontFamily: 'serif',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.lg,
    gap: Spacing.sm,
  },
  statsText: {
    fontSize: Typography.sizes.md,
    color: Colors.text.secondary,
    fontWeight: Typography.weights.semiBold,
  },
  artworksContainer: {
    paddingHorizontal: Spacing.lg,
  },
  artworkCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.surface,
  },
  artworkImage: {
    width: '100%',
    height: 220,
  },
  artworkImageStyle: {
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg,
  },
  imageOverlay: {
    flex: 1,
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
  favoriteButton: {
    alignSelf: 'flex-end',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background + 'CC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  artworkInfo: {
    padding: Spacing.lg,
  },
  artworkTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
    fontFamily: 'serif',
  },
  artworkArtist: {
    fontSize: Typography.sizes.md,
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  artworkMeta: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.tertiary,
  },
  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  emptyIconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    borderWidth: 2,
    borderColor: Colors.primary + '30',
  },
  emptyTitle: {
    fontSize: Typography.sizes.xxl,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
    fontFamily: 'serif',
  },
  emptySubtitle: {
    fontSize: Typography.sizes.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 24,
  },
  exploreButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.round,
  },
  exploreButtonText: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semiBold,
    color: Colors.background,
  },
  // Bottom Section
  bottomSection: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
  bottomTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
    fontFamily: 'serif',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.round,
    gap: Spacing.sm,
  },
  seeAllButtonText: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semiBold,
    color: Colors.background,
  },
});

export default FavoritesScreen;
