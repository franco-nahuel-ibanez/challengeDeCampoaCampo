import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { PokemonCard } from './PokemonCard';
import { usePokemonStore } from '../../store/usePokemonStore';
import type { Pokemon } from '../../types/pokemon';

interface PokemonListProps {
  onPokemonPress?: (pokemon: Pokemon) => void;
  pokemon?: Pokemon[];
}

export const PokemonList = ({ onPokemonPress, pokemon: externalPokemon }: PokemonListProps) => {
  const storePokemon = usePokemonStore((state) => state.pokemon);
  const pokemon = externalPokemon ?? storePokemon;
  const favorites = usePokemonStore((state) => state.favorites);
  const isLoading = usePokemonStore((state) => state.isLoading);
  const hasNextPage = usePokemonStore((state) => state.hasNextPage);
  const loadNextPage = usePokemonStore((state) => state.loadNextPage);
  const addFavorite = usePokemonStore((state) => state.addFavorite);
  const removeFavorite = usePokemonStore((state) => state.removeFavorite);
  const isFavorite = usePokemonStore((state) => state.isFavorite);

  const favoriteIds = new Set(favorites.map((f) => f.id));

  const handleEndReached = () => {
    if (!externalPokemon && hasNextPage && !isLoading) {
      loadNextPage();
    }
  };

  const handleFavoritePress = (pokemon: Pokemon) => {
    if (isFavorite(pokemon.id)) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

  const renderItem = ({ item }: { item: Pokemon }) => (
    <PokemonCard
      pokemon={item}
      isFavorite={favoriteIds.has(item.id)}
      onFavoritePress={() => handleFavoritePress(item)}
      onPress={() => onPokemonPress?.(item)}
    />
  );

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#E63F34" />
      </View>
    );
  };

  return (
    <FlashList
      data={pokemon}
      renderItem={renderItem}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => String(item.id)}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 8,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
