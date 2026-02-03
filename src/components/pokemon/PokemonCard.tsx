import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { Image } from 'expo-image';
import { colors } from '@/theme/colors';
import { Pokemon } from '@/types/pokemon';
import { FavoriteButton } from '@/components/ui/FavoriteButton';
import { formatPokemonId } from '@/helpers';

export interface PokemonCardProps {
  pokemon: Pokemon;
  onPress: () => void;
  style?: ViewStyle;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onPress,
  style,
}) => {
  const displayName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const idFormatted = formatPokemonId(pokemon.id);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Ver detalle de ${pokemon.name}`}
    >
      <FavoriteButton
        pokemon={pokemon}
        style={styles.favoriteWrapper}
      />

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
    backgroundColor: colors.background,
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
  },
});
