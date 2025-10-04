import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../constants/theme';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={48} color={Colors.white} />
        </View>
        <Text style={styles.userName}>Visiteur</Text>
        <Text style={styles.userEmail}>visiteur@musee.sn</Text>
      </View>
      
      <View style={styles.statsSection}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Œuvres vues</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>2</Text>
          <Text style={styles.statLabel}>Chasses complétées</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Badges gagnés</Text>
        </View>
      </View>
      
      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="language-outline" size={24} color={Colors.primary} />
          <Text style={styles.menuText}>Langue</Text>
          <Text style={styles.menuValue}>Français</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.gray.dark} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="moon-outline" size={24} color={Colors.primary} />
          <Text style={styles.menuText}>Thème</Text>
          <Text style={styles.menuValue}>Automatique</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.gray.dark} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="notifications-outline" size={24} color={Colors.primary} />
          <Text style={styles.menuText}>Notifications</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.gray.dark} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="download-outline" size={24} color={Colors.primary} />
          <Text style={styles.menuText}>Exporter ma visite</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.gray.dark} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    padding: Spacing.xl,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  userName: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  userEmail: {
    fontSize: Typography.sizes.md,
    color: Colors.white,
    opacity: 0.8,
  },
  statsSection: {
    flexDirection: 'row',
    padding: Spacing.lg,
    marginTop: -Spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.lg,
    alignItems: 'center',
    marginHorizontal: Spacing.xs,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  menuSection: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray.light,
  },
  menuText: {
    fontSize: Typography.sizes.md,
    color: Colors.text.primary,
    marginLeft: Spacing.md,
    flex: 1,
  },
  menuValue: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
    marginRight: Spacing.sm,
  },
});

export default ProfileScreen;