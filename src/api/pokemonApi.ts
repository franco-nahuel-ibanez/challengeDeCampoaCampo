import { PAGINATION, POKEMON_IMAGES } from '@/utils/constants';
import { extractIdFromUrl, transformToPokemonDetail } from '@/helpers/pokemonTransformers';
import { apiClient } from '@/api/apiClient';
import {
  Pokemon,
  PokemonDetail,
  PaginationParams,
} from '@/types';
import {
  PokemonDetailResponse,
  PokemonListResponse,
  PokemonListResult,
} from '@/types';

export const getPokemonList = async (
  params: PaginationParams = { limit: PAGINATION.DEFAULT_LIMIT, offset: PAGINATION.INITIAL_OFFSET }
): Promise<PokemonListResult> => {
  const { data } = await apiClient.get<PokemonListResponse>('/pokemon', {
    params: {
      limit: params.limit,
      offset: params.offset,
    },
  });

  const pokemon: Pokemon[] = data.results.map((item) => {
    const id = extractIdFromUrl(item.url);
    return {
      id,
      name: item.name,
      image: POKEMON_IMAGES.SPRITE_URL(id),
    };
  });

  return {
    pokemon,
    hasNextPage: data.next !== null,
  };
};

export const getPokemonDetail = async (idOrName: number | string): Promise<PokemonDetail> => {
  const { data } = await apiClient.get<PokemonDetailResponse>(`/pokemon/${idOrName}`);
  return transformToPokemonDetail(data);
};

export const searchPokemonByName = async (name: string): Promise<PokemonDetail | null> => {
  try {
    const normalizedName = name.toLowerCase().trim();
    const { data } = await apiClient.get<PokemonDetailResponse>(`/pokemon/${normalizedName}`);
    return transformToPokemonDetail(data);
  } catch {
    return null;
  }
};
