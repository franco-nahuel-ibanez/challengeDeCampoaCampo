import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ExploreScreen, FavoritesScreen } from '../screens';
import { colors } from '../theme/colors';

export type RootTabParamList = {
  Explore: undefined;
  Favorites: undefined;
};

export type ExploreStackParamList = {
  ExploreMain: undefined;
};

export type FavoritesStackParamList = {
  FavoritesMain: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const ExploreStack = createNativeStackNavigator<ExploreStackParamList>();
const FavoritesStack = createNativeStackNavigator<FavoritesStackParamList>();

export const AppNavigator = () => {
  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top', 'left', 'right']}
    >
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.secondary,
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabBarLabel,
          }}
        >
          <Tab.Screen
            name="Explore"
            options={{
              tabBarLabel: 'Explorar',
              tabBarAccessibilityLabel: 'Explorar Pokémon',
            }}
          >
            {() => (
              <ExploreStack.Navigator
                screenOptions={{
                  headerShown: true,
                  headerStyle: {
                    backgroundColor: colors.background,
                  },
                  headerTintColor: colors.text,
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              >
                <ExploreStack.Screen
                  name="ExploreMain"
                  component={ExploreScreen}
                  options={{ headerShown: false }}
                />
              </ExploreStack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Favorites"
            options={{
              tabBarLabel: 'Favoritos',
              tabBarAccessibilityLabel: 'Ver Pokémon favoritos',
            }}
          >
            {() => (
              <FavoritesStack.Navigator
                screenOptions={{
                  headerShown: true,
                  headerStyle: {
                    backgroundColor: colors.background,
                  },
                  headerTintColor: colors.text,
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              >
                <FavoritesStack.Screen
                  name="FavoritesMain"
                  component={FavoritesScreen}
                  options={{ headerShown: false }}
                />
              </FavoritesStack.Navigator>
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  tabBar: {
    backgroundColor: colors.background,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  tabIcon: {
    fontSize: 24,
    opacity: 0.6,
  },
  tabIconFocused: {
    opacity: 1,
  },
});
