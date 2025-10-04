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
  FlatList,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme';
import { MUSEUM_ARTWORKS } from '../constants/data';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.42;
const CARD_HEIGHT = height * 0.35;

interface SearchScreenProps {
  navigation: any;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(MUSEUM_ARTWORKS);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollX = useRef(new Animated.Value(0)).current;

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
          artwork.period.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };

  const renderArtworkCard = ({ item, index }: { item: any; index: number }) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.6],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[
          styles.artworkCardContainer,
          {
            transform: [{ scale }],
            opacity,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.artworkCard}
          onPress={() => navigation.navigate('ArtworkDetail', { artworkId: item.id })}
          activeOpacity={0.9}
        >
          <ImageBackground
            source={{ uri: item.imageUrl }}
            style={styles.artworkImage}
            imageStyle={styles.artworkImageStyle}
          >
            <View style={styles.artworkOverlay}>
              <View style={styles.artworkInfo}>
                <Text style={styles.artworkPeriod} numberOfLines={1}>
                  {item.period}
                </Text>
                <Text style={styles.artworkArtist} numberOfLines={1}>
                  {item.artist}
                </Text>
                <Text style={styles.artworkTitle} numberOfLines={2}>
                  {item.title.fr}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </Animated.View>
    );
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
          <Ionicons name="chevron-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Searching</Text>
        
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
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
            placeholder="Rechercher une œuvre..."
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

      {/* Horizontal Scrolling Artwork List */}
      <Animated.View style={[styles.carouselContainer, { opacity: fadeAnim }]}>
        <Animated.FlatList
          data={searchResults}
          renderItem={renderArtworkCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          decelerationRate="fast"
          contentContainerStyle={styles.carouselContent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        />
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
    paddingTop: 60,
    paddingBottom: Spacing.md,
  },
  backButton: {
    padding: Spacing.sm,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  filterButton: {
    padding: Spacing.sm,
  },
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
  },
  carouselContainer: {
    flex: 1,
  },
  carouselContent: {
    paddingHorizontal: (width - CARD_WIDTH) / 2,
    paddingTop: Spacing.xl,
  },
  artworkCardContainer: {
    width: CARD_WIDTH,
    paddingHorizontal: 8,
  },
  artworkCard: {
    width: '100%',
    height: CARD_HEIGHT,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  artworkImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  artworkImageStyle: {
    borderRadius: BorderRadius.xl,
  },
  artworkOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    padding: Spacing.md,
  },
  artworkInfo: {
    gap: 4,
  },
  artworkPeriod: {
    fontSize: 11,
    color: Colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  artworkArtist: {
    fontSize: 13,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  artworkTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    lineHeight: 22,
  },
});

export default SearchScreen;
