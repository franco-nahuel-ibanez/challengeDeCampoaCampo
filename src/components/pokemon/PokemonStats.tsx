import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatStatName } from '@/helpers/textFormatters';
import { colors } from '@/theme/colors';
import type { PokemonStat } from '@/types/pokemon';

const MAX_STAT_VALUE = 255;

export interface PokemonStatsProps {
  stats: PokemonStat[];
  accentColor?: string;
}

export const PokemonStats: React.FC<PokemonStatsProps> = ({
  stats,
  accentColor = colors.primary,
}) => {
  const getStatPercentage = (value: number): number => {
    return Math.min((value / MAX_STAT_VALUE) * 100, 100);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estadísticas</Text>
      {stats.map((stat) => (
        <View key={stat.name} style={styles.row}>
          <Text style={styles.name}>{formatStatName(stat.name)}</Text>
          <View style={styles.barContainer}>
            <View
              style={[
                styles.bar,
                {
                  width: `${getStatPercentage(stat.baseStat)}%`,
                  backgroundColor: accentColor,
                },
              ]}
            />
          </View>
          <Text style={styles.value}>{stat.baseStat}</Text>
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
    marginBottom: 12,
  },
  name: {
    width: 100,
    fontSize: 14,
    color: colors.secondary,
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 4,
  },
  value: {
    width: 40,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'right',
  },
});
