import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Import des écrans
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import ScannerScreen from './src/screens/ScannerScreen';
import CollectionsScreen from './src/screens/CollectionsScreen';
import TreasureHuntScreen from './src/screens/TreasureHuntScreen';
import TicketsScreen from './src/screens/TicketsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import ArtworkDetailScreen from './src/screens/ArtworkDetailScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';

// Import des constantes de thème
import { Colors } from './src/constants/theme';

// Types simples pour la navigation
type RootStackParamList = {
  Onboarding: undefined;
  MainTabs: undefined;
  ArtworkDetail: { artworkId: string };
};

type TabParamList = {
  Home: undefined;
  Scanner: undefined;
  Collections: undefined;
  Hunt: undefined;
  Tickets: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator();

// Composant principal de l'application
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" backgroundColor={Colors.primary} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Onboarding"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen 
            name="Onboarding" 
            component={OnboardingScreen}
          />
          <Stack.Screen 
            name="MainTabs" 
            component={HomeScreen}
          />
          <Stack.Screen 
            name="Search" 
            component={SearchScreen}
          />
          <Stack.Screen 
            name="Scanner" 
            component={ScannerScreen}
          />
          <Stack.Screen 
            name="Collections" 
            component={CollectionsScreen}
          />
          <Stack.Screen 
            name="Hunt" 
            component={TreasureHuntScreen}
          />
          <Stack.Screen 
            name="Tickets" 
            component={TicketsScreen}
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen}
          />
          <Stack.Screen 
            name="Favorites" 
            component={FavoritesScreen}
          />
          <Stack.Screen 
            name="ArtworkDetail" 
            component={ArtworkDetailScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});