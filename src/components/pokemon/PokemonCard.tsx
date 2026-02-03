import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';
import { Pokemon } from '@/types/pokemon';

export interface PokemonCardProps {
  pokemon: Pokemon;
  onPress: () => void;
  isFavorite?: boolean;
  onFavoritePress?: () => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onPress,
  isFavorite = false,
  onFavoritePress,
}) => {
  const displayName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const idFormatted = `#${String(pokemon.id).padStart(3, '0')}`;

  const handleFavoritePress = (): void => {
    onFavoritePress?.();
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      accessibilityRole="button"
      accessibilityLabel={`Ver detalle de ${pokemon.name}`}
    >
      <Pressable
        onPress={handleFavoritePress}
        style={({ pressed }) => [
          styles.favoriteWrapper,
          pressed && styles.favoritePressed,
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
          size={24}
          color={isFavorite ? colors.primary : colors.text}
        />
      </Pressable>

      <Image
        source={{ uri: pokemon.image }}
        style={styles.image}
        contentFit="contain"
        accessibilityLabel={`Imagen de ${pokemon.name}`}
      />

      <View style={styles.footer}>
        <Text style={styles.name} numberOfLines={1}>
          {displayName}
        </Text>
        <Text
          style={styles.id}
          accessibilityLabel={`Número ${idFormatted}`}
        >
          {idFormatted}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    minHeight: 140,
  },
  cardPressed: {
    opacity: 0.9,
  },
  image: {
    width: 96,
    height: 96,
    alignSelf: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  id: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: '500',
  },
  favoriteWrapper: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
  },
  favoritePressed: {
    opacity: 0.7,
  },
});
