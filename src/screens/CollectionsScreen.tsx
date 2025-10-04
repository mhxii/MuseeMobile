import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../constants/theme';
import { MUSEUM_COLLECTIONS, MUSEUM_ARTWORKS } from '../constants/data';

interface CollectionsScreenProps {
  navigation: any;
}

const CollectionsScreen: React.FC<CollectionsScreenProps> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Collections du Musée</Text>
      
      {MUSEUM_COLLECTIONS.map((collection) => (
        <TouchableOpacity
          key={collection.id}
          style={styles.collectionCard}
          onPress={() => {
            // Navigation vers les œuvres de la collection
          }}
        >
          <View style={styles.collectionHeader}>
            <Text style={styles.collectionIcon}>{collection.icon}</Text>
            <View style={styles.collectionInfo}>
              <Text style={styles.collectionName}>{collection.name.fr}</Text>
              <Text style={styles.collectionCount}>
                {MUSEUM_ARTWORKS.filter(art => art.collection === collection.name.fr).length} œuvres
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={Colors.gray.dark} />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
  title: {
    fontSize: Typography.sizes.title,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  collectionCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  collectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  collectionIcon: {
    fontSize: 32,
    marginRight: Spacing.md,
  },
  collectionInfo: {
    flex: 1,
  },
  collectionName: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semiBold,
    color: Colors.text.primary,
  },
  collectionCount: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
    marginTop: 2,
  },
});

export default CollectionsScreen;