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
  const slideAnim = useRef(new Animated.Value(-width * 0.65)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const contentSlideAnim = useRef(new Animated.Value(0)).current; // Pour déplacer le contenu
  const contentScaleAnim = useRef(new Animated.Value(1)).current; // Pour rétrécir le contenu
  const featuredArtworks = MUSEUM_ARTWORKS.slice(0, 5); // 5 premières pour Collection Vedettes
  const upcomingArtworks = MUSEUM_ARTWORKS.slice(5, 10); // 5 suivantes pour Collection à venir

  useEffect(() => {
    if (showMenu) {
      // Slide in from left + déplacer et rétrécir le contenu
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
        Animated.timing(contentSlideAnim, {
          toValue: width * 0.65, // Déplacer vers la droite
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(contentScaleAnim, {
          toValue: 0.75, // Rétrécir à 75%
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Slide out to left + remettre le contenu en place
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -width * 0.65,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(contentSlideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(contentScaleAnim, {
          toValue: 1,
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
    { icon: 'settings-outline', label: 'Paramètre', action: 'settings' },
    { icon: 'ticket-outline', label: 'Billetterie', route: 'Tickets' },
    { icon: 'information-circle-outline', label: 'À propos', action: 'about' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#9B8B6E" />
      
      {/* Menu de fond - toujours visible */}
      <View style={styles.menuBackground}>
        {/* Menu Header avec icônes */}
        <View style={styles.menuHeader}>
          <TouchableOpacity style={styles.menuHeaderIcon}>
            <Ionicons name="person-circle-outline" size={48} color="rgba(0,0,0,0.4)" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuCloseButton}
            onPress={() => setShowMenu(false)}
          >
            <Ionicons name="close-circle-outline" size={48} color="rgba(0,0,0,0.4)" />
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContent}>
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
              <View style={styles.menuItemIconContainer}>
                <Ionicons name={item.icon as any} size={32} color="rgba(0,0,0,0.4)" />
              </View>
              <Text style={styles.menuItemText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Content Animé - carte qui se déplace au-dessus du menu */}
      <Animated.View 
        style={[
          styles.contentWrapper,
          {
            transform: [
              { translateX: contentSlideAnim },
              { scale: contentScaleAnim }
            ],
            borderRadius: showMenu ? 20 : 0,
            borderWidth: showMenu ? 2 : 0,
            borderColor: 'rgba(0, 0, 0, 0.2)',
          }
        ]}
      >
        <TouchableOpacity 
          style={{ flex: 1 }} 
          activeOpacity={1}
          onPress={() => showMenu && setShowMenu(false)}
          disabled={!showMenu}
        >
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
      </View>
      
      {/* Action Buttons */}
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
      </TouchableOpacity>
      </Animated.View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9B8B6E', // Couleur du menu de fond
  },
  menuBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#9B8B6E',
    zIndex: 1,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: 60,
    paddingBottom: Spacing.xl,
  },
  menuHeaderIcon: {
    width: 50,
    height: 50,
  },
  menuCloseButton: {
    width: 50,
    height: 50,
  },
  menuContent: {
    flex: 1,
    paddingTop: Spacing.xl * 2,
    paddingHorizontal: Spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    marginBottom: Spacing.md,
  },
  menuItemIconContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: Spacing.md,
  },
  menuItemText: {
    flex: 1,
    fontSize: 28,
    color: 'rgba(0, 0, 0, 0.7)',
    fontWeight: '400',
    fontFamily: 'serif',
  },
  contentWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.background,
    borderRadius: 0,
    overflow: 'hidden',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: -5,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
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
});

export default HomeScreen;
