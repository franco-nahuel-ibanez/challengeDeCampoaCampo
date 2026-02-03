export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  image: string;
  imageHD: string;
  height: number;
  weight: number;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
}

export interface PokemonType {
  slot: number;
  name: string;
}

export interface PokemonStat {
  name: string;
  baseStat: number;
}

export interface PokemonAbility {
  name: string;
  isHidden: boolean;
}

export interface PaginationParams {
  limit: number;
  offset: number;
}

export interface PokemonListResult {
  pokemon: Pokemon[];
  hasNextPage: boolean;
}
