import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '../constants/theme';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = 'Chargement...' 
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

interface ErrorScreenProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({ 
  message = 'Une erreur s\'est produite',
  onRetry 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorMessage}>{message}</Text>
      {onRetry && (
        <Text style={styles.retryText} onPress={onRetry}>
          Réessayer
        </Text>
      )}
    </View>
  );
};

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emptyTitle}>{title}</Text>
      {description && (
        <Text style={styles.emptyDescription}>{description}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: Colors.background,
  },
  message: {
    fontSize: Typography.sizes.md,
    color: Colors.text.secondary,
    marginTop: Spacing.md,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: Typography.sizes.lg,
    color: Colors.error,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  retryText: {
    fontSize: Typography.sizes.md,
    color: Colors.primary,
    fontWeight: Typography.weights.semiBold,
  },
  emptyTitle: {
    fontSize: Typography.sizes.xl,
    color: Colors.text.primary,
    fontWeight: Typography.weights.bold,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  emptyDescription: {
    fontSize: Typography.sizes.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: Typography.sizes.md * 1.4,
  },
});