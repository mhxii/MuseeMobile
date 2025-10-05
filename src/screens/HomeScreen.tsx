import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, ImageBackground, Dimensions, Modal, Alert, Animated } from 'react-native';
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
  const [showMenu, setShowMenu] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width * 0.7)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const featuredArtworks = MUSEUM_ARTWORKS.slice(0, 5); // 5 premières pour Collection Vedettes
  const upcomingArtworks = MUSEUM_ARTWORKS.slice(5, 10); // 5 suivantes pour Collection à venir

  useEffect(() => {
    if (showMenu) {
      // Slide in from left
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Slide out to left
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -width * 0.7,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showMenu]);

  const handleMenuPress = () => {
    setShowMenu(true);
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const menuItems = [
    { icon: 'grid-outline', label: 'Collections', route: 'Collections' },
    { icon: 'search-outline', label: 'Recherche', route: 'Search' },
    { icon: 'trophy-outline', label: 'Chasse au trésor', route: 'TreasureHunt' },
    { icon: 'ticket-outline', label: 'Billetterie', route: 'Tickets' },
    { icon: 'settings-outline', label: 'Paramètres', action: 'settings' },
    { icon: 'information-circle-outline', label: 'À propos', action: 'about' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={Colors.background} />
      
      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
            <View style={styles.menuIcon}>
              <View style={styles.menuLine} />
              <View style={styles.menuLine} />
              <View style={styles.menuLine} />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
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
          <TouchableOpacity onPress={() => navigation.navigate('Collections', { type: 'featured' })}>
            <View style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Voir Tout</Text>
              <Ionicons name="arrow-forward" size={16} color={Colors.primary} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Horizontal Artwork Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollContent}
          style={styles.horizontalScroll}
        >
          {featuredArtworks.map((artwork, index) => (
            <TouchableOpacity
              key={artwork.id}
              style={styles.artworkCardHorizontal}
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
        </ScrollView>

        {/* Upcoming Collection Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Collection à venir</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Collections', { type: 'upcoming' })}>
            <View style={styles.seeAllButtonUpcoming}>
              <Text style={styles.seeAllTextUpcoming}>Voir Tout</Text>
              <Ionicons name="arrow-forward" size={16} color={Colors.white} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Horizontal Upcoming Artwork Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollContent}
          style={styles.horizontalScroll}
        >
          {upcomingArtworks.map((artwork, index) => (
            <TouchableOpacity
              key={artwork.id}
              style={styles.artworkCardHorizontal}
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
        </ScrollView>

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
          onPress={() => navigation.navigate('Favorites')}
        >
          <Ionicons name="heart-outline" size={24} color={Colors.text.secondary} />
                    <Text style={styles.navLabel}>Favori</Text>
        </TouchableOpacity>
      </View>

      {/* Side Menu Modal */}
      <Modal
        visible={showMenu}
        animationType="none"
        transparent={true}
        onRequestClose={() => setShowMenu(false)}
      >
        <View style={styles.menuOverlay}>
          <Animated.View 
            style={[
              styles.menuContainer,
              {
                transform: [{ translateX: slideAnim }],
              }
            ]}
          >
            <View style={styles.menuHeader}>
              <View style={styles.menuProfileSection}>
                <View style={styles.menuProfileAvatar}>
                  <Ionicons name="person" size={32} color={Colors.background} />
                </View>
                <View style={styles.menuProfileInfo}>
                  <Text style={styles.menuProfileName}>Utilisateur</Text>
                  <Text style={styles.menuProfileEmail}>visiteur@musee.sn</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.menuCloseButton}
                onPress={() => setShowMenu(false)}
              >
                <Ionicons name="close" size={28} color={Colors.text.primary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.menuContent} showsVerticalScrollIndicator={false}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={() => {
                    setShowMenu(false);
                    if (item.route) {
                      navigation.navigate(item.route);
                    } else if (item.action === 'settings') {
                      Alert.alert('Paramètres', 'Fonctionnalité en développement');
                    } else if (item.action === 'about') {
                      Alert.alert(
                        'À propos',
                        'Musée des Civilisations Noires\nVersion 1.0.0\n\nDakar, Sénégal'
                      );
                    }
                  }}
                >
                  <View style={styles.menuItemIcon}>
                    <Ionicons name={item.icon as any} size={24} color={Colors.primary} />
                  </View>
                  <Text style={styles.menuItemText}>{item.label}</Text>
                  <Ionicons name="chevron-forward" size={20} color={Colors.text.tertiary} />
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.menuFooter}>
              <Text style={styles.menuFooterText}>
                © 2025 Musée des Civilisations Noires
              </Text>
            </View>
          </Animated.View>
          <Animated.View 
            style={[
              styles.menuBackdrop,
              {
                opacity: fadeAnim,
              }
            ]}
          >
            <TouchableOpacity 
              style={{ flex: 1 }} 
              activeOpacity={1}
              onPress={() => setShowMenu(false)}
            />
          </Animated.View>
        </View>
      </Modal>
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
    marginTop: Spacing.md,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text.primary,
    fontFamily: 'serif',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(200, 168, 130, 0.15)',
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  seeAllButtonUpcoming: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: Colors.primary,
  },
  seeAllTextUpcoming: {
    fontSize: 14,
    color: Colors.background,
    fontWeight: '600',
  },
  horizontalScroll: {
    marginBottom: Spacing.xl,
  },
  horizontalScrollContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  artworksList: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.lg,
  },
  artworkCardHorizontal: {
    width: width * 0.75,
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: Spacing.md,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
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
  // Menu styles
  menuOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  menuBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    width: width * 0.7,
    backgroundColor: Colors.background,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: 50,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surface,
  },
  menuProfileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuProfileAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  menuProfileInfo: {
    flex: 1,
  },
  menuProfileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  menuProfileEmail: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  menuCloseButton: {
    padding: Spacing.xs,
  },
  menuContent: {
    flex: 1,
    paddingTop: Spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surface,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(200, 168, 130, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
    fontWeight: '500',
  },
  menuFooter: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.surface,
    alignItems: 'center',
  },
  menuFooterText: {
    fontSize: 12,
    color: Colors.text.tertiary,
  },
});

export default HomeScreen;
