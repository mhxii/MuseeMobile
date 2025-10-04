import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
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

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

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
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          Demande d'autorisation pour utiliser la caméra...
        </Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <Ionicons name="camera-outline" size={64} color={Colors.gray.medium} />
          <Text style={styles.permissionTitle}>
            Permission caméra requise
          </Text>
          <Text style={styles.permissionDescription}>
            Nous avons besoin d'accéder à votre caméra pour scanner les codes QR des œuvres du musée.
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={() => BarCodeScanner.requestPermissionsAsync()}
            activeOpacity={0.8}
          >
            <Text style={styles.permissionButtonText}>
              Autoriser la caméra
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scanner}
      />
      
      {/* Overlay avec cadre de scan */}
      <View style={styles.overlay}>
        <View style={styles.topOverlay} />
        <View style={styles.middleRow}>
          <View style={styles.sideOverlay} />
          <View style={styles.scanFrame}>
            {/* Coins du cadre */}
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
          <View style={styles.sideOverlay} />
        </View>
        <View style={styles.bottomOverlay}>
          {/* Instructions */}
          <Text style={styles.instructionText}>
            Pointez votre caméra vers le code QR de l'œuvre
          </Text>
          
          {/* Boutons d'action */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={toggleFlash}
              activeOpacity={0.8}
            >
              <Ionicons
                name={flashOn ? 'flash' : 'flash-outline'}
                size={24}
                color={Colors.white}
              />
              <Text style={styles.actionButtonText}>
                {flashOn ? 'Flash ON' : 'Flash OFF'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
              <Ionicons name="close" size={24} color={Colors.white} />
              <Text style={styles.actionButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    backgroundColor: Colors.background,
  },
  permissionText: {
    fontSize: Typography.sizes.md,
    color: Colors.text.primary,
    textAlign: 'center',
  },
  permissionTitle: {
    fontSize: Typography.sizes.xl,
    color: Colors.text.primary,
    fontWeight: Typography.weights.bold,
    textAlign: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  permissionDescription: {
    fontSize: Typography.sizes.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: Typography.sizes.md * 1.4,
    marginBottom: Spacing.xl,
  },
  permissionButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  permissionButtonText: {
    fontSize: Typography.sizes.md,
    color: Colors.white,
    fontWeight: Typography.weights.semiBold,
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  middleRow: {
    flexDirection: 'row',
    height: 250,
  },
  sideOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  scanFrame: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: Colors.primary,
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  instructionText: {
    fontSize: Typography.sizes.lg,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    fontWeight: Typography.weights.medium,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: Spacing.lg,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    minWidth: 100,
  },
  actionButtonText: {
    fontSize: Typography.sizes.sm,
    color: Colors.white,
    fontWeight: Typography.weights.medium,
    marginTop: Spacing.xs,
  },
});

export default ScannerScreen;