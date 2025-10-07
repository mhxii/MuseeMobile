import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../constants/theme';

const { width, height } = Dimensions.get('window');

interface HistoryScreenProps {
  navigation: {
    goBack: () => void;
    navigate: (screen: string) => void;
  };
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: '1960',
    title: 'Fondation du musée',
    description: "Création du Musée Dynamique sous l'impulsion du président Léopold Sédar Senghor, premier musée d'art contemporain en Afrique subsaharienne.",
  },
  {
    year: '2006',
    title: 'Projet de transformation',
    description: "Lancement du projet de rénovation et d'agrandissement du musée pour en faire un pôle culturel majeur.",
  },
  {
    year: '2018',
    title: 'Inauguration',
    description: "Ouverture officielle du Musée des Civilisations Noires, symbole de la renaissance culturelle africaine.",
  },
  {
    year: '2020-2025',
    title: 'Rayonnement international',
    description: "Développement de partenariats internationaux et enrichissement continu des collections.",
  },
];

const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header avec image de fond */}
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80',
        }}
        style={styles.headerImage}
        imageStyle={styles.headerImageStyle}
      >
        <View style={styles.headerOverlay}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.white} />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Historique</Text>
        </View>
        
        {/* Effet de fondu en bas de l'image */}
        <View style={styles.fadeOverlay} />
      </ImageBackground>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Section Chronologie */}
        <View style={styles.timelineSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="calendar-outline" size={28} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Chronologie</Text>
          </View>

          {/* Timeline */}
          <View style={styles.timeline}>
            {timelineEvents.map((event, index) => (
              <View key={index} style={styles.timelineItem}>
                {/* Timeline dot and line */}
                <View style={styles.timelineLeft}>
                  <View style={styles.timelineDot} />
                  {index < timelineEvents.length - 1 && (
                    <View style={styles.timelineLine} />
                  )}
                </View>

                {/* Event content */}
                <View style={styles.timelineContent}>
                  <View style={styles.eventCard}>
                    <Text style={styles.eventYear}>{event.year}</Text>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventDescription}>
                      {event.description}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Citation */}
        <View style={styles.quoteSection}>
          <Ionicons name="chatbox-ellipses-outline" size={32} color={Colors.primary} style={styles.quoteIcon} />
          <Text style={styles.quoteText}>
            "La culture est au début et à la fin du développement"
          </Text>
          <Text style={styles.quoteAuthor}>— Léopold Sédar Senghor</Text>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="home-outline" size={24} color={Colors.text.secondary} />
          <Text style={styles.navLabel}>Accueil</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.scanNavButton}
          onPress={() => navigation.navigate('Scanner')}
        >
          <View style={styles.scanNavIcon}>
            <Ionicons name="scan-outline" size={32} color={Colors.black} />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="time" size={24} color={Colors.primary} />
          <Text style={[styles.navLabel, styles.activeNavLabel]}>Historique</Text>
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
  headerImage: {
    width: '100%',
    height: height * 0.35,
  },
  headerImageStyle: {
    resizeMode: 'cover',
  },
  headerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  fadeOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    // Créer un effet de fondu avec des couches semi-transparentes
    shadowColor: Colors.background,
    shadowOffset: { width: 0, height: -20 },
    shadowOpacity: 1,
    shadowRadius: 30,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  headerTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: Colors.white,
    fontFamily: 'serif',
    textAlign: 'center',
    letterSpacing: 1,
    textTransform: 'capitalize',
  },
  content: {
    flex: 1,
    marginTop: -30, // Pour créer un chevauchement avec l'image
  },
  timelineSection: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
    fontFamily: 'serif',
  },
  timeline: {
    paddingLeft: Spacing.md,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: Spacing.xl,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: Spacing.lg,
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    borderWidth: 3,
    borderColor: Colors.background,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: 'rgba(200, 168, 130, 0.3)',
    minHeight: 100,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: Spacing.md,
  },
  eventCard: {
    backgroundColor: 'rgba(58, 58, 58, 0.05)',
    borderRadius: 16,
    padding: Spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventYear: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Spacing.xs,
    letterSpacing: 1,
  },
  eventTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
    fontFamily: 'serif',
  },
  eventDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  quoteSection: {
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.xl,
    backgroundColor: 'rgba(200, 168, 130, 0.1)',
    borderRadius: 20,
    padding: Spacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    alignItems: 'center',
  },
  quoteIcon: {
    marginBottom: Spacing.md,
    opacity: 0.5,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: Colors.text.primary,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: Spacing.md,
    fontFamily: 'serif',
  },
  quoteAuthor: {
    fontSize: 14,
    color: Colors.text.secondary,
    fontWeight: '600',
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

export default HistoryScreen;
