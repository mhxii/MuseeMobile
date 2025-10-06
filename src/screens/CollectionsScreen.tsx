import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ImageBackground,
  Dimensions
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme';
import { MUSEUM_ARTWORKS } from '../constants/data';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - (Spacing.lg * 2) - 16) / 3; // 3 cartes par ligne avec espacement

interface CollectionsScreenProps {
  navigation?: any;
  route?: {
    params?: {
      type?: 'featured' | 'upcoming';
    };
  };
}

const CollectionsScreen: React.FC<CollectionsScreenProps> = ({ navigation, route }) => {
  // Grouper les œuvres par collection
  const groupByCollection = () => {
    const collections: { [key: string]: any[] } = {};
    
    MUSEUM_ARTWORKS.forEach(artwork => {
      const collectionName = artwork.collection;
      if (!collections[collectionName]) {
        collections[collectionName] = [];
      }
      collections[collectionName].push(artwork);
    });
    
    return collections;
  };

  const collectionGroups = groupByCollection();

  // Organiser en lignes de 3
  const organizeInRows = (artworks: any[]) => {
    const rows = [];
    for (let i = 0; i < artworks.length; i += 3) {
      rows.push(artworks.slice(i, i + 3));
    }
    return rows;
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
        
        <Text style={styles.headerTitle}>Collections</Text>
        
        <TouchableOpacity 
          style={styles.searchButton} 
          onPress={() => navigation.navigate('Search')}
        >
          <Ionicons name="search" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Collections avec leurs œuvres */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {Object.entries(collectionGroups).map(([collectionName, artworks]) => {
          const artworkRows = organizeInRows(artworks);
          
          return (
            <View key={collectionName} style={styles.collectionSection}>
              {/* Bannière de la collection */}
              <View style={styles.collectionHeader}>
                <View style={styles.collectionTitleContainer}>
                  <Text style={styles.collectionTitle}>{collectionName}</Text>
                  <Text style={styles.collectionCount}>{artworks.length} œuvres</Text>
                </View>
                <View style={styles.decorativeLine} />
              </View>

              {/* Grille des œuvres - 3 par ligne avec carte centrale décalée */}
              <View style={styles.gridContainer}>
                {artworkRows.map((row, rowIndex) => (
                  <View key={rowIndex} style={styles.row}>
                    {row.map((artwork, colIndex) => (
                      <TouchableOpacity
                        key={artwork.id}
                        style={[
                          styles.card,
                          // Décaler la carte du milieu vers le haut
                          colIndex === 1 && styles.middleCard
                        ]}
                        onPress={() => navigation.navigate('ArtworkDetail', { artworkId: artwork.id })}
                        activeOpacity={0.8}
                      >
                        <ImageBackground
                          source={{ uri: artwork.imageUrl }}
                          style={styles.cardImage}
                          imageStyle={styles.cardImageStyle}
                        >
                          <View style={styles.cardOverlay}>
                            <View style={styles.cardBadge}>
                              <Text style={styles.badgeText}>{artwork.period}</Text>
                            </View>
                            <View style={styles.cardInfo}>
                              <Text style={styles.cardTitle} numberOfLines={2}>
                                {artwork.title.fr}
                              </Text>
                              <Text style={styles.cardArtist} numberOfLines={1}>
                                {artwork.artist}
                              </Text>
                            </View>
                          </View>
                        </ImageBackground>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
            </View>
          );
        })}
        
        <View style={styles.bottomSpace} />
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
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
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  collectionSection: {
    marginBottom: Spacing.xl,
  },
  collectionHeader: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.lg,
  },
  collectionTitleContainer: {
    marginBottom: Spacing.md,
  },
  collectionTitle: {
    fontSize: Typography.sizes.xxl,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
    fontFamily: 'serif',
    marginBottom: Spacing.xs,
  },
  collectionCount: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
    fontWeight: Typography.weights.medium,
  },
  decorativeLine: {
    height: 2,
    backgroundColor: Colors.primary,
    opacity: 0.3,
    borderRadius: 1,
  },
  gridContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xxl,
    gap: 12,
  },
  card: {
    width: CARD_WIDTH,
    height: 200,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  middleCard: {
    marginTop: -30,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  cardImage: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardImageStyle: {
    borderRadius: BorderRadius.xl,
  },
  cardOverlay: {
    flex: 1,
    justifyContent: 'space-between',
    padding: Spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  cardBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.md,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  badgeText: {
    fontSize: 8,
    color: Colors.background,
    fontWeight: Typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  cardInfo: {
    gap: 4,
  },
  cardTitle: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
    fontFamily: 'serif',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    lineHeight: 18,
  },
  cardArtist: {
    fontSize: Typography.sizes.xs,
    color: Colors.white,
    opacity: 0.95,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  bottomSpace: {
    height: 100,
  },
});

export default CollectionsScreen;