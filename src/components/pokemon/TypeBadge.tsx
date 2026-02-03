import React from 'react';
import { View, Text, StyleSheet, type ViewStyle } from 'react-native';
import { getTypeColor } from '@/helpers/colorUtils';
import { capitalize } from '@/helpers/textFormatters';

export interface TypeBadgeProps {
  typeName: string;
  style?: ViewStyle;
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({ typeName, style }) => {
  const backgroundColor = getTypeColor(typeName);

  return (
    <View style={[styles.badge, { backgroundColor }, style]}>
      <Text style={styles.text}>{capitalize(typeName)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
