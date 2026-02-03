import { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Image } from 'expo-image';
import { EmptyState, TypeBadge, PokemonStats, PokemonAbilities, PokemonDimensions } from '@/components';
import { getPokemonDetail } from '@/api/pokemonApi';
import { capitalize, formatPokemonId } from '@/helpers/textFormatters';
import { getPrimaryTypeColor, rgbaWithOpacity } from '@/helpers/colorUtils';
import { colors } from '@/theme/colors';
import type { PokemonDetail } from '@/types/pokemon';

type DetailScreenRouteParams = {
  pokemonId: number;
};

export const DetailScreen = () => {
  const route = useRoute();
  const { pokemonId } = (route.params as DetailScreenRouteParams) || {};

  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPokemonDetail = async () => {
      if (!pokemonId) {
        setError('ID de Pokémon no válido');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const detail = await getPokemonDetail(pokemonId);
        setPokemon(detail);
      } catch (err) {
        console.error('Error cargando detalle:', err);
        setError('Error al cargar los detalles del Pokémon');
      } finally {
        setIsLoading(false);
      }
    };

    loadPokemonDetail();
  }, [pokemonId]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Cargando detalles...</Text>
        </View>
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View style={styles.container}>
        <EmptyState
          title={error ?? 'Pokémon no encontrado'}
          message="No se pudieron cargar los detalles"
          icon="alert-circle-outline"
        />
      </View>
    );
  }

  const primaryColor = getPrimaryTypeColor(pokemon.types);
  const primaryColorWithOpacity = rgbaWithOpacity(primaryColor, 0.1);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View
        style={[
          styles.imageContainer,
          { backgroundColor: primaryColorWithOpacity },
        ]}
      >
        <Image
          source={{ uri: pokemon.imageHD }}
          style={styles.image}
          contentFit="contain"
          transition={200}
          cachePolicy="memory-disk"
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
        <Text style={styles.id}>{formatPokemonId(pokemon.id)}</Text>

        <View style={styles.typesContainer}>
          {pokemon.types.map((type) => (
            <TypeBadge key={type.slot} typeName={type.name} />
          ))}
        </View>

        <PokemonStats stats={pokemon.stats} accentColor={primaryColor} />
        <PokemonAbilities abilities={pokemon.abilities} />
        <PokemonDimensions height={pokemon.height} weight={pokemon.weight} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.secondary,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 250,
    height: 250,
  },
  infoContainer: {
    paddingHorizontal: 16,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  id: {
    fontSize: 18,
    color: colors.secondary,
    marginBottom: 16,
    textAlign: 'center',
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 8,
  },
});
