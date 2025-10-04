import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  icon?: keyof typeof Ionicons.glyphMap;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  icon,
  loading = false,
  disabled = false,
  style,
}) => {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? Colors.white : Colors.primary} 
        />
      ) : (
        <>
          {icon && (
            <Ionicons
              name={icon}
              size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
              color={variant === 'primary' ? Colors.white : Colors.primary}
              style={styles.icon}
            />
          )}
          <Text style={textStyle}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
  },
  
  // Variants
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.accent,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  
  // Sizes
  small: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
  },
  medium: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  large: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
  },
  
  // Text styles
  text: {
    fontWeight: Typography.weights.semiBold,
  },
  primaryText: {
    color: Colors.white,
  },
  secondaryText: {
    color: Colors.white,
  },
  outlineText: {
    color: Colors.primary,
  },
  
  // Text sizes
  smallText: {
    fontSize: Typography.sizes.sm,
  },
  mediumText: {
    fontSize: Typography.sizes.md,
  },
  largeText: {
    fontSize: Typography.sizes.lg,
  },
  
  // States
  disabled: {
    opacity: 0.5,
  },
  
  icon: {
    marginRight: Spacing.xs,
  },
});