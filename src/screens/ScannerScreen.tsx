import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Animated,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme';
import { MUSEUM_ARTWORKS } from '../constants/data';

const { width, height } = Dimensions.get('window');

interface ScannerScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
  };
}

const ScannerScreen: React.FC<ScannerScreenProps> = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);
  
  // Animations
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    try {
      // Vérifier d'abord si on a déjà la permission
      const { status: existingStatus } = await BarCodeScanner.getPermissionsAsync();
      
      if (existingStatus === 'granted') {
        setHasPermission(true);
        startAnimations();
        return;
      }
      
      // Demander la permission si on ne l'a pas
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      
      if (status === 'granted') {
        startAnimations();
      } else if (status === 'denied') {
        Alert.alert(
          'Permission refusée',
          'Vous devez autoriser l\'accès à la caméra dans les paramètres de votre appareil pour utiliser le scanner.',
          [
            { text: 'Annuler', style: 'cancel', onPress: () => navigation.goBack() },
            { text: 'Paramètres', onPress: () => {
              // On Android et iOS, l'utilisateur doit aller dans les paramètres
              Alert.alert('Info', 'Veuillez activer la permission caméra dans les paramètres de votre appareil.');
            }},
          ]
        );
      }
    } catch (error) {
      console.error('Erreur lors de la demande de permission:', error);
      Alert.alert(
        'Erreur',
        'Impossible d\'accéder à la caméra. Veuillez réessayer.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
      setHasPermission(false);
    }
  };

  const requestPermissionAgain = async () => {
    setIsRequestingPermission(true);
    await checkCameraPermission();
    setIsRequestingPermission(false);
  };

  const startAnimations = () => {
    // Animation de la ligne de scan
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    // Animation de pulsation pour les coins
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    // Fade in de l'interface
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    
    // Rechercher l'œuvre correspondante
    const artwork = MUSEUM_ARTWORKS.find(art => art.qrCode === data);
    
    if (artwork) {
      Alert.alert(
        'Code QR scanné!',
        `Œuvre trouvée: ${artwork.title.fr}`,
        [
          {
            text: 'Voir détails',
            onPress: () => {
              navigation.navigate('ArtworkDetail', { artworkId: artwork.id });
              setScanned(false);
            },
          },
          {
            text: 'Scanner à nouveau',
            onPress: () => setScanned(false),
            style: 'cancel',
          },
        ]
      );
    } else {
      Alert.alert(
        'Code QR non reconnu',
        'Ce code QR ne correspond à aucune œuvre du musée.',
        [
          {
            text: 'Réessayer',
            onPress: () => setScanned(false),
          },
        ]
      );
    }
  };

  const toggleFlash = () => {
    setFlashOn(!flashOn);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.permissionContainer}>
        <View style={styles.permissionContent}>
          <View style={styles.permissionIconContainer}>
            <Ionicons name="hourglass-outline" size={80} color={Colors.primary} />
          </View>
          <Text style={styles.permissionTitle}>
            Vérification...
          </Text>
          <Text style={styles.permissionDescription}>
            Demande d'autorisation pour accéder à la caméra
          </Text>
        </View>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <View style={styles.permissionContent}>
          <View style={styles.permissionIconContainer}>
            <Ionicons name="camera-outline" size={80} color={Colors.primary} />
          </View>
          <Text style={styles.permissionTitle}>
            Autorisation caméra
          </Text>
          <Text style={styles.permissionDescription}>
            Pour scanner les codes QR des œuvres et vivre une expérience immersive, nous avons besoin d'accéder à votre caméra.
          </Text>
          
          <View style={styles.permissionSteps}>
            <Text style={styles.permissionStepsTitle}>Si le bouton ne fonctionne pas :</Text>
            <Text style={styles.permissionStepsText}>
              1. Allez dans Paramètres de votre téléphone{'\n'}
              2. Trouvez cette application{'\n'}
              3. Activez l'autorisation Caméra{'\n'}
              4. Revenez et réessayez
            </Text>
          </View>
          
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermissionAgain}
            activeOpacity={0.7}
            disabled={isRequestingPermission}
          >
            <Ionicons name="camera" size={20} color={Colors.white} style={{ marginRight: 8 }} />
            <Text style={styles.permissionButtonText}>
              {isRequestingPermission ? 'Vérification...' : 'Autoriser la caméra'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.permissionBackButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.permissionBackText}>
              Retour
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  const scanLineTranslateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 250],
  });

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scanner}
      />
      
      {/* Header avec bouton retour */}
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scanner une œuvre</Text>
        <TouchableOpacity
          style={styles.flashButton}
          onPress={toggleFlash}
          activeOpacity={0.7}
        >
          <Ionicons
            name={flashOn ? 'flash' : 'flash-off'}
            size={24}
            color={flashOn ? Colors.primary : Colors.white}
          />
        </TouchableOpacity>
      </Animated.View>
      
      {/* Overlay avec cadre de scan amélioré */}
      <View style={styles.overlay}>
        <View style={styles.topOverlay} />
        <View style={styles.middleRow}>
          <View style={styles.sideOverlay} />
          <Animated.View style={[styles.scanFrame, { opacity: fadeAnim }]}>
            {/* Ligne de scan animée */}
            <Animated.View
              style={[
                styles.scanLine,
                {
                  transform: [{ translateY: scanLineTranslateY }],
                },
              ]}
            />
            
            {/* Coins animés du cadre */}
            <Animated.View
              style={[
                styles.corner,
                styles.topLeft,
                { transform: [{ scale: pulseAnim }] },
              ]}
            />
            <Animated.View
              style={[
                styles.corner,
                styles.topRight,
                { transform: [{ scale: pulseAnim }] },
              ]}
            />
            <Animated.View
              style={[
                styles.corner,
                styles.bottomLeft,
                { transform: [{ scale: pulseAnim }] },
              ]}
            />
            <Animated.View
              style={[
                styles.corner,
                styles.bottomRight,
                { transform: [{ scale: pulseAnim }] },
              ]}
            />
          </Animated.View>
          <View style={styles.sideOverlay} />
        </View>
        <Animated.View style={[styles.bottomOverlay, { opacity: fadeAnim }]}>
          {/* Instructions avec icône */}
          <View style={styles.instructionContainer}>
            <View style={styles.instructionIconContainer}>
              <Ionicons name="qr-code-outline" size={32} color={Colors.primary} />
            </View>
            <Text style={styles.instructionTitle}>
              Positionnez le code QR
            </Text>
            <Text style={styles.instructionText}>
              Alignez le code QR dans le cadre pour le scanner automatiquement
            </Text>
          </View>
          
          {/* Bouton d'aide */}
          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => {
              Alert.alert(
                'Comment scanner ?',
                '1. Trouvez le code QR sur la plaque de l\'œuvre\n2. Positionnez votre téléphone à environ 15-20 cm\n3. Assurez-vous que le code est bien éclairé\n4. Tenez votre téléphone stable',
                [{ text: 'Compris', style: 'default' }]
              );
            }}
            activeOpacity={0.7}
          >
            <Ionicons name="help-circle-outline" size={20} color={Colors.white} />
            <Text style={styles.helpButtonText}>Besoin d'aide ?</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  scanner: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: Spacing.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: '600',
    fontFamily: 'serif',
  },
  flashButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionContent: {
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: Spacing.xl * 2,
    alignItems: 'center',
  },
  permissionIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(200, 168, 130, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  permissionText: {
    fontSize: Typography.sizes.md,
    color: Colors.text.primary,
    textAlign: 'center',
  },
  permissionTitle: {
    fontSize: 28,
    color: Colors.text.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Spacing.md,
    fontFamily: 'serif',
  },
  permissionDescription: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.xl * 2,
  },
  permissionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl * 1.5,
    paddingVertical: Spacing.md + 4,
    borderRadius: 30,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  permissionButtonText: {
    fontSize: 17,
    color: Colors.white,
    fontWeight: '600',
  },
  permissionBackButton: {
    marginTop: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
  },
  permissionBackText: {
    fontSize: 16,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  permissionSteps: {
    backgroundColor: 'rgba(200, 168, 130, 0.1)',
    borderRadius: 12,
    padding: Spacing.lg,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  permissionStepsTitle: {
    fontSize: 14,
    color: Colors.text.primary,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  permissionStepsText: {
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  middleRow: {
    flexDirection: 'row',
    height: 280,
  },
  sideOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  scanFrame: {
    width: 280,
    height: 280,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: Colors.primary,
    borderWidth: 4,
    borderRadius: 4,
  },
  topLeft: {
    top: -2,
    left: -2,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: -2,
    right: -2,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingBottom: 40,
  },
  instructionContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  instructionIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(200, 168, 130, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  instructionTitle: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Spacing.sm,
    fontFamily: 'serif',
  },
  instructionText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: Spacing.lg,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: 25,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  helpButtonText: {
    fontSize: 15,
    color: Colors.white,
    fontWeight: '500',
  },
});

export default ScannerScreen;