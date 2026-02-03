import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

export interface PokemonDimensionsProps {
  /** Altura en decímetros (API devuelve decímetros) */
  height: number;
  /** Peso en hectogramos (API devuelve hectogramos) */
  weight: number;
}

export const PokemonDimensions: React.FC<PokemonDimensionsProps> = ({
  height,
  weight,
}) => {
  const heightInMeters = (height / 10).toFixed(1);
  const weightInKg = (weight / 10).toFixed(1);

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.label}>Altura</Text>
        <Text style={styles.value}>{heightInMeters} m</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Peso</Text>
        <Text style={styles.value}>{weightInKg} kg</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
  },
  item: {
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: colors.secondary,
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
});
