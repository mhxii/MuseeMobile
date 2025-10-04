import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Import des écrans
import HomeScreen from './src/screens/HomeScreen';
import ScannerScreen from './src/screens/ScannerScreen';
import CollectionsScreen from './src/screens/CollectionsScreen';
import TreasureHuntScreen from './src/screens/TreasureHuntScreen';
import TicketsScreen from './src/screens/TicketsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
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
const Tab = createBottomTabNavigator();

// Configuration des onglets principaux
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: any }) => ({
        tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Scanner':
              iconName = focused ? 'qr-code' : 'qr-code-outline';
              break;
            case 'Collections':
              iconName = focused ? 'library' : 'library-outline';
              break;
            case 'Hunt':
              iconName = focused ? 'trophy' : 'trophy-outline';
              break;
            case 'Tickets':
              iconName = focused ? 'ticket' : 'ticket-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray.dark,
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopColor: Colors.gray.light,
          paddingTop: 8,
          paddingBottom: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'Accueil',
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="Scanner" 
        component={ScannerScreen}
        options={{
          title: 'Scanner',
          headerTitle: 'Scanner QR Code',
        }}
      />
      <Tab.Screen 
        name="Collections" 
        component={CollectionsScreen}
        options={{
          title: 'Collections',
          headerTitle: 'Collections du Musée',
        }}
      />
      <Tab.Screen 
        name="Hunt" 
        component={TreasureHuntScreen}
        options={{
          title: 'Chasse',
          headerTitle: 'Chasse au Trésor',
        }}
      />
      <Tab.Screen 
        name="Tickets" 
        component={TicketsScreen}
        options={{
          title: 'Billets',
          headerTitle: 'Billetterie',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: 'Profil',
          headerTitle: 'Mon Profil',
        }}
      />
    </Tab.Navigator>
  );
}

// Composant principal de l'application
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" backgroundColor={Colors.primary} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Onboarding"
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTintColor: Colors.white,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Onboarding" 
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="MainTabs" 
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="ArtworkDetail" 
            component={ArtworkDetailScreen}
            options={{
              title: 'Détails de l\'œuvre',
              presentation: 'modal',
            }}
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