import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme';

interface ArtworkCardProps {
  artwork: {
    id: string;
    title: { fr: string; en: string; wo: string };
    artist: string;
    location: string;
    imageUrl: string;
  };
  onPress: (id: string) => void;
  language?: 'fr' | 'en' | 'wo';
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({ 
  artwork, 
  onPress, 
  language = 'fr' 
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(artwork.id)}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <View style={styles.placeholderImage}>
          <Ionicons name="image-outline" size={48} color={Colors.gray.medium} />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {artwork.title[language]}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {artwork.artist}
        </Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={12} color={Colors.gray.dark} />
          <Text style={styles.location}>{artwork.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  imageContainer: {
    height: 200,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.gray.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: Spacing.md,
  },
  title: {
    fontSize: Typography.sizes.lg,
    color: Colors.text.primary,
    fontWeight: Typography.weights.semiBold,
    marginBottom: Spacing.xs,
  },
  artist: {
    fontSize: Typography.sizes.md,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: Typography.sizes.sm,
    color: Colors.gray.dark,
    marginLeft: Spacing.xs,
  },
});