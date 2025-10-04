import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
  navigation: any;
}

const onboardingData = [
  {
    id: '1',
    title: 'Bienvenue au\nMusée des Civilisations Noires',
    description: 'Découvrez un patrimoine riche et diversifié à travers une expérience mobile immersive',
    icon: 'home-outline',
    colors: [Colors.primary, Colors.accent],
  },
  {
    id: '2',
    title: 'Scannez et\nExplorez',
    description: 'Utilisez votre caméra pour scanner les codes QR et accéder aux détails des œuvres',
    icon: 'qr-code-outline',
    colors: [Colors.secondary, Colors.green],
  },
  {
    id: '3',
    title: 'Chasse au Trésor\nCulturelle',
    description: 'Participez à des parcours gamifiés et gagnez des badges en découvrant notre collection',
    icon: 'trophy-outline',
    colors: [Colors.accent, Colors.primary],
  },
  {
    id: '4',
    title: 'Multilingue\nFR • EN • WO',
    description: 'L\'application est disponible en français, anglais et wolof pour une accessibilité maximale',
    icon: 'language-outline',
    colors: [Colors.green, Colors.secondary],
  },
];

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSlide = onboardingData[currentIndex];

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace('MainTabs');
    }
  };

  const handleSkip = () => {
    navigation.replace('MainTabs');
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View
        style={[styles.gradient, { backgroundColor: currentSlide.colors[0] }]}
      >
        {/* Skip Button */}
        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleSkip}
          activeOpacity={0.8}
        >
          <Text style={styles.skipText}>Passer</Text>
        </TouchableOpacity>

        {/* Content */}
        <View style={styles.content}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <Ionicons 
              name={currentSlide.icon as any} 
              size={80} 
              color={Colors.white} 
            />
          </View>

          {/* Title */}
          <Text style={styles.title}>{currentSlide.title}</Text>

          {/* Description */}
          <Text style={styles.description}>{currentSlide.description}</Text>

          {/* Dots Indicator */}
          <View style={styles.dotsContainer}>
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentIndex && styles.activeDot,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navigation}>
          {currentIndex > 0 && (
            <TouchableOpacity
              style={styles.prevButton}
              onPress={handlePrevious}
              activeOpacity={0.8}
            >
              <Ionicons name="chevron-back" size={24} color={Colors.white} />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            {currentIndex === onboardingData.length - 1 ? (
              <Text style={styles.nextText}>Commencer</Text>
            ) : (
              <>
                <Text style={styles.nextText}>Suivant</Text>
                <Ionicons name="chevron-forward" size={24} color={Colors.white} />
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: Spacing.lg,
  },
  skipButton: {
    alignSelf: 'flex-end',
    padding: Spacing.md,
  },
  skipText: {
    fontSize: Typography.sizes.md,
    color: Colors.white,
    fontWeight: Typography.weights.medium,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  title: {
    fontSize: Typography.sizes.title,
    color: Colors.white,
    fontWeight: Typography.weights.bold,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    lineHeight: Typography.sizes.title * 1.2,
  },
  description: {
    fontSize: Typography.sizes.lg,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: Typography.sizes.lg * 1.4,
    marginBottom: Spacing.xxl,
    opacity: 0.9,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: Colors.white,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  prevButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.xl,
    minWidth: 120,
    justifyContent: 'center',
  },
  nextText: {
    fontSize: Typography.sizes.md,
    color: Colors.white,
    fontWeight: Typography.weights.semiBold,
    marginRight: Spacing.xs,
  },
});

export default OnboardingScreen;