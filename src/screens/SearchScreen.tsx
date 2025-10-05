import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Animated,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme';
import { MUSEUM_ARTWORKS } from '../constants/data';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - (Spacing.lg * 2);

interface SearchScreenProps {
  navigation: any;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(MUSEUM_ARTWORKS);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setSearchResults(MUSEUM_ARTWORKS);
    } else {
      const filtered = MUSEUM_ARTWORKS.filter(
        (artwork) =>
          artwork.title.fr.toLowerCase().includes(text.toLowerCase()) ||
          artwork.artist.toLowerCase().includes(text.toLowerCase()) ||
          artwork.period.toLowerCase().includes(text.toLowerCase()) ||
          artwork.collection.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={Colors.background} />
      
      {/* Header avec animation */}
      <Animated.View 
        style={[
          styles.header,
          { opacity: fadeAnim },
        ]}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Recherche</Text>
        
        <View style={styles.placeholder} />
      </Animated.View>

      {/* Search Bar avec animation */}
      <Animated.View 
        style={[
          styles.searchContainer,
          { opacity: fadeAnim },
        ]}
      >
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={Colors.text.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une œuvre, artiste..."
            placeholderTextColor={Colors.text.secondary}
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={20} color={Colors.text.secondary} />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>

      {/* Results Count */}
      {searchQuery.length > 0 && (
        <Animated.View style={[styles.resultsCount, { opacity: fadeAnim }]}>
          <Text style={styles.resultsCountText}>
            {searchResults.length} résultat{searchResults.length !== 1 ? 's' : ''} trouvé{searchResults.length !== 1 ? 's' : ''}
          </Text>
        </Animated.View>
      )}

      {/* Vertical Scrolling Artwork List */}
      <Animated.View style={[styles.resultsContainer, { opacity: fadeAnim }]}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.resultsContent}
        >
          {searchResults.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIconContainer}>
                <Ionicons name="search-outline" size={60} color={Colors.text.tertiary} />
              </View>
              <Text style={styles.emptyTitle}>Aucun résultat</Text>
              <Text style={styles.emptySubtitle}>
                Essayez avec d'autres mots-clés
              </Text>
            </View>
          ) : (
            searchResults.map((artwork, index) => (
              <TouchableOpacity
                key={artwork.id}
                style={styles.artworkCard}
                onPress={() => navigation.navigate('ArtworkDetail', { artworkId: artwork.id })}
                activeOpacity={0.9}
              >
                <ImageBackground
                  source={{ uri: artwork.imageUrl }}
                  style={styles.artworkImage}
                  imageStyle={styles.artworkImageStyle}
                >
                  <View style={styles.imageOverlay}>
                    <View style={styles.artworkBadge}>
                      <Text style={styles.badgeText}>{artwork.collection}</Text>
                    </View>
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
            ))
          )}
        </ScrollView>
      </Animated.View>
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
  placeholder: {
    width: 40,
  },
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.sizes.md,
    color: Colors.text.primary,
  },
  resultsCount: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  resultsCountText: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
    fontWeight: Typography.weights.semiBold,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.xxl * 2,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    borderWidth: 2,
    borderColor: Colors.primary + '30',
  },
  emptyTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
    fontFamily: 'serif',
  },
  emptySubtitle: {
    fontSize: Typography.sizes.md,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  // Artwork Cards
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
    height: 200,
  },
  artworkImageStyle: {
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg,
  },
  imageOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: Spacing.md,
  },
  artworkBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary + 'DD',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  badgeText: {
    fontSize: Typography.sizes.xs,
    color: Colors.background,
    fontWeight: Typography.weights.bold,
    textTransform: 'uppercase',
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
});

export default SearchScreen;
