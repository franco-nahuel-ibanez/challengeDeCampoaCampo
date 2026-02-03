import React from 'react';
import { Pressable, StyleSheet, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePokemonStore } from '@/store/usePokemonStore';
import { colors } from '@/theme/colors';
import type { Pokemon } from '@/types/pokemon';

export interface FavoriteButtonProps {
  pokemon: Pokemon;
  size?: number;
  style?: ViewStyle;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  pokemon,
  size = 24,
  style,
}) => {
  const addFavorite = usePokemonStore((state) => state.addFavorite);
  const removeFavorite = usePokemonStore((state) => state.removeFavorite);
  const isFavorite = usePokemonStore((state) => state.isFavorite(pokemon.id));

  const handlePress = (): void => {
    if (isFavorite) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

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
