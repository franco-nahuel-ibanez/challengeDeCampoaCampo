import { create } from 'zustand';
import { getPokemonList as fetchPokemonList } from '@/api/pokemonApi';
import { downloadSprite, cleanupSprites } from '@/service/spriteCache';
import {
  savePokemonList,
  getPokemonList,
  clearPokemonList,
  saveFavorites,
  getFavorites,
} from '@/service/storage';
import { PAGINATION } from '@/utils/constants';
import { Pokemon, PokemonDetail, PokemonListResult } from '@/types/pokemon';

interface PokemonStore {
  pokemon: Pokemon[];
  currentOffset: number;
  hasNextPage: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  isConnected: boolean;
  favorites: Pokemon[];

  initStore: (isConnected: boolean) => Promise<void>;
  setConnectionStatus: (isConnected: boolean) => void;
  loadNextPage: () => Promise<void>;
  addFavorite: (pkmn: Pokemon) => Promise<void>;
  removeFavorite: (pokemonId: number) => Promise<void>;
  isFavorite: (pokemonId: number) => boolean;
}

export const usePokemonStore = create<PokemonStore>((set, get) => ({
  pokemon: [],
  currentOffset: 0,
  hasNextPage: true,
  isLoading: false,
  isInitialized: false,
  isConnected: true,
  favorites: [],

  initStore: async (isConnected: boolean) => {
    try {
      set({ isConnected });

      const savedFavorites = await getFavorites();
      set({ favorites: savedFavorites });

      if (isConnected) {
        await clearPokemonList();

        const favoriteIds = savedFavorites.map((f) => f.id);
        await cleanupSprites(favoriteIds);

        set({ isLoading: true, currentOffset: 0 });
        const result: PokemonListResult = await fetchPokemonList({
          limit: PAGINATION.DEFAULT_LIMIT,
          offset: 0,
        });

        const pokemonWithSprites = await Promise.allSettled(
          result.pokemon.map(async (pkmn) => {
            const localImage = await downloadSprite(pkmn.image, pkmn.id);
            
            const pokemonDetail: Pokemon = {
              ...pkmn,
              image: localImage || pkmn.image,
            };
            
            return pokemonDetail;
          })
        );

        const processedPokemon = pokemonWithSprites
          .filter((result): result is PromiseFulfilledResult<PokemonDetail> => result.status === 'fulfilled')
          .map((result) => result.value);

        set({
          pokemon: processedPokemon,
          currentOffset: PAGINATION.DEFAULT_LIMIT,
          hasNextPage: result.hasNextPage,
          isLoading: false,
        });

        await savePokemonList(processedPokemon);
      } else {
        const savedPokemon = await getPokemonList();
        const savedCount = savedPokemon.length;

        set({
          pokemon: savedPokemon,
          currentOffset: savedCount,
          hasNextPage: false,
          isLoading: false,
        });
      }

      set({ isInitialized: true });
    } catch (error) {
      console.error('Error inicializando store:', error);
      set({ isLoading: false, isInitialized: true });
    }
  },

  setConnectionStatus: (isConnected: boolean) => {
    set({ isConnected });
  },

  loadNextPage: async () => {
    const { hasNextPage, isLoading, currentOffset, pokemon, isConnected } = get();

    if (!isConnected || !hasNextPage || isLoading) {
      return;
    }

    try {
      set({ isLoading: true });

      const result: PokemonListResult = await fetchPokemonList({
        limit: PAGINATION.DEFAULT_LIMIT,
        offset: currentOffset,
      });

      if (result.pokemon.length === 0) {
        set({ hasNextPage: false, isLoading: false });
        return;
      }

      const pokemonWithSprites = await Promise.allSettled(
        result.pokemon.map(async (pkmn) => {
          const localImage = await downloadSprite(pkmn.image, pkmn.id);
          
          const pokemonDetail: Pokemon = {
            ...pkmn,
            image: localImage || pkmn.image,
          };
          
          return pokemonDetail;
        })
      );

      const processedPokemon = pokemonWithSprites
        .filter((result): result is PromiseFulfilledResult<PokemonDetail> => result.status === 'fulfilled')
        .map((result) => result.value);

      const updatedPokemon = [...pokemon, ...processedPokemon];

      set({
        pokemon: updatedPokemon,
        currentOffset: currentOffset + PAGINATION.DEFAULT_LIMIT,
        hasNextPage: result.hasNextPage,
        isLoading: false,
      });

      await savePokemonList(updatedPokemon);
    } catch (error) {
      console.error('Error cargando siguiente página:', error);
      set({ isLoading: false });
    }
  },

  addFavorite: async (pkmn: Pokemon) => {
    const { favorites } = get();

    if (favorites.some((f) => f.id === pkmn.id)) {
      return;
    }

    try {
      const localImage = await downloadSprite(pkmn.image, pkmn.id);

      const favoriteWithLocalImage: Pokemon = {
        ...pkmn,
        image: localImage || pkmn.image,
      };

      const updatedFavorites = [...favorites, favoriteWithLocalImage];

      set({ favorites: updatedFavorites });
      await saveFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error agregando favorito:', error);
    }
  },

  removeFavorite: async (pokemonId: number) => {
    const { favorites } = get();

    const updatedFavorites = favorites.filter((f) => f.id !== pokemonId);

    set({ favorites: updatedFavorites });
    await saveFavorites(updatedFavorites);
  },

  isFavorite: (pokemonId: number) => {
    const { favorites } = get();
    return favorites.some((f) => f.id === pokemonId);
  },
}));
