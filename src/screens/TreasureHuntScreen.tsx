import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../constants/theme';
import { TREASURE_HUNTS } from '../constants/data';

interface TreasureHuntScreenProps {
  navigation: any;
}

const TreasureHuntScreen: React.FC<TreasureHuntScreenProps> = ({ navigation }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return Colors.success;
      case 'medium': return Colors.accent;
      case 'hard': return Colors.error;
      default: return Colors.gray.medium;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Chasse au Trésor</Text>
      <Text style={styles.subtitle}>Parcours culturels gamifiés</Text>
      
      {TREASURE_HUNTS.map((hunt) => (
        <TouchableOpacity
          key={hunt.id}
          style={styles.huntCard}
          onPress={() => {
            // Démarrer la chasse
          }}
        >
          <View style={styles.huntHeader}>
            <Text style={styles.huntTitle}>{hunt.title.fr}</Text>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(hunt.difficulty) }]}>
              <Text style={styles.difficultyText}>
                {hunt.difficulty === 'easy' ? 'Facile' : hunt.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
              </Text>
            </View>
          </View>
          <Text style={styles.huntDescription}>{hunt.description.fr}</Text>
          <View style={styles.huntMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={16} color={Colors.text.secondary} />
              <Text style={styles.metaText}>{hunt.duration} min</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="trophy-outline" size={16} color={Colors.text.secondary} />
              <Text style={styles.metaText}>{hunt.totalPoints} pts</Text>
            </View>
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
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.sizes.md,
    color: Colors.text.secondary,
    marginBottom: Spacing.lg,
  },
  huntCard: {
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
  huntHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  huntTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semiBold,
    color: Colors.text.primary,
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: Typography.sizes.xs,
    color: Colors.white,
    fontWeight: Typography.weights.medium,
  },
  huntDescription: {
    fontSize: Typography.sizes.md,
    color: Colors.text.secondary,
    marginBottom: Spacing.md,
  },
  huntMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
    marginLeft: 4,
  },
});

export default TreasureHuntScreen;