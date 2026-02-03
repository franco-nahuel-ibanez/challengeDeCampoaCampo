export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonDetailResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  order: number;
  is_default: boolean;
  location_area_encounters: string;
  abilities: ApiAbility[];
  forms: ApiNamedResource[];
  game_indices: ApiGameIndex[];
  held_items: ApiHeldItem[];
  moves: ApiMove[];
  past_abilities: ApiPastAbility[];
  past_stats: ApiPastStat[];
  past_types: ApiPastType[];
  species: ApiNamedResource;
  sprites: ApiSprites;
  stats: ApiStat[];
  types: ApiType[];
  cries: ApiCries;
}

export interface ApiNamedResource {
  name: string;
  url: string;
}

export interface ApiAbility {
  ability: ApiNamedResource;
  is_hidden: boolean;
  slot: number;
}

export interface ApiGameIndex {
  game_index: number;
  version: ApiNamedResource;
}

export interface ApiHeldItem {
  item: ApiNamedResource;
  version_details: ApiHeldItemVersionDetail[];
}

export interface ApiHeldItemVersionDetail {
  rarity: number;
  version: ApiNamedResource;
}

export interface ApiMove {
  move: ApiNamedResource;
  version_group_details: ApiMoveVersionGroupDetail[];
}

export interface ApiMoveVersionGroupDetail {
  level_learned_at: number;
  move_learn_method: ApiNamedResource;
  order: number | null;
  version_group: ApiNamedResource;
}

export interface ApiPastAbility {
  abilities: ApiAbility[];
  generation: ApiNamedResource;
}

export interface ApiPastStat {
  generation: ApiNamedResource;
  stats: ApiStat[];
}

export interface ApiPastType {
  generation: ApiNamedResource;
  types: ApiType[];
}

export interface ApiStat {
  base_stat: number;
  effort: number;
  stat: ApiNamedResource;
}

export interface ApiType {
  slot: number;
  type: ApiNamedResource;
}

export interface ApiSprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other?: ApiSpritesOther;
  versions?: ApiSpritesVersions;
  animated?: ApiSprites;
}

export interface ApiSpritesOther {
  dream_world: ApiSpritesDreamWorld;
  home: ApiSpritesHome;
  'official-artwork': ApiSpritesOfficialArtwork;
  showdown: ApiSprites;
}

export interface ApiSpritesVersions {
  'generation-i': ApiSpritesGenerationI;
  'generation-ii': ApiSpritesGenerationIi;
  'generation-iii': ApiSpritesGenerationIii;
  'generation-iv': ApiSpritesGenerationIv;
  'generation-v': ApiSpritesGenerationV;
  'generation-vi': Record<string, ApiSpritesHome>;
  'generation-vii': ApiSpritesGenerationVii;
  'generation-viii': ApiSpritesGenerationViii;
  'generation-ix': ApiSpritesGenerationIx;
}

export interface ApiSpritesDreamWorld {
  front_default: string | null;
  front_female: string | null;
}

export interface ApiSpritesHome {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

export interface ApiSpritesOfficialArtwork {
  front_default: string | null;
  front_shiny: string | null;
}

export interface ApiSpritesGenerationI {
  'red-blue': ApiSpritesRedBlue;
  yellow: ApiSpritesRedBlue;
}

export interface ApiSpritesRedBlue {
  back_default: string | null;
  back_gray: string | null;
  back_transparent: string | null;
  front_default: string | null;
  front_gray: string | null;
  front_transparent: string | null;
}

export interface ApiSpritesGenerationIi {
  crystal: ApiSpritesCrystal;
  gold: ApiSpritesGold;
  silver: ApiSpritesGold;
}

export interface ApiSpritesCrystal {
  back_default: string | null;
  back_shiny: string | null;
  back_shiny_transparent: string | null;
  back_transparent: string | null;
  front_default: string | null;
  front_shiny: string | null;
  front_shiny_transparent: string | null;
  front_transparent: string | null;
}

export interface ApiSpritesGold {
  back_default: string | null;
  back_shiny: string | null;
  front_default: string | null;
  front_shiny: string | null;
  front_transparent?: string | null;
}

export interface ApiSpritesGenerationIii {
  emerald: ApiSpritesOfficialArtwork;
  'firered-leafgreen': ApiSpritesGold;
  'ruby-sapphire': ApiSpritesGold;
}

export interface ApiSpritesGenerationIv {
  'diamond-pearl': ApiSprites;
  'heartgold-soulsilver': ApiSprites;
  platinum: ApiSprites;
}

export interface ApiSpritesGenerationV {
  'black-white': ApiSprites;
}

export interface ApiSpritesGenerationVii {
  icons: ApiSpritesDreamWorld;
  'ultra-sun-ultra-moon': ApiSpritesHome;
}

export interface ApiSpritesGenerationViii {
  icons: ApiSpritesDreamWorld;
  'brilliant-diamond-shining-pearl': ApiSpritesDreamWorld;
}

export interface ApiSpritesGenerationIx {
  'scarlet-violet': ApiSpritesDreamWorld;
}

export interface ApiCries {
  latest: string | null;
  legacy: string | null;
}
