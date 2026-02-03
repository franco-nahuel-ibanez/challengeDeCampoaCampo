import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';

import { EmptyState } from '@/components';
import { getPokemonDetail } from '@/api/pokemonApi';
import { usePokemonStore } from '@/store/usePokemonStore';
import { colorsByType, PokemonTypeName } from '@/theme/colors';
import type { PokemonDetail } from '@/types/pokemon';

type DetailScreenRouteParams = {
  pokemonId: number;
};

export const DetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
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

  const capitalizeName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const formatStatName = (name: string) => {
    return name
      .split('-')
      .map((word) => capitalizeName(word))
      .join(' ');
  };

  const getPrimaryTypeColor = (): string => {
    if (!pokemon || pokemon.types.length === 0) {
      return colorsByType.normal;
    }
    const primaryType = pokemon.types[0].name.toLowerCase() as PokemonTypeName;
    return colorsByType[primaryType] || colorsByType.normal;
  };

  const getTypeColor = (typeName: string): string => {
    const normalizedType = typeName.toLowerCase() as PokemonTypeName;
    return colorsByType[normalizedType] || colorsByType.normal;
  };

  const rgbaWithOpacity = (rgba: string, alpha: number): string => {
    const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) return rgba;
    const [, r, g, b] = match;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const primaryColor = pokemon ? getPrimaryTypeColor() : colorsByType.normal;
  const primaryColorWithOpacity = rgbaWithOpacity(primaryColor, 0.1);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E63F34" />
          <Text style={styles.loadingText}>Cargando detalles...</Text>
        </View>
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View style={styles.container}>
        <EmptyState
          title={error || 'Pokémon no encontrado'}
          message="No se pudieron cargar los detalles"
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={[styles.imageContainer, { backgroundColor: primaryColorWithOpacity }]}>
        <Image
          source={{ uri: pokemon.imageHD }}
          style={styles.image}
          contentFit="contain"
          transition={200}
          cachePolicy="memory-disk"
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{capitalizeName(pokemon.name)}</Text>
        <Text style={styles.id}>#{String(pokemon.id).padStart(3, '0')}</Text>

        <View style={styles.typesContainer}>
          {pokemon.types.map((type) => (
            <View
              key={type.slot}
              style={[
                styles.typeBadge,
                { backgroundColor: getTypeColor(type.name) }
              ]}
            >
              <Text style={styles.typeText}>{capitalizeName(type.name)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Estadísticas</Text>
          {pokemon.stats.map((stat) => (
            <View key={stat.name} style={styles.statRow}>
              <Text style={styles.statName}>{formatStatName(stat.name)}</Text>
              <View style={styles.statBarContainer}>
                <View
                  style={[
                    styles.statBar,
                    {
                      width: `${Math.min((stat.baseStat / 255) * 100, 100)}%`,
                      backgroundColor: primaryColor,
                    },
                  ]}
                />
              </View>
              <Text style={styles.statValue}>{stat.baseStat}</Text>
            </View>
          ))}
        </View>

        <View style={styles.abilitiesContainer}>
          <Text style={styles.sectionTitle}>Habilidades</Text>
          {pokemon.abilities.map((ability) => (
            <View key={ability.name} style={styles.abilityRow}>
              <Text style={styles.abilityName}>{capitalizeName(ability.name)}</Text>
              {ability.isHidden && (
                <Text style={styles.hiddenLabel}>(Oculta)</Text>
              )}
            </View>
          ))}
        </View>

        <View style={styles.dimensionsContainer}>
          <View style={styles.dimensionItem}>
            <Text style={styles.dimensionLabel}>Altura</Text>
            <Text style={styles.dimensionValue}>{(pokemon.height / 10).toFixed(1)} m</Text>
          </View>
          <View style={styles.dimensionItem}>
            <Text style={styles.dimensionLabel}>Peso</Text>
            <Text style={styles.dimensionValue}>{(pokemon.weight / 10).toFixed(1)} kg</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    color: '#666',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 0,
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
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  id: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 8,
  },
  typeBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  typeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statName: {
    width: 100,
    fontSize: 14,
    color: '#666',
  },
  statBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  statBar: {
    height: '100%',
    borderRadius: 4,
  },
  statValue: {
    width: 40,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'right',
  },
  abilitiesContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  abilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  abilityName: {
    fontSize: 16,
    color: '#333',
  },
  hiddenLabel: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8,
    fontStyle: 'italic',
  },
  dimensionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  dimensionItem: {
    alignItems: 'center',
  },
  dimensionLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  dimensionValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});
