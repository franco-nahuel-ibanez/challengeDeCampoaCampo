import { useEffect, useState, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PokemonList } from '@/components';
import { OfflineBanner } from '@/components/ui/OfflineBanner';
import { EmptyState } from '@/components/ui/EmptyState';
import { SearchBar } from '@/components/ui/SearchBar';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { useNetworkListener } from '@/hooks/useNetworkListener';
import { usePokemonStore } from '@/store/usePokemonStore';
import { Pokemon } from '@/types/pokemon';
import { ExploreStackParamList } from '@/navigation/AppNavigator';

type ExploreScreenNavigationProp = NativeStackNavigationProp<ExploreStackParamList>;

export const ExploreScreen = () => {
  const navigation = useNavigation<ExploreScreenNavigationProp>();
  const { isConnected } = useNetworkStatus();
  const initStore = usePokemonStore((state) => state.initStore);
  const isInitialized = usePokemonStore((state) => state.isInitialized);
  const pokemon = usePokemonStore((state) => state.pokemon);
  const [searchQuery, setSearchQuery] = useState('');

  useNetworkListener();

  useEffect(() => {
    initStore(isConnected);
  }, [isConnected, initStore]);

  const filteredPokemon = useMemo(() => {
    if (!searchQuery.trim()) {
      return pokemon;
    }

    const query = searchQuery.toLowerCase().trim();
    return pokemon.filter((pkmn) =>
      pkmn.name.toLowerCase().includes(query) ||
      String(pkmn.id).includes(query)
    );
  }, [pokemon, searchQuery]);

  const handlePokemonPress = (pokemon: Pokemon) => {
    if (!isConnected) {
      return;
    }
  };

  if (!isInitialized) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <EmptyState title="Cargando..." />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!isConnected && <OfflineBanner />}
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      {filteredPokemon.length === 0 ? (
        <EmptyState
          title={searchQuery ? 'No se encontraron resultados' : 'No hay Pokémon'}
          message={
            searchQuery
              ? `No hay Pokémon que coincidan con "${searchQuery}"`
              : isConnected
                ? 'Intenta recargar la aplicación'
                : 'Conecta a internet para cargar Pokémon'
          }
        />
      ) : (
        <PokemonList
          onPokemonPress={handlePokemonPress}
          pokemon={searchQuery.trim() ? filteredPokemon : undefined}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
