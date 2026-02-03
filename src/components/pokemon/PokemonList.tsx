import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { PokemonCard } from './PokemonCard';
import { usePokemonStore } from '@/store/usePokemonStore';
import { colors } from '@/theme/colors';
import { Pokemon } from '@/types/pokemon';

interface PokemonListProps {
  onPokemonPress?: (pokemon: Pokemon) => void;
  pokemon?: Pokemon[];
}

export const PokemonList = ({ onPokemonPress, pokemon: externalPokemon }: PokemonListProps) => {
  const storePokemon = usePokemonStore((state) => state.pokemon);
  const pokemon = externalPokemon ?? storePokemon;
  const isLoading = usePokemonStore((state) => state.isLoading);
  const hasNextPage = usePokemonStore((state) => state.hasNextPage);
  const loadNextPage = usePokemonStore((state) => state.loadNextPage);

  const handleEndReached = () => {
    if (!externalPokemon && hasNextPage && !isLoading) {
      loadNextPage();
    }
  };

  const renderItem = ({ item }: { item: Pokemon }) => (
    <View style={styles.cardWrapper}>
      <PokemonCard
        pokemon={item}
        style={styles.card}
        onPress={() => onPokemonPress?.(item)}
      />
    </View>
  );

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={colors.primary} />
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
    paddingHorizontal: 26,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  card: {
    width: '90%',
    alignSelf: 'center',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
