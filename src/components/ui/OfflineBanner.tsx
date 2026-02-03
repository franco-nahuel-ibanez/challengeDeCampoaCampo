import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';

export const OfflineBanner = () => {
  return (
    <View style={styles.banner}>
      <Ionicons
        name="cloud-offline-outline"
        size={20}
        color={colors.background}
      />
      <Text style={styles.text}>Sin conexión - Modo offline</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 8,
  },
  text: {
    color: colors.background,
    fontSize: 14,
    fontWeight: '600',
  },
});
