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
import { Colors, Spacing, Typography } from '../constants/theme';
import { MUSEUM_ARTWORKS } from '../constants/data';

const { width } = Dimensions.get('window');

interface CollectionsScreenProps {
  navigation: any;
}

const CollectionsScreen: React.FC<CollectionsScreenProps> = ({ navigation }) => {
  // Afficher toutes les œuvres (pas juste les 3 premières)
  const allArtworks = MUSEUM_ARTWORKS;

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={Colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color={Colors.text.primary} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Collection Vedettes</Text>
        
        <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>

      {/* Artworks List (même affichage que HomePage) */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.artworksList}>
          {allArtworks.map((artwork) => (
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
                <View style={styles.artworkOverlay}>
                  <View style={styles.artworkInfo}>
                    <Text style={styles.artworkCategory}>Peinture Contemporaine</Text>
                    <Text style={styles.artworkTitle}>{artwork.title.fr}</Text>
                    <Text style={styles.artworkArtist}>{artwork.artist}</Text>
                    <Text style={styles.artworkLocation}>{artwork.location}</Text>
                  </View>
                  
                  <TouchableOpacity style={styles.artworkButton}>
                    <Ionicons name="chevron-forward" size={20} color={Colors.white} />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </View>
        
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
    paddingBottom: Spacing.md,
  },
  backButton: {
    padding: Spacing.sm,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text.primary,
    fontFamily: 'serif',
  },
  searchButton: {
    padding: Spacing.sm,
  },
  content: {
    flex: 1,
  },
  artworksList: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  artworkCard: {
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  artworkImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  artworkImageStyle: {
    borderRadius: 20,
  },
  artworkOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  artworkInfo: {
    flex: 1,
  },
  artworkCategory: {
    fontSize: 10,
    color: Colors.text.secondary,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  artworkTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 4,
    fontFamily: 'serif',
  },
  artworkArtist: {
    fontSize: 13,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  artworkLocation: {
    fontSize: 11,
    color: Colors.text.tertiary,
  },
  artworkButton: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 25,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  bottomSpace: {
    height: 80,
  },
});

export default CollectionsScreen;