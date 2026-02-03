import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { capitalize } from '@/helpers/textFormatters';
import { colors } from '@/theme/colors';
import type { PokemonAbility } from '@/types/pokemon';

export interface PokemonAbilitiesProps {
  abilities: PokemonAbility[];
}

export const PokemonAbilities: React.FC<PokemonAbilitiesProps> = ({
  abilities,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habilidades</Text>
      {abilities.map((ability) => (
        <View key={ability.name} style={styles.row}>
          <Text style={styles.name}>{capitalize(ability.name)}</Text>
          {ability.isHidden && (
            <Text style={styles.hiddenLabel}>(Oculta)</Text>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    color: colors.text,
  },
  hiddenLabel: {
    fontSize: 12,
    color: colors.secondary,
    marginLeft: 8,
    fontStyle: 'italic',
  },
});
