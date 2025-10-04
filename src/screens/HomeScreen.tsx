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
            <Ionicons name="menu" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.profileAvatar}>
              <Ionicons name="person" size={20} color={Colors.black} />
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
          <Ionicons name="search" size={20} color={Colors.text.secondary} />
          <Text style={styles.searchInput}>Rechercher une œuvre...</Text>
        </TouchableOpacity>
      </View>        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.scanButton]}
            onPress={() => navigation.navigate('Scanner')}
          >
            <Ionicons name="qr-code" size={20} color={Colors.white} />
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionLabel}>Commencer l'expérience</Text>
              <Text style={styles.actionTitle}>Scanner une œuvre</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.white} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.tourButton]}
            onPress={() => navigation.navigate('Collections')}
          >
            <Ionicons name="eye-outline" size={20} color={Colors.white} />
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionLabel}>Explorer chaque salle</Text>
              <Text style={styles.actionTitle}>Visite virtuelle</Text>
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
    paddingTop: 60,
    paddingBottom: Spacing.lg,
  },
  menuButton: {
    padding: Spacing.sm,
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
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.secondary,
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
    fontSize: 12,
    color: Colors.white,
    opacity: 0.8,
  },
  actionTitle: {
    fontSize: 16,
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
    height: 200,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
  },
  artworkImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  artworkImageStyle: {
    borderRadius: BorderRadius.xl,
  },
  artworkOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: Spacing.lg,
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
  },
  artworkTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 4,
  },
  artworkArtist: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  artworkLocation: {
    fontSize: 12,
    color: Colors.text.tertiary,
  },
  artworkButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.sm,
    borderRadius: 20,
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
    paddingVertical: Spacing.lg,
    paddingBottom: Spacing.lg,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.primary,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
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
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
});

export default HomeScreen;
