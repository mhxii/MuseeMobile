import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme';
import { MUSEUM_ARTWORKS } from '../constants/data';

const { width } = Dimensions.get('window');

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const featuredArtworks = MUSEUM_ARTWORKS.filter(artwork => artwork.isHighlight);

  const handleScanPress = () => {
    navigation.navigate('Scanner');
  };

  const handleExplorePress = () => {
    navigation.navigate('Collections');
  };

  const handleHuntPress = () => {
    navigation.navigate('Hunt');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header simple avec couleur africaine */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Bienvenue au</Text>
          <Text style={styles.headerSubtitle}>
            Musée des{'\n'}Civilisations Noires
          </Text>
          <Text style={styles.headerDescription}>
            Découvrez notre riche patrimoine africain
          </Text>
        </View>
      </View>

      {/* Actions rapides */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.primaryAction]}
          onPress={handleScanPress}
          activeOpacity={0.8}
        >
          <View style={styles.actionContent}>
            <Ionicons name="qr-code-outline" size={32} color={Colors.white} />
            <Text style={styles.actionText}>Scanner une œuvre</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.secondaryActions}>
          <TouchableOpacity
            style={styles.secondaryAction}
            onPress={handleExplorePress}
            activeOpacity={0.8}
          >
            <Ionicons name="library-outline" size={24} color={Colors.primary} />
            <Text style={styles.secondaryActionText}>Explorer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryAction}
            onPress={handleHuntPress}
            activeOpacity={0.8}
          >
            <Ionicons name="trophy-outline" size={24} color={Colors.primary} />
            <Text style={styles.secondaryActionText}>Chasse au trésor</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Collection vedettes */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Collection Vedettes</Text>
          <TouchableOpacity onPress={handleExplorePress}>
            <Text style={styles.seeAllText}>Voir tout</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.featuredScroll}
          contentContainerStyle={styles.featuredContent}
        >
          {featuredArtworks.map((artwork) => (
            <TouchableOpacity
              key={artwork.id}
              style={styles.artworkCard}
              onPress={() => navigation.navigate('ArtworkDetail', { artworkId: artwork.id })}
              activeOpacity={0.9}
            >
              <View style={styles.artworkImageContainer}>
                <View style={styles.placeholderImage}>
                  <Ionicons name="image-outline" size={48} color={Colors.gray.medium} />
                </View>
              </View>
              <View style={styles.artworkInfo}>
                <Text style={styles.artworkTitle} numberOfLines={2}>
                  {artwork.title.fr}
                </Text>
                <Text style={styles.artworkArtist} numberOfLines={1}>
                  {artwork.artist}
                </Text>
                <View style={styles.artworkMeta}>
                  <Ionicons name="location-outline" size={12} color={Colors.gray.dark} />
                  <Text style={styles.artworkLocation}>{artwork.location}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Statistiques du musée */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Le Musée en Chiffres</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Œuvres</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Collections</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Langues</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Chasses</Text>
          </View>
        </View>
      </View>

      {/* Informations pratiques */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Informations Pratiques</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={20} color={Colors.primary} />
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Horaires</Text>
              <Text style={styles.infoSubtitle}>9h00 - 18h00 (Mar-Dim)</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={20} color={Colors.primary} />
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Adresse</Text>
              <Text style={styles.infoSubtitle}>Corniche Ouest, Dakar</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="call-outline" size={20} color={Colors.primary} />
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Contact</Text>
              <Text style={styles.infoSubtitle}>+221 33 123 45 67</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 60,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: Typography.sizes.lg,
    color: Colors.white,
    fontWeight: Typography.weights.medium,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: Typography.sizes.hero,
    color: Colors.white,
    fontWeight: Typography.weights.bold,
    textAlign: 'center',
    lineHeight: Typography.sizes.hero * 1.1,
    marginBottom: Spacing.md,
  },
  headerDescription: {
    fontSize: Typography.sizes.md,
    color: Colors.white,
    textAlign: 'center',
    opacity: 0.9,
  },
  quickActions: {
    paddingHorizontal: Spacing.lg,
    marginTop: -Spacing.lg,
    marginBottom: Spacing.xl,
  },
  actionButton: {
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
  },
  primaryAction: {
    backgroundColor: Colors.accent,
    height: 80,
  },
  actionContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  actionText: {
    fontSize: Typography.sizes.lg,
    color: Colors.white,
    fontWeight: Typography.weights.semiBold,
    marginLeft: Spacing.md,
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondaryAction: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    alignItems: 'center',
    marginHorizontal: Spacing.xs,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryActionText: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.primary,
    fontWeight: Typography.weights.medium,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.sizes.xl,
    color: Colors.text.primary,
    fontWeight: Typography.weights.bold,
  },
  seeAllText: {
    fontSize: Typography.sizes.md,
    color: Colors.primary,
    fontWeight: Typography.weights.medium,
  },
  featuredScroll: {
    paddingLeft: Spacing.lg,
  },
  featuredContent: {
    paddingRight: Spacing.lg,
  },
  artworkCard: {
    width: width * 0.7,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginRight: Spacing.md,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  artworkImageContainer: {
    height: 200,
    position: 'relative',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.gray.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artworkInfo: {
    padding: Spacing.md,
  },
  artworkTitle: {
    fontSize: Typography.sizes.lg,
    color: Colors.text.primary,
    fontWeight: Typography.weights.semiBold,
    marginBottom: Spacing.xs,
  },
  artworkArtist: {
    fontSize: Typography.sizes.md,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  artworkMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  artworkLocation: {
    fontSize: Typography.sizes.sm,
    color: Colors.gray.dark,
    marginLeft: Spacing.xs,
  },
  statsSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: Typography.sizes.title,
    color: Colors.primary,
    fontWeight: Typography.weights.bold,
  },
  statLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  infoSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  infoText: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  infoTitle: {
    fontSize: Typography.sizes.md,
    color: Colors.text.primary,
    fontWeight: Typography.weights.semiBold,
  },
  infoSubtitle: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
    marginTop: 2,
  },
});

export default HomeScreen;