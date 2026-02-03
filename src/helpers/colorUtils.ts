import { colorsByType, PokemonTypeName } from '@/theme/colors';
import type { PokemonType } from '@/types/pokemon';

export const getTypeColor = (typeName: string): string => {
  const normalizedType = typeName.toLowerCase() as PokemonTypeName;
  return colorsByType[normalizedType] ?? colorsByType.normal;
};

export const getPrimaryTypeColor = (types: PokemonType[]): string => {
  if (types.length === 0) return colorsByType.normal;
  return getTypeColor(types[0].name);
};

export const rgbaWithOpacity = (rgba: string, alpha: number): string => {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return rgba;
  const [, r, g, b] = match;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
