import { StyleSheet, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { PokemonCard } from '../components';
import { EmptyState } from '../components/ui/EmptyState';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { usePokemonStore } from '@/store/usePokemonStore';
import { Pokemon } from '@/types/pokemon';
import { FavoritesStackParamList } from '@/navigation/AppNavigator';
import { colors } from '@/theme/colors';

type FavoritesScreenNavigationProp = NativeStackNavigationProp<FavoritesStackParamList>;

export const FavoritesScreen = () => {
  const navigation = useNavigation<FavoritesScreenNavigationProp>();
  const { isConnected } = useNetworkStatus();
  const favorites = usePokemonStore((state) => state.favorites);
  const removeFavorite = usePokemonStore((state) => state.removeFavorite);
  const addFavorite = usePokemonStore((state) => state.addFavorite);
  const isFavorite = usePokemonStore((state) => state.isFavorite);

  const handleFavoritePress = (pokemon: Pokemon) => {
    if (isFavorite(pokemon.id)) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

  const handlePokemonPress = (pokemon: Pokemon) => {
    if (!isConnected) {
      //navigation.navigate('NoConnection');
      return;
    }

    // Navegar a pantalla de detalle
    //navigation.navigate('Detail', { pokemonId: pokemon.id });
  };

  const renderItem = ({ item }: { item: Pokemon }) => (
    <View style={styles.cardWrapper}>
      <PokemonCard
        pokemon={item}
        isFavorite={true}
        onFavoritePress={() => handleFavoritePress(item)}
        onPress={() => handlePokemonPress(item)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Tus favoritos</Text>
      </View>
      <FlashList
        data={favorites}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<EmptyState title="No tienes favoritos" message="Marca algunos Pokémon como favoritos para verlos aquí" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  titleContainer: {
    paddingHorizontal: 26,
    paddingVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  listContent: {
    paddingVertical: 8,
    paddingHorizontal: 26,
  },
  cardWrapper: {
    marginBottom: 16,
  },
});
