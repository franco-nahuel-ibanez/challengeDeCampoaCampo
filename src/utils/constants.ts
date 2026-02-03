export const API_CONFIG = {
  BASE_URL: 'https://pokeapi.co/api/v2',
  TIMEOUT: 10000,
} as const;

export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  INITIAL_OFFSET: 0,
} as const;

export const POKEMON_IMAGES = {
  /** Sprite pequeño (96x96) */
  SPRITE_URL: (id: number) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
  /** Artwork oficial HD (475x475) */
  ARTWORK_URL: (id: number) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
} as const;