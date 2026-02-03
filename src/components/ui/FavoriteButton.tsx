import React from 'react';
import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';

export interface FavoriteButtonProps {
  isFavorite: boolean;
  onPress?: () => void;
  size?: number;
  style?: ViewStyle;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onPress,
  size = 24,
  style,
}) => {
  const handlePress = (): void => {
    onPress?.();
  };

  if (onPress == null) {
    return (
      <View style={[styles.wrapper, style]}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={size}
          color={isFavorite ? colors.primary : colors.text}
        />
      </View>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.wrapper,
        pressed && styles.wrapperPressed,
        style,
      ]}
      hitSlop={12}
      accessibilityRole="button"
      accessibilityLabel={
        isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'
      }
      accessibilityState={{ selected: isFavorite }}
    >
      <Ionicons
        name={isFavorite ? 'heart' : 'heart-outline'}
        size={size}
        color={isFavorite ? colors.primary : colors.text}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 4,
  },
  wrapperPressed: {
    opacity: 0.7,
  },
});
