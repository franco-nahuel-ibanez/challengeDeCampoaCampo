import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Pokemon } from '@/types/pokemon';
import { STORAGE_KEYS } from '@/utils/constants';



export const savePokemonList = async (pokemon: Pokemon[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.POKEMONS, JSON.stringify(pokemon));
  } catch (error) {
    console.error('Error guardando lista de pokémon:', error);
    throw error;
  }
};

export const getPokemonList = async (): Promise<Pokemon[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.POKEMONS);
    if (data) {
      return JSON.parse(data)
    }
    return [];
  } catch (error) {
    console.error('Error obteniendo lista de pokémon:', error);
    return [];
  }
};

export const clearPokemonList = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.POKEMONS);
  } catch (error) {
    console.error('Error limpiando lista de pokémon:', error);
    throw error;
  }
};

export const saveFavorites = async (favorites: Pokemon[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error guardando favoritos:', error);
    throw error;
  }
};

export const getFavorites = async (): Promise<Pokemon[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
    if (data) {
      return JSON.parse(data)
    }
    return [];
  } catch (error) {
    console.error('Error obteniendo favoritos:', error);
    return [];
  }
};
