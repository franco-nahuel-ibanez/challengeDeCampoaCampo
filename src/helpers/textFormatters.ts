export const capitalize = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatStatName = (name: string): string => {
  return name
    .split('-')
    .map((word) => capitalize(word))
    .join(' ');
};

export const formatPokemonId = (id: number): string => {
  return `#${String(id).padStart(3, '0')}`;
};
