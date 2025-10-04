import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../constants/theme';
import { TICKET_TYPES } from '../constants/data';

interface TicketsScreenProps {
  navigation: any;
}

const TicketsScreen: React.FC<TicketsScreenProps> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Billetterie</Text>
      <Text style={styles.subtitle}>Achetez vos billets en ligne</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Types de billets</Text>
        {TICKET_TYPES.map((ticket) => (
          <TouchableOpacity
            key={ticket.id}
            style={styles.ticketCard}
            onPress={() => {
              // Acheter le billet
            }}
          >
            <View style={styles.ticketInfo}>
              <Text style={styles.ticketName}>{ticket.name.fr}</Text>
              <Text style={styles.ticketDescription}>{ticket.description.fr}</Text>
            </View>
            <View style={styles.ticketPrice}>
              <Text style={styles.priceText}>{ticket.price.toLocaleString()} CFA</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.gray.dark} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mes billets</Text>
        <View style={styles.emptyState}>
          <Ionicons name="ticket-outline" size={48} color={Colors.gray.medium} />
          <Text style={styles.emptyText}>Aucun billet acheté</Text>
        </View>
      </View>
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
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semiBold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  ticketCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.lg,
    marginBottom: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ticketInfo: {
    flex: 1,
  },
  ticketName: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semiBold,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  ticketDescription: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
  },
  ticketPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
    marginRight: Spacing.sm,
  },
  emptyState: {
    alignItems: 'center',
    padding: Spacing.xl,
  },
  emptyText: {
    fontSize: Typography.sizes.md,
    color: Colors.gray.medium,
    marginTop: Spacing.sm,
  },
});

export default TicketsScreen;