import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, ImageBackground, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme';
import { MUSEUM_ARTWORKS } from '../constants/data';

const { width } = Dimensions.get('window');

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const featuredArtworks = MUSEUM_ARTWORKS.slice(0, 3);

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={Colors.background} />
      
      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton}>
            <View style={styles.menuIcon}>
              <View style={styles.menuLine} />
              <View style={styles.menuLine} />
              <View style={styles.menuLine} />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.profileAvatar}>
              <Ionicons name="person" size={18} color={Colors.background} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Bienvenue au</Text>
          <Text style={styles.museumTitle}>Musée des</Text>
          <Text style={styles.museumTitle}>
            Civilisations <Text style={styles.highlightText}>Noires</Text>
          </Text>
        </View>

        {/* Search Bar */}
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TouchableOpacity 
          style={styles.searchBar}
          onPress={() => navigation.navigate('Search')}
          activeOpacity={0.7}
        >
          {/* <Ionicons name="search" size={20} color={Colors.text.secondary} /> */}
          <Text style={styles.searchPlaceholder}>Search Sculpture ...</Text>
          <View style={styles.searchIconRight}>
            <Ionicons name="search-outline" size={20} color={Colors.text.primary} />
          </View>
        </TouchableOpacity>
      </View>        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.scanButton]}
            onPress={() => navigation.navigate('Scanner')}
          >
            <Ionicons name="qr-code-outline" size={22} color={Colors.white} />
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionLabel}>Commencer l'expérience</Text>
              <Text style={styles.actionTitle}>Scanner une oeuvre</Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color={Colors.white} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.tourButton]}
            onPress={() => navigation.navigate('Collections')}
          >
            <Ionicons name="cube-outline" size={22} color={Colors.background} />
            <View style={styles.actionTextContainer}>
              <Text style={[styles.actionLabel, { color: Colors.background, opacity: 0.7 }]}>Explorer chaque salle</Text>
              <Text style={[styles.actionTitle, { color: Colors.background }]}>Visite virtuelle</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Featured Collection Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Collection Vedettes</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Collections')}>
            <Text style={styles.seeAllText}>Voir Tout</Text>
          </TouchableOpacity>
        </View>

        {/* Artwork Cards */}
        <View style={styles.artworksList}>
          {featuredArtworks.map((artwork, index) => (
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

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color={Colors.primary} />
          <Text style={[styles.navLabel, styles.activeNavLabel]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.scanNavButton}
          onPress={() => navigation.navigate('Scanner')}
        >
          <View style={styles.scanNavIcon}>
            <Ionicons name="qr-code" size={32} color={Colors.black} />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons name="heart-outline" size={24} color={Colors.text.secondary} />
          <Text style={styles.navLabel}>Favori</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: 50,
    paddingBottom: Spacing.md,
  },
  menuButton: {
    padding: Spacing.sm,
  },
  menuIcon: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },
  menuLine: {
    width: '100%',
    height: 2.5,
    backgroundColor: Colors.text.primary,
    borderRadius: 2,
  },
  profileButton: {
    padding: Spacing.sm,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  welcomeSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  welcomeText: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  museumTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text.primary,
    lineHeight: 34,
    fontFamily: 'serif',
  },
  highlightText: {
    color: Colors.primary,
  },
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 14,
    gap: Spacing.sm,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 15,
    color: Colors.text.secondary,
  },
  searchIconRight: {
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 8,
  },
  actionButtons: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 14,
    borderRadius: 12,
    gap: Spacing.md,
  },
  scanButton: {
    backgroundColor: '#8B6F47',
  },
  tourButton: {
    backgroundColor: '#C8A882',
  },
  actionTextContainer: {
    flex: 1,
  },
  actionLabel: {
    fontSize: 11,
    color: Colors.white,
    opacity: 0.85,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.white,
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text.primary,
    fontFamily: 'serif',
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  artworksList: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.lg,
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
    height: 100,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.xl,
    paddingVertical: 18,
    paddingBottom: 18,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navLabel: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  activeNavLabel: {
    color: Colors.primary,
  },
  scanNavButton: {
    alignItems: 'center',
    marginTop: -40,
  },
  scanNavIcon: {
    backgroundColor: Colors.primary,
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 3,
    borderColor: Colors.background,
  },
});

export default HomeScreen;
