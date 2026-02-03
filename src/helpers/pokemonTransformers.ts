import { POKEMON_IMAGES } from '../utils/constants';
import {
  PokemonDetail,
  PokemonDetailResponse,
} from '@/types';

export const extractIdFromUrl = (url: string): number => {
  const matches = url.match(/\/pokemon\/(\d+)\//);
  return matches ? parseInt(matches[1], 10) : 0;
};

export const transformToPokemonDetail = (raw: PokemonDetailResponse): PokemonDetail => ({
  id: raw.id,
  name: raw.name,
  image: POKEMON_IMAGES.SPRITE_URL(raw.id),
  imageHD: raw.sprites.other?.['official-artwork']?.front_default ?? POKEMON_IMAGES.ARTWORK_URL(raw.id),
  height: raw.height,
  weight: raw.weight,
  types: raw.types.map((t) => ({
    slot: t.slot,
    name: t.type.name,
  })),
  stats: raw.stats.map((s) => ({
    name: s.stat.name,
    baseStat: s.base_stat,
  })),
  abilities: raw.abilities.map((a) => ({
    name: a.ability.name,
    isHidden: a.is_hidden,
  })),
});
