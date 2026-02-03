import * as FileSystem from 'expo-file-system/legacy';

const SPRITES_DIR = `${FileSystem.cacheDirectory}sprites/`;

const ensureSpritesDirectory = async (): Promise<void> => {
  const dirInfo = await FileSystem.getInfoAsync(SPRITES_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(SPRITES_DIR, { intermediates: true });
  }
};

const getSpritePath = (pokemonId: number): string => {
  return `${SPRITES_DIR}${pokemonId}.png`;
};

export const downloadSprite = async (
  spriteUrl: string,
  pokemonId: number
): Promise<string | null> => {
  try {
    const localPath = getSpritePath(pokemonId);

    const fileInfo = await FileSystem.getInfoAsync(localPath);
    if (fileInfo.exists) {
      return localPath;
    }

    await ensureSpritesDirectory();

    const downloadResult = await FileSystem.downloadAsync(spriteUrl, localPath);

    if (downloadResult.status === 200) {
      return localPath;
    }

    return null;
  } catch (error) {
    console.error(`Error descargando sprite para pokémon ${pokemonId}:`, error);
    return null;
  }
};

export const cleanupSprites = async (favoriteIds: (string | number)[]): Promise<void> => {
  try {
    const favoriteSet = new Set(favoriteIds.map((id) => String(id)));

    const dirInfo = await FileSystem.getInfoAsync(SPRITES_DIR);
    if (!dirInfo.exists) {
      return;
    }

    const files = await FileSystem.readDirectoryAsync(SPRITES_DIR);

    const deletePromises = files
      .filter((filename) => filename.endsWith('.png'))
      .map(async (filename) => {
        const id = filename.replace('.png', '');

        if (!favoriteSet.has(id)) {
          try {
            await FileSystem.deleteAsync(`${SPRITES_DIR}${filename}`, { idempotent: true });
          } catch (error) {
            console.error(`Error eliminando sprite ${filename}:`, error);
          }
        }
      });

    await Promise.allSettled(deletePromises);
  } catch (error) {
    console.error('Error en cleanupSprites:', error);
  }
};
