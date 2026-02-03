export const colors = {
  primary: '#FF5D5D',
  secondary: '#456573',
  background: '#FFFFFF',
  surface: '#F5F7F9',
  text: '#2D2D2D',
  border: '#E1E5E8',
} as const;

export const colorsByType = {
  grass: 'rgba(116, 203, 72, 1)',   
  poison: 'rgba(164, 62, 158, 1)',   
  fire: 'rgba(245, 125, 49, 1)',
  water: 'rgba(100, 147, 235, 1)',
  bug: 'rgba(167, 183, 35, 1)',
  normal: 'rgba(170, 166, 127, 1)',
  flying: 'rgba(168, 145, 236, 1)',
  fighting: 'rgba(193, 34, 57, 1)',
  electric: 'rgba(249, 207, 48, 1)',
  ground: 'rgba(222, 193, 107, 1)',
  rock: 'rgba(182, 158, 49, 1)',  
  psychic: 'rgba(251, 85, 132, 1)',
  ice: 'rgba(154, 214, 223, 1)',    
  ghost: 'rgba(112, 85, 148, 1)',   
  dragon: 'rgba(112, 55, 255, 1)',
  dark: 'rgba(117, 87, 76, 1)',   
  steel: 'rgba(183, 185, 208, 1)',
  fairy: 'rgba(230, 158, 172, 1)',
} as const;

export type PokemonTypeName = keyof typeof colorsByType;
